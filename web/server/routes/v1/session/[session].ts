export default defineEventHandler(async (event) => {
    /* Set session. */
    const session = event.context.params.session

    /* Initialize status. */
    const status = {}

    /* Set (session) ID. */
    status.id = session

    /* Return status. */
    return status
})
