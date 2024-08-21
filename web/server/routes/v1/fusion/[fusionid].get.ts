export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let session

    /* Set database. */
    const Db = event.context.Db
    console.log('DB', Db)

    /* Set session. */
    const sessionid = event.context.params.sessionid
    console.log('SESSION ID', sessionid)

    /* Set session. */
    session = Db.sessions[sessionid]

    /* Validate session. */
    if (typeof session === 'undefined' || session === null) {
        setResponseStatus(event, 404)

        return `Sorry, session [ ${sessionid} ] COULD NOT be found.`
    }

    /* Return session. */
    return session
})
