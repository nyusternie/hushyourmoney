/**
 * """ Returns the tx and a list of indices matching inputs with components"""
 */
export default (all_components, session_hash) => {
    input_indices = []
    assert len(session_hash) == 32
    if Protocol.FUSE_ID is None:
        prefix = []
    else:
        assert len(Protocol.FUSE_ID) == 4
        prefix = [4, *Protocol.FUSE_ID]
    inputs = []
    outputs = [(TYPE_SCRIPT, ScriptOutput(bytes([OpCodes.OP_RETURN, *prefix, 32]) + session_hash), 0)]
    for i,compser in enumerate(all_components):
        comp = pb.Component()
        comp.ParseFromString(compser)
        ctype = comp.WhichOneof('component')
        if ctype == 'input':
            inp = comp.input
            if len(inp.prev_txid) != 32:
                raise FusionError("bad component prevout")
            inputs.append(dict(address = Address.from_P2PKH_hash(hash160(inp.pubkey)),
                               prevout_hash = inp.prev_txid[::-1].hex(),
                               prevout_n = inp.prev_index,
                               num_sig = 1,
                               signatures = [None],
                               type = 'p2pkh',
                               x_pubkeys = [inp.pubkey.hex()],
                               pubkeys = [inp.pubkey.hex()],
                               sequence = 0xffffffff,
                               token_data = None,  # Program defensively, in case something does inp['token_data']
                               value = inp.amount))
            input_indices.append(i)
        elif ctype == 'output':
            out = comp.output
            atype, addr = get_address_from_output_script(out.scriptpubkey)
            if atype != TYPE_ADDRESS:
                raise FusionError("bad component address")
            outputs.append((TYPE_ADDRESS, addr, out.amount))
        elif ctype != 'blank':
            raise FusionError("bad component")
    tx = Transaction.from_io(inputs, outputs, locktime=0, sign_schnorr=True)
    tx.version = 1
    return tx, input_indices
}
