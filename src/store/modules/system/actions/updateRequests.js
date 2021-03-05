/**
 * Update Requests
 */
const updateRequests = ({ commit }, _requests) => {
    // console.info('Updating requests...', _requests) // eslint-disable-line no-console

    /* Commit requests. */
    commit('setRequests', _requests)
}

/* Export module. */
export default updateRequests
