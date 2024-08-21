<script setup lang="ts">
useHead({
    title: `API v1 — Hush Your Money`,
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
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-12">
        <section class="flex flex-col gap-4">
            <h1 class="text-5xl font-medium">
                HYM API v1
            </h1>

            <p class="text-gray-600 text-2xl italic font-light leading-9">
                <span class="block py-2 text-3xl text-fuchsia-600 font-medium">Are you a developer?</span>

                Easily integrate ALL of the <span class="text-fuchsia-600 font-medium">Free and Open Source (FOSS)</span> Hush Your Money (HYM) protocols natively into your Crypto wallet and/or application;
                then conveniently offer your community of users the leading set of <span class="text-fuchsia-600 font-medium">Financial Privacy Protections</span> the world has to offer.
            </p>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-sky-600 text-2xl font-bold tracking-widest uppercase">
                Requests
            </h2>

            <h3 class="text-2xl font-bold text-amber-500">
                - getClubs
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - getFusions
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - getProfiles
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - getStats
            </h3>

        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-sky-600 text-2xl font-bold tracking-widest uppercase">
                Actions
            </h2>

            <h3 class="text-2xl font-bold text-amber-500">
                - addComponents <small class="text-base text-amber-400">( PublicKey, Component[] )</small>
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - generateAddress
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - generateProof
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - submitComponents <small class="text-base text-amber-400">( PublicKey, Component[] )</small>
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - verifyProof
            </h3>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-sky-600 text-2xl font-bold tracking-widest uppercase">
                Data Types
            </h2>

            <h3 class="text-2xl font-bold text-amber-500">
                - Club
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - Component
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - Fusion
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - PrivateTransaction
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - Profile
            </h3>

            <h3 class="text-2xl font-bold text-amber-500">
                - PublicKey
            </h3>

        </section>
    </main>
</template>
