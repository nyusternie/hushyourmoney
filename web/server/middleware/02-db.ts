/* Import modules. */
import moment from 'moment'

import initFusions from '../../handlers/initFusions.ts'

console.info('Initializing Ephemeral Database Manager...')

/* Initialize locals. */
let status

/* Initialize DB handlers. */
let fusionsDb
let profilesDb
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

        put('system', 'status', status)
            .catch(err => console.error(err))
    } else {
        /* Set status. */
        status = systemDb.status

        /* Update timestamp. */
        status.updatedAt = moment().unix()

        /* Save data to store. */
        put('system', 'status', status)
            .catch(err => console.error(err))
    }

    // console.log('SYSTEM (DB) STATUS', systemDb.status)
}

init()
initFusions(fusionsDb)

export default defineEventHandler((event) => {
    // console.log('Ephemeral Db Request: ' + getRequestURL(event))

    /* Inject database into server context. */
    event.context.Db = {
        /* Getters */
        fusions: fusionsDb,
        profiles: profilesDb,
        system: systemDb,

        /* Setters */
        put,
    }
})
