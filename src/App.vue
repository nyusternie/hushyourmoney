<template>
    <div class="image-container set-full-height" :style="{ backgroundImage: 'url(' + backgroundImg + ')' }">
        <router-link to="help" class="made-with-pk">
            <div class="brand">???</div>
            <div class="made-with">Need help?</div>
        </router-link>

        <!--   Big container   -->
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2">

                    <div class="wizard-container">
                        <div class="card wizard-card" data-color="green" id="wizardProfile">

                            <router-view/>

                        </div>
                    </div>

                </div>
            </div>
            <!-- end row -->
        </div>
        <!--  big container -->

        <div class="footer">
            <div class="container text-center">
                Made with <i class="fa fa-heart heart"></i> by <a href="https://bchplease.org" target="_blank">Bitcoin Cash Please</a>.
                &copy; 2020. All rights reserved.
            </div>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

/**
 * Delay (Execution)
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default {
    components: {
        //
    },
    data: () => {
        return {
            blockchain: null,
            backgroundImg: null,
        }
    },
    watch: {
        getCoins: function (_coins) {
            console.log('COINS HAS CHANGED', _coins)

            if (_coins) {
                /* Start monitoring accounts. */
                // this.monitorAccounts()

            }
        },

        getMasterSeed: function (_seed) {
            // console.log('MASTER SEED HAS CHANGED', _seed)

            /* Validate seed. */
            if (_seed) {
                /* Start monitoring accounts. */
                // this.monitorAccounts()

            }
        },

        // TODO: Watch shuffle queue from here
    },
    computed: {
        ...mapGetters('wallet', [
            'getAddress',
            'getCoins',
            'getMasterSeed',
        ]),

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

        ...mapActions('wallet', [
            'updateCoins',
        ]),

        /**
         * Monitor Accounts
         */
        async monitorAccounts() {
            console.log('MONITOR ACCOUNTS')

            /* Set deposit address. */
            const depositAddress = this.getAddress('deposit')
            console.log('Deposit address:', depositAddress)

            /* Verify blockchain. */
            if (this.blockchain) {
                /* Stop blockchain. */
                this.blockchain.unsubscribe()

                /* Wait a second. */
                await delay(1000)

                /* Cleanup blockchain. */
                this.blockchain = null
            }

            /* Initialize blockchain. */
            this.blockchain = new Nito.Blockchain()

            /* Subscribe to address. */
            this.blockchain.subscribe('address', depositAddress)

            /* Handle blockchain updates. */
            this.blockchain.on('update', (_msg) => {
                console.log('WALLET RECEIVED BLOCKCHAIN UPDATE (msg):', _msg)

                /* Update coins. */
                // FIXME: Why is this blocking the entire initial UI setup??
                this.updateCoins()
            })

        },

    },
    created: function () {
        /* Set background image. */
        this.backgroundImg = require('@/assets/background.jpg')
    },
    mounted: function () {
        // Wizard Initialization
        $(".wizard-card").bootstrapWizard()
    },
    beforeDestroy() {
        console.log('DESTROYING APP..')
        /* Validate blockchain. */
        if (this.blockchain) {
            /* Stop blockchain. */
            this.blockchain.unsubscribe()
        }
    },
}
</script>

<style>
.set-full-height {
    height: auto;
}
</style>
