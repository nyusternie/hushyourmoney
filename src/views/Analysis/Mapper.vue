<template>
    <main>
        <div class="info-text menu-title">
            Transaction Mapper
        </div>

        <small class="text-muted">
            Quickly and trustlessly discover the full transaction history of ANY "bitcoin" (ie UTXO) back to its original coinbase.
        </small>

        <div class="form-group mt-2">
            <input
                type="text"
                class="form-control"
                placeholder="Enter a transaction id to begin mapping"
                v-model="txid"
            />

            <input
                v-if="showResults"
                type="button"
                class="btn btn-danger mt-1"
                value="Stop mapping"
                @click="showResults = !showResults"
            />
            <input
                type="button"
                class="btn mt-1"
                :class="{ 'btn-warning': showResults, 'btn-primary': !showResults }"
                :value="showResults ? 'Reset all' : 'Start mapping'"
                @click="showResults = !showResults"
            />
        </div>

        <div v-if="showResults">
            <div>
                waiting for results...
            </div>
        </div>

    </main>
</template>

<script>
/* Import modules. */
// import superagent from 'superagent'

export default {
    components: {
        //
    },
    data: () => {
        return {
            poolInfo: null,
            txid: null,
            showResults: null,
        }
    },
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        //

    },
    mounted: function () {
        //
    },
    beforeDestroy() {
        //
    },
}
</script>

<style scoped>
.menu-title {
    font-size: 2.0em;
}
</style>
