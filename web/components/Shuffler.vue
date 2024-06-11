<template>
    <main class="tab-pane">

        <div class="row">
            <div class="col-xs-12 col-sm-7">

                <div class="row">
                    <div class="form-group col-sm-7">
                        <select class="form-control ">
                            <option value="BCH"> Bitcoin Cash (BCH) </option>
                            <option value="USDT"> Tether (USDt) </option>
                        </select>
                    </div>

                    <div class="form-group col-sm-5">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Your wallet balance"
                            :value="displayBalance"
                            disabled
                        />
                    </div>
                </div>

                <div
                    class="coin-rows"
                    v-for="coin of getCoins"
                    :key="coin.txid+coin.vout"
                >
                    <!-- <div class="col-sm-12">
                        <strong>
                            <small>
                                <a :href="'https://explorer.bitcoin.com/bch/address/' + coin.cashAddress" target="_blank">
                                    {{coin.cashAddress}}
                                </a>
                            </small>
                        </strong>
                    </div> -->

                    <div class="row">
                        <div class="col-xs-8 text-center">
                            <a :href="'https://explorer.bitcoin.com/bch/tx/' + coin.txid" target="_blank">
                                <small>{{coin.txid.slice(0, 10)}} ... {{coin.txid.slice(-10)}}</small>
                            </a>
                        </div>

                        <div class="col-xs-4 text-center">
                            <small>{{formattedValue(coin)}}</small>
                        </div>
                    </div>

                    <div class="utxo-buttons text-center">
                        <input
                            type="button"
                            class="btn btn-sm btn-primary utxo-button"
                            value="details"
                            @click="openExplorer(coin.details)"
                        />

                        <input
                            type="button"
                            class="btn btn-sm btn-success utxo-button"
                            value="shuffle"
                            @click="startShuffle(coin.details)"
                        />

                        <input
                            type="button"
                            class="btn btn-sm btn-danger utxo-button"
                            value="fusion"
                            @click="startFusion(coin.details)"
                        />

                        <input
                            type="button"
                            class="btn btn-sm btn-primary utxo-button"
                            value="send"
                            @click="send(coin.details)"
                        />
                    </div>
                </div>

                <input
                    v-if="coinsTable.length"
                    type="text"
                    class="form-control mt-2"
                    placeholder="Enter a destination address"
                    v-model="output.address"
                />

            </div> <!-- end of left column -->

            <div class="address-win col-xs-12 col-sm-5 text-center">

                <div class="qr-code text-center" v-html="qr" />

                <h5 class="text-center text-info">{{displayAddress}}</h5>

                <div v-if="showMnemonic" class="mnemonic" @click="toggleMnemonic">
                    {{getMnemonic}}
                </div>

                <div class="flex address-buttons">
                    <input
                        type="button"
                        class="btn btn-error btn-sm address-button"
                        :value="showMnemonic ? 'hide mnemonic' : 'show mnemonic'"
                        @click="toggleMnemonic"
                    />

                    <input
                        type="button"
                        class="btn btn-warning btn-sm address-button"
                        value="re-sync coins"
                        @click="updateCoins"
                    />
                </div>
            </div> <!-- end of right column -->

        </div>

    </main>
</template>

<script>
/* global ipfs */

/* Initialize vuex. */
// import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nexa from 'nexajs'
import moment from 'moment'
import numeral from 'numeral'
import QRCode from 'qrcode'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'

export default {
    components: {
        //
    },
    data: () => {
        return {
            usd: null,
            balance: null,
            wallet: null,

            output: {
                address: null,
                satoshis: null,
                notes: null,
            },

            showMnemonic: null,
            roomName: null,
        }
    },
    computed: {
        // ...mapGetters('system', [
        //     'getRequests',
        // ]),

        // ...mapGetters('utils', [
        //     'getFormattedValue',
        // ]),

        // ...mapGetters('wallet', [
        //     'getAddress',
        //     'getBalance',
        //     'getCoins',
        //     'getMasterSeed',
        //     'getMnemonic',
        // ]),

        displayAddress() {
            const address = this.getAddress('deposit')

            return address.slice(12, 20) + ' ... ' + address.slice(-12)
        },

        /**
         * Display Balance
         */
        displayBalance() {
            if (!this.balance) {
                return 'loading...'
            }

            /* Set display. */
            const display = `${this.balance.value} ${this.balance.unit} | ${this.balance.fiat}`

            /* Return display. */
            return display
        },

        /**
         * Coins Table
         */
        coinsTable() {
            /* Set table data. */
            const tableData = []

            /* Validate coins. */
            if (this.getCoins) {
                /* Initialize coins. */
                const coins = this.getCoins
                // console.log('COINS TABLE (coins):', coins)

                Object.keys(coins).forEach(async coinId => {
                    /* Initialize coin. */
                    const coin = coins[coinId]
                    // console.log('COINS (coin):', coin)

                    /* Set id. */
                    const id = `${coin.txid}:${coin.vout}`

                    /* Set label. */
                    const label = `${coin.txid.slice(0, 8)} ... ${coin.txid.slice(-8)} : ${coin.vout}`

                    /* Initialize flags. */
                    const flags = {}

                    /* Set status. */
                    // TODO: Will probably develop a rating scale??
                    let status = null

                    switch(coin.status) {
                    case 'active':
                        // status = '<icon class="fa fa-check"></icon>'
                        status = coin.status
                        flags.spendable = true
                        break
                    case 'locked':
                        // status = '<icon class="fa fa-lock text-danger"></icon>'
                        status = coin.status
                        flags.locked = true
                        break
                    default:
                        // status = ''
                        status = ''
                    }

                    /* Set satoshis. */
                    const satoshis = coin.satoshis

                    /* Build coin data. */
                    const coinData = {
                        id,
                        label,
                        flags,
                        status,
                        satoshis,
                        details: coin, // FIXME: Write this to outbox for multi-coin sending.
                    }

                    // TODO: Allow display of spent coins.
                    if (status !== '') {
                        tableData.push(coinData)
                    }

                })

            }

            // console.log('TABLE DATA:', tableData)
            return tableData
        },

        qr() {
            if (!this.getAddress('deposit')) {
                return null
            }

            /* Initialize (string) value. */
            let strValue = ''

            /* Initialize scanner parameters. */
            const params = {
                type: 'svg',
                width: 250,
                height: 250,
                color: {
                    dark: '#000',
                    light: '#fff'
                }
            }

            QRCode.toString(this.getAddress('deposit'), params, (err, value) => {
                if (err) {
                    return console.error('QR Code ERROR:', err)
                }

                /* Set (string) value. */
                strValue = value
            })

            /* Return (string) value. */
            return strValue
        },

        /**
         * Magic Hash
         */
        // magicHash () {
        //     /* Initialize first prefix. */
        //     const prefix1 = BufferWriter.varintBufNum(MAGIC_BYTES.length)
        //
        //     /* Set buffer message. */
        //     const messageBuffer = Buffer.from(this.message, this.messageEncoding)
        //
        //     /* Initialize second prefix. */
        //     const prefix2 = BufferWriter.varintBufNum(messageBuffer.length)
        //
        //     /* Set (complete) buffer. */
        //     const buf = Buffer
        //         .concat([prefix1, MAGIC_BYTES, prefix2, messageBuffer])
        //
        //     /* Set buffer hash. */
        //     const hash = sha256sha256(buf)
        //
        //     /* Return hash. */
        //     return hash
        // }


    },
    methods: {
        // ...mapActions('system', [
        //     'updateRequests',
        // ]),

        // ...mapActions('utils', [
        //     'toast',
        // ]),

        // ...mapActions('wallet', [
        //     'updateCoins',
        // ]),

        /**
         * Coin Value Display
         */
        coinValueDisplay(_coin) {
            return numeral(_coin.satoshis).format('0,0')
        },

        /**
         * Coin (USD) Value Display
         */
        coinUsdValueDisplay(_coin) {
            if (this.usd) {
                // console.log('CALC', (_coin.satoshis / 100000000.0) * this.usd)
                return numeral((_coin.satoshis / 100000000.0) * this.usd).format('$0,0.00')
            } else {
                return '$0.00'
            }
        },

        formattedValue(_coin) {
            return numeral(_coin.satoshis / 100).format('0,0[.]00') + ' bits'
        },

        /**
         * Send Message
         *
         * Broadcast the connection information for this IPFS node.
         */
        async sendMessage(_message) {
            try {
                /* Set message buffer. */
                const msgBuf = Buffer.from(JSON.stringify(_message))

                // Publish the message to the pubsub channel.
                await ipfs.pubsub.publish(this.roomName, msgBuf)

                console.log(`Published message to ${this.roomName}\n`)
            } catch (err) {
                console.error('Error in sendMessage()')
                throw err
            }
        },

        async send(_coin) {
            // console.log('SENDING COIN', _coin)
            if (!this.output.address) {
                return this.toast(['Oops!', 'Invalid destination address, please try again', 'error'])
            }

            /* Build receivers. */
            const receivers = [
                {
                    address: this.output.address,
                    satoshis: _coin.satoshis,
                }
            ]

            /* Set auto fee (flag). */
            const autoFee = true

            const results = await Nexa.Transaction
                .sendCoin(_coin, receivers, autoFee)
                .catch(err => {
                    console.error(err) // eslint-disable-line no-console

                    /* Report error. */
                    this.report(err)
                })
            // console.log('OUTBOX SEND COIN (results):', results)

            if (results) {
                /* Update outbox. */
                // this.updateOutbox(null)

                /* Clear output address. */
                this.output.address = null

                /* Set message. */
                const message = `Your coins have been sent successfully!`

                /* Display notification. */
                this.toast(['Done!', message, 'success'])

                /* Wait a bit then update coins. */
                // FIXME: How long should we wait?
                //        Probably better to update coins w/out on-chain query?
                setTimeout(() => {
                    /* Update coins. */
                    // FIXME: Why is this blocking the entire initial UI setup??
                    this.updateCoins()
                }, 2000)

            } else {
                /* Set message. */
                const message = `Something went wrong and your coin(s) were NOT sent`

                /* Display notification. */
                this.toast(['Oops!', message, 'error'])
            }

        },

        /**
         * Toggle Mnemonic
         */
        toggleMnemonic() {
            this.showMnemonic = !this.showMnemonic
        },

        /**
         * Set Clipboard
         */
        copyAddress() {
            /* Set clipboard. */
            this.setClipboard(this.getAddress('deposit'))

            /* Set message. */
            const message = `Deposit address copied to your clipboard.`

            /* Display notification. */
            this.toast(['Done!', message, 'info'])
        },

        previewNotice() {
            Swal.fire({
                title: 'Campaign Preview',
                text: 'Thanks for checking out this early look of Hush Your Money. Our team has been working around the clock to deliver this portal to you asap. Please consider supporting our development work by donating to our Flipstarter.',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Open Campaign',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: 'Close',
            }).then((result) => {
                if (result.value) {
                    window.open('https://hushyourmoney.com')
                } else if (result.isDismissed) {
                    // if (result.dismiss === 'cancel') { // backdrop | cancel | esc
                        Swal.fire({
                            title: 'Thanks for visiting!',
                            text: `Please check back soon for updates!`,
                            icon: 'info',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                        })
                    // }
                }
            })

        },

        openExplorer(_details) {
            // window.open(`https://explorer.bitcoin.com/bch/tx/${_details.txid}`)

            if (this.wallet) {
                console.log('WALLET', this.wallet)
                const debug = this.wallet.debug()
                console.log('WALLET DEBUG', debug, _details)
            } else {
                console.log('WALLET IS NOT INITITALIZED')
            }
        },

        startFusion() {
            // this.previewNotice()

            if (this.wallet) {
                const create = this.wallet.create(this.getMasterSeed)
                console.log('WALLET CREATE', create)
            } else {
                console.log('WALLET IS NOT INITITALIZED')
            }
        },

        /**
         * Start Shuffle
         */
        async startShuffle(_coin) {
            /* Set coin signature. */
            // NOTE: This is a signature of the `requestid` by the private key
            //       of the player's submitted UTXO.
            const verificationKey = _coin

            /* Set outpoint. */
            // NOTE: UTXO + tx position.
            const outpoint = 'outpoint'

            /* Set destination. */
            const destination = 'destination'

            /* Set signature. */
            // NOTE: Used to verify coin owner.
            // const sig = 'sig'

            /* Set players. */
            const players = []

            /* Set ourselves. */
            const me = {
                verificationKey,
                outpoint,
                destination,
                // sig,
                isValid: null, // NOTE: This is just a placeholder and must be verified by each player
                createdAt: moment().valueOf(),
                updatedAt: moment().valueOf(),
            }

/**

I AM the last player

1. take all the encryption signatures from the other players
2. wrap our desitnation address in an onion (p1 .. p?) of `isValid` outpoints
3. send that package to (p?)
   that player will then unwrap our layer, make a copy and replace our destination with theirs
   (p1) will then unwrap (p2) layer and add their destination to the bunch

I'm NOT the last player

1. wait until i see the player after me add their sigs.

*/

            /* Add ourselves to the players. */
            // FIXME: Sort by verification key.
            players.push(me)

            /* Set request id. */
            const requestid = uuidv4()

            /* Initialize transaction manager. */
            const txManager = {
                covertAddrs: {
                    players: [],
                    nextPlayer: null,
                },
                changeAddrs: [], // NOTE: These addresses are "toxic" and NOT safe for re-use.
                sigs: [], // NOTE: Signatures for each of the "source" UTXOs.
            }

            /* Calculate players hash. */
            // FIXME: We need to concatenate all player's `verificationKey`, then sha256.
            const playersHash = 'sha256-hash-goes-here'

            /* Build (request) package. */
            const pkg = {
                requestid,
                txManager,
                players,
                playersHash,
                createdAt: moment().valueOf(),
                updatedAt: null,
                completedAt: null,
            }
            console.log('REQUEST PACKAGE', pkg)

            // FIXME: FOR DEV ONLY
            this.updateRequests(pkg)
            this.sendMessage(pkg)

            // const message = 'START THE SHUFFLE!'

            // /* Set message buffer. */
            // const msgBuf = Buffer.from(JSON.stringify(message))
            //
            // try {
            //     // Publish the message to the pubsub channel.
            //     await this.getIpfs.pubsub.publish(this.roomName, msgBuf)
            //
            //     console.log(`Published message to ${this.roomName}\n`)
            // } catch (err) {
            //     console.error('Error in startShuffle()')
            //     throw err
            // }
        },

        /**
         * Stop Shuffle
         */
        stopShuffle(_coin) {
            console.log('STOPPING SHUFFLE FOR:', _coin)
        },

        /**
         * Sign
         *
         * Will sign a message with a given bitcoin private key.
         */
        // sign(privateKey) {
        //     $.checkArgument(privateKey instanceof PrivateKey,
        //         'First argument should be an instance of PrivateKey')
        //
        //     /* Initialize hash. */
        //     const hash = this.magicHash
        //
        //     /* Initialize ECDSA. */
        //     const ecdsa = new ECDSA()
        //
        //     /* Set hash buffer. */
        //     ecdsa.hashbuf = hash
        //
        //     /* Set private key. */
        //     ecdsa.privkey = privateKey
        //
        //     /* Set public key. */
        //     ecdsa.pubkey = privateKey.toPublicKey()
        //
        //     /* Sign. */
        //     ecdsa.signRandomK()
        //
        //     /* Calculate. */
        //     ecdsa.calci()
        //
        //     /* Return signature. */
        //     return ecdsa.sig.toCompact().toString('base64')
        // }

        /**
         * Verify
         *
         * Will return a boolean of the signature is valid for a given
         * bitcoin address. If it isn't the specific reason is accessible via
         * the "error" member.
         */
        // verify(bitcoinAddress, signatureString) {
        //     $.checkArgument(bitcoinAddress)
        //
        //     $.checkArgument(signatureString && _.isString(signatureString))
        //
        //     if (_.isString(bitcoinAddress)) {
        //         bitcoinAddress = Address.fromString(bitcoinAddress)
        //     }
        //
        //     /* Set signature. */
        //     const signature = Signature
        //         .fromCompact(Buffer.from(signatureString, 'base64'))
        //
        //     /* Initialize ECDSA. */
        //     const ecdsa = new ECDSA()
        //
        //     /* Set hash buffer. */
        //     ecdsa.hashbuf = this.magicHash
        //
        //     /* Set signature. */
        //     ecdsa.sig = signature
        //
        //     /* Set public key. */
        //     const publicKey = ecdsa.toPublicKey()
        //
        //     /* Set signature address. */
        //     const signatureAddress = Address
        //         .fromPublicKey(publicKey, bitcoinAddress.network)
        //
        //     /* Validate addresses. */
        //     if (bitcoinAddress.toString() !== signatureAddress.toString()) {
        //         this.error = 'The signature did not match the message digest'
        //
        //         return false
        //     }
        //
        //     /* Set verification. */
        //     const verified = ECDSA.verify(this.magicHash, signature, publicKey)
        //
        //     /* Validate verification. */
        //     if (!verified) {
        //         this.error = 'The signature was invalid'
        //     }
        //
        //     /* Return verification. */
        //     return verified
        // }

    },
    created: async function () {
        // console.log('BALANCE DISPLAY', this.displayBalance)
        // console.log('DISPLAY ADDRESS', this.displayAddress)

        /* Initialize mnemonic flag. */
        this.showMnemonic = false

        // Pubsub channel that nodes will use to coordinate.
        this.roomName = 'af84de592984f9403c9539c1049a01369e6302f08043b79db783bd34ad344190' // #lobby:nitoblender.com

        /* Request BCH/USD market price. */
        this.usd = await Nexa.Markets.getTicker('BCH', 'USD')
        console.log('USD', this.usd)

        this.wallet = new Nexa.Wallet()
        console.log('WALLET', this.wallet)


    },
    mounted: async function () {

        // const balance = this.getBalance
        const balance = await this
            .getBalance('USD')
            .catch(err => {
                console.error(err) // eslint-disable-line no-console
            })
        console.log('SHUFFLER GET BALANCE', balance)

        const coins = this.getCoins
        console.log('SHUFFLER COINS', coins)

        /* Set balance. */
        this.balance = balance

        /* Retrieve requests. */
        const requests = this.getRequests
        console.log('REQUESTS', requests)

    },
}
</script>

<style>
.utxo-buttons {
    margin-top: 5px;
}
.utxo-button {
    margin: 0 5px;
}

.coin-rows {
    margin: 0 5px;
    padding: 10px;
    border-bottom: 1pt solid rgba(180, 180, 180, 0.5);
}

.my-available-coins small {
    font-size: 0.7em;
    font-weight: 500;
}
</style>

<style scoped>
.address-win h5 {
    margin-top: -20px;
}
.address-buttons {
    justify-content: space-around;
}

.mnemonic {
    cursor: pointer;
    padding: 20px;
    color: rgba(30, 30, 30, 0.8);
}

.actions a {
    display: inline-block;
}
</style>
