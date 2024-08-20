/* Import modules. */
import fs from 'fs'
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Set data directory path. */
const dataDir = './data'

/* Verify directory exists. */
if (!fs.existsSync(dataDir)) {
    /* Create new directory (on local filesystem). */
    fs.mkdirSync(dataDir)
    console.info('The data directory [ ./data ] has been successfully created!')
}

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
