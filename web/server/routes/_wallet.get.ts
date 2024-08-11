/* Import modules. */
import { Wallet } from '@nexajs/wallet'

/* Initialize Wallet (instance) */
let wallet

/**
 * Initialize (Wallet)
 *
 * Setup an "ephemeral" wallet for the use of this Club Session.
 */
const init = async () => {
    wallet = await Wallet.init()
        .catch(err => console.error(err))
    // console.log('WALLET', wallet)
}

init()

export default defineEventHandler((event) => {
    /* Set project mnemonic. */
    // const mnemonic = process.env.PROJECT_MNEMONIC

    /* Build wallet. */
    // const wallet = {
    //     mnemonic,
    // }

    const walletPkg = {
        address: wallet.address,
        assets: JSON.stringify(wallet.assets, (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        ),
        coins: JSON.stringify(wallet.coins, (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        ),
        mnemonic: wallet.mnemonic,
        tokens: JSON.stringify(wallet.tokens, (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        ),
    }

    /* Return wallet details. */
    return walletPkg
})
