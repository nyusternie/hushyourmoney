/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const profilesDb = new PouchDB('./data/profiles')
const sessionsDb = new PouchDB('./data/sessions')

export default defineEventHandler(async (event) => {
    /* Set session. */
    const sessionid = event.context.params.sessionid
    console.log('SESSION ID', sessionid)

    // FIXME Validate session id.

    const response = await sessionsDb
        .get(sessionid)
        .catch(err => console.error(err))
    console.log('RESPONSE', response)

    /* Initialize status. */
    const status = {}

    /* Set (session) ID. */
    status.id = sessionid

    /* Return status. */
    return status
})
