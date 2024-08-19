export default defineEventHandler(async (event) => {
    /* Set slug. */
    const slug = event.context.params.slug

    const status = {}

    status.id = slug

    /* Return status. */
    return status
})
