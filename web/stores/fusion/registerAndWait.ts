export default () => {
    tier_outputs = self.tier_outputs
    tiers_sorted = sorted(tier_outputs.keys())

    if not tier_outputs:
        raise FusionError('No outputs available at any tier (selected inputs were too small / too large).')

    self.print_error(f'registering for tiers: {tiers_sorted}')

    tags = []
    for wallet in self.source_wallet_info:
        selffuse = Conf(wallet).self_fuse_players
        tags.append(pb.JoinPools.PoolTag(id = wallet.cashfusion_tag, limit = selffuse))

    ## Join waiting pools
    self.check_stop(running=False)
    self.check_coins()
    self.send(pb.JoinPools(tiers = tiers_sorted, tags=tags))

    self.status = ('waiting', 'Registered for tiers')

    # make nicer strings for UI
    tiers_strings = {t: '{:.8f}'.format(t * 1e-8).rstrip('0') for t, s in tier_outputs.items()}

    while True:
        # We should get a status update every 5 seconds.
        msg = self.recv('tierstatusupdate', 'fusionbegin', timeout=10)

        if isinstance(msg, pb.FusionBegin):
            break

        self.check_stop(running=False)
        self.check_coins()

        assert isinstance(msg, pb.TierStatusUpdate)

        statuses = msg.statuses
        maxfraction = 0.
        maxtiers = []
        besttime = None
        besttimetier = None
        for t,s in statuses.items():
            try:
                frac = s.players / s.min_players
            except ZeroDivisionError:
                frac = -1.
            if frac >= maxfraction:
                if frac > maxfraction:
                    maxfraction = frac
                    maxtiers.clear()
                maxtiers.append(t)
            if s.HasField('time_remaining'):
                tr = s.time_remaining
                if besttime is None or tr < besttime:
                    besttime = tr
                    besttimetier = t

        maxtiers = set(maxtiers)

        display_best = []
        display_mid = []
        display_queued = []
        for t in tiers_sorted:
            try:
                ts = tiers_strings[t]
            except KeyError:
                raise FusionError('server reported status on tier we are not registered for')
            if t in statuses:
                if t == besttimetier:
                    display_best.insert(0, '**' + ts + '**')
                elif t in maxtiers:
                    display_best.append('[' + ts + ']')
                else:
                    display_mid.append(ts)
            else:
                display_queued.append(ts)

        parts = []
        if display_best or display_mid:
            parts.append(_("Tiers:") + ' ' + ', '.join(display_best + display_mid))
        if display_queued:
            parts.append(_("Queued:") + ' ' + ', '.join(display_queued))
        tiers_string = ' '.join(parts)

        if besttime is None and self.inactive_time_limit is not None:
            if time.monotonic() > self.inactive_time_limit:
                raise FusionError('stopping due to inactivity')

        if besttime is not None:
            self.status = ('waiting', 'Starting in {}s. {}'.format(besttime, tiers_string))
        elif maxfraction >= 1:
            self.status = ('waiting', 'Starting soon. {}'.format(tiers_string))
        elif display_best or display_mid:
            self.status = ('waiting', '{:d}% full. {}'.format(round(maxfraction*100), tiers_string))
        else:
            self.status = ('waiting', tiers_string)

    assert isinstance(msg, pb.FusionBegin)
    # Record the time we got FusionBegin. Later in run_round we will check that the
    # first round comes at a very particular time relative to this message.
    self.t_fusionbegin = time.monotonic()

    # Check the server's declared unix time, which will be committed.
    clock_mismatch = msg.server_time - time.time()
    if abs(clock_mismatch) > Protocol.MAX_CLOCK_DISCREPANCY:
        raise FusionError(f"Clock mismatch too large: {clock_mismatch:+.3f}.")

    self.tier = msg.tier
    self.covert_domain_b = msg.covert_domain
    self.covert_port = msg.covert_port
    self.covert_ssl = msg.covert_ssl
    self.begin_time = msg.server_time

    self.last_hash = calc_initial_hash(self.tier, msg.covert_domain, msg.covert_port, msg.covert_ssl, msg.server_time)

    out_amounts = tier_outputs[self.tier]
    out_addrs = self.target_wallet.reserve_change_addresses(len(out_amounts), temporary=True)
    self.reserved_addresses = out_addrs
    self.outputs = list(zip(out_amounts, out_addrs))
    self.safety_excess_fee = self.safety_excess_fees[self.tier]
    self.print_error(f"starting fusion rounds at tier {self.tier}: {len(self.inputs)} inputs and {len(self.outputs)} outputs")
}
