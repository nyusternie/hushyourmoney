/**
 * Get Master Seed
 */
const getMasterSeed = (state) => {
    /* Validate state. */
    if (!state || !state.masterSeed) {
        return null
    }

    /* Return master seed. */
    return state.masterSeed
}

/* Export module. */
export default getMasterSeed
