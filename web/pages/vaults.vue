<script setup lang="ts">
useHead({
    title: `Vaults — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money makes spending safu.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const vaults = ref(null)

const init = async () => {
    /* Request all vaults. */
    vaults.value = await $fetch('/_vaults')
        .catch(err => console.error(err))
    console.log('POOLS', vaults.value)
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Vaults
        </h1>

        <p>
            Instantly and permissionlessly exchange between $HUSH and $NITO tokens.
        </p>

        <pre v-if="vaults">{{vaults}}</pre>
    </main>
</template>
