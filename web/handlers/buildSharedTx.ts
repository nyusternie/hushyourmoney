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
export default function (_sessionid, _inputs, _outputs) {
console.log('BUILD SHARED TX', _sessionid, _inputs, _outputs)
    /* Initialize locals. */
    let accountIdx
    let addressIdx
    let changeIdx
    let childNode
    let data
    let ecPair
    // let ownedInputs
    let protocolId
    let msg
    let rawTx
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
    protocolId = 'HUSH'

    /* Set protocol message. */
    msg = '4fa84224-be56-49ba-830a-fa3b6774eb01'

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

    /* Generate (incomplete) transaction. */
    const transaction = transactionBuilder.transaction.buildIncomplete()
    console.log('TRANSACTION', transaction)

    /* Return raw (hex) transaction. */
    // return transaction
    return transactionBuilder
}
