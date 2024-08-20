export default defineEventHandler(async (event) => {
    /* Set database. */
    const Db = event.context.Db

    /* Validate profiles. */
    if (typeof Db.profiles === 'undefined' || !Db.profiles) {
        return 'Profiles fail!'
    }

    /* Return (database) profiles. */
    return Db.profiles
})
