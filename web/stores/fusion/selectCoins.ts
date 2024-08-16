/**
 * """ Sort the wallet's coins into address buckets, returning two lists:
    - Eligible addresses and their coins.
    - Ineligible addresses and their coins.

    An address is eligible if it satisfies all conditions:
    - the address is unfrozen
    - has 1, 2, or 3 utxo
    - all utxo are confirmed (or matured in case of coinbases)
    - has no SLP utxo or frozen utxo
    """
 */
export default async (wallet) => {
    # First, select all the coins
    eligible = []
    ineligible = []
    has_unconfirmed = False
    has_coinbase = False
    sum_value = 0
    mincbheight = (wallet.get_local_height() + 1 - COINBASE_MATURITY if Conf(wallet).autofuse_coinbase
                   else -1)  # -1 here causes coinbase coins to always be rejected
    for addr in wallet.get_addresses():
        acoins = list(wallet.get_addr_utxo(addr).values())
        if not acoins:
            continue  # prevent inserting empty lists into eligible/ineligible
        good = True
        if addr in wallet.frozen_addresses:
            good = False
        for i,c in enumerate(acoins):
            sum_value += c['value']  # tally up values regardless of eligibility
            # If too many coins, any SLP tokens, any frozen coins, or any
            # immature coinbase on the address -> flag all address coins as
            # ineligible if not already flagged as such.
            good = good and (
                i < 3  # must not have too many coins on the same address*
                and not c['token_data']  # must not have a CashToken on it
                and not c['slp_token']  # must not be SLP
                and not c['is_frozen_coin']  # must not be frozen
                and (not c['coinbase'] or c['height'] <= mincbheight)  # if coinbase -> must be mature coinbase
            )
            # * = We skip addresses with too many coins, since they take up lots
            #     of 'space' for consolidation. TODO: there is possibility of
            #     disruption here, if we get dust spammed. Need to deal with
            #     'dusty' addresses by ignoring / consolidating dusty coins.

            # Next, detect has_unconfirmed & has_coinbase:
            if c['height'] <= 0:
                # Unconfirmed -> Flag as not eligible and set the has_unconfirmed flag.
                good = False
                has_unconfirmed = True
            # Update has_coinbase flag if not already set
            has_coinbase = has_coinbase or c['coinbase']
        if good:
            eligible.append((addr,acoins))
        else:
            ineligible.append((addr,acoins))

    return eligible, ineligible, int(sum_value), bool(has_unconfirmed), bool(has_coinbase)
}
