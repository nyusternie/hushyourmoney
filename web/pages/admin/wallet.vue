<script setup lang="ts">
definePageMeta({
    layout: 'admin',
})

useHead({
    title: `Club Wallet — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money makes spending safu.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const wallet = ref(null)

const init = async () => {
    /* Request all wallet. */
    wallet.value = await $fetch('/_wallet')
        .catch(err => console.error(err))
    console.log('WALLET', wallet.value)
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
            Club Wallet
        </h1>

        <p>
            This is an "ephemeral" wallet used for various purposes in the operation of this Club.
            Please DO NOT add funds to this wallet, as they will be LOST FOREVER at the end of this session.
        </p>

        <pre v-if="wallet">{{wallet}}</pre>
    </main>
</template>
