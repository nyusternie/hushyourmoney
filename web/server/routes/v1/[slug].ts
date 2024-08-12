export default defineEventHandler(async (event) => {
    /* Set slug. */
    const slug = event.context.params.slug

    /* Return slug. */
    return 'You are looking for -> ' + slug
})
