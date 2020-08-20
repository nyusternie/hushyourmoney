<template>
    <main class="tab-pane" id="shuffler">

        <div class="row">
            <div class="col-xs-4">

                <div class="info-text mode-select">
                    Shuffle Mode
                </div>

                <div class="row mode-select-container">

                    <div class="col-sm-12 col-sm-offset-0">

                        <div class="col-sm-6">
                            <div class="choice active">
                                <div class="card card-checkboxes card-hover-effect">
                                    <i class="fa fa-sliders"></i>
                                    <p>Manual</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="choice">
                                <div class="card card-checkboxes card-hover-effect">
                                    <i class="fa fa-magic"></i>
                                    <p>Auto</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div class="col-xs-8">
                <div class="info-text coin-select">
                    Coin Selection
                </div>

                <div class="row" v-if="poolInfo">
                    <div class="col-sm-3 col-sm-offset-2 text-right">
                        Connections
                    </div>

                    <div class="col-sm-7">
                        {{poolInfo.connections}}
                    </div>

                    <div class="col-sm-3 col-sm-offset-2 text-right">
                        Pool Size
                    </div>

                    <div class="col-sm-7">
                        {{poolInfo.poolSize}}
                    </div>

                    <br /><br /><hr />

                    <div class="col-sm-3 col-sm-offset-2 text-right">
                        0.0001 BCH
                    </div>

                    <div class="col-sm-7">
                        {{getMembers(10000)}} members
                    </div>

                    <div class="col-sm-3 col-sm-offset-2 text-right">
                        0.001 BCH
                    </div>

                    <div class="col-sm-7">
                        {{getMembers(100000)}} members
                    </div>

                    <div class="col-sm-3 col-sm-offset-2 text-right">
                        0.01 BCH
                    </div>

                    <div class="col-sm-7">
                        {{getMembers(1000000)}} members
                    </div>

                    <div class="col-sm-3 col-sm-offset-2 text-right">
                        0.1 BCH
                    </div>

                    <div class="col-sm-7">
                        {{getMembers(10000000)}} members
                    </div>

                    <div class="col-sm-3 col-sm-offset-2 text-right">
                        <strong class="text-danger">1 BCH</strong>
                    </div>

                    <div class="col-sm-7">
                        <strong class="text-danger">{{getMembers(100000000)}} members</strong>
                    </div>

                    <div class="col-sm-3 col-sm-offset-2 text-right">
                        10 BCH
                    </div>

                    <div class="col-sm-7">
                        {{getMembers(1000000000)}} members
                    </div>

                    <div class="col-sm-3 col-sm-offset-2 text-right">
                        100 BCH
                    </div>

                    <div class="col-sm-7">
                        {{getMembers(10000000000)}} members
                    </div>

                    <div class="col-sm-3 col-sm-offset-2 text-right">
                        1,000 BCH
                    </div>

                    <div class="col-sm-7">
                        {{getMembers(100000000000)}} members
                    </div>

                </div>

                <!-- <pre v-html="poolInfo" /> -->
            </div>
        </div>

    </main>
</template>

<script>
/* Import modules. */
import superagent from 'superagent'

export default {
    components: {
        //
    },
    data: () => {
        return {
            poolInfo: null,
        }
    },
    computed: {
        //
    },
    methods: {
        async updatePoolInfo() {
            /* Set target. */
            const target = `https://shuffle.servo.cash:8080/stats`

            /* Request pool info. */
            const results = await superagent.get(target)
            console.log('POOL INFO', results)

            this.poolInfo = results.body

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

    },
    created: function () {
        /* Update pool info. */
        this.updatePoolInfo()
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
.mode-select, .coin-select {
    font-size: 2.0em;
}
.mode-select-container {
    margin-top: -30px;
}
</style>
