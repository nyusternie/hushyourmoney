<template>
    <form action="" method="">
        <div class="wizard-header text-center">
            <h3 class="wizard-title">
                Hush Your Money
            </h3>

            <p class="category">
                Spend Your Cash Privately. Fearlessly!
            </p>
        </div>

        <div class="wizard-navigation">
            <div class="progress-with-circle">
                <div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" :style="{ width: pbWidth }"></div>
            </div>

            <ul>
                <li :class="{ active: tabIndex === 0 }">
                    <a href="javascript://" @click="showIdentity">
                        <div class="icon-circle" :class="{ checked: tabIndex === 0 }">
                            <i class="ti-user"></i>
                        </div>
                        Identity
                    </a>
                </li>

                <li :class="{ active: tabIndex === 1 }">
                    <a href="javascript://" @click="showWallet">
                        <div class="icon-circle" :class="{ checked: tabIndex === 1 }">
                            <i class="ti-wallet"></i>
                        </div>
                        Wallet
                    </a>
                </li>

                <li :class="{ active: tabIndex === 2 }">
                    <a href="javascript://" @click="showShuffler">
                        <div class="icon-circle" :class="{ checked: tabIndex === 2 }">
                            <i class="ti-control-shuffle"></i>
                        </div>
                        Shuffler
                    </a>
                </li>
            </ul>
        </div>

        <div class="win-content">
            <Identity v-if="tabIndex === 0" />
            <Wallet v-if="tabIndex === 1" />
            <Shuffler v-if="tabIndex === 2" />
        </div>

        <div class="wizard-footer">
            <div class="row">
                <div class="col-xs-4 text-left">
                    <input
                        v-if="tabIndex !== 0"
                        type="button"
                        class="btn btn-previous btn-default btn-wd"
                        value="Previous"
                        @click="previous"
                    />
                </div>

                <div class="col-xs-4 text-center">
                    <input
                        v-if="tabIndex === 1"
                        type="button"
                        class="btn btn-burn btn-danger btn-wd"
                        value="Burn Wallet"
                        @click="burn"
                    />
                </div>

                <div class="col-xs-4 text-right">
                    <input
                        v-if="tabIndex !== 2"
                        type="button"
                        class="btn btn-next btn-fill btn-warning btn-wd"
                        value="Next"
                        @click="next"
                    />

                    <!-- <input
                        v-if="tabIndex === 2"
                        type="button"
                        class="btn btn-finish btn-fill btn-warning btn-wd"
                        value="Finish"
                        @click="finish"
                    /> -->
                </div>
            </div>

            <div class="clearfix"></div>
        </div>
    </form>
</template>

<script>
/* Initialize vuex. */
import { mapActions } from 'vuex'

/* Import components. */
import Identity from './Identity'
import Shuffler from './Shuffler'
import Wallet from './Wallet'

export default {
    components: {
        Identity,
        Shuffler,
        Wallet,
    },
    data: () => {
        return {
            pbWidth: '21%',
            tabIndex: 0,
        }
    },
    computed: {

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

        next() {
            switch(this.tabIndex) {
            case 0:
                return this.showWallet()
            case 1:
                return this.showShuffler()
            }
        },

        previous() {
            switch(this.tabIndex) {
            case 1:
                return this.showIdentity()
            case 2:
                return this.showWallet()
            }
        },

        finish() {
            this.toast(['Done!', 'You shuffle session is complete', 'success'])
        },

        burn() {
            this.toast(['Oops!', 'Your wallet is NOT empty', 'error'])
        },

        /**
         * Show Identity
         */
        showIdentity() {
            /* Set tab index. */
            this.tabIndex = 0

            /* Update progress. */
            let move_distance = 100 / 3
            move_distance = move_distance * this.tabIndex + move_distance / 2

            /* Set progress bar width. */
            this.pbWidth = `${move_distance}%`
        },

        /**
         * Show Wallet
         */
        showWallet() {
            /* Set tab index. */
            this.tabIndex = 1

            /* Update progress. */
            let move_distance = 100 / 3
            move_distance = move_distance * this.tabIndex + move_distance / 2

            /* Set progress bar width. */
            this.pbWidth = `${move_distance}%`
        },

        /**
         * Show Shuffler
         */
        showShuffler() {
            /* Set tab index. */
            this.tabIndex = 2

            /* Update progress. */
            let move_distance = 100 / 3
            move_distance = move_distance * this.tabIndex + move_distance / 2

            /* Set progress bar width. */
            this.pbWidth = `${move_distance}%`
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

<style>
.wizard-navigation li {
    width: 33.3%;
}

.wizard-card .win-content {
    min-height: 435px;
    padding: 105px 20px 10px;
}

</style>
