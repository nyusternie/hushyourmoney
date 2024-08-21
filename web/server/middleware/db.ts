/* Import modules. */
import moment from 'moment'

import initFusions from '../../handlers/initFusions.ts'

console.info('Initializing Ephemeral Database Manager...')

/* Initialize locals. */
let response
let status

/* Initialize DB handlers. */
let fusionsDb
let profilesDb
// let sessionsDb
let systemDb

/**
 * CashFusions Datastore
 *
 * An collection of fusion details.
 */
fusionsDb = {}

/**
 * Profiles Datastore
 *
 * An collection of profiles (public keys).
 */
profilesDb = {}

/**
 * Sessions Datastore
 *
 * An collection of sessions.
 */
// sessionsDb = {}

/**
 * System Datastore
 *
 * A system management object.
 */
systemDb = {}

/**
 * Put (Data)
 */
const put = async (_dbname, _key, _value) => {
    try {
        switch(_dbname) {
        case 'fusions':
            fusionsDb[_key] = _value
            break
        case 'profiles':
            profilesDb[_key] = _value
            break
        // case 'sessions':
        //     sessionsDb[_key] = _value
        //     break
        case 'system':
            systemDb[_key] = _value
            break
        }
    } catch (err) {
        console.error(err)
        return err
    }

    /* Return status. */
    return `[ ${_dbname} ] data saved successfully!`
}

/**
 * Initialize
 */
const init = async () => {
    /* Validate (initial) data. */
    if (Object.keys(systemDb).length === 0) {
        status = {
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        },

        response = await put('system', 'status', status)
            .catch(err => console.error(err))
        // console.log('RESPONSE (system)', response)
    } else {
        /* Set status. */
        status = systemDb.status

        /* Update timestamp. */
        status.updatedAt = moment().unix()

        /* Save data to store. */
        response = await put('system', 'status', status)
            .catch(err => console.error(err))
        // console.log('RESPONSE (status)', response)
    }

    // console.log('SYSTEM (DB) STATUS', systemDb.status)
}

init()
initFusions(fusionsDb)

export default defineEventHandler((event) => {
    // console.log('Ephemeral Db Request: ' + getRequestURL(event))

    event.context.Db = {
        /* Getters */
        fusions: fusionsDb,
        profiles: profilesDb,
        // sessions: sessionsDb,
        system: systemDb,

        /* Setters */
        put,
    }
})
