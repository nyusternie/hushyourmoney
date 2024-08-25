// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v5/'

// bch-js-examples require code from the main bch-js repo
import BCHJS from '@psf/bch-js'

// Instantiate bch-js based on the network.
const bchjs = new BCHJS({ restURL: BCHN_MAINNET })

export default async function (_network = 'NEXA', _rawTx) {
    // FIXME Add Nexa broadcast functions.

    /* Send raw transaction. */
    const txid = await bchjs.RawTransactions.sendRawTransaction([ _rawTx ])
    console.log(`Transaction ID: ${txid}`)
}
