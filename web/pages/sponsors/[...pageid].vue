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
            Sponsors — {{ networkid }} — {{ campaignid }}
        </h1>

        <section class="flex flex-col gap-4">
            <h2 class="text-rose-500 text-2xl font-bold uppercase">
                Do Not Send From ANY Exchange
            </h2>

            <p>
                Rewards tokens, ie $HUSH, will be sent directly to Sponsors point of delivery.
                In order to GUARANTEE receipt of ALL rewards, please send from a Wallet/Address that you HOLD THE KEYS.
            </p>
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

        <section>
            <h2>
                Bitcoin Seekers Round 1
            </h2>

            <h3>
                3FDveRn9A2cdqJqy7LDQu48crEfYLJhYDV
            </h3>
        </section>

        <section>
            <h2>
                Bitcoin Cash Seekers Round 1
            </h2>

            <h3>
                qzdyw35wslfrk6qjrcva2ujzkwv5a6ufl5uhg5xjkg
            </h3>
        </section>

        <section>
            <h2>
                Nexa Seekers Round 1
            </h2>

            <h3>
                nexa:XXX
            </h3>
        </section>
    </main>
</template>
