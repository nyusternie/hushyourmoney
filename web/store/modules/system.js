/* Import modules (getters). */
import getRequests from './system/getters/getRequests'

/* Import modules (actions). */
import updateRequests from './system/actions/updateRequests'

/* Import modules (mutations). */
import setRequests from './system/mutations/setRequests'

/* Initialize state. */
const state = {
    /**
     * Requests
     *
     * A collection of all requests made in the BUMP rooms.
     */
    requests: null,
}

/* Getters. */
const getters = {
    getRequests,
}

/* Actions. */
const actions = {
    updateRequests,
}

/* Mutations. */
const mutations = {
    setRequests,
}

/* Export. */
// NOTE: We DO NOT namespace here to allow for global use of `dispatch`.
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
