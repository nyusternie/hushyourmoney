/* Import modules. */
import moment from 'moment'
import {
    decryptForPubkey,
    sha256,
 } from '@nexajs/crypto'
import {
    binToHex,
    binToUtf8,
} from '@nexajs/utils'

// import { useProfileStore } from '@/stores/profile'

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let components
    let params
    let profile
    let response
    let session
    let success

    /* Set database. */
    const Db = event.context.Db

    /* Set wallet. */
    const Wallet = event.context.Wallet

    /* Set (request) body. */
    const body = await readBody(event)
    console.log('BODY', body)

    if (!body) {
        return `Authorization FAILED!`
    }

    /* Set profile parameters. */
    const authid = body.authid
    // console.log('AUTH ID', authid)

    const actionid = body.actionid
    // console.log('ACTION ID', actionid)

    // const sessionid = body.sessionid
    // console.log('SESSION ID', sessionid)

    // const rawTx = body.rawTx
    // console.log('RAW TRANSACTION', rawTx)

    components = body.components
    components = decryptForPubkey(binToHex(Wallet.privateKey), components)
    components = binToUtf8(components)
    components = JSON.parse(components)
    console.log('COMPONENTS', components)

    /* Validate auth ID. */
    if (typeof authid === 'undefined' || authid === null) {
        setResponseStatus(event, 401)

        return 'Authorization failed!'
    }

    /* Request session. */
    profile = Db.profiles[authid]
    // console.log('PROFILE', profile)

    /* Validate profile id. */
    if (typeof profile === 'undefined' || profile === null) {
        /* Set status code. */
        // setResponseStatus(event, 404)

        // return 'Oops! Something went wrong..'

        /* Build profile. */
        profile = {
            _id: authid,
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        }

        /* Request session. */
        response = await Db.put('profiles', authid, profile)
            .catch(err => console.error(err))
        // console.log('SAVE NEW PROFILE', response)
    } else {
        /* Build profile package. */
        profile.updatedAt = moment().unix()

        /* Request session. */
        response = await Db.put('profiles', authid, profile)
            .catch(err => console.error(err))
        // console.log('UPDATE PROFILE', response)
    }

console.log('DEBUG::INSERTING A NEW FUSION')
const fusion = Db.fusions['4e9654f9-3de9-4f9a-8169-3834f40847f5']
console.log('FUSION', fusion)

    let componentid

    components.forEach(_component => {
        /* Validate inputs. */
        if (_component.tx_hash) {
            componentid = sha256(_component.tx_hash + ':' + _component.tx_pos)
            fusion.inputs[componentid] = {
                ..._component,
                signature: null,
            }
        }

        /* Validate outputs. */
        if (!_component.tx_hash) {
            componentid = sha256(_component.address + ':' + _component.value)
            fusion.outputs[componentid] = _component
        }
    })

    /* Update progress. */
    fusion.progress = 12.5

    /* Set (new) updated at (timestamp). */
    fusion.updatedAt = moment().unix()

    await Db.put('fusions', '4e9654f9-3de9-4f9a-8169-3834f40847f5', fusion)

    /* Build (response) package. */
    const pkg = {
        id: profile._id,
        components,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
    }
    // console.log('PKG', pkg)

    /* Return pkg. */
    return pkg
})
