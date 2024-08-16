/**
 * """
    Generate a full set of fusion components, commitments, keys, and proofs.

    count: int
    inputs: dict of {(prevout_hash, prevout_n): (pubkey, integer value in sats)}
    outputs: list of [(value, addr), (value, addr) ...]
    feerate: int (sat/kB)

    Returns:
        list of InitialCommitment,
        list of component original indices (inputs then outputs then blanks),
        list of serialized Component,
        list of Proof,
        list of communication privkey,
        Pedersen amount for total, (== excess fee)
        Pedersen nonce for total,
    """
 */
export default (num_blanks, inputs, outputs, feerate) => {
    assert num_blanks >= 0

    components = []
    for (phash, pn), (pubkey, value) in inputs:
        fee = component_fee(size_of_input(pubkey), feerate)
        comp = pb.Component()
        comp.input.prev_txid = bytes.fromhex(phash)[::-1]
        comp.input.prev_index = pn
        comp.input.pubkey = pubkey
        comp.input.amount = value
        components.append((comp, +value-fee))
    for value, addr in outputs:
        script = addr.to_script()
        fee = component_fee(size_of_output(script), feerate)
        comp = pb.Component()
        comp.output.scriptpubkey = script
        comp.output.amount = value
        components.append((comp, -value-fee))
    for _ in range(num_blanks):
        comp = pb.Component(blank={})
        components.append((comp, 0))

    # Generate commitments and (partial) proofs
    resultlist = []
    sum_nonce = 0
    sum_amounts = 0
    for cnum, (comp, commitamount) in enumerate(components):
        salt = secrets.token_bytes(32)
        comp.salt_commitment = sha256(salt)
        compser = comp.SerializeToString()

        pedersencommitment = Protocol.PEDERSEN.commit(commitamount)
        sum_nonce += pedersencommitment.nonce
        sum_amounts += commitamount

        privkey, pubkeyU, pubkeyC = gen_keypair()

        commitment = pb.InitialCommitment()
        commitment.salted_component_hash = sha256(salt+compser)
        commitment.amount_commitment = pedersencommitment.P_uncompressed
        commitment.communication_key = pubkeyC

        commitser = commitment.SerializeToString()

        proof = pb.Proof()
        # proof.component_idx = <to be filled in later>
        proof.salt = salt
        proof.pedersen_nonce = int(pedersencommitment.nonce).to_bytes(32, 'big')

        resultlist.append((commitser, cnum, compser, proof, privkey))

    # Sort by the commitment bytestring, in order to forget the original order.
    resultlist.sort(key=lambda x:x[0])

    sum_nonce = sum_nonce % pedersen.order
    pedersen_total_nonce = int(sum_nonce).to_bytes(32, 'big')

    return zip(*resultlist), sum_amounts, pedersen_total_nonce
}
