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
            There are at least 2,048 (sharded) CCs deployed across the network to offer maximum scalability on the host's
            <NuxtLink to="https://nexa.wiki/supernet" target="_blank" class="text-blue-500 font-bold hover:underline">
                Supernet

                <svg class="inline h-5 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                </svg>
            </NuxtLink>.
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
