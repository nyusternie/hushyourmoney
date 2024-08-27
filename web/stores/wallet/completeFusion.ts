/* Import modules. */
import { TransactionBuilder } from 'bitcoinjs-lib'
import { hexToBin } from '@nexajs/utils'

import buildSharedTx from '../../handlers/buildSharedTx.ts'

const DUST_VAL = 546

export default async function () {
    /* Initialize locals. */
    let inputs
    let keys
    let outputs
    let rawTx
    let response
    let session
    let sessionid

    // FIXME Where do we get the session ID from??
    sessionid = '4e9654f9-3de9-4f9a-8169-3834f40847f5'

    /* Request session details. */
    session = await $fetch(`http://localhost:39159/v1/fusion/${sessionid}`)
        .catch(err => console.error(err))
    console.log('SESSION', session)

    /* Set inputs. */
    inputs = session.inputs
    // console.log('INPUTS', inputs)

    /* Initialize keys. */
    keys = []

    /* Handle (input) keys. */
    Object.keys(inputs).forEach(_inputid => {
        keys.push(_inputid)
    })
    // console.log('KEYS', keys)

    /* Sort (input) keys. */
    keys.sort()
    // console.log('KEYS (sorted)', keys)

    /* Initialize sorted inputs. */
    const sortedInputs = []

    /* Handle (input) keys. */
    keys.forEach(_keyid => {
        /* Set input. */
        const input = inputs[_keyid]
        console.log('HANDLE INPUT', input)

        /* Find address index for input. */
        for (let i = 0; i < this.fusionInputs.length; i++) {
            if (this.fusionInputs[i].address === input.address) {
                input.address_idx = i
                console.log('ADDRESS INDEX', i)
                break
            }
        }

        /* Add input. */
        sortedInputs.push(input)
    })
    // console.log('INPUTS (sorted)', sortedInputs)

    outputs = session.outputs
    // console.log('OUTPUTS', outputs)

    /* Initialize (output) keys. */
    keys = []

    /* Handle keys. */
    Object.keys(outputs).forEach(_outputid => {
        keys.push(_outputid)
    })
    // console.log('KEYS', keys)

    /* Sort (output) keys. */
    keys.sort()
    // console.log('KEYS (sorted)', keys)

    /* Initialize sorted outputs. */
    const sortedOutputs = []

    /* Handle (output) keys. */
    keys.forEach(_keyid => {
        if (outputs[_keyid].value >= DUST_VAL) {
            /* Add input. */
            sortedOutputs.push(outputs[_keyid])
        }
    })
    // console.log('OUTPUTS (sorted)', sortedOutputs)

    /* Sign shared transaction. */
    const transactionBuilder = buildSharedTx.bind(this)(
        sessionid, sortedInputs, sortedOutputs)

const script = Buffer.from(hexToBin(inputs['185ad6a10ea70d977d943a910f54dc446163a16771017c6df35c7893c1db0c35'].unlocking))
console.log('SCRIPT', script)
// transactionBuilder.transaction.tx.ins[0].script = script
    console.log('FINALIZED TRANSACTION', transactionBuilder)

// console.log('UNLOCKING', inputs['185ad6a10ea70d977d943a910f54dc446163a16771017c6df35c7893c1db0c35'])


    const transaction = transactionBuilder.transaction.buildIncomplete()
    // const transaction = transactionBuilder.transaction
    console.log('TRANSACTION', transaction)
    transaction.ins[0].script = script
    console.log('TRANSACTION (hex)', transaction.toHex())

    // transaction.ins[0].script = Buffer.from(hexToBin(inputs['185ad6a10ea70d977d943a910f54dc446163a16771017c6df35c7893c1db0c35'].unlocking))

    // const transaction2 = transactionBuilder.transaction.build()

    // const transactionBuilder2 = TransactionBuilder.fromTransaction(
    //     transaction,
    //     'mainnet'
    //   )
    // console.log('TX BUILDER-2', transactionBuilder2)

      // build tx
    //   const tx = transactionBuilder2.build()
    //   const tx = transactionBuilder2.transaction.buildIncomplete()
    //   console.log('TX BUILDER 2', tx)
    //   // output rawhex
    //   const txHex = tx.toHex()
    //   console.log('TX HEX', txHex)

    /* Convert to (raw) hex. */
    // rawTx = tx.toHex()

    response = await this.broadcast('BCH', transaction.toHex())
        .catch(err => console.error(err))
    console.log('BROADCAST (response)', response)
}


    // // Overwrite the tx inputs of the first partially-signed TX with the signed
    // // inputs from the other two transactions.
    // txObj.ins[1].script = txObj2.ins[1].script
    // txObj.ins[2].script = txObj3.ins[2].script

    // // console.log(`Fully-signed txObj.ins: ${JSON.stringify(txObj.ins, null, 2)}`)

    // // Port the transaction object into the TransactionBuilder.
    // const transactionBuilder = Bitcoin.TransactionBuilder.fromTransaction(
    //   txObj,
    //   'mainnet'
    // )

    // // build tx
    // const tx = transactionBuilder.build()
    // // output rawhex
    // const txHex = tx.toHex()
