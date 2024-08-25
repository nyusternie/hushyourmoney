/* Import modules. */
import { sha256 } from '@nexajs/crypto'
import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'
import BCHJS from '@psf/bch-js'
import { ElectrumCluster } from 'electrum-cash'

/* Initialize BCHJS. */
const bchjs = new BCHJS()

/* Initialize globals. */
let electrum

;(async () => {
    // Initialize an electrum cluster where 2 out of 3 needs to be consistent,
    // polled randomly with fail-over (default).
    electrum = new ElectrumCluster('Electrum cluster example', '1.4.1', 2, 3)

    // Add some servers to the cluster.
    electrum.addServer('bch.imaginary.cash')
    electrum.addServer('electroncash.de')
    electrum.addServer('electroncash.dk')
    electrum.addServer('electron.jochen-hoenicke.de', 51002)
    electrum.addServer('electrum.imaginary.cash')

    // Wait for enough connections to be available.
    await electrum.ready()
})()


export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let address
    let body
    let hash160
    let method
    let params
    let response
    let script
    let scriptHash

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('BODY', body)

    if (!body || !body.method || !body.params) {
        return `Request FAILED!`
    }

    /* Set method. */
    method = body.method

    /* Handle method. */
    switch(method) {
    case 'blockchain.transaction.get':
        /* Handle parameters. */
        if (typeof body.params == 'string') {
            params = body.params
        } else {
            params = body.params[0]
        }

        break
    case 'blockchain.scripthash.listunspent':
        /* Handle parameters. */
        if (typeof body.params == 'string') {
            params = body.params
        } else {
            params = body.params[0]
        }

        /* Set address. */
        address = params

        /* Convert to script hash. */
        hash160 = bchjs.Address.toHash160(params)
        console.log('HASH160', hash160)

        /* Set script. */
        // FIXME Use `OP` and TypedArray.
        script = `76a914${hash160}88ac`
        // console.log('SCRIPT', script)

        /* Conver to hex. */
        script = hexToBin(script)

        /* Generate script hash. */
        scriptHash = sha256(script)

        scriptHash = scriptHash.reverse()

        /* Set params. */
        params = binToHex(scriptHash)

        break
    default:
        setResponseStatus(event, 401)
        return 'Oops! Invalid request!'
    }

    // Request the full transaction hex for the transaction ID.
    response = await electrum.request(body.method, params)
    // console.log('RESPONSE', response)

    return response
})
