<script setup lang="ts">
useHead({
    title: `Tiers — Hush Your Money`,
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
            Tiers
        </h1>

        <p>
            72 tiers are available to offer the greatest anonymity protection to <NuxtLink to="/help/guests" class="text-blue-500 font-normal hover:underline">Club Guests</NuxtLink>.
        </p>
    </main>
</template>
