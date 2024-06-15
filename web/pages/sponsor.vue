<script setup lang="ts">
useHead({
    title: `Sponsor Us — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money developers greatly appreciate your support.` }
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
            Sponsor Us
        </h1>

        <p>
            Your support is SOOOO greatly appreciated!
        </p>

        <section>
            <h2>
                Goal #1 - New Tiers
            </h2>

            <ol class="pl-10 list-disc">
                <li>BTC: 0.1 | 1.0</li>
                <li>BCH: 10 | 100</li>
                <li>NEXA: 1B | 10B</li>
            </ol>

            <NuxtLink to="https://causes.cash" target="_blank">
                Open Campaign Page
            </NuxtLink>
        </section>

        <section>
            <h2>
                Goal #2 - Hardware Wallets
            </h2>

            <ol class="pl-10 list-disc">
                <li>Trezor / OneKey</li>
                <li>Ledger??</li>
            </ol>

            <NuxtLink to="https://causes.cash" target="_blank">
                Open Campaign Page
            </NuxtLink>
        </section>

        <section>
            <h2>
                Goal #3 - Native Apps + SDKs
            </h2>

            <ol class="pl-10 list-disc">
                <li>Android mobile app</li>
                <li>iOS mobile app</li>
                <li>Windows desktop app</li>
                <li>Mac desktop app</li>
                <li>Linux desktop app</li>
            </ol>

            <NuxtLink to="https://causes.cash" target="_blank">
                Open Campaign Page
            </NuxtLink>
        </section>
    </main>

    <Footer />
</template>
