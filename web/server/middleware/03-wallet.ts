/* Import modules. */
import { Wallet } from '@nexajs/wallet'

/* Initialize globals. */
let fusionsDb
let wallet

/* Set constants. */
const CHECK_FUSIONS_INTERVAL = 5000

/**
 * Initialize (Wallet)
 *
 * Setup an "ephemeral" wallet for the use of this Club Session.
 */
const init = async () => {
    wallet = await Wallet.init()
        .catch(err => console.error(err))
    // console.log('WALLET INIT', wallet)

    let lastUpdate = 0
    let lastSnapshot

    /* Manage Fusions */
    setInterval(() => {
        // console.log('Looking for DB(fusions) changes...', fusionsDb)

        /* Set Fusion snapshot. */
        const snapshot = JSON.stringify(fusionsDb)
        // console.log('SNAPSHOT', snapshot)

        /* Validate Fusion snapshot. */
        if (fusionsDb && snapshot !== lastSnapshot) {
            lastSnapshot = snapshot

            // console.log('FOUND CHANGES??', snapshot)

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
            })
            console.log('NEW LAST UPDATE', lastUpdate)
        }
    }, CHECK_FUSIONS_INTERVAL)

}
init()

export default defineEventHandler((event) => {
    /* Set database. */
    const Db = event.context.Db
    // console.log('DB', Db)

    /* Set fusions database. */
    fusionsDb = Db.fusions

    /* Inject wallet into server context. */
    event.context.Wallet = wallet
})
