export default defineEventHandler(async (event) => {
    /* Set database. */
    const Db = event.context.Db

    /* Validate system. */
    if (typeof Db.system === 'undefined' || !Db.system) {
        return 'System fail!'
    }

    /* Return (database) system. */
    return Db.system
})
