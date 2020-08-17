/**
 * Get Indicies
 */
const getIndicies = (state) => {
    /* Validate state. */
    if (!state || !state.indicies) {
        return null
    }

    /* Initialize indicies. */
    const indicies = state.indicies

    /* Return indicies. */
    return indicies
}

/* Export module. */
export default getIndicies
