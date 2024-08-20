export default defineEventHandler(async (event) => {
    /* Set database. */
    const Db = event.context.Db

    /* Validate fusions. */
    if (typeof Db.fusions === 'undefined' || !Db.fusions) {
        return 'Profiles fail!'
    }

    /* Return (database) fusions. */
    return Db.fusions
})
