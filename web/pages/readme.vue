<script setup lang="ts">
definePageMeta({
    layout: 'info',
})

useHead({
    title: `README — Hush Your Money`,
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
    <main class="max-w-5xl mx-auto py-10 flex flex-col gap-24 text-gray-800 font-mono leading-8">
        <h1 class="text-center text-fuchsia-700 text-8xl font-light tracking-tighter">
            Hush README
        </h1>

        <h3 class="-mt-12 px-10 text-4xl text-fuchsia-900 text-center tracking-widest font-light italic leading-[50px]">
            tl;dr — a practical, <span class="whitespace-nowrap">add-on</span> privacy solution for UTXO-based networks
        </h3>

        <section class="-mt-12 flex justify-center"><pre class="text-lg text-fuchsia-700 font-bold tracking-widest leading-8">
    FORM : Scalable + Secure + Decentralized
FUNCTION : Tokenized Assets + Smart Contracts
 FREEDOM : (Always-on) Private Transactions
        </pre></section>

        <NuxtLink to="https://github.com/BCHDEVCON3/hush-your-money#hush-your-money" target="_blank" class="-mt-10 group flex flex-col gap-5">
            <div class="p-7 flex flex-row justify-around bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 border-4 border-fuchsia-700 rounded-3xl shadow group-hover:from-fuchsia-100 hover:to-fuchsia-200">
                <h3 class="text-4xl text-fuchsia-100 font-bold text-center group-hover:text-fuchsia-600">
                    BCHDEVCON3 Hackathon
                    <span class="block text-8xl uppercase">Winner!</span>
                </h3>

                <img src="~/assets/winner.gif" class="-mt-8 -mb-8 h-48 w-auto" />
            </div>

            <small class="text-sm font-bold italic text-gray-400 text-center tracking-tight group-hover:text-fuchsia-500">
                Click to learn about Where, When &amp; How <span class="text-base font-bold">Hush Your Money</span> was born!
            </small>
        </NuxtLink>

        <section class="flex flex-col gap-5">
            <h2 class="text-3xl font-bold text-fuchsia-700">
                Why Hush Your Money?
            </h2>

            <NuxtLink to="https://z.cash/zcashs-privacy-is-normal-goes-viral/" target="_blank" class="pl-5 flex flex-row gap-2 items-baseline text-xl text-blue-500 font-bold hover:underline">
                Because <span class="text-2xl">Privacy is normal</span>

                <svg class="h-5 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                </svg>
            </NuxtLink>

            <p class="text-justify">
                Today, MOST privacy networks aim to offer their users a PERFECT privacy solution.
                Hush Your Money (HYM) aims to offer the MOST "practical balance" between <span class="font-bold">Form</span>, <span class="font-bold">Function</span> and <span class="font-bold">Freedom</span> —
                to deliver a family of the MOST widely accessible privacy networks the world has ever seen...
            </p>

            <p class="text-fuchsia-600 text-2xl text-center leading-[50px] font-bold italic">
                Incognito Network <span class="text-3xl text-fuchsia-700">(Nito)</span> is a cross-chain <NuxtLink to="https://nexa.wiki/supernet" target="_blank" class="text-3xl text-fuchsia-700 font-bold hover:underline">Supernet</NuxtLink> designed explicitly to meet the <span class="text-3xl text-fuchsia-700">&ldquo;everyday&rdquo;</span> privacy needs for <span class="text-3xl text-fuchsia-700">99%</span> of users.
            </p>

            <p class="text-justify">
                Nito uniquely offers Content Creators and Application Developers the MOST functionally capable Crypto network, <span class="font-bold italic">with FULL support for BOTH Tokenized Assets and Smart Contracts on Layer 1+ (Plus)</span>, while offering uncompromising, trustless and permissionless financial privacy for their communities <span class="font-bold">AT ALL TIMES.</span>
            </p>
        </section>

        <ReadmeToc />

        <ReadmeIntro />

        <ReadmeFullPrivacy />

        <section class="flex flex-col gap-5">
            <h2 class="text-3xl font-bold text-fuchsia-700">
                (Transaction) Guardians
            </h2>

            <p>
                Guardians are a managed set of approx. 1,024 "Community UTXOs".
                Guardians are <NuxtLink to="https://nexa.sh/contracts" target="_blank" class="text-blue-500 font-bold hover:underline">Wise Contracts</NuxtLink> that protect your privacy during the transaction process by masking:

                <ul class="py-3 pl-10 list-disc">
                    <li>the Sender</li>
                    <li>the Receiver</li>
                    <li>the Asset Identifier</li>
                    <li>the Transfer Amount</li>
                    <li class="line-through">the Sender's Location</li>
                </ul>
            </p>

            <div class="flex flex-col gap-5">
                <h3 class="font-bold text-sm text-rose-500">
                    <span class="block font-bold uppercase">PLease Note:</span>
                    Location (ie IP address) obfuscation is delegated to 3rd-parties (eg. VPN and/or TOR) providers.
                    <span class="block text-lg italic">This is a FEATURE!</span>
                    Hush has been specifically designed to support the greatest number of Wallet integrations &amp; compatibilities across the Crypto ecosystem.
                    Hush aims to meet the primary needs for 99% of users, without sacrificing privacy!
                </h3>
            </div>
        </section>

        <section class="flex flex-col gap-5">
            <h2 class="text-3xl font-bold text-fuchsia-700">
                Incognito Address Format
            </h2>

            <h3 class="text-xl font-bold tracking-widest">
                nito:nqtsq5g5sp33aj07d808w8xvv7kuarwcrv3z2fvskw2ej7dj
            </h3>

            <p>
                An address format that's very easy on the eyes.
            </p>
        </section>

        <section class="flex flex-col gap-5">
            <h2 class="text-3xl font-bold text-fuchsia-700">
                Inscriptions: <code class="text-amber-500 italic">OP_DATA</code> or <code class="text-amber-500 italic">OP_RETURN</code>
            </h2>

            <p>
                A compact data format is immutable stored on the Host network for EVERY Hush transaction.
            </p>

<pre class="text-sm">
04 NITO (protocol id)
20 921aa05b86a1bc9dc1d99583e2932657696e82cf9051219e3dccaeecfd463ee9 (nito tx idem)
14 875a1f6d7a6e33e27d61c43c26b70d4b8886f726 (aes read-ONLY key)
</pre>

            <p>
                A compact data format is immutable stored on the Host network for EVERY Hush transaction.
            </p>
        </section>

        <section class="flex flex-col gap-5">
            <h2 class="text-3xl font-bold text-fuchsia-700">
                Commitment Centers: A Universal Truth
            </h2>

            <p>
                Every transaction will update the <span class="text-lg font-bold">Global (Merkle) Root</span> using an "accumulator";
                which offers an efficient variation on the standard Bitcoin-style Merkle trees.
            </p>

            <p>
                Commitment Centers (CCs) manage the Unspent Transaction Output (UTXO) history.
            </p>
        </section>

        <ReadmeSharding />

        <ReadmeSupernets />

        <ReadmeCoinJoins />

        <section class="flex flex-col gap-5">
            <h2 class="text-3xl font-bold text-fuchsia-700">
                Flux Cloud
            </h2>

            <p>
                Flux Cloud <span class="font-bold">(ticker: <NuxtLink to="https://coinmarketcap.com/currencies/zel/" target="_blank" class="text-blue-500 hover:underline">FLUX</NuxtLink>)</span> is the most decentralized and fastest growing network in the world.
                Its peer-powered cloud computing network offers enterprise-level infrastructure for Incognito Network's MOST demanding decentralized applications.
            </p>

            <p class="text-sm italic">
                FluxCloud is connected worldwide, across all continents.
                Its strongest Availability Zones are the EU and United States.
            </p>

            <p>
                Although Flux Cloud will continue to offer users the MOST convenient gateway into Incognito Network (Nito);
                the long-term solution is to encourage ALL clients to utilize <span class="text-base font-bold">Nexa's (PoW-secured) CAPD</span> communications network (at least as a fallback).
            </p>
        </section>

        <section class="flex flex-col gap-5">
            <h2 class="text-3xl font-bold text-fuchsia-700">
                Counterparty and Protocol Discovery (CAPD)
            </h2>

            <NuxtLink to="https://spec.nexa.org/network/capd/" target="_blank" class="text-lg text-blue-500 hover:underline font-bold">
                https://spec.nexa.org/network/capd/
            </NuxtLink>

            <p>
                A transient decentralized anonymous content-addressable messaging service that allows participants to to discover transaction partners and execute protocols with them.
            </p>

            <p>
                Proof of work is used to discourage spam.
            </p>
        </section>

    </main>
</template>
