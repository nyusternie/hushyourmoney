/* Import modules. */
import fs from 'fs'
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

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let profiles

    profiles = await profilesDb
        .allDocs({
            include_docs: true,
        })
        .catch(err => console.error(err))
    // console.log('PROFILES', profiles)

    /* Validate profiles. */
    if (typeof profiles === 'undefined' || !profiles) {
        profiles = []
    } else {
        profiles = profiles.rows.map(_profile => {
            return {
                id: _profile.doc._id,
                createdAt: _profile.doc.createdAt,
                updatedAt: _profile.doc.updatedAt,
            }
        })
    }

    /* Return profiles. */
    return profiles
})
