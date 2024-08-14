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
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-16">
        <h1 class="text-center text-fuchsia-700 text-8xl font-light italic tracking-tighter">
            The Whitepaper
        </h1>

        <h3 class="-mt-12 px-10 text-4xl text-fuchsia-900 text-center tracking-widest font-light italic leading-[60px]">
            tl;dr — a practical, drop-in privacy solution for UTXO-based networks
        </h3>

        <section class="-mt-12 flex justify-center"><pre class="text-lg text-fuchsia-700 font-bold tracking-widest leading-8">
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

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
                Nexa L1+ Network
            </h2>

            <p>
                Hush Network is powered by the Nexa 100K+ TPS (L1) blockchain.
            </p>

            <ol class="py-3 pl-10 list-disc">
                <li>BigNum support for ZK math primitives</li>
            </ol>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
                Never Go FULL Privacy
            </h2>

            <p>
                Unlike MOST privacy coins/networks, Hush DOES NOT aim for TOTAL privacy.
                Amounts and Participants are 100% hidden by default, and everything ELSE remains transparent;
                allowing for MORE PRACTICAL applications to be built on top of the network.
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
                (Transaction) Guardians
            </h2>

            <p>
                Guardians are a managed set of approx. 1,024 "Community UTXOs".
                Guardians are <NuxtLink to="https://nexa.sh/contracts" target="_blank" class="text-blue-500 font-medium hover:underline">Wise Contracts</NuxtLink> that protect your privacy during the transaction process by masking:

                <ul class="py-3 pl-10 list-disc">
                    <li>the Sender</li>
                    <li>the Receiver</li>
                    <li>the Asset Identifier</li>
                    <li>the Transfer Amount</li>
                    <li class="line-through">the Sender's Location</li>
                </ul>
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <h3 class="font-medium text-sm text-rose-500">
                <span class="block font-bold uppercase">PLease Note:</span>
                Location (ie IP address) obfuscation is delegated to 3rd-parties (eg. VPN and/or TOR) providers.
                <span class="block text-lg italic">This is a FEATURE!</span>
                Hush has been specifically designed to support the greatest number of Wallet integrations &amp; compatibilities across the Crypto ecosystem.
                Hush aims to meet the primary needs for 99% of users, without sacrificing privacy!
            </h3>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
                Hush Address Format
            </h2>

            <h3 class="text-xl font-bold tracking-widest">
                hush:nqtsq5g5sp33aj07d808w8xvv7kuarwcrv3z2fvskw2ej7dj
            </h3>

            <p>
                An address format that's very easy on the eyes.
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
                Nexa <code class="text-amber-500 italic">OP_DATA</code> Inscription
            </h2>

<pre class="text-sm">
04 HUSH (protocol id)
20 921aa05b86a1bc9dc1d99583e2932657696e82cf9051219e3dccaeecfd463ee9 (hush tx idem)
14 875a1f6d7a6e33e27d61c43c26b70d4b8886f726 (aes read-ONLY key)
</pre>

            <p>
                A compact data format is immutable stored on the Host network for EVERY Hush transaction.
            </p>
        </section>

    </main>
</template>
