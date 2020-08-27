<template>
    <div class="image-container set-full-height" :style="{ backgroundImage: 'url(' + backgroundImg + ')' }">
        <router-link to="help" class="made-with-pk">
            <div class="brand"><i class="fa fa-question-circle"></i></div>
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
import Swal from 'sweetalert2'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

/**
 * Delay (Execution)
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/* Set campaign delay. */
const CAMPAIGN_DELAY = 60000

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

        initCampaign() {
            setTimeout(() => {
                Swal.fire({
                    title: 'Do you have a moment?',
                    text: `Our team is currently running a Flipstarter campaign to help us with development for our current Roadmap.`,
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, show me',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'No, not now',
                }).then((result) => {
                    if (result.value) {
                        window.open('https://causes.cash/@BCHPlease/hush-your-money-60aabe8b')
                    } else if (result.isDismissed) {
                        // if (result.dismiss === 'cancel') { // backdrop | cancel | esc
                            Swal.fire({
                                title: 'Okay, but before you go...',
                                text: 'Check out the help page anytime by clicking on the icon in the bottom right of the screen.',
                                icon: 'info',
                                showConfirmButton: false,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                timer: 5000,
                                timerProgressBar: true,
                            })
                        // }
                    }
                })
            }, CAMPAIGN_DELAY)
        },

    },
    created: function () {
        /* Set background image. */
        this.backgroundImg = require('@/assets/background.jpg')

        /* Initialize campaign reminder. */
        this.initCampaign()
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

.brand {
    margin: -6px 0 0 -2px;
}
.brand i {
    display: block;
    font-size: 33px;
}

/* Until we upgrade to Bootstrap v4 */
.mt-0 {
    margin-top: 0;
}
.mt-1 {
    margin-top: 10px;
}
.mt-2 {
    margin-top: 15px;
}
.mt-3 {
    margin-top: 30px;
}
.mt-n1 {
    margin-top: -10px;
}
.mt-n2 {
    margin-top: -15px;
}
.mt-n3 {
    margin-top: -30px;
}
</style>
