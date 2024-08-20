// import fs from 'fs'
import PouchDB from 'pouchdb'

/* Set data directory path. */
const dataDir = './data'

/* Verify directory exists. */
// if (!fs.existsSync(dataDir)) {
//     /* Create new directory (on local filesystem). */
//     fs.mkdirSync(dataDir)
//     console.info('The data directory [ ./data ] has been successfully created!')
// }

/* Initialize databases. */
const fusionsDb = new PouchDB('./data/fusions')
// // console.log('FUSIONS DB', fusionsDb)
const profilesDb = new PouchDB('./data/profiles')
const sessionsDb = new PouchDB('./data/sessions')
const systemDb = new PouchDB('./data/system')

// ;(async () => {
//     try {
//         const dbTest = await systemDb.allDocs()
//         console.log('SYSTEM DB TEST', dbTest)
//     } catch (err) {
//         console.error('OH NO! WE NEED TO CREATE A DATA DIRECTORY!!')
//     }
// })()

/**
 * Database Manager
 */
export default () => {
    return {
        // fusions: new PouchDB('./data/fusions'),
        // profiles: new PouchDB('./data/profiles'),
        // sessions: new PouchDB('./data/sessions'),
        // system: new PouchDB('./data/system'),
        fusions: fusionsDb,
        profiles: profilesDb,
        sessions: sessionsDb,
        system: systemDb,
    }
}
