export default () => {
    self.print_error('greeting server')
    self.send(pb.ClientHello(version=Protocol.VERSION, genesis_hash=get_current_genesis_hash()))
    reply = self.recv('serverhello')
    self.num_components = reply.num_components
    self.component_feerate = reply.component_feerate
    self.min_excess_fee = reply.min_excess_fee
    self.max_excess_fee = reply.max_excess_fee
    self.available_tiers = tuple(reply.tiers)
    strong_plugin = self.strong_plugin
    if strong_plugin:
        strong_plugin.set_remote_donation_address(reply.donation_address)

    # Enforce some sensible limits, in case server is crazy
    if self.component_feerate > MAX_COMPONENT_FEERATE:
        raise FusionError('excessive component feerate from server')
    if self.min_excess_fee > 400:
        # note this threshold should be far below MAX_EXCESS_FEE
        raise FusionError('excessive min excess fee from server')
    if self.min_excess_fee > self.max_excess_fee:
        raise FusionError('bad config on server: fees')
    if self.num_components < MIN_TX_COMPONENTS * 1.5:
        raise FusionError('bad config on server: num_components')
}
