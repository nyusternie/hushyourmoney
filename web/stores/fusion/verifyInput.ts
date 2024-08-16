/**
 * """ Check an InputComponent against electrumx service. This can be a bit slow
    since it gets all utxos on that address.

    Returns normally if the check passed. Raises ValidationError if the input is not
    consistent with blockchain (according to server), and raises other exceptions if
    the server times out or gives an unexpected kind of response.
    """
 */
export default (network, inpcomp) => {
    address = Address.from_pubkey(inpcomp.pubkey)
    prevhash = inpcomp.prev_txid[::-1].hex()
    prevn = inpcomp.prev_index
    sh = address.to_scripthash_hex()
    u = network.synchronous_get(('blockchain.scripthash.listunspent', [sh]), timeout=5)
    for item in u:
        if prevhash == item['tx_hash'] and prevn == item['tx_pos']:
            break
    else:
        raise ValidationError('missing or spent or scriptpubkey mismatch')

    check(item['height'] > 0, 'not confirmed')
    check(item['value'] == inpcomp.amount, 'amount mismatch')
    # Not checked: is it a coinbase? is it matured?
    # A feasible strategy to identify unmatured coinbase is to cache the results
    # of blockchain.transaction.id_from_pos(height, 0) from the last 100 blocks.

}
