/**
 * Get Data URL
 */
const getDataUrl = (state) => {
    /* Validate state. */
    if (!state || !state.dataUrl) {
        return null
    }

    /* Return data URL. */
    return state.dataUrl
}

/* Export module. */
export default getDataUrl
