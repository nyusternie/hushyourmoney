<script setup lang="ts">
definePageMeta({
    layout: 'info',
})

useHead({
    title: `Whitepaper — Hush Your Money`,
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
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-8">
        <h1 class="text-center text-fuchsia-700 text-8xl font-light italic tracking-tighter">
            The Whitepaper
        </h1>

        <h3 class="px-10 text-4xl text-fuchsia-900 text-center tracking-widest font-light italic leading-[60px]">
            tl;dr — a practical, drop-in privacy solution for UTXO-based networks
        </h3>

        <section class="flex justify-center"><pre class="text-lg text-fuchsia-700 font-bold tracking-widest leading-8">
    FORM : Scalable + Secure + Decentralized
FUNCTION : Tokenized Assets + Smart Contracts
 FREEDOM : (Always-on) Private Transactions
        </pre></section>

        <p>
            Hush is a Nexa L1+ network for privacy conscious individuals.
            Hush aims to offer the MOST functional network while protecting the anonymity of its users.
        </p>

        <NuxtLink to="https://github.com/BCHDEVCON3/hush-your-money#hush-your-money" target="_blank" class="group p-7 flex flex-row justify-around bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 border-4 border-fuchsia-700 rounded-3xl shadow hover:from-fuchsia-100 hover:to-fuchsia-200">
            <h3 class="text-4xl text-fuchsia-100 font-bold text-center group-hover:text-fuchsia-600">
                BCHDEVCON3 Hackathon
                <span class="block text-8xl uppercase">Winner!</span>
            </h3>

            <img src="~/assets/winner.gif" class="-mt-8 -mb-8 h-48 w-auto" />
        </NuxtLink>

        <section>
            <h2 class="text-4xl font-bold text-gray-500">
                Nexa L1+ Network
            </h2>

            <p>
                Hush Network is powered by the Nexa 100K+ TPS (L1) blockchain.
            </p>
        </section>

        <section>
            <h2 class="text-4xl font-bold text-gray-500">
                Never Go FULL Privacy
            </h2>

            <p>
                Unlike MOST privacy coins/networks, Hush DOES NOT aim for TOTAL privacy.
                Amounts and Participants are 100% hidden by default, and everything ELSE remains transparent;
                allowing for MORE PRACTICAL applications to be built on top of the network.
            </p>
        </section>

        <section>
            <h2 class="text-4xl font-bold text-gray-500">
                Transaction Guardians
            </h2>

            <p>
                Guardians are a managed set of approx. 1,024 "Community UTXOs".
                Guardians are <NuxtLink to="https://nexa.sh/contracts" target="_blank" class="text-blue-500 font-medium hover:underline">Wise Contracts</NuxtLink> that protect your privacy during the transaction process by masking:

                <ul class="py-3 pl-10 list-disc">
                    <li>the Sender</li>
                    <li>the Receiver</li>
                    <li>the Asset Amount</li>
                </ul>
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <h3 class="font-medium text-sm text-rose-500">
                <span class="block font-bold">NOTE:</span>
                The Asset Identifier is NOT masked and is known for EVERY transaction.
                <br />This is a FEATURE!
            </h3>

            <h3 class="font-medium text-sm text-rose-500">
                <span class="block font-bold">ALSO NOTE:</span>
                IP address / Location obfuscation is delegated to 3rd-parties (eg. VPN and/or TOR)
                <br />This is also a FEATURE!
            </h3>
        </section>

    </main>
</template>
