/* Import modules. */
import signSharedTx from '../../handlers/signSharedTx.ts'

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
        /* Add input. */
        sortedInputs.push(inputs[_keyid])
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
    rawTx = signSharedTx(
        sessionid, this.mnemonic, sortedInputs, sortedOutputs)
    console.log('RAW TX', rawTx)

    response = await this.broadcast('BCH', rawTx)
        .catch(err => console.error(err))
    console.log('BROADCAST (response)', response)
}
