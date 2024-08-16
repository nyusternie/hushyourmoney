/**
 * """
    Grab wallet coins with a certain probability, while also paying attention
    to obvious linkages and possible linkages.
    Returns list of list of coins (bucketed by obvious linkage).
    """
 */
export default (wallet, fraction, eligible) => {
    # First, we want to bucket coins together when they have obvious linkage.
    # Coins that are linked together should be spent together.
    # Currently, just look at address.
    addr_coins = eligible
    random.shuffle(addr_coins)

    # While fusing we want to pay attention to semi-correlations among coins.
    # When we fuse semi-linked coins, it increases the linkage. So we try to
    # avoid doing that (but rarely, we just do it anyway :D).
    # Currently, we just look at all txids touched by the address.
    # (TODO this is a disruption vector: someone can spam multiple fusions'
    #  output addrs with massive dust transactions (2900 outputs in 100 kB)
    #  that make the plugin think that all those addresses are linked.)
    result_txids = set()

    result = []
    num_coins = 0
    for addr, acoins in addr_coins:
        if num_coins >= DEFAULT_MAX_COINS:
            break
        elif num_coins + len(acoins) > DEFAULT_MAX_COINS:
            continue

        # For each bucket, we give a separate chance of joining.
        if random.random() > fraction:
            continue

        # Semi-linkage check:
        # We consider all txids involving the address, historical and current.
        ctxids = {txid for txid, height in wallet.get_address_history(addr)}
        collisions = ctxids.intersection(result_txids)
        # Note each collision gives a separate chance of discarding this bucket.
        if random.random() > KEEP_LINKED_PROBABILITY**len(collisions):
            continue
        # OK, no problems: let's include this bucket.
        num_coins += len(acoins)
        result.append(acoins)
        result_txids.update(ctxids)

    if not result:
        # nothing was selected, just try grabbing first nonempty bucket
        try:
            res = next(coins for addr,coins in addr_coins if coins)
            result = [res]
        except StopIteration:
            # all eligible buckets were cleared.
            pass

    return result
}
