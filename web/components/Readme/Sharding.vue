<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="flex flex-col gap-5">
        <h2 class="text-3xl font-bold text-fuchsia-700">
            Sharding: A 256-bit Scaling Solution
        </h2>

        <p>
            Commitment Centers (CCs) are sharded to maximum scalability.
        </p>

        <p>
            There are at least 2,048 (sharded) CCs deployed across the network to offer maximum scalability on the host's <NuxtLink to="https://nexa.wiki/supernet" target="_blank" class="text-blue-500 font-bold hover:underline">Supernet</NuxtLink>.
            Additional CCs may be deployed to meet the growing needs of the Host's network.
        </p>

        <p>
            Each CC is optimized to support at least 10x transactions per second (TPS).
            The total throughput, for all CCs, is estimated to be sustainable up to at least 20,000 TPS.
        </p>

        <p>
            Additional CCs may be deployed to meet the growing needs of the Host's network.
        </p>
    </main>
</template>
