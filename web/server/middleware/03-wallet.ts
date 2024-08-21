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
    // console.log('WALLET INIT', wallet)
}
init()

export default defineEventHandler((event) => {
    /* Set database. */
    const Db = event.context.Db
    // console.log('DB', Db)

    /* Inject wallet into server context. */
    event.context.Wallet = wallet
})
