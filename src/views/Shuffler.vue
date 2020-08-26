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
                        <div class="col-sm-5 text-center">
                            <small>{{coin.txid.slice(0, 8)}} ... {{coin.txid.slice(-8)}}</small>
                        </div>

                        <div class="col-sm-4 text-center">
                            <small>{{displayStatus(coin)}}</small>
                        </div>

                        <div class="col-sm-3 text-center">
                            <small>{{formattedValue(coin)}}</small>
                        </div>
                    </div>

                    <div class="col-sm-12 text-right">
                        <small class="text-secondary">
                            <a href="javascript://" class="text-danger">details</a> |
                            <a href="javascript://" class="text-danger">lock</a> |
                            <a href="javascript://" class="text-danger">shuffle</a> |
                            <a href="javascript://" class="text-danger">send</a>
                        </small>
                    </div>

                    <div class="col-sm-12">
                        <hr />
                    </div>

                </div>

            </div>

            <div class="address-win col-xs-12 col-sm-5">

                <div class="qr-code text-center" v-html="qr" />

                <h5 class="text-center text-info">{{displayAddress}}</h5>

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

        displayAddress() {
            const address = this.getAddress('deposit')

            return address.slice(12, 20) + ' ... ' + address.slice(-12)
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

        displayStatus(_coin) {
            switch(_coin.status) {
            case 'active':
                return 'ready to spend'
            default:
                return 'unknown'
            }
        },

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
.address-win h5 {
    margin-top: -20px;
}
</style>
