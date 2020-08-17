/* Import modules (getters). */
import getAccounts from './wallet/getters/getAccounts'
import getAddress from './wallet/getters/getAddress'
import getBalance from './wallet/getters/getBalance'
import getChangeAddress from './wallet/getters/getChangeAddress'
// import getCoinById from './wallet/getters/getCoinById'
import getCoins from './wallet/getters/getCoins'
import getDerivationPath from './wallet/getters/getDerivationPath'
import getDustAmount from './wallet/getters/getDustAmount'
import getHDNode from './wallet/getters/getHDNode'
import getHistory from './wallet/getters/getHistory'
import getIndicies from './wallet/getters/getIndicies'
import getMasterSeed from './wallet/getters/getMasterSeed'
import getMnemonic from './wallet/getters/getMnemonic'

/* Import modules (actions). */
import addCoin from './wallet/actions/addCoin'
import destroyWallet from './wallet/actions/destroyWallet'
import initWallet from './wallet/actions/initWallet'
import updateCoin from './wallet/actions/updateCoin'
import updateCoins from './wallet/actions/updateCoins'
import updateMasterSeed from './wallet/actions/updateMasterSeed'
import updateOutbox from './wallet/actions/updateOutbox'

/* Import modules (mutations). */
import setCoins from './wallet/mutations/setCoins'
import setEmptyWallet from './wallet/mutations/setEmptyWallet'
import setIndicies from './wallet/mutations/setIndicies'
import setMasterSeed from './wallet/mutations/setMasterSeed'

/* Initialize state. */
const state = {
    /**
     * Coins
     *
     * Manages coin info in an object:
     *   - status [ active | disabled | locked ]
     *   - txid
     *   - vout
     *   - satoshis
     *   - wif
     *   - cashAddress
     *   - legacyAddress
     */
    coins: null,

    /**
     * Inbox
     *
     * Requests waiting to be processed by the wallet.
     */
    inbox: null,

    /**
     * (Account) Indices
     *
     * Manages the indices of account addresses.
     */
    indices: null,

    /**
     * Master Seed
     *
     * A 32-byte seed, generated from the hash of a user-provided image.
     */
    masterSeed: null,

    /**
     * Metadata
     *
     * Used to store (user-defined) data for individual coins.
     */
    meta: null,

    /**
     * Outbox
     *
     * Coins waiting to be sent out from the wallet.
     */
    outbox: null,
}

/* Getters. */
const getters = {
    getAccounts,
    getAddress,
    getBalance,
    getChangeAddress,
    getCoins,
    getDerivationPath,
    getDustAmount,
    getHDNode,
    getHistory,
    getIndicies,
    getMasterSeed,
    getMnemonic,
}

/* Actions. */
const actions = {
    addCoin,
    destroyWallet,
    initWallet,
    updateCoin,
    updateCoins,
    updateMasterSeed,
    updateOutbox,
}

/* Mutations. */
const mutations = {
    setCoins,
    setEmptyWallet,
    setIndicies,
    setMasterSeed,
}

/* Export. */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
