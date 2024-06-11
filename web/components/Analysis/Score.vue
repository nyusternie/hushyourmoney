<template>
    <main>
        <div class="info-text menu-title">
            Privacy Score
        </div>

        <small class="text-muted">
            Quickly and trustlessly generate a comprehensive privacy score for your entire Bitcoin wallet or just a single transaction.
        </small>

        <div class="form-group mt-2">
            <input
                type="text"
                class="form-control"
                placeholder="Enter an (address, txid or xpub) to begin"
                v-model="search"
            />

            <input
                v-if="showResults"
                type="button"
                class="btn btn-danger mt-1"
                value="Stop searching"
                @click="stop"
            />
            <input
                type="button"
                class="btn mt-1"
                :class="{ 'btn-warning': showResults, 'btn-primary': !showResults }"
                :value="showResults ? 'Reset all' : 'Start scoring'"
                @click="start"
            />
        </div>

        <div v-if="showResults">
            <div class="row">
                <div class="col-xs-12">
                    Current Balance
                </div>

                <div class="col-xs-12">
                    <h3 class="mt-0">3.42891212 BCH</h3>
                </div>

                <div class="col-xs-6">
                    USD Value:
                </div>
                <div class="col-xs-6 text-right">
                    $7,341.30
                </div>
            </div>

            <hr />

            <div class="row mt-3">
                <div class="col-xs-12">
                    Total Transactions
                </div>

                <div class="col-xs-12">
                    <h3 class="mt-0">70</h3>
                </div>

                <div class="col-xs-6">
                    Turnover
                </div>
                <div class="col-xs-6 text-right">
                    128.294130 <small>BCH</small>
                </div>

                <div class="col-xs-6">
                    Total Inflow
                </div>
                <div class="col-xs-6 text-right">
                    65.861521 <small>BCH</small>
                </div>

                <div class="col-xs-6">
                    Total Outflow
                </div>
                <div class="col-xs-6 text-right">
                    62.432609 <small>BCH</small>
                </div>
            </div>

            <hr />

            <div class="row mt-3">
                <div class="col-xs-6">
                    Total Inputs

                    <div class="row">
                        <div class="col-xs-5">
                            Avg Inflow
                        </div>
                        <div class="col-xs-7 text-right">
                            1.829487 <small>BCH</small>
                        </div>

                        <div class="col-xs-5">
                            Biggest
                        </div>
                        <div class="col-xs-7 text-right">
                            14.505463 <small>BCH</small>
                        </div>

                        <div class="col-xs-5">
                            Smallest
                        </div>
                        <div class="col-xs-7 text-right">
                            0.020000 <small>BCH</small>
                        </div>
                    </div>
                </div>

                <div class="col-xs-6">
                    Total Outputs
                </div>
            </div>
        </div>

    </main>
</template>

<script>
/* Initialize vuex. */
// import { mapActions } from 'vuex'

export default {
    components: {
        //
    },
    data: () => {
        return {
            poolInfo: null,
            search: null,
            showResults: null,
        }
    },
    computed: {
        //
    },
    methods: {
        // ...mapActions('utils', [
        //     'toast',
        // ]),

        async updatePoolInfo() {
            /* Set target. */
            const target = `https://shuffle.servo.cash:8080/stats`

            /* Request pool info. */
            const results = await fetch(target)

            const json = results.json()

            console.log('POOL INFO', json)

            this.poolInfo = json.body
        },

        getMembers(_poolid) {
            /* Find pool. */
            const pool = this.poolInfo.pools
                .find(pool => pool.amount === _poolid && pool.version === 300)

            /* Validate pool. */
            if (pool) {
                return pool.members
            } else {
                return 0
            }
        },

        start() {
            this.toast(['Oops!', 'This feature is not ready yet', 'error'])
        },

        stop() {
            this.showResults = !this.showResults
        },

    },
    created: function () {
        /* Update pool info. */
        this.updatePoolInfo()

        /* Set results flag. */
        this.showResults = false

    },
    mounted: function () {
        //
    },
    beforeDestroy() {
        console.log('Stopping pool updates..')
        // TODO: Stop refreshing pool data.
    },
}
</script>

<style scoped>
.menu-title {
    font-size: 2.0em;
}
</style>
