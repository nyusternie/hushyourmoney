/* Import modules. */
import BCHJS from '@psf/bch-js'
import { Transaction } from 'bitcoinjs-lib'
import { mnemonicToSeed } from '@nexajs/hdnode'
import { encodeNullData } from '@nexajs/script'
import { utf8ToBin } from '@nexajs/utils'

const bchjs = new BCHJS()

/* Initialize constants. */
const HUSH_PROTOCOL_ID = 0x48555348


/**
 * Build Shared Transaction
 *
 * Combine all participating inputs and outputs into one (signed) transaction.
 */
export default function (_sessionid, _mnemonic, _inputs, _outputs) {
console.log('SIGN SHARED TX', _sessionid, _inputs, _outputs)
    /* Initialize locals. */
    let accountIdx
    let addressIdx
    let changeIdx
    let childNode
    let data
    let ecPair
    let hushIndexes
    let ownedInputs
    let protocolId
    let msg
    let rawTx
    let redeemScript
    let script
    let wif

    /* Initialize transaction builde.r */
    const transactionBuilder = new bchjs.TransactionBuilder()

    /* Handle inputs. */
    _inputs.forEach(_input => {
        /* Add input. */
        transactionBuilder.addInput(_input.tx_hash, _input.tx_pos)
    })

    /* Set protocol ID. */
    protocolId = '1337'

    /* Set protocol message. */
    msg = 'finalization...'

    script = [
        utf8ToBin(protocolId),
        utf8ToBin(msg),
        // utf8ToBin(_sessionid),
    ]
    // console.log('my SCRIPT', script)
    // console.log('encodeNullData', encodeNullData(script))

    // Compile the script array into a bitcoin-compliant hex encoded string.
    // const data = bchjs.Script.encode(script)
    data = Buffer.from(encodeNullData(script))
    // console.log('OP_RETURN (data)', data)

    // Add the OP_RETURN output.
    transactionBuilder.addOutput(data, 0)

    /* Handle outputs. */
    _outputs.forEach(_output => {
        /* Add output. */
        transactionBuilder.addOutput(_output.address, _output.value)
    })



    /* Convert mnemonic to seed. */
    const seed = mnemonicToSeed(_mnemonic)

    /* Conver to seed buffer. */
    // FIXME Migrate to TypedArrays.
    const seedBuffer = Buffer.from(seed, 'hex')

    /* Generate master node. */
    const masterNode = bchjs.HDNode.fromSeed(seedBuffer)

// FIXME Identify our owned inputs.
ownedInputs = [ 0, 1, 2, 3, 4, 5, 6 ]
// hushIndexes = [ 0, 1, 2, 3, 4, 5, 6 ]
// 0 - L58m5XW3cYG84ZN5Cbqqap7Mvx1TihNNMPSq7Vw9W7t3oHeuS36q
// 1 - L2qsjy4xprtF2hocseepEtKM3V6y5hHjvkX5K7zedeBjmd6forbb
// 2 - L4FmiWogy4THbosEUHbfLgxgTQpZ1e4dFDrAoik2fvoQ9TNKCsRe
    for (let i = 0; i < _inputs.length; i++) {
        /* Verify input ownership. */
        if (!ownedInputs.includes(i)) {
            continue
        }

        /* Set account index. */
        // accountIdx = 0
        accountIdx = HUSH_PROTOCOL_ID
        /* Set change index. */
        changeIdx = 0
        /* Set address index. */
        // addressIdx = 0
        // addressIdx = hushIndexes[i]
        addressIdx = _inputs[i].address_idx
        console.log('ADDRESS IDX')

        /* Generate child node. */
        childNode = masterNode
            .derivePath(`m/44'/145'/${accountIdx}'/${changeIdx}/${addressIdx}`)

        /* Generate wallet import format (WIF). */
        wif = bchjs.HDNode.toWIF(childNode)
        // console.log('BCH WIF', i, wif)

        /* Generate elliptic pair. */
        ecPair = bchjs.ECPair.fromWIF(wif)
console.log('PARAMS', i, redeemScript, _inputs[i].value)
        /* Sign (our own) input. */
        transactionBuilder.sign(
            i,
            ecPair,
            redeemScript,
            Transaction.SIGHASH_ALL,
            _inputs[i].value,
        )
    }

    /* Generate (incomplete) transaction. */
    const tx = transactionBuilder.transaction.buildIncomplete()
    // console.log('TRANSACTION', tx)

    /* Convert to (raw) hex. */
    rawTx = tx.toHex()

    /* Return raw (hex) transaction. */
    return rawTx
}
