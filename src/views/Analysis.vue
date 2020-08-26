<template>
    <main class="tab-pane" id="shuffler">

        <div class="row">
            <div class="col-xs-4">

                <div class="info-text mode-select">
                    Menu
                </div>

                <div class="row mode-select-container">

                    <div class="col-sm-12 col-sm-offset-0">

                        <div class="col-sm-6">
                            <div
                                class="choice"
                                :class="{ active: menuIndex === 0 }"
                                @click="menuIndex = 0"
                            >
                                <div class="card card-checkboxes card-hover-effect">
                                    <i class="fa fa-user-secret"></i>
                                    <p>Privacy</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div
                                class="choice"
                                :class="{ active: menuIndex === 1 }"
                                @click="menuIndex = 1"
                            >
                                <div class="card card-checkboxes card-hover-effect">
                                    <i class="fa fa-sitemap"></i>
                                    <p>Mapper</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div
                                class="choice"
                                :class="{ active: menuIndex === 2 }"
                                @click="menuIndex = 2"
                            >
                                <div class="card card-checkboxes card-hover-effect">
                                    <i class="fa fa-bar-chart"></i>
                                    <p>Stats</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div
                                class="choice"
                                :class="{ active: menuIndex === 3 }"
                                @click="menuIndex = 3"
                            >
                                <div class="card card-checkboxes card-hover-effect">
                                    <i class="fa fa-info-circle"></i>
                                    <p>Info</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div class="col-xs-8">
                <div class="info-text coin-select">
                    {{menuTitle}}
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
            menuIndex: null,
        }
    },
    computed: {
        menuTitle() {
            switch(this.menuIndex) {
            case 0:
                return 'Privacy Score'
            case 1:
                return 'Transaction Mapper'
            case 2:
                return 'Network Statistics'
            case 3:
                return 'Information Center'
            }

            return null
        },

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

        /* Set menu index. */
        this.menuIndex = 2
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
.mode-select, .coin-select {
    font-size: 2.0em;
}
.mode-select-container {
    margin-top: -30px;
}

.choice.active {
    box-shadow: 0px 12px 17px -7px rgba(0, 0, 0, 0.3);
    -webkit-transform: translateY(-10px);
    -moz-transform: translateY(-10px);
    -o-transition: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
}
.choice.active:hover {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -o-transition: translateY(0px);
    -ms-transform: translateY(0px);
    transform: translateY(0px);
}
</style>
