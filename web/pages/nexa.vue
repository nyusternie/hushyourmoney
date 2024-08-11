<script setup lang="ts">
useHead({
    title: `Nexa — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money makes spending safu.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

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
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Nexa
        </h1>

        <p>
            Nexa is the most scalable decentralized blockchain ever built on UTXO Layer-1.
            Offering smart-contracts, native token services &amp; instant transactions with the scalability to handle over 10 billion transactions per day.
        </p>
    </main>
</template>
