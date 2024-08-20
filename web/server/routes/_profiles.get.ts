export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let profiles

    /* Set database. */
    const Db = event.context.Db

    profiles = Db.profiles
    console.log('PROFILES', profiles)

    /* Validate profiles. */
    if (typeof profiles === 'undefined' || !profiles) {
        profiles = []
    }

    /* Return profiles. */
    return profiles
})
