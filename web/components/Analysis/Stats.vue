<template>
    <main>
        <div class="info-text menu-title">
            History &amp; Statistics
        </div>

        <div class="row">
            <div class="col-xs-12 col-sm-7">
                <small class="text-muted">
                    Everything you need to know about keeping your privacy safe on-chain is at your fingertips.
                </small>
            </div>

            <div class="col-xs-12 col-sm-5 mt-1">
                <div class="form-group">
                    <select class="form-control" disabled>
                        <option value="fusion">CashFusion</option>
                        <option value="shuffle" selected>CashShuffle</option>
                        <option value="blender">Nito Blender</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row" v-if="poolInfo">
            <div class="col-xs-6 text-right">
                Connections
            </div>

            <div class="col-xs-6">
                {{poolInfo.connections}}
            </div>

            <div class="col-xs-6 text-right">
                Pool Size
            </div>

            <div class="col-xs-6">
                {{poolInfo.poolSize}}
            </div>

            <br /><br /><hr />

            <div class="col-xs-6 text-right">
                0.0001 BCH
            </div>

            <div class="col-xs-6">
                {{getMembers(10000)}} members
            </div>

            <div class="col-xs-6 text-right">
                0.001 BCH
            </div>

            <div class="col-xs-6">
                {{getMembers(100000)}} members
            </div>

            <div class="col-xs-6 text-right">
                0.01 BCH
            </div>

            <div class="col-xs-6">
                {{getMembers(1000000)}} members
            </div>

            <div class="col-xs-6 text-right">
                0.1 BCH
            </div>

            <div class="col-xs-6">
                {{getMembers(10000000)}} members
            </div>

            <div class="col-xs-6 text-right">
                <strong class="text-danger">1 BCH</strong>
            </div>

            <div class="col-xs-6">
                <strong class="text-danger">{{getMembers(100000000)}} members</strong>
            </div>

            <div class="col-xs-6 text-right">
                10 BCH
            </div>

            <div class="col-xs-6">
                {{getMembers(1000000000)}} members
            </div>

            <div class="col-xs-6 text-right">
                100 BCH
            </div>

            <div class="col-xs-6">
                {{getMembers(10000000000)}} members
            </div>

            <div class="col-xs-6 text-right">
                1,000 BCH
            </div>

            <div class="col-xs-6">
                {{getMembers(100000000000)}} members
            </div>

        </div>

        <!-- <pre v-html="poolInfo" /> -->
    </main>
</template>

<script>
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

    },
    created: function () {
        /* Update pool info. */
        this.updatePoolInfo()

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
