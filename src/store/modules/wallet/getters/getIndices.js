/**
 * Get Indices
 */
const getIndices = (state) => {
    /* Validate state. */
    if (!state || !state.indices) {
        return null
    }

    /* Initialize indices. */
    // NOTE: Deep cloned to prevent mutation and preserve reactivity.
    const indices = JSON.parse(JSON.stringify(state.indices))

    /* Return indices. */
    return indices
}

/* Export module. */
export default getIndices
