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
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'
import numeral from 'numeral'
import QRCode from 'qrcode'
import Swal from 'sweetalert2'

export default {
    components: {
        //
    },
    data: () => {
        return {
            usd: null,
            balance: null,

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
        ...mapGetters('system', [
            'getIpfs',
        ]),

        ...mapGetters('utils', [
            'getFormattedValue',
        ]),

        ...mapGetters('wallet', [
            'getAddress',
            'getBalance',
            'getCoins',
            'getMnemonic',
        ]),

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

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

        ...mapActions('wallet', [
            'updateCoins',
        ]),

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

            const results = await Nito.Transaction
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
            window.open(`https://explorer.bitcoin.com/bch/tx/${_details.txid}`)
        },

        startFusion() {
            this.previewNotice()
        },

        async startShuffle() {
            console.log('this.getIpfs', this.getIpfs)
            const message = 'START THE SHUFFLE!'

            /* Set message buffer. */
            const msgBuf = Buffer.from(JSON.stringify(message))

            try {
                // Publish the message to the pubsub channel.
                await this.getIpfs.pubsub.publish(this.roomName, msgBuf)

                console.log(`Published message to ${this.roomName}\n`)
            } catch (err) {
                console.error('Error in sendMessage()')
                throw err
            }
        },

    },
    created: async function () {
        // console.log('BALANCE DISPLAY', this.displayBalance)
        // console.log('DISPLAY ADDRESS', this.displayAddress)

        /* Initialize mnemonic flag. */
        this.showMnemonic = false

        // Pubsub channel that nodes will use to coordinate.
        this.roomName = 'af84de592984f9403c9539c1049a01369e6302f08043b79db783bd34ad344190' // #lobby:nitoblender.com

        /* Request BCH/USD market price. */
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        console.log('USD', this.usd)

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

    },
    mounted: function () {
        //
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
