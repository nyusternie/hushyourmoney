<script setup lang="ts">
useHead({
    title: `Sponsors — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money makes spending safu.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const route = useRoute()
console.log('ROUTE', route)

const networkid = route?.params?.pageid[0]
console.log('NETWORK ID', networkid)

const campaignid = route?.params?.pageid[1]
console.log('CAMPAIGN ID', campaignid)

const campaigns = ref(null)
const campaignTitle = ref(null)
const donationAddress = ref(null)
const networkTitle = ref(null)

const init = () => {
    /* Handle campaign id. */
    switch(campaignid) {
    case 'seekers':
        campaignTitle.value = 'Privacy Seekers'
        break
    case 'masters':
        campaignTitle.value = 'Privacy Masters'
        break
    case 'gurus':
        campaignTitle.value = 'Privacy Gurus'
        break
    }

    /* Handle network id. */
    switch(networkid) {
    case 'btc':
        networkTitle.value = 'Bitcoin'
        break
    case 'bch':
        networkTitle.value = 'Bitcoin Cash'
        break
    case 'nexa':
        networkTitle.value = 'Nexa'
        break
    }

    /* Initialize ALL campaigns handler. */
    campaigns.value = {}

    /* Initialize Seekers handler. */
    campaigns.value['seekers'] = {}

    /* Initialize Masters handler. */
    campaigns.value['masters'] = {}

    /* Initialize Gurus handler. */
    campaigns.value['gurus'] = {}

    /* Initialize Seekers (Bitcoin) handler. */
    campaigns.value['seekers']['btc'] = {
        address: 'bitcoin:3Gwb2zrg64REcnDFdGHeAUMuibfpk932Kr',
        round: 1,
        goal: 0,
        donated: 0,
        hasAirdrop: true,
        createdAt: 0,
        updatedAt: 0,
    }

    /* Initialize Seekers (Bitcoin Cash) handler. */
    campaigns.value['seekers']['bch'] = {
        address: 'bitcoincash:qrqdff68n8wm757kvfumylxs47tud3fuvqz3h6depv',
        round: 1,
        goal: 0,
        donated: 0,
        hasAirdrop: true,
        createdAt: 0,
        updatedAt: 0,
    }

    /* Initialize Seekers (Nexa) handler. */
    campaigns.value['seekers']['nexa'] = {
        address: 'nexa:nqtsq5g5fxezfwrhc323dm9npzy77lay7p26x903hkk4u8zu',
        round: 1,
        goal: 0,
        donated: 0,
        hasAirdrop: true,
        createdAt: 0,
        updatedAt: 0,
    }

    campaigns.value['masters']['btc'] = {
        address: 'bitcoin:3EQELPmJREqt3gVyELGYFnzLxV6Lnthudk',
        round: 1,
        goal: 0,
        donated: 0,
        hasAirdrop: true,
        createdAt: 0,
        updatedAt: 0,
    }
    campaigns.value['masters']['bch'] = {}
    campaigns.value['masters']['nexa'] = {}

    campaigns.value['gurus']['btc'] = {
        address: 'bitcoin:34XzM3e3Tsf4wLGGcFCPRyoTP1NF6HF53z',
        round: 1,
        goal: 0,
        donated: 0,
        hasAirdrop: true,
        createdAt: 0,
        updatedAt: 0,
    }
    campaigns.value['gurus']['bch'] = {}
    campaigns.value['gurus']['nexa'] = {}

    /* Set donation address. */
    donationAddress.value = campaigns.value[campaignid][networkid].address

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
            Sponsors for {{networkTitle}}
        </h1>

        <h2 class="text-5xl font-light italic">
            {{campaignTitle}}
        </h2>

        <section class="flex flex-col gap-4">
            <h2 class="text-rose-500 text-2xl font-bold uppercase">
                Do Not Send From ANY Exchange
            </h2>

            <p>
                Rewards tokens, ie $HUSH, will be sent directly to Sponsors point of delivery.
                In order to GUARANTEE receipt of ALL rewards, please send from a Wallet/Address that you HOLD THE KEYS.
            </p>

            <div>
                0 of 27 campaigns completed for $HUSH airdrop!
            </div>
        </section>

        <section>
            <p>
                For every 6 $HUSH tokens airdropped:

                <ol class="py-5 pl-10 list-disc">
                    <li>Round 1 Sponsors will receive 3x $HUSH</li>
                    <li>Round 2 Sponsors will receive 2x $HUSH</li>
                    <li>Round 3 Sponsors will receive 1x $HUSH</li>
                </ol>
            </p>
        </section>

        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id eius voluptatem minus natus at eveniet dolorum eos mollitia, maxime animi excepturi harum omnis illum odit recusandae pariatur! Unde, explicabo molestias.
        </p>

        <NuxtLink :to="donationAddress" v-if="campaigns" class="p-5 flex flex-col gap-3 bg-sky-100 border-4 border-sky-300 rounded-3xl shadow">
            <h3 class="text-gray-500 text-3xl font-light tracking-widest">
                {{networkTitle}}
            </h3>

            <h3 class="font-medium tracking-tight">
                {{donationAddress}}
            </h3>
        </NuxtLink>

        <section v-if="campaigns">
            <h2>
                Privacy Masters
            </h2>

            <h3>
                Bitcoin
            </h3>

            <h3>
                {{campaigns.masters.btc.address}}
            </h3>

            <h3>
                Bitcoin Cash
            </h3>

            <h3>
                bitcoincash:qzl4kq5wapcpae9zc7sql5hz5xmj8fqrqs5c7kgywy
            </h3>

            <h3>
                Nexa
            </h3>

            <h3>
                nexa:nqtsq5g5egqz48van0zjx2xtxl38ec3czapdtryewwe5he0z
            </h3>
        </section>

        <section v-if="campaigns">
            <h2>
                Privacy Gurus
            </h2>

            <h3>
                Bitcoin
            </h3>

            <h3>
                {{campaigns.gurus.btc.address}}
            </h3>

            <h3>
                Bitcoin Cash
            </h3>

            <h3>
                bitcoincash:qqfk0ag6tnzgxevfzp9ma7qw0npd9vwe65v40e22a9
            </h3>

            <h3>
                Nexa
            </h3>

            <h3>
                nexa:nqtsq5g5ya3jv0tv36je7d8ld8vsds0vfqmt0g9lryhqnv6m
            </h3>
        </section>
    </main>
</template>
