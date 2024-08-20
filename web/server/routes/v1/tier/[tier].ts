export default defineEventHandler(async (event) => {
    /* Set tier. */
    const tier = event.context.params.tier

    /* Initialize status. */
    const status = {}

    /* Set (tier) ID. */
    status.id = tier

    /* Return status. */
    return status
})
