/* Import modules. */
import BCHJS from '@psf/bch-js'
import { Transaction } from 'bitcoinjs-lib'
import { mnemonicToSeed } from '@nexajs/hdnode'
import { encodeNullData } from '@nexajs/script'
import { utf8ToBin } from '@nexajs/utils'

const bchjs = new BCHJS()

/**
 * Build Unsigned Transaction
 *
 * Combine all accounts inputs and outputs in one unsigned Tx.
 */
export default function (_sessionInputs, _sessionOutputs) {
    /* Initialize locals. */
    let rawTx
    let safeBalance
    let utxo

    try {
        safeBalance = _sessionInputs.reduce(
            (acc, utxo) => (utxo.value >= 10000) ? acc + utxo.value : 0, 0
        )
        console.log('SAFE BALANCE', safeBalance)
        const fee = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 })
        console.log('FEE', fee)

        const paymentAmount = safeBalance - fee

        const satsNeeded = fee + paymentAmount

        const receiver = 'bitcoincash:qq27zfgmy7hckrrxygjdz6rr847pjkzzyc6d0un4e4'
        console.log(`payment (+fee): ${satsNeeded}`)

        const transactionBuilder = new bchjs.TransactionBuilder()
let inputIdx
        this.fusionInputs.forEach((_utxo) => {
            /* Set UTXO. */
            utxo = _utxo
            console.log('UTXO', utxo)
inputIdx = 0//utxo.tx_pos
            transactionBuilder.addInput(utxo.tx_hash, utxo.tx_pos)

            const originalAmount = utxo.value

            const remainder = originalAmount - satsNeeded
            console.log('REMAINDER', remainder);

            if (remainder < 0) {
                throw new Error('Selected UTXO does not have enough satoshis')
            }


            const protocolId = '1337'
            const msg = 'building...'

            const script = [
                utf8ToBin(protocolId),
                utf8ToBin(msg),
            ]
            console.log('my SCRIPT', script)
            console.log('encodeNullData', encodeNullData(script))

            // Compile the script array into a bitcoin-compliant hex encoded string.
            // const data = bchjs.Script.encode(script)
            const data = Buffer.from(encodeNullData(script))
            console.log('OP_RETURN (data)', data)

            // Add the OP_RETURN output.
            // transactionBuilder.addOutput(data, 0)
            transactionBuilder.addOutput(data, 0)



            // Send payment
            // transactionBuilder.addOutput(receiver, satsNeeded)
            transactionBuilder.addOutput(receiver, paymentAmount)

            // Send the BCH change back to the payment part
            // transactionBuilder.addOutput(account.address, remainder - 300)
        })

        /* Initialize redeem script. */
        // FIXME Why do we need this??
        let redeemScript

        /* Convert mnemonic to seed. */
        const seed = mnemonicToSeed(this.mnemonic)

        /* Conver to seed buffer. */
        // FIXME Migrate to TypedArrays.
        const seedBuffer = Buffer.from(seed, 'hex')

        /* Generate master node. */
        const masterNode = bchjs.HDNode.fromSeed(seedBuffer)

/* Set account index. */
const accountIdx = 0
/* Set change index. */
const changeIdx = 0
/* Set address index. */
const addressIdx = 0

        /* Generate child node. */
        const chidleNode = masterNode
            .derivePath(`m/44'/145'/${accountIdx}'/${changeIdx}/${addressIdx}`)

        /* Generate wallet import format (WIF). */
        const wif = bchjs.HDNode.toWIF(chidleNode)
        // console.log('BCH WIF', wif)

        /* Generate elliptic pair. */
        const ecPair = bchjs.ECPair.fromWIF(wif)

        /* Sign transaction. */
        transactionBuilder.sign(
            inputIdx,
            ecPair,
            redeemScript,
            Transaction.SIGHASH_ALL,
            utxo.value,
        )

        /* Generate (incomplete) transaction. */
        const tx = transactionBuilder.transaction.buildIncomplete()
        // console.log('TRANSACTION', tx)

        /* Convert to (raw) hex. */
        rawTx = tx.toHex()
    } catch (err) {
        console.error(`Error in buildUnsignedTx(): ${err}`)
        throw err
    }

    /* Return raw (hex) transaction. */
    return rawTx
}
