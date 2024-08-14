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
            Table of Contents
        </h2>

        <p class="-mt-5 pl-2 text-xs text-gray-500">
            Navigate this README guide with the links below:
        </p>

        <ol class="pl-10 list-disc leading-9 text-lg tracking-wide">
            <li>Introduction</li>
            <li>Never Go FULL Privacy</li>
            <li>(Transaction) Guardians</li>
            <li>Incognito Address Format</li>
            <li>Inscriptions: OP_DATA or OP_RETURN</li>
            <li>Commitment Centers: A Universal Truth</li>
            <li>Sharding: A 256-bit Scaling Solution</li>
            <li>Supernets: PoW Layer 1+ (Plus)</li>
            <li>CoinJoins: à la CashFusion</li>
            <li>Flux Cloud</li>
            <li>Counterparty and Protocol Discovery (CAPD)</li>
        </ol>
    </main>
</template>
