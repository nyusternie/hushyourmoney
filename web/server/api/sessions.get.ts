export default defineEventHandler(async (event) => {
    /* Set database. */
    const Db = event.context.Db

    /* Validate sessions. */
    if (typeof Db.sessions === 'undefined' || !Db.sessions) {
        return 'Profiles fail!'
    }

    /* Return (database) sessions. */
    return Db.sessions
})
