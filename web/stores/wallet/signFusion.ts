/* Import modules. */
import {
    encryptForPubkey,
    sha256,
} from '@nexajs/crypto'
import { binToHex } from '@nexajs/utils'

import signSharedTx from '../../handlers/signSharedTx.ts'

const DUST_VAL = 546

export default async function () {
    /* Initialize locals. */
    let blindComponents
    let clubWallet
    let inputs
    let keys
    let outpoint
    let outputs
    let publicKey
    // let rawTx
    let response
    let session
    let sessionid
    let transaction

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

        // let addressIdx = 0

        // /* Find address index for input. */
        // Object.keys(this.fusionInputs).forEach(_outpoint => {
        //     /* Set fusion input. */
        //     const fusionInput = this.fusionInputs[_outpoint]
        //     console.log('FUSION INPUT', fusionInput)

        //     if (fusionInput.address === input.address) {
        //         input.address_idx = addressIdx
        //         console.log('ADDED ADDRESS INDEX', addressIdx)
        //         // break
        //     }

        //     addressIdx++
        // })

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
    transaction = signSharedTx.bind(this)(
        sessionid, sortedInputs, sortedOutputs)
    console.log('(partially) SIGNED TRANSACTION', transaction)
    // txObj.ins[1].script = txObj2.ins[1].script

    /* Initailize unlocked. */
    let unlocked = {}

    transaction.ins.forEach(_input => {
console.log('INS (input)', _input)
        /* Validate (unlocking) script. */
        if (_input.script.length > 0) {
            outpoint = sha256(binToHex(_input.hash.reverse()) + ':' + _input.index)
            console.log('INS (outpoint)', outpoint)

            /* Add input. */
            unlocked[outpoint] = {
                tx_hash: binToHex(_input.hash.reverse()),
                unlocking: binToHex(_input.script),
            }
        }
    })
    console.log('UNLOCKED', unlocked)

    /* Prepare unlocked (inputs) for encryption. */
    unlocked = JSON.stringify(unlocked)
    // console.log('FUSION (unlocked)', unlocked)

    // TODO Handle any filtering required BEFORE submitting for fusion.

    clubWallet = await $fetch('/api/wallet')
        .catch(err => console.error(err))
    // console.log('CLUB WALLET', clubWallet)

    // FIXME Retrieve public key from a "public" endpoint.
    publicKey = clubWallet.publicKey
    // console.log('CLUB PUBLIC KEY', publicKey)

    /* Generate blind components. */
    blindComponents = encryptForPubkey(publicKey, unlocked)
    // console.log('BLINDED COMPONENTS', blindComponents)

    const body = {
        authid: binToHex(this.wallet.publicKey),
        actionid: 'unlock-components',
        unlocked: blindComponents,
    }
    // console.log('BODY', body)

    response = await $fetch('/v1', {
        method: 'POST',
        body,
    })
    .catch(err => console.error(err))
    console.log('RESPONSE', response)
}
