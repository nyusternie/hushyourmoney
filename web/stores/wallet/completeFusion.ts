/* Import modules. */
import { TransactionBuilder } from 'bitcoinjs-lib'
import { hexToBin } from '@nexajs/utils'

import buildSharedTx from '../../handlers/buildSharedTx.ts'

const DUST_VAL = 546

export default async function () {
    /* Initialize locals. */
    let input
    let inputs
    let keys
    let outputs
    let rawTx
    let response
    let script
    let session
    let sessionid
    let sortedInputs
    let sortedOutputs
    let transaction
    let transactionBuilder

    // FIXME Where do we get the session ID from??
    sessionid = '4fa84224-be56-49ba-830a-fa3b6774eb01'

    /* Request session details. */
    session = await $fetch(`/v1/fusion/${sessionid}`)
        .catch(err => console.error(err))
    console.log('SESSION', session)

    /* Set inputs. */
    inputs = session.inputs
    console.log('INPUTS', inputs)

    /* Initialize keys. */
    keys = []

    /* Handle (input) keys. */
    Object.keys(inputs).forEach(_outpoint => {
        keys.push(_outpoint)
    })
    // console.log('KEYS', keys)

    /* Sort (input) keys. */
    keys.sort()
    // console.log('KEYS (sorted)', keys)

    /* Initialize sorted inputs. */
    sortedInputs = []

    /* Handle (input) keys. */
    keys.forEach(_keyid => {
        /* Set input. */
        const input = inputs[_keyid]
        console.log('HANDLE INPUT', input)

        /* Find address index for input. */
        // for (let i = 0; i < this.fusionInputs.length; i++) {
        //     if (this.fusionInputs[i].address === input.address) {
        //         input.address_idx = i
        //         console.log('ADDRESS INDEX', i)
        //         break
        //     }
        // }

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
    sortedOutputs = []

    /* Handle (output) keys. */
    keys.forEach(_keyid => {
        if (outputs[_keyid].value >= DUST_VAL) {
            /* Add input. */
            sortedOutputs.push(outputs[_keyid])
        }
    })
    // console.log('OUTPUTS (sorted)', sortedOutputs)

    /* Sign shared transaction. */
    transactionBuilder = buildSharedTx.bind(this)(
        sessionid, sortedInputs, sortedOutputs)
// transactionBuilder.transaction.tx.ins[0].script = script
    console.log('FINALIZED TRANSACTION', transactionBuilder)

// console.log('UNLOCKING', inputs['185ad6a10ea70d977d943a910f54dc446163a16771017c6df35c7893c1db0c35'])


    transaction = transactionBuilder.transaction.buildIncomplete()
    // const transaction = transactionBuilder.transaction
    console.log('TRANSACTION', transaction)

// const scripts = []
    /* Handle (sorted) inputs. */
    for (let i = 0; i < sortedInputs.length; i++) {
        /* Set input. */
        input = sortedInputs[i]
        console.log('UNLOCKING SCRIPT INPUT', input)

        /* Set script. */
        script = Buffer.from(input.unlocking, 'hex')

        /* Add unlocking script to input. */
        transaction.ins[i].script = script
    }
    console.log('TRANSACTION (hex)', transaction.toHex())
// Object.keys(inputs).forEach(_outpoint => {
//     // scripts.push({
//     //     id: _outpoint,
//     //     script: Buffer.from(input.unlocking, 'hex')
//     // })
// })
// console.log('SCRIPTS', scripts)
// const script = Buffer.from(hexToBin(inputs['185ad6a10ea70d977d943a910f54dc446163a16771017c6df35c7893c1db0c35'].unlocking))
// console.log('SCRIPT', script)
    // transaction.ins[0].script = script


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
