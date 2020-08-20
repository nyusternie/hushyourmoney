<template>
    <main class="tab-pane" id="wallet">

        <div class="row">
            <div class="col-xs-7">

                <div class="row">
                    <div class="col-sm-12">
                        <h5 class="info-text">Are you living in a nice area?</h5>
                    </div>

                    <div class="col-sm-7 col-sm-offset-1">
                        <div class="form-group">
                            <label>Street Name</label>
                            <input type="text" class="form-control" placeholder="5h Avenue" />
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="form-group">
                            <label>Street Number</label>
                            <input type="text" class="form-control" placeholder="242" />
                        </div>
                    </div>

                    <div class="col-sm-5 col-sm-offset-1">
                        <div class="form-group">
                            <label>City</label>
                            <input type="text" class="form-control" placeholder="New York..." />
                        </div>
                    </div>

                    <div class="col-sm-5">
                        <div class="form-group">
                            <label>Country</label><br />

                            <select name="country" class="form-control">
                                <option value="Afghanistan"> Afghanistan </option>
                                <option value="Albania"> Albania </option>
                                <option value="Algeria"> Algeria </option>
                                <option value="American Samoa"> American Samoa </option>
                                <option value="Andorra"> Andorra </option>
                                <option value="Angola"> Angola </option>
                                <option value="Anguilla"> Anguilla </option>
                                <option value="Antarctica"> Antarctica </option>
                                <option value="...">...</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-xs-5">
                <div class="qr-code" v-html="qr" />
            </div>
        </div>

    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'
import QRCode from 'qrcode'

export default {
    components: {
        //
    },
    data: () => {
        return {
            depositAddress: null,
        }
    },
    computed: {
        ...mapGetters('wallet', [
            'getAddress',
        ]),

        qr() {
            if (!this.depositAddress) {
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

            /* Set payment URL. */
            const paymentUrl = `${this.depositAddress}`

            QRCode.toString(paymentUrl, params, (err, value) => {
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

        listen() {
            /* Initialize blockchain. */
            const blockchain = new Nito.Blockchain()

            /* Subscribe to address. */
            blockchain.subscribe('address', this.depositAddress)

            /* Handle blockchain updates. */
            blockchain.on('update', (_msg) => {
                console.log('WALLET RECEIVED BLOCKCHAIN UPDATE (msg):', _msg)

                /* Update coins. */
                // FIXME: Why is this blocking the entire initial UI setup??
                // this.updateCoins()
            })

        },
    },
    created: function () {
        this.depositAddress = this.getAddress('deposit')
        console.log('DEPOSIT ADDRESS', this.depositAddress)

        /* Start listening. */
        this.listen()
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
