/* Import modules. */
import { defineStore } from 'pinia'
import moment from 'moment'

import BCHJS from '@psf/bch-js'
import { encryptForPubkey } from '@nexajs/crypto'
import { mnemonicToEntropy } from '@nexajs/hdnode'
import { randomOutputsForTier } from '@nexajs/privacy'
import { binToHex } from '@nexajs/utils'
import { Wallet } from '@nexajs/wallet'

import _broadcast from './wallet/broadcast.ts'
import _setEntropy from './wallet/setEntropy.ts'
import _setupKeychain from './wallet/setupKeychain.ts'
import _setupHushKeychain from './wallet/setupHushKeychain.ts'

/* Initialize constants. */
const HUSH_PROTOCOL_ID = 0x48555348

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v5/'

// Instantiate bch-js based on the network.
const bchjs = new BCHJS({
    restURL: BCHN_MAINNET,
})

/* Set constants. */
const UPDATE_UTXOS_INTERVAL = 8000 // Allows for ~7 (REST) requests per minute.

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

            const collection = _state._utxos

            const mainList = []

            collection[0].forEach(_account => {
                // console.log('ACCOUNT (0)', _account)
                _account.utxos.forEach(_utxo => {
                    mainList.push({
                        address: _account.address,
                        ..._utxo,
                    })
                })
            })

            collection[HUSH_PROTOCOL_ID].forEach(_account => {
                // console.log('ACCOUNT (1213551432)', _account)
                _account.utxos.forEach(_utxo => {
                    mainList.push({
                        address: _account.address,
                        ..._utxo,
                    })
                })
            })

            return mainList
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
            setInterval(this.updateUtxos, UPDATE_UTXOS_INTERVAL)

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
            // console.log('SAVED ADDRESSES', hushAddresses)

            data = await bchjs.Electrumx.utxo(hushAddresses.slice(0, 20))
            // console.log('HUSH DATA', data)
            // const utxos = data.utxos

            // FIXME Update the delata ONLY!
            this._utxos[HUSH_PROTOCOL_ID] = data?.utxos

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

                data = await bchjs.Electrumx.utxo([
                    bchAddress1,
                    bchAddress2,
                    bchAddress3,
                ])
                // console.log('WALLET DATA', data)

                // FIXME Update the delta ONLY!
                this._utxos[0] = data?.utxos
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
            console.log('ADDRESS IDX', addressIdx)

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

        async startFusions() {
            console.log('Starting fusions...')

            /* Initialize locals. */
            let blindComponents
            let components
            let cipherTokens
            let fusionInputs
            let inputAmount
            let publicKey
            let rawTx
            let inputs
            let outputs
            let response
            let clubWallet
            let tierScale

            const feeOffset = 1034//10034
            const maxOutputCount = 17

            /* Calculate input amount. */
            // inputAmount = this.fusionInputs.reduce(
            //     (acc, utxo) => (utxo.value > 10000) ? acc + utxo.value : 0, 0
            // )
            // console.log('INPUT AMOUNT', inputAmount)

            /* Clone fusion inputs. */
            fusionInputs = [ ...this.fusionInputs ]

            /* Add inputs to components. */
            components = [ ...fusionInputs ]

            const tierScales = [
                10000,      12000,      15000,      18000,      22000,      27000,      33000,      39000,      47000,      56000,      68000,      82000,
                100000,     120000,     150000,     180000,     220000,     270000,     330000,     390000,     470000,     560000,     680000,     820000,
                1000000,    1200000,    1500000,    1800000,    2200000,    2700000,    3300000,    3900000,    4700000,    5600000,    6800000,    8200000,
                10000000,   12000000,   15000000,   18000000,   22000000,   27000000,   33000000,   39000000,   47000000,   56000000,   68000000,   82000000,
                100000000,  120000000,  150000000,  180000000,  220000000,  270000000,  330000000,  390000000,  470000000,  560000000,  680000000,  820000000,
                1000000000, 1200000000, 1500000000, 1800000000, 2200000000, 2700000000, 3300000000, 3900000000, 4700000000, 5600000000, 6800000000, 8200000000,
            ]

            const bestTiers = {}

            for (let i = 0; i < fusionInputs.length; i++) {
                /* Set input amount. */
                inputAmount = fusionInputs[i].value
                console.log('INPUT AMOUNT', inputAmount)

                /* Handle ALL tier scales. */
                tierScales.forEach(_tierScale => {
                    try {
                        /* Request (random) outputs. */
                        response = randomOutputsForTier(
                            inputAmount,
                            _tierScale,
                            feeOffset,
                            maxOutputCount,
                        )

                        /* Validate tier outputs. */
                        if (response && response.length > 1) {
                            console.log('TIER', _tierScale, 'INPUT #', i, response)

                            /* Test for the best tiers. */
                            if (typeof bestTiers[i] === 'undefined' || response.length > bestTiers[i]?.outputs.length) {
                                const numOutputs = response.length
                                // console.log('NUM OUTPUTS', numOutputs)

                                const fee = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: numOutputs })
                                // console.log('FEE', fee)

                                const outputs = response.map(_outputValue => {
                                    return {
                                        address: this.getFusionAddress(),
                                        value: _outputValue - Math.ceil(fee / numOutputs),
                                    }
                                })

                                bestTiers[i] = {
                                    tierid: _tierScale,
                                    outputs,
                                }
                            }
                        }
                    } catch (err) {
                        // console.error(err)
                    }
                })
            }
console.log('BEST TIERS', bestTiers)
// return

            /* Add best tiers to components. */
            Object.keys(bestTiers).forEach(_tierid => {
                const tier = bestTiers[_tierid]

                components.push(tier)
            })

            /* Prepare components for encryption. */
            components = JSON.stringify(components)
            console.log('FUSION (components)', inputs)

            // TODO Handle any filtering required BEFORE submitting for fusion.

            clubWallet = await $fetch('/api/wallet')
                .catch(err => console.error(err))
            console.log('CLUB WALLET', clubWallet)

            // FIXME Retrieve public key from a "public" endpoint.
            publicKey = clubWallet.publicKey
            console.log('CLUB PUBLIC KEY', publicKey)

            /* Generate blind components. */
            blindComponents = encryptForPubkey(publicKey, components)
            console.log('BLINDED COMPONENTS', blindComponents)

            response = await $fetch('/v1', {
                method: 'POST',
                body: {
                    authid: binToHex(Wallet.wallet.publicKey),
                    components: blindComponents,
                },
            })
            .catch(err => console.error(err))
            console.log('RESPONSE', response)
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

        broadcast(_receivers) {
            /* Broadcast to receivers. */
            return _broadcast.bind(this)(_receivers)
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
