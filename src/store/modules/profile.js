/* Import modules (getters). */
import getDataUrl from './profile/getters/getDataUrl'

/* Import modules (actions). */
import updateDataUrl from './profile/actions/updateDataUrl'

/* Import modules (mutations). */
import setDataUrl from './profile/mutations/setDataUrl'

/* Initialize state. */
const state = {
    /**
     * Data URL
     *
     * Used to generate the master seed for the wallet.
     */
    dataUrl: null,
}

/* Getters. */
const getters = {
    getDataUrl,
}

/* Actions. */
const actions = {
    updateDataUrl,
}

/* Mutations. */
const mutations = {
    setDataUrl,
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
