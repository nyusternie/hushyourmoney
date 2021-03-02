/**
 * Get IPFS
 */
const getIpfs = (state) => {
    /* Validate state. */
    if (!state || !state.ipfs) {
        return null
    }

    /* Return IPFS. */
    return state.ipfs
}

/* Export module. */
export default getIpfs
