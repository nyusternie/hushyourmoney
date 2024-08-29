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
import { v5 as uuidv5 } from 'uuid'

/* Set Hush (UUIDv5) Namespace */
// NOTE: Replace the 1st 4-bytes of the standard prefix with the
//       Hush Protocol ID (0x48555348).
// For reference:
//   - uuidv5.DNS 6ba7b810-9dad-11d1-80b4-00c04fd430c8
//   - uuidv5.URL 6ba7b811-9dad-11d1-80b4-00c04fd430c8
const HUSH_NAMESPACE = '48555348-9dad-11d1-80b4-00c04fd430c8'


export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let componentid
    let components
    let profile
    let response
    let unlocked

    /* Set database. */
    const Db = event.context.Db

    /* Set wallet. */
    const Wallet = event.context.Wallet

    /* Set (request) body. */
    const body = await readBody(event)
    // console.log('BODY', body)

    if (!body) {
        setResponseStatus(event, 401)

        return `Authorization FAILED!`
    }

    /* Set profile parameters. */
    const authid = body.authid
    // console.log('AUTH ID', authid)

    const actionid = body.actionid
    // console.log('ACTION ID', actionid)

    /* Validate components. */
    if (body.components) {
        components = body.components
        components = decryptForPubkey(binToHex(Wallet.privateKey), components)
        components = binToUtf8(components)
        components = JSON.parse(components)
        // console.log('COMPONENTS', components)
    }

    /* Validate unlocked. */
    if (body.unlocked) {
        unlocked = body.unlocked
        unlocked = decryptForPubkey(binToHex(Wallet.privateKey), unlocked)
        unlocked = binToUtf8(unlocked)
        unlocked = JSON.parse(unlocked)
        // console.log('UNLOCKED', unlocked)
    }

    /* Validate auth ID. */
    if (typeof authid === 'undefined' || authid === null) {
        setResponseStatus(event, 401)

        return 'Authorization failed!'
    }

console.log('DEBUG::INSERTING A NEW FUSION')
const fusion = Db.fusions['4e9654f9-3de9-4f9a-8169-3834f40847f5']
console.log('FUSION', fusion)

    /* Request session. */
    profile = Db.profiles[authid]
    console.log('PROFILE', profile)

    /* Validate profile id. */
    if (typeof profile === 'undefined' || profile === null) {
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

    if (profile) {
        fusion.guests[authid] = {
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt,
        }
    } else {
        setResponseStatus(event, 401)

        return 'Oops! Authorization failed!'
    }

    /* Handle component unlocking. */
    if (actionid === 'unlock-components') {
        /* Update progress. */
        // fusion.progress = 75.5

        /* Set (new) updated at (timestamp). */
        fusion.updatedAt = moment().unix()

        console.log('***UNLOCK COMPONENT(S)***', unlocked)

        const inputs = fusion.inputs
        console.log('INPUTS', inputs)

        /* Handle inputs. */
        for (let i = 0; i < Object.keys(inputs).length; i++) {
            const outpoint = Object.keys(inputs)[i]
            console.log('UNLOCKING OUTPOINT', outpoint)

            const input = inputs[outpoint]
            console.log('UNLOCKING INPUT', input)

// FIXME WE MUST VALIDATE THE OUTPOINT AUTH BEFORE UPDATING...
            if (unlocked && unlocked[outpoint] && unlocked[outpoint].unlocking) {
                /* Add unlocking script to input. */
                input.unlocking = unlocked[outpoint].unlocking
            }
        }
        console.log('UPDATED FUSION', fusion)

        return fusion
    }

    fusion.numGuests = Object.keys(fusion.guests).length

    /* Update progress. */
    fusion.progress = 12.5

    components.forEach(_component => {
        /* Validate inputs. */
        if (_component.tx_hash) {
            componentid = sha256(_component.tx_hash + ':' + _component.tx_pos)
            fusion.inputs[componentid] = {
                ..._component,
                unlocking: null,
            }
        }

        /* Validate outputs. */
        if (!_component.tx_hash) {
            componentid = sha256(_component.address + ':' + _component.value)
            fusion.outputs[componentid] = _component
        }
    })

    fusion.numInputs = Object.keys(fusion.inputs).length

    fusion.numOutputs = Object.keys(fusion.outputs).length

    /* Calculate session contents. */
    const sessionContents = JSON.stringify({ ...fusion.inputs, ...fusion.outputs })
    // console.log('SESSION CONTENTS', sessionContents)

    /* Calculate (UUIDv5) session hash. */
    const sessionHash = sha256(sessionContents)
    // console.log('SESSION HASH', sessionHash)

    /* Calculate session ID. */
    const sessionid = uuidv5(sessionHash, HUSH_NAMESPACE)
    // console.log('SESSION (uuid v5)', sessionid)

    /* Set session ID. */
    fusion.sessionid = sessionid

    /* Update progress. */
    fusion.progress = 75.5

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
