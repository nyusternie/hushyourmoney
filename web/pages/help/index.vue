<script setup lang="ts">
useHead({
    title: `Support Center — Hush Your Money`,
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
    <main class="flex flex-col gap-4">
        <h1 class="text-sky-500 text-5xl font-light italic">
            Support Center
        </h1>

        <p>
            While Bitcoin is considered to be a privacy-oriented system, the blockchain is open to analyze by anyone, and there are numerous transaction tracing tools like Chainalysis, Coinfirm, Elliptic, CipherTrace, and Crystal.
            They're all not free, and Bitcoin users rarely have a chance to see how deep the rabbit hole goes.
            <strong>We start with a simple transaction scoring tool, and will soon expand this even further.</strong>
            We'll provide this service for free as we hope it'd help Bitcoin users to take some of their privacy back.
        </p>

        <h4>ROADMAP</h4>

        <ol>
            <li>Full transaction history</li>
        </ol>

        <p>
            The rapid evolution of the cryptocurrency industry continues to hold the attention of governments and regulators worldwide.
            Cypherpunks' dream of free and independent payment methods seems be a notion from light years ago.
            Here and now have to deal with the harsh reality.
            <strong>The regulation of cryptocurrencies is following suit of how the bank industry is being controlled.</strong>
        </p>

        <hr />

        <h2 class="text-gray-500 text-4xl font-bold">
            Guides and Tutorials
        </h2>

        <NuxtLink to="/help/bch/wallet-integration" class="text-blue-500 text-xl font-medium hover:text-blue-400 hover:underline">
            Bitcoin Cash Wallet Integration
        </NuxtLink>
    </main>
</template>
