/* Import (core) modules. */
import Vue from 'vue'
import Vuex from 'vuex'

/* Import (local) modules. */
import profile from './modules/profile'
import utils from './modules/utils'
import wallet from './modules/wallet'

/* Initialize Vuex. */
Vue.use(Vuex)

/* Set modules. */
const modules = {
    profile,
    utils,
    wallet,
}

/* Set strict. */
const strict = process.env.NODE_ENV !== 'production'

/* Export store. */
export default new Vuex.Store({
    modules,
    strict,
})
