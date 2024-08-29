/* Import modules. */
import BCHJS from '@psf/bch-js'
import { Transaction } from 'bitcoinjs-lib'
import { mnemonicToSeed } from '@nexajs/hdnode'
import { encodeNullData } from '@nexajs/script'
import { utf8ToBin } from '@nexajs/utils'

/* Initialize BCHJS. */
const bchjs = new BCHJS()

/* Initialize constants. */
const HUSH_PROTOCOL_ID = 0x48555348


/**
 * Build Shared Transaction
 *
 * Combine all participating inputs and outputs into one (signed) transaction.
 */
export default function (_sessionid, _inputs, _outputs) {
console.log('SIGN SHARED TX', _sessionid, _inputs, _outputs)
    /* Initialize locals. */
    // let accountIdx
    // let addressIdx
    // let changeIdx
    // let childNode
    let data
    let ecPair
    // let ownedInputs
    let protocolId
    let msg
    // let rawTx
    let redeemScript
    let script
    let wif

    /* Initialize transaction builde.r */
    const transactionBuilder = new bchjs.TransactionBuilder()

console.log('DO WE HAVE FUSION INPUTS??', this.fusionInputs)

    /* Initialize our addresses. */
    const ourAddresses = []

    /* Handle fusion inputs. */
    Object.keys(this.fusionInputs).forEach(_outpoint => {
        const ourInput = this.fusionInputs[_outpoint]
        console.log('OUR INPUT', ourInput)

        ourAddresses.push(ourInput.address)
    })
    console.log('OUR ADDRESSES', ourAddresses)

    /* Initialize address index. */
    // addressIdx = 0

    /* Initialize owned inputs. */
    // ownedInputs = []

    /* Handle inputs. */
    _inputs.forEach(_input => {
        /* Add input. */
        transactionBuilder.addInput(_input.tx_hash, _input.tx_pos)

// console.log('VALIDATING (SELF) INPUT', _input)
//         /* Validate (our) address. */
//         if (ourAddresses.includes(_input.address)) {
//             ownedInputs.push(addressIdx)
//         }
//         addressIdx++
    })
    // console.log('OUR INPUTS INDEX', ownedInputs)

    /* Set protocol ID. */
    protocolId = '1337'

    /* Set protocol message. */
    msg = 'FINAL!'

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
    // const seed = mnemonicToSeed(_mnemonic)

    /* Conver to seed buffer. */
    // FIXME Migrate to TypedArrays.
    // const seedBuffer = Buffer.from(seed, 'hex')

    /* Generate master node. */
    // const masterNode = bchjs.HDNode.fromSeed(seedBuffer)

// FIXME Identify our owned inputs.
// ownedInputs = [ 0, 1, 2, 3, 4, 5, 6 ]

    for (let i = 0; i < _inputs.length; i++) {
        const input = _inputs[i]
        console.log('AN INPUT---', input)

        const address = input.address
        console.log('INPUT ADDR', address)
        /* Verify input ownership. */
        // if (!ownedInputs.includes(i)) {
        // if (typeof input.wif === 'undefined' || input.wif === null) {
        if (!ourAddresses.includes(address)) {
            continue
        }

        /* Set account index. */
        // accountIdx = 0
        // accountIdx = HUSH_PROTOCOL_ID
        /* Set change index. */
        // changeIdx = 0
        /* Set address index. */
        // addressIdx = _inputs[i].address_idx
        // console.log('ADDRESS IDX')

        /* Generate child node. */
        // childNode = masterNode
        //     .derivePath(`m/44'/145'/${accountIdx}'/${changeIdx}/${addressIdx}`)

        /* Generate wallet import format (WIF). */
        // wif = bchjs.HDNode.toWIF(childNode)

        /* Set WIF. */
        wif = this.getWifForAddress(address)
        console.log('BCH WIF', wif)

        /* Generate elliptic pair. */
        ecPair = bchjs.ECPair.fromWIF(wif)
console.log('SIGNING!', i, redeemScript, input.value)
        /* Sign (our own) input. */
        transactionBuilder.sign(
            i,
            ecPair,
            redeemScript,
            Transaction.SIGHASH_ALL,
            input.value,
        )
    }

    /* Generate (incomplete) transaction. */
    const transaction = transactionBuilder.transaction.buildIncomplete()
    // console.log('TRANSACTION', transaction)

    /* Convert to (raw) hex. */
    // rawTx = tx.toHex()

    /* Return raw (hex) transaction. */
    return transaction
}
