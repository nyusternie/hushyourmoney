/* Initialize globals. */
let fusionsDb

export default defineEventHandler(async (event) => {
    /* Set database. */
    const Db = event.context.Db
    // console.log('DB', Db)

    /* Setup (global) Fusions database. */
    // NOTE: THIS SETUP REQUIRES LOADING `_fusions` ENDPOINT.
    fusionsDb = Db.fusions
    // console.info('Setting up (global) Fusions database...')

    // TODO Filter any "extra" details (to save bandwidth).

    /* Return fusions list. */
    return fusionsDb
})
