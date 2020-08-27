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
        </div>

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

        <div class="row mt-3">
            <div class="col-xs-12">
                Total Transactions
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-xs-6">
                Total Inputs
            </div>

            <div class="col-xs-6">
                Total Outputs
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
            search: null,
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
