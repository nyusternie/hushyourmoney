<template>
    <main class="tab-pane" id="wallet">

        <div class="row">
            <div class="col-xs-12 col-sm-7">

                <div class="row">
                    <div class="form-group col-sm-7">
                        <select name="country" class="form-control ">
                            <option value="BCH"> Bitcoin Cash (BCH) </option>
                            <option value="USDT"> Tether (USDt) </option>
                            <option value="USDH"> Honest Coin (USDH) </option>
                            <option value="SPICE"> Spice (SPICE) </option>
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

                    <div class="form-group col-sm-12">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Your Bitcoin deposit address"
                            :value="getAddress('deposit')"
                            disabled
                        />
                    </div>

                </div>

                <div
                    class="row"
                    v-for="coin of getCoins"
                    :key="coin.txid+coin.vout"
                >
                    <div class="col-sm-12">
                        <strong>
                            <small>
                                <a :href="'https://explorer.bitcoin.com/bch/address/' + coin.cashAddress" target="_blank">
                                    {{coin.cashAddress}}
                                </a>
                            </small>
                        </strong>
                    </div>

                    <div class="col-sm-12">
                        <div class="col-sm-6 text-center">
                            <small>{{coin.txid.slice(0, 8)}} ... {{coin.txid.slice(-8)}}</small>
                        </div>

                        <div class="col-sm-3 text-center">
                            <small>{{coin.status}}</small>
                        </div>

                        <div class="col-sm-3 text-center">
                            <small>{{formattedValue(coin)}}</small>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <hr />
                    </div>

                </div>

            </div>

            <div class="col-xs-12 col-sm-5">

                <div class="qr-code" v-html="qr" />

            </div>
        </div>

    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import numeral from 'numeral'
import QRCode from 'qrcode'

export default {
    components: {
        //
    },
    data: () => {
        return {
            //
        }
    },
    computed: {
        ...mapGetters('wallet', [
            'getAddress',
            'getCoins',
        ]),

        balance() {
            /* Validate coins. */
            if (this.getCoins) {
                /* Initialize balance total. */
                let total = 0

                Object.keys(this.getCoins).forEach(coinid => {
                    /* Add satoshis. */
                    total += this.getCoins[coinid].satoshis
                })

                /* Return balance total. */
                return total
            } else {
                return 0
            }
        },

        displayBalance() {
            // const formatted = numeral(this.balance).format('$0.00')
            const formatted = numeral(this.balance).format('0,0')

            return formatted + ' sats'
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

        formattedValue(_coin) {
            return numeral(_coin.satoshis).format('0,0') + ' sats'
        },

    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
