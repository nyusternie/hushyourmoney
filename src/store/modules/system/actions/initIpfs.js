/**
 * Initialize IPFS
 */
const initIpfs = ({ commit }, _ipfs) => {
    console.info('Initializing IPFS...', _ipfs) // eslint-disable-line no-console

    /* Commit IPFS. */
    commit('setIpfs', _ipfs)
}

/* Export module. */
export default initIpfs
