<script setup lang="ts">
/* Import modules. */
import BCHJS from '@psf/bch-js'

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v5/'

const runtimeConfig = useRuntimeConfig()
const jwtAuthToken = runtimeConfig.public.PSF_JWT_AUTH_TOKEN

const balances = ref(null)
const cashAddress = ref(null)
const utxos = ref(null)

// Instantiate bch-js based on the network.
const bchjs = new BCHJS({
    restURL: BCHN_MAINNET,
    apiToken: jwtAuthToken,
})
// console.log('bchjs', bchjs)


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

const init = async () => {
    /* Initialize locals. */
    let childNode
    let masterHdnode
    let response
    let rootSeed

    utxos.value = []

    /* Set root seed. */
    rootSeed = await bchjs.Mnemonic.toSeed(Wallet.mnemonic)
    // console.log('rootSeed', rootSeed)

    /* Set HD master node. */
    masterHdnode = bchjs.HDNode.fromSeed(rootSeed)
    // console.log('masterHdnode', masterHdnode);

    /* Set child node. */
    childNode = masterHdnode.derivePath(`m/44'/145'/0'/0/0`)
    // console.log('childNode', childNode)

    /* Set Bitcoin Cash address. */
    cashAddress.value = bchjs.HDNode.toCashAddress(childNode)
    // console.log('cashAddress', cashAddress.value)

    response = await bchjs.Electrumx.utxo(cashAddress.value)
    // console.log('RESPONSE', response)

    /* Set UTXOs. */
    utxos.value = response.utxos
    console.log('UTXOS', JSON.stringify(utxos.value, null, 2))

    /* Request balances. */
    response = await bchjs.Electrumx.balance(cashAddress.value)

    /* Validate response. */
    if (response.success) {
        /* Set balances. */
        balances.value = response.balance
        console.log('BALANCES', balances.value)
    }

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
            Liquidity Provider
        </h1>

        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id eius voluptatem minus natus at eveniet dolorum eos mollitia, maxime animi excepturi harum omnis illum odit recusandae pariatur! Unde, explicabo molestias.
        </p>

        <section class="w-full w-3/4 py-10 flex justify-center">
            <Loading v-if="Wallet.isLoading" />

            <WalletSetup v-else-if="!Wallet.isReady" />

            <WalletWelcome v-else
                :balances="balances"
                :cashAddress="cashAddress"
                :utxos="utxos"
            />
        </section>
    </main>
</template>
