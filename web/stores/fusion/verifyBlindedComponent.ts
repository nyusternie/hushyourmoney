export default (msg, round_pubkey, component_feerate) => {
    message_hash = sha256(msg.component)
    check(len(msg.signature) == 64, "bad message signature")
    check(schnorr.verify(round_pubkey, msg.signature, message_hash), "bad message signature")

    cmsg = proto_strict_parse(pb.Component(), msg.component)
    check(len(cmsg.salt_commitment) == 32, "bad salt commitment")
    ctype = cmsg.WhichOneof('component')
    if ctype == 'input':
        inp = cmsg.input
        check(len(inp.prev_txid) == 32, "bad txid")
        check(   (len(inp.pubkey) == 33 and inp.pubkey[0] in (2,3))
              or (len(inp.pubkey) == 65 and inp.pubkey[0] == 4),
              "bad pubkey")
        sort_key = ('i', inp.prev_txid[::-1], inp.prev_index, cmsg.salt_commitment)
    elif ctype == 'output':
        out = cmsg.output
        atype, addr = get_address_from_output_script(out.scriptpubkey)
        check(atype == TYPE_ADDRESS, "output is not address")
        check(out.amount >= dust_limit(len(out.scriptpubkey)), "dust output")
        sort_key = ('o', out.amount, out.scriptpubkey, cmsg.salt_commitment)
    elif ctype == 'blank':
        sort_key = ('b', cmsg.salt_commitment)
    else:
        raise ValidationError('missing component details')

    # Note: for each sort type we use salt_commitment as a tie-breaker, just to
    # make sure that original ordering is forgotten. Of course salt_commitment
    # doesn't have to be unique, but it's unique for all honest players.

    return sort_key, component_contrib(cmsg, component_feerate)
}
