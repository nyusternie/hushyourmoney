<script setup lang="ts">
definePageMeta({
    layout: 'admin',
})

useHead({
    title: `Liquidity Provider — Hush Your Money`,
    meta: [
        { name: 'description', content: `Provide additional liquidity & anonymity to the Hush Your Money community.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'
const System = useSystemStore()
const Wallet = useWalletStore()

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
            Liquidity Provider
        </h1>

        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id eius voluptatem minus natus at eveniet dolorum eos mollitia, maxime animi excepturi harum omnis illum odit recusandae pariatur! Unde, explicabo molestias.
        </p>

        <section class="py-10 flex justify-center">
            <Loading v-if="Wallet.isLoading" />

            <WalletSetup v-else-if="!Wallet.isReady" class="w-3/4" />

            <AdminChooseWallet v-else class="w-3/4" />

        </section>
    </main>
</template>
