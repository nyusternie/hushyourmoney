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
    console.log('WALLET', wallet)
}

init()

export default defineEventHandler((event) => {
    /* Set project mnemonic. */
    // const mnemonic = process.env.PROJECT_MNEMONIC

    /* Build wallet. */
    // const wallet = {
    //     mnemonic,
    // }

    /* Return wallet details. */
    // return wallet
    return {
        address: wallet.address,
        mnemonic: wallet.mnemonic,
    }
})
