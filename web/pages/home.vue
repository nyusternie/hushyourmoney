<template>
    <form action="" method="">
        <div class="wizard-header text-center">
            <h3 class="wizard-title">
                Hush Your Money
            </h3>

            <p class="category">
                Spend Privately. Fearlessly!
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
                    <a href="javascript://" @click="showAnalysis">
                        <div class="icon-circle" :class="{ checked: tabIndex === 2 }">
                            <i class="ti-receipt"></i>
                        </div>
                        Analysis
                    </a>
                </li>

                <li :class="{ active: tabIndex === 2 }">
                    <a href="javascript://" @click="showShuffler">
                        <div class="icon-circle" :class="{ checked: tabIndex === 1 }">
                            <i class="ti-control-shuffle"></i>
                        </div>
                        Shuffler
                    </a>
                </li>
            </ul>
        </div>

        <div class="win-content">
            <Identity v-if="tabIndex === 0" />
            <Analysis v-if="tabIndex === 1" />
            <Shuffler v-if="tabIndex === 2" />
        </div>

        <div class="wizard-footer flex">
            <div class="footer-item">
                <input
                    v-if="tabIndex !== 0"
                    type="button"
                    class="btn btn-previous btn-default btn-wd"
                    :value="lblPrevious"
                    @click="previous"
                />
            </div>

            <div class="footer-item">
                <input
                    v-if="tabIndex === 2"
                    type="button"
                    class="btn btn-warning btn-wd"
                    value="Options"
                    @click="showOptions"
                />
            </div>

            <div class="footer-item">
                <input
                    v-if="tabIndex !== 2"
                    type="button"
                    class="btn btn-next btn-fill btn-primary btn-wd"
                    :value="lblNext"
                    @click="next"
                />
            </div>
        </div>
    </form>
</template>

<script>
/* Initialize vuex. */
// import { mapActions, mapGetters } from 'vuex'

/* Import components. */
// import Analysis from './Analysis'
// import Identity from './Identity'
// import Shuffler from './Shuffler'

export default {
    // components: {
    //     Analysis,
    //     Identity,
    //     Shuffler,
    // },
    data: () => {
        return {
            pbWidth: '21%',
            tabIndex: 0,
        }
    },
    computed: {
        // ...mapGetters('wallet', [
        //     'getCoins',
        //     'getMasterSeed',
        // ]),

        lblPrevious() {
            if (this.tabIndex === 1) {
                return 'Identity'
            }

            if (this.tabIndex === 2) {
                return 'Analysis'
            }

            return null
        },

        lblNext() {
            if (this.tabIndex === 0) {
                return 'Analysis'
            }

            if (this.tabIndex === 1) {
                return 'Shuffler'
            }

            return null
        },

    },
    methods: {
        // ...mapActions('wallet', [
        //     'updateCoins',
        // ]),

        // ...mapActions('utils', [
        //     'toast',
        // ]),

        next() {
            switch(this.tabIndex) {
            case 0:
                return this.showAnalysis()
            case 1:
                return this.showShuffler()
            }
        },

        previous() {
            switch(this.tabIndex) {
            case 1:
                return this.showIdentity()
            case 2:
                return this.showAnalysis()
            }
        },

        finish() {
            this.toast(['Done!', 'You shuffle session is complete', 'success'])
        },

        showOptions() {
            this.toast(['Oops!', 'This feature is not ready yet', 'error'])

            const coins = this.getCoins
            console.log('COINS', coins)

            this.updateCoins()
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
         * Show Analysis
         */
        showAnalysis() {
            // return this.previewNotice()

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
            // return this.previewNotice()

            /* Validate master seed. */
            if (!this.getMasterSeed) {
                return this.toast(['Oops!', 'Please choose an Identity to use with Shuffler', 'error'])
            }

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

.flex {
    display: flex;
}

.footer-item {
    flex-basis: 100%;
    text-align: center;
    padding: 0 5px;
}
</style>
