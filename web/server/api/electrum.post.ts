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
    let newParams
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

    /* Set params. */
    params = body.params

    let collection = []

    /* Handle method. */
    switch(method) {
    case 'blockchain.transaction.get':
        if (Array.isArray(params)) {
            for (let i = 0; i < params.length; i++) {
                response = await electrum.request(method, params[i])

                collection.push(response)
            }
        } else {
            // Request the full transaction hex for the transaction ID.
            response = await electrum.request(method, params)

            collection = [ response ]
        }

        return collection
    case 'blockchain.scripthash.listunspent':
        if (Array.isArray(params)) {
            for (let i = 0; i < params.length; i++) {
                /* Set address. */
                address = params[i]

                /* Convert to script hash. */
                hash160 = bchjs.Address.toHash160(params[i])

                /* Set script. */
                // FIXME Use `OP` and TypedArray.
                script = `76a914${hash160}88ac`

                /* Conver to hex. */
                script = hexToBin(script)

                /* Generate script hash. */
                scriptHash = sha256(script)

                scriptHash = scriptHash.reverse()

                /* Set (new) params. */
                newParams = binToHex(scriptHash)

                response = await electrum.request(method, newParams)

                /* Add (a reference to) address. */
                response = {
                    address,
                    utxos: response,
                }

                // collection.push(response)
                collection = [ ...collection, response ]
            }
        } else {
            // Request the full transaction hex for the transaction ID.
            response = await electrum.request(method, params)

            // collection.push(response)
            collection = [ ...response ]
        }

        return collection
    case 'blockchain.scripthash.get_history':
        if (Array.isArray(params)) {
            for (let i = 0; i < params.length; i++) {
                /* Set address. */
                address = params[i]

                /* Convert to script hash. */
                hash160 = bchjs.Address.toHash160(params[i])

                /* Set script. */
                // FIXME Use `OP` and TypedArray.
                script = `76a914${hash160}88ac`

                /* Conver to hex. */
                script = hexToBin(script)

                /* Generate script hash. */
                scriptHash = sha256(script)

                scriptHash = scriptHash.reverse()

                /* Set (new) params. */
                newParams = binToHex(scriptHash)

                response = await electrum.request(method, newParams)

                /* Add (a reference to) address. */
                response = {
                    address,
                    txs: response,
                }

                // collection.push(response)
                collection = [ ...collection, response ]
            }
        } else {
            // Request the full transaction hex for the transaction ID.
            response = await electrum.request(method, params)

            // collection.push(response)
            collection = [ ...response ]
        }

        return collection
    default:
        setResponseStatus(event, 401)
        return 'Oops! Invalid request!'
    }
})
