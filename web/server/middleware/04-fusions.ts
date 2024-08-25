/* Import modules. */

/* Initialize globals. */
let fusionsDb

/* Set constants. */
const CHECK_FUSIONS_INTERVAL = 5000

/**
 * Initialize (Fusions)
 *
 * Setup a Fusions (background) handler.
 */
const init = async () => {
        /* Manage Fusions */
    setInterval(() => {
        // console.log('Looking for DB(fusions) changes...', fusionsDb)

        /* Set Fusion snapshot. */
        const snapshot = JSON.stringify(fusionsDb)
        // console.log('SNAPSHOT', snapshot)

        /* Validate Fusion snapshot. */
        if (fusionsDb && snapshot !== lastSnapshot) {
            lastSnapshot = snapshot

            /* Initialize recents. */
            const recents = []

            /* Handle fusions. */
            Object.keys(fusionsDb).forEach(_fusionid => {
                /* Set fusion. */
                const fusion = fusionsDb[_fusionid]

                /* Validate last update. */
                if (typeof fusion.completedAt === 'undefined' && fusion.updatedAt > lastUpdate) {
                    /* Add fusion. */
                    recents.push(fusion)
                }
            })

            console.log('RECENTS', lastUpdate, recents)

            /* Handle recents. */
            // NOTE: Update last update handler.
            recents.forEach(_recent => {
                if (_recent.updatedAt > lastUpdate) {
                    /* Set (new) last update. */
                    lastUpdate = _recent.updatedAt
                }

                /* Validate fusion progress. */
                if (_recent.progress === 100.0) {
                    /* Build transaction. */
                    // rawTx = ...

// console.log('FOUND CHANGES??', snapshot)
// txObj.ins[1].script = txObj2.ins[1].script
// txObj.ins[2].script = txObj3.ins[2].script

                    /* Add to database. */
                    // fusionsDb.rawTx
                }
            })
            console.log('NEW LAST UPDATE', lastUpdate)
        }
    }, CHECK_FUSIONS_INTERVAL)
}
// init()

export default defineEventHandler((event) => {
    /* Set database. */
    const Db = event.context.Db

    /* Set fusions database. */
    fusionsDb = Db.fusions

    /* Inject wallet into server context. */
    event.context.Wallet = wallet
})
