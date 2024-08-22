/* Import modules. */
import Bitcoin from '@psf/bitcoincashjs-lib'
import BCHJS from '@psf/bch-js'
import { Wallet } from '@nexajs/wallet'

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v5/'

const runtimeConfig = useRuntimeConfig()
// const jwtAuthToken = runtimeConfig.public.PSF_JWT_AUTH_TOKEN
const jwtAuthToken = runtimeConfig.PSF_JWT_AUTH_TOKEN
// console.log('jwtAuthToken', jwtAuthToken)

// Instantiate bch-js based on the network.
// FIXME https://github.com/Permissionless-Software-Foundation/jwt-bch-demo/blob/master/lib/fullstack-jwt.js
const bchjs = new BCHJS({
    restURL: BCHN_MAINNET,
    apiToken: jwtAuthToken,
})
// console.log('bchjs', bchjs)

/* Initialize globals. */
let fusionsDb
let wallet

/* Set constants. */
const CHECK_FUSIONS_INTERVAL = 5000

const sendTx = async (_tx) => {
    const transactionBuilder = Bitcoin.TransactionBuilder
        .fromTransaction(_tx, 'mainnet')
    // const transactionBuilder = new bchjs.TransactionBuilder()
    // console.log('TRANSACTION BUILDER', transactionBuilder)

    // build tx
    const tx = transactionBuilder.build()
    // console.log('TRANSACTION BUILD', tx)

    // output rawhex
    const txHex = tx.toHex()

    const finalTx = await bchjs.RawTransactions
        .decodeRawTransaction(txHex)
    console.log(`finalTx: ${JSON.stringify(finalTx, null, 2)}`)

    // Broadcast transaction to the network
    const txidStr = await bchjs.RawTransactions.sendRawTransaction(txHex)
    console.log(`Exchange Tx ID: ${txidStr}`)
    console.log(`https://explorer.bitcoinunlimited.info/tx/${txidStr}`)
    console.log(`https://3xpl.com/bitcoin-cash/transaction/${txidStr}`)
}

/**
 * Initialize (Wallet)
 *
 * Setup an "ephemeral" wallet for the use of this Club Session.
 */
const init = async () => {
    wallet = await Wallet.init()
        .catch(err => console.error(err))
    // console.log('WALLET INIT', wallet)

    let lastUpdate = 0
    let lastSnapshot

    /* Manage Fusions */
    setInterval(() => {
        // console.log('Looking for DB(fusions) changes...', fusionsDb)

        /* Set Fusion snapshot. */
        const snapshot = JSON.stringify(fusionsDb)
        // console.log('SNAPSHOT', snapshot)

        /* Validate Fusion snapshot. */
        if (fusionsDb && snapshot !== lastSnapshot) {
            lastSnapshot = snapshot

// console.log('FOUND CHANGES??', snapshot)
// txObj.ins[1].script = txObj2.ins[1].script
// txObj.ins[2].script = txObj3.ins[2].script

            /* Initialize recents. */
            const recents = []

            /* Handle fusions. */
            Object.keys(fusionsDb).forEach(_fusionid => {
                /* Set fusion. */
                const fusion = fusionsDb[_fusionid]

                /* Validate last update. */
                if (typeof fusion.completedAt === 'undefined' && fusion.updatedAt > lastUpdate) {
                    /* Add fusion. */
                    recents.push(fusion)
                }
            })

            console.log('RECENTS', lastUpdate, recents)

            /* Handle recents. */
            // NOTE: Update last update handler.
            recents.forEach(_recent => {
                if (_recent.updatedAt > lastUpdate) {
                    /* Set (new) last update. */
                    lastUpdate = _recent.updatedAt
                }

                if (_recent.rawTx) {
                    let decoded = Bitcoin.Transaction.fromBuffer(Buffer.from(_recent.rawTx, 'hex'))
                    console.log('DECODED RAW HEX', decoded)

                    /* Send a transaction. */
                    sendTx(decoded)
                }
            })
            console.log('NEW LAST UPDATE', lastUpdate)
        }
    }, CHECK_FUSIONS_INTERVAL)

}
init()

export default defineEventHandler((event) => {
    /* Set database. */
    const Db = event.context.Db
    // console.log('DB', Db)

    /* Set fusions database. */
    fusionsDb = Db.fusions

    /* Inject wallet into server context. */
    event.context.Wallet = wallet
})
