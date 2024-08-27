/* Import modules. */
import { defineStore } from 'pinia'
import moment from 'moment'

import BCHJS from '@psf/bch-js'
import { sha256 } from '@nexajs/crypto'
import { mnemonicToEntropy } from '@nexajs/hdnode'
import { Wallet } from '@nexajs/wallet'

import _broadcast from './wallet/broadcast.ts'
import _completeFusion from './wallet/completeFusion.ts'
import _getWifForAddress from './wallet/getWifForAddress.ts'
import _setEntropy from './wallet/setEntropy.ts'
import _setupKeychain from './wallet/setupKeychain.ts'
import _setupHushKeychain from './wallet/setupHushKeychain.ts'
import _signFusion from './wallet/signFusion.ts'
import _startFusion from './wallet/startFusion.ts'

/* Initialize constants. */
const HUSH_PROTOCOL_ID = 0x48555348

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v5/'

// Instantiate bch-js based on the network.
const bchjs = new BCHJS({
    restURL: BCHN_MAINNET,
})

/* Set constants. */
// const UPDATE_UTXOS_INTERVAL = 8000 // Allows for ~7 (REST) requests per minute.
const UPDATE_UTXOS_INTERVAL = 15000 // Allows for ~8 (Double REST) requests per minute.


/**
 * Wallet Store
 */
export const useWalletStore = defineStore('wallet', {
    state: () => ({
        /**
         * Entropy
         * (DEPRECATED -- MUST REMAIN SUPPORTED INDEFINITELY)
         *
         * Initialize entropy (used for HD wallet).
         *
         * NOTE: This is a cryptographically-secure "random"
         * 32-byte (256-bit) value.
         */
        _entropy: null,

        /**
         * Keychain
         *
         * Manages a collection of BIP-32 wallets.
         *
         * [
         *   {
         *     id        : '5be2e5c3-9d27-4b0f-bb3c-8b2ef6fdaafd',
         *     type      : 'studio',
         *     title     : `My Studio Wallet`,
         *     entropy   : 0x0000000000000000000000000000000000000000000000000000000000000000,
         *     createdAt : 0123456789,
         *     updatedAt : 1234567890,
         *   },
         *   {
         *     id        : 'f2457985-4b92-4025-be8d-5f11a5fc4077',
         *     type      : 'ledger',
         *     title     : `My Ledger Wallet`,
         *     createdAt : 0123456789,
         *     updatedAt : 1234567890,
         *   },
         * ]
         */
        _keychain: null,

        /**
         * Unspent Transaction Outputs (UTXOs)
         *
         * A dedicated handler for ALL network UTXOs.
         */
        _utxos: null,

        /**
         * Wallet
         *
         * Currently active wallet object.
         */
        _wallet: null,
    }),

    getters: {
        /* Return NexaJS wallet instance. */
        wallet(_state) {
            return _state._wallet
        },

        /* Return wallet status. */
        isReady(_state) {
            return _state.wallet?.isReady
        },

        /* Return wallet status. */
        address(_state) {
            return _state.wallet?.address
        },

        /* Return wallet status. */
        assets(_state) {
            return _state.wallet?.assets
        },

        /* Return wallet status. */
        balances(_state) {
            // FIXME: Update library to expose data OR
            //        refactor to `markets`.
            return _state.wallet?._balances
        },

        /* Return keychain. */
        keychain(_state) {
            return _state._keychain
        },

        /* Return mnemonic. */
        mnemonic(_state) {
            if (!_state._wallet) {
                return null
            }

            return _state._wallet._mnemonic
        },

        /* Return UTXOs. */
        utxos(_state) {
            if (!_state._wallet) {
                return null
            }

            return _state._utxos
        },

        /* Return UTXOs. */
        fusionInputs(_state) {
            if (!_state._wallet) {
                return null
            }

            // const collection = _state._utxos
            console.log('STATE (utxos)', _state._utxos)

            /* Initialize inputs (collection). */
            let inputs = {}

            /* Verify Main chain. */
            if (_state._utxos[0]) {
                inputs = { ...inputs, ..._state._utxos[0] }
            }

            /* Verify Hush chain. */
            if (_state._utxos[HUSH_PROTOCOL_ID]) {
                inputs = { ...inputs, ..._state._utxos[HUSH_PROTOCOL_ID] }
            }
            console.log('FUSION (inputs)', inputs)

            /* Return inputs. */
            return inputs
        },

        fusionAddrs() {
            return this._keychain[HUSH_PROTOCOL_ID]
        },

        /* Return wif. */
        wif(_state) {
            if (!_state._wallet) {
                return null
            }

            return _state._wallet.wif
        },
    },

    actions: {
        /**
         * Initialize
         *
         * Setup the wallet store.
         *   1. Retrieve the saved entropy.
         *   2. Initialize a Wallet instance.
         *   3. Load assets.
         */
        async init() {
            console.info('Initializing wallet...')

            if (this._entropy === null) {
                this._wallet = 'NEW' // FIXME TEMP NEW WALLET FLAG
                // throw new Error('Missing wallet entropy.')
                return console.error('Missing wallet entropy.')
            }

            /* Validate keychain. */
            if (this._keychain === null) {
                this._keychain = {
                    0: {}, // NEXA chain
                    0x48555348: {}, // HUSH chain (1_213_551_432)
                }
                console.log('Keychain initialized successfully!', this._keychain)

                /* Set keychain. */
                _setupKeychain.bind(this)()

                /* Set Hush keychian. */
                _setupHushKeychain.bind(this)()
            }
// FOR DEV PURPOSES ONLY
_setupKeychain.bind(this)()
_setupHushKeychain.bind(this)()

            /* Request a wallet instance (by mnemonic). */
            this._wallet = await Wallet.init(this._entropy, true)
            console.info('(Initialized) wallet', this.wallet)

            // this._assets = { ...this.wallet.assets } // cloned assets

            /* Set (default) asset. */
            this.wallet.setAsset('0')

            /* Handle balance updates. */
            this.wallet.on('balances', async (_assets) => {
                // console.log('Wallet Balances (onChanges):', _assets)

                /* Close asset locally. */
// FIXME Read ASSETS directly from library (getter).
                this._assets = { ..._assets }
            })

            // FIXME ADDED FOR BITCOIN CASH SUPPORT
            // setInterval(this.updateUtxos, UPDATE_UTXOS_INTERVAL)

            /* Update ALL chains. */
            this.updateUtxos(true)
        },

        /**
         * Create Wallet
         *
         * Create a fresh wallet.
         *
         * @param _entropy A 32-byte (hex-encoded) random value.
         */
        createWallet(_entropy) {
            /* Validate entropy. */
            // NOTE: Expect HEX value to be 32 or 64 characters.
            if (_entropy?.length !== 32 && _entropy?.length !== 64) {
                console.error(_entropy, 'is NOT valid entropy.')

                /* Clear (invalid) entropy. */
                _entropy = null
            }

            /* Set entropy. */
            _setEntropy.bind(this)(_entropy)

            /* Initialize wallet. */
            this.init()
        },

        /**
         * Get Bitcoin Cash Address
         *
         * Will return the "child" address of a master node,
         * based on the account index, change flag and address index.
         */
        async getBchAddress(
            _accountIdx = 0,
            _isChange = 0, // NOTE: 0 = false, 1 = true
            _addressIdx = 0,
        ) {
            /* Set root seed. */
            const rootSeed = await bchjs.Mnemonic.toSeed(this.mnemonic)
            // console.log('rootSeed', rootSeed)

            /* Set HD master node. */
            const masterHdnode = bchjs.HDNode.fromSeed(rootSeed)
            // console.log('masterHdnode', masterHdnode);

            /* Set child node. */
            const childNode = masterHdnode
                .derivePath(`m/44'/145'/${_accountIdx}'/${_isChange}/${_addressIdx}`)
            // console.log('childNode', childNode)

            /* Set Bitcoin Cash address. */
            const cashAddress = bchjs.HDNode.toCashAddress(childNode)
            // console.log('cashAddress', cashAddress)

            return cashAddress
        },

        async updateUtxos(_allChains = false) {
            /* Initialize locals. */
            let coins
            let data
            let hushAddresses
            let usedAddresses
            let utxos
            let walletAddresses

            /* Validate UTXO handler. */
            if (this._utxos === null) {
                /* Initialize UTXO handler. */
                this._utxos = {}
            }

            coins = this._keychain[HUSH_PROTOCOL_ID]
            // console.log('WAITING FOR COINS', coins)

            hushAddresses = Object.keys(coins).map(_coinid => {
                const coin = coins[_coinid]
                return coin.address
            })
            // console.log('HUSH ADDRESSES', hushAddresses)

            /* Request UTXO data. */
            data = await $fetch('/api/electrum', {
                method: 'POST',
                body: JSON.stringify({
                    method: 'blockchain.scripthash.listunspent',
                    params: hushAddresses.slice(0, 20)
                }),
            })
            .catch(err => console.error(err))
            console.log('HUSH UTXOS', data)

            // FIXME Update the deltas ONLY!
            this._utxos[HUSH_PROTOCOL_ID] = {}

            /* Handle unspent outputs. */
            data.forEach(_unspent => {
                _unspent.utxos.forEach(_utxo => {
                    // console.log('ADDING HUSH UTXO...', _utxo)

                    /* Generate outpoint (hash). */
                    const outpoint = sha256(_utxo.tx_hash + ':' + _utxo.tx_pos)

                    /* Add to UTXOs. */
                    this._utxos[HUSH_PROTOCOL_ID][outpoint] = {
                        address: _unspent.address,
                        ..._utxo,
                        wif: _getWifForAddress.bind(this)(_unspent.address),
                    }
                })
            })


            /* Request history data. */
            data = await $fetch('/api/electrum', {
                method: 'POST',
                body: JSON.stringify({
                    method: 'blockchain.scripthash.get_history',
                    params: hushAddresses.slice(0, 20)
                }),
            })
            .catch(err => console.error(err))
            console.log('HUSH TX HISTORY', data)

            usedAddresses = data?.filter(_tx => {
                if (_tx.txs.length > 0) {
                    return _tx.address
                }
            })
            usedAddresses = usedAddresses.map(_tx => {
                return _tx.address
            })
            // console.log('USED ADDRESSES', usedAddresses)

            Object.keys(coins).forEach(_coinid => {
                /* Set coin. */
                const coin = coins[_coinid]

                /* Verify address exists. */
                if (usedAddresses.includes(coin.address)) {
                    /* Set (used) flag. */
                    coin.isUsed = true
                    // console.log('COIN (is used)', coin)
                }
            })

            /* Validate chain handler flag. */
            if (_allChains) {
                let bchAddress1
                let bchAddress2
                let bchAddress3

                bchAddress1 = await this.getBchAddress(0, 0, 0)
                    .catch(err => console.error(err))
                // console.log('BCH ADDRESS-1', bchAddress1)

                bchAddress2 = await this.getBchAddress(0, 0, 1)
                    .catch(err => console.error(err))
                // console.log('BCH ADDRESS-2', bchAddress2)

                bchAddress3 = await this.getBchAddress(0, 0, 2)
                    .catch(err => console.error(err))
                // console.log('BCH ADDRESS-3', bchAddress3)

                data = await $fetch('/api/electrum', {
                    method: 'POST',
                    body: JSON.stringify({
                        method: 'blockchain.scripthash.listunspent',
                        params: [
                            bchAddress1,
                            bchAddress2,
                            bchAddress3,
                        ],
                    })
                })
                console.log('MAIN WALLET DATA', data)

                // if (!this._utxos[0]) {
                    this._utxos[0] = {}
                // }

                /* Handle unspent outputs. */
                data.forEach(_unspent => {
                    _unspent.utxos.forEach(_utxo => {
                        console.log('ADDING UTXO...', _utxo)

                        /* Generate outpoint (hash). */
                        const outpoint = sha256(_utxo.tx_hash + ':' + _utxo.tx_pos)

                        /* Add to UTXOs. */
                        this._utxos[0][outpoint] = {
                            address: _unspent.address,
                            ..._utxo,
                            wif: _getWifForAddress.bind(this)(_unspent.address),
                        }
                    })
                })

                // FIXME Update the delta ONLY!
                // this._utxos[0] = data?.utxos
            }

            return true
        },

        /**
         * Get Fusion Address
         *
         * Will retrieve the next available fusion address and lock it.
         */
        getFusionAddress() {
            if (!this.fusionAddrs) {
                return ''
            }

            const addressIdx = Object.keys(this.fusionAddrs).find(_addressIdx => {
                const fusionAddress = this.fusionAddrs[_addressIdx]
                // console.log('fusionAddress', fusionAddress)

                return fusionAddress.isUsed === false && fusionAddress.isLocked === false
            })
            // console.log('ADDRESS IDX', addressIdx)

            if (typeof addressIdx !== 'undefined') {
                /* Set locked flag. */
                this._keychain[HUSH_PROTOCOL_ID][addressIdx].isLocked = true
                this._keychain[HUSH_PROTOCOL_ID][addressIdx].updatedAt = moment().unix()

                /* Return address. */
                return this.fusionAddrs[addressIdx].address
            } else {
                return ''
            }
        },

        async startFusion() {
            /* Start fusions. */
            return _startFusion.bind(this)()
        },

        async signFusion() {
            /* Start fusions. */
            return _signFusion.bind(this)()
        },

        async completeFusion() {
            /* Start fusions. */
            return _completeFusion.bind(this)()
        },

        async transfer(_receiver, _satoshis) {
            /* Validate transaction type. */
            if (this.asset.group === '0') {
                /* Send coins. */
                return await this.wallet.send(_receiver, _satoshis)
            } else {
                /* Send tokens. */
                return await this.wallet.send(this.asset.token_id_hex, _receiver, _satoshis)
            }
        },

        broadcast(_network, _rawTx) {
            /* Broadcast to raw (hex) transaction to mainnet. */
            return _broadcast.bind(this)(_network, _rawTx)
        },

        setEntropy(_entropy) {
            this._entropy = _entropy
        },

        setMnemonic(_mnemonic) {
            let entropy
            let error

            try {
                /* Derive entropy. */
                entropy = mnemonicToEntropy(_mnemonic)
            } catch (err) {
                /* Set error message. */
                error = err.message
            }

            /* Validate error. */
            if (error) {
                return error
            }

            /* Set entropy. */
            this._entropy = entropy

            /* Create wallet. */
            this.createWallet(entropy)

            /* Return entropy. */
            return this.wallet
        },

        destroy() {
            /* Reset wallet. */
            this._entropy = null
            this._wallet = null

            console.info('Wallet destroyed successfully!')
        },
    },
})
