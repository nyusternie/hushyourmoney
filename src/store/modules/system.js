/* Import modules (getters). */
import getIpfs from './system/getters/getIpfs'

/* Import modules (actions). */
import initIpfs from './system/actions/initIpfs'

/* Import modules (mutations). */
import setIpfs from './system/mutations/setIpfs'

/* Initialize state. */
const state = {
    //
}

/* Getters. */
const getters = {
    getIpfs,
}

/* Actions. */
const actions = {
    initIpfs,
}

/* Mutations. */
const mutations = {
    setIpfs,
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
