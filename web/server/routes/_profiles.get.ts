export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let profiles

    /* Set database. */
    const Db = event.context.Db
    // console.log('DB', Db)

    /* Set profiles. */
    profiles = Db.profiles

    /* Validate profiles. */
    if (typeof profiles === 'undefined' || profiles === null) {
        profiles = {}
    }

    /* Return profiles. */
    return profiles
})
