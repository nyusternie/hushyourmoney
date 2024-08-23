/* Import modules. */
import { defineStore } from 'pinia'

import BCHJS from '@psf/bch-js'
import { encryptForPubkey } from '@nexajs/crypto'
import { mnemonicToEntropy } from '@nexajs/hdnode'
import { randomOutputsForTier } from '@nexajs/privacy'
import { binToHex } from '@nexajs/utils'
import { Wallet } from '@nexajs/wallet'

import _broadcast from './wallet/broadcast.ts'
import _buildUnsignedTx from './wallet/buildUnsignedTx.ts'
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

        async startFusions() {
            console.log('Starting fusions...')

            /* Initialize locals. */
            let cipherCoins
            let cipherTokens
            let publicKey
            let rawTx
            let readyToFuse
            let response
            let clubWallet

            rawTx = this.buildUnsignedTx()
            console.log('RAW TX (HEX)', rawTx)

            readyToFuse = JSON.stringify(this.utxos)
            console.log('READY TO FUSE', readyToFuse)

            // TODO Handle any filtering required BEFORE submitting for fusion.

            clubWallet = await $fetch('/api/wallet')
                .catch(err => console.error(err))
            console.log('CLUB WALLET', clubWallet)

            // FIXME Retrieve public key from a "public" endpoint.
            publicKey = clubWallet.publicKey
            console.log('CLUB PUBLIC KEY', publicKey)

            /* Generate cipher coins. */
            cipherCoins = encryptForPubkey(publicKey, readyToFuse)
            console.log('CIPHER COINS', cipherCoins)

            let outputs
            let tierScale

            /* Calculate safe balance. */
            const safeBalance = this.utxos.reduce(
                (acc, utxo) => (utxo.value > 10000) ? acc + utxo.value : 0, 0
            )

            /* Set "random" parameters. */
            const inputAmount = safeBalance
            tierScale = 12000
            const feeOffset = 34//10034
            const maxOutputCount = 17

            /* Request (random) outputs. */
            outputs = randomOutputsForTier(
                inputAmount,
                tierScale,
                feeOffset,
                maxOutputCount,
            )
            console.info('OUTPUTS-1', outputs)

            tierScale = 15000
            outputs = randomOutputsForTier(
                inputAmount,
                tierScale,
                feeOffset,
                maxOutputCount,
            )
            console.info('OUTPUTS-2', outputs)

            response = await $fetch('/v1', {
                method: 'POST',
                body: {
                    authid: binToHex(Wallet.wallet.publicKey),
                    coins: cipherCoins,
                    tokens: [],
                    rawTx,
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

        buildUnsignedTx(_sessionInputs, _sessionOutputs) {
            /* Build unsigned transactions. */
            return _buildUnsignedTx.bind(this)(_sessionInputs, _sessionOutputs)
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
