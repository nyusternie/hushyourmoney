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
        </div>

        <div>
            waiting for results...
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
