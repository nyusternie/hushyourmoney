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
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            API v1
        </h1>

        <p class="text-2xl italic font-light leading-9">
            Easily integrate all of the <span class="font-bold">Hush Protocols</span> natively into your Crypto wallet and/or application;
            then conveniently offer your community of users the leading privacy protections available.
        </p>

        <h2 class="text-gray-500 text-2xl font-bold tracking-widest">
            Actions
        </h2>

        <h3 class="text-2xl font-bold text-amber-500">
            - addComponent
        </h3>

        <h3 class="text-2xl font-bold text-amber-500">
            - generateAddress
        </h3>

        <h3 class="text-2xl font-bold text-amber-500">
            - generateProof
        </h3>

        <h3 class="text-2xl font-bold text-amber-500">
            - verifyProof
        </h3>
    </main>
</template>
