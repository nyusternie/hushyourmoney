/**
 * Get Requests
 */
const getRequests = (state) => {
    /* Validate state. */
    if (!state || !state.requests) {
        return null
    }

    /* Return requests. */
    return state.requests
}

/* Export module. */
export default getRequests
