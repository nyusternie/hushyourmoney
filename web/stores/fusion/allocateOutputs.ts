export default () => {
    assert self.status[0] in ('setup', 'connecting')

    # fix the input selection
    self.inputs = tuple(self.coins.items())
    num_inputs = len(self.inputs)

    maxcomponents = min(self.num_components, MAX_COMPONENTS)
    max_outputs = maxcomponents - num_inputs
    if max_outputs < 1:
        raise FusionError('Too many inputs (%d >= %d)'%(num_inputs, maxcomponents))

    if self.max_outputs is not None:
        assert self.max_outputs >= 1
        max_outputs = min(self.max_outputs, max_outputs)

    # For obfuscation, when there are few distinct inputs we want to have many
    # outputs.
    # Calculate the number of distinct inputs as the number of distinct pubkeys
    # (i.e. extra inputs from same address don't count as distinct)
    num_distinct = len(set(pub for (_,_), (pub,_) in self.inputs))
    min_outputs = max(MIN_TX_COMPONENTS - num_distinct, 1)
    if max_outputs < min_outputs:
        raise FusionError('Too few distinct inputs selected (%d); cannot satisfy output count constraint (>=%d, <=%d)'%(num_distinct, min_outputs, max_outputs))

    # how much input value do we bring to the table (after input & player fees)
    sum_inputs_value = sum(v for (_,_), (p,v) in self.inputs)
    input_fees = sum(component_fee(size_of_input(p), self.component_feerate) for (_,_), (p,v) in self.inputs)
    avail_for_outputs = (sum_inputs_value
                            - input_fees
                            - self.min_excess_fee)

    # each P2PKH output will need at least this much allocated to it.
    fee_per_output = component_fee(34, self.component_feerate)
    offset_per_output = Protocol.MIN_OUTPUT + fee_per_output

    if avail_for_outputs < offset_per_output:
        # our input amounts are so small that we can't even manage a single output.
        raise FusionError('Selected inputs had too little value')

    rng = Random()
    rng.seed(secrets.token_bytes(32))

    tier_outputs = {}
    excess_fees = {}
    for scale in self.available_tiers:
        ### Fuzzing fee range selection ###
        # To keep privacy at higher tiers, we need to randomize our input-output
        # linkage somehow, which means throwing away some sats as extra fees beyond
        # the minimum requirement.

        # Just use (tier / 10^6) as fuzzing range. For a 10 BCH tier this means
        # randomly overpaying fees of 0 to 1000 sats.
        fuzz_fee_max = scale // 1000000

        ### End fuzzing fee range selection ###

        # Now choose a random fuzz fee. Uniform random is best for obfuscation.
        # But before we do, there is a maximum fuzzing fee that is admitted by server, and
        # a safety maximum that we have ourselves.
        fuzz_fee_max_reduced = min(fuzz_fee_max,
                                    MAX_EXCESS_FEE - self.min_excess_fee,
                                    self.max_excess_fee - self.min_excess_fee)
        assert fuzz_fee_max_reduced >= 0
        fuzz_fee = secrets.randbelow(fuzz_fee_max_reduced + 1)
        assert fuzz_fee <= fuzz_fee_max_reduced and fuzz_fee_max_reduced <= fuzz_fee_max

        reduced_avail_for_outputs = avail_for_outputs - fuzz_fee
        if reduced_avail_for_outputs < offset_per_output:
            continue

        outputs = random_outputs_for_tier(rng, reduced_avail_for_outputs, scale, offset_per_output, max_outputs)
        if not outputs or len(outputs) < min_outputs:
            # this tier is no good for us.
            continue
        # subtract off the per-output fees that we provided for, above.
        outputs = tuple(o - fee_per_output for o in outputs)

        assert len(self.inputs) + len(outputs) <= MAX_COMPONENTS
        excess_fees[scale] = sum_inputs_value - input_fees - reduced_avail_for_outputs
        tier_outputs[scale] = outputs

    self.tier_outputs = tier_outputs
    self.print_error(f"Possible tiers: {tier_outputs}")

    # remember these for safety check later on
    self.safety_sum_in = sum_inputs_value
    self.safety_excess_fees = excess_fees
}
