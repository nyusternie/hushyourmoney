/* Import modules. */
import moment from 'moment'

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let response
    let status

    /* Set database. */
    const Db = event.context.Db

    /* Validate system. */
    if (typeof Db.system === 'undefined' || !Db.system) {
        return 'System fail!'
    }

    /* Return (database) system. */
    return Db.system
})
