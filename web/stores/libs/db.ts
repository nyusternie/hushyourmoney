/* Initialize locals. */
let fusionsDb
let profilesDb
let sessionsDb
let systemDb

/**
 * CashFusions Datastore
 */
fusionsDb = {}

/**
 * Profiles Datastore
 */
profilesDb = {}

/**
 * Sessions Datastore
 */
sessionsDb = {}

/**
 * System Datastore
 */
systemDb = {}

/**
 * Database
 *
 * A simple and effective data storage, designed to operate efficiently on
 * "ephemeral" hardware (e.g. Flux Cloud, DePIN, etc).
 */
export default {
    /* Getters */
    fusions: fusionsDb,
    profiles: profilesDb,
    sessions: sessionsDb,
    system: systemDb,

    /* Setters */
    put: async (_dbname, _key, _value) => {
        try {
            switch(_dbname) {
            case 'fusions':
                fusionsDb[_key] = _value
                break
            case 'profiles':
                profilesDb[_key] = _value
                break
            case 'sessions':
                sessionsDb[_key] = _value
                break
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
    },
}
