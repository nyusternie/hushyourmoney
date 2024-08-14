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
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-16">
        <h1 class="text-center text-fuchsia-700 text-8xl font-light italic tracking-tighter">
            Hush README
        </h1>

        <h3 class="-mt-12 px-10 text-4xl text-fuchsia-900 text-center tracking-widest font-light italic leading-[60px]">
            tl;dr — a practical, drop-in privacy solution for UTXO-based networks
        </h3>

        <section class="-mt-12 flex justify-center"><pre class="text-lg text-fuchsia-700 font-bold tracking-widest leading-8">
    FORM : Scalable + Secure + Decentralized
FUNCTION : Tokenized Assets + Smart Contracts
 FREEDOM : (Always-on) Private Transactions
        </pre></section>

        <NuxtLink to="https://github.com/BCHDEVCON3/hush-your-money#hush-your-money" target="_blank" class="group flex flex-col gap-3">
            <div class="p-7 flex flex-row justify-around bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 border-4 border-fuchsia-700 rounded-3xl shadow group-hover:from-fuchsia-100 hover:to-fuchsia-200">
                <h3 class="text-4xl text-fuchsia-100 font-bold text-center group-hover:text-fuchsia-600">
                    BCHDEVCON3 Hackathon
                    <span class="block text-8xl uppercase">Winner!</span>
                </h3>

                <img src="~/assets/winner.gif" class="-mt-8 -mb-8 h-48 w-auto" />
            </div>

            <small class="text-sm font-medium italic text-gray-400 text-center group-hover:text-fuchsia-500">
                Click to learn about where, when &amp; how Hush Your Money was born!
            </small>
        </NuxtLink>

        <section class="flex flex-col gap-3">
            <h3 class="text-3xl font-bold">
                Why Hush?
            </h3>

            <p>

                Because <NuxtLink to="https://z.cash/zcashs-privacy-is-normal-goes-viral/" target="_blank">Privacy is Normal.</NuxtLink>
                While MOST projects aim to offer TOTAL privacy solutions, Hush aims for a "practical balance" between form and function.
                Delivering the MOST widely accessible privacy network is the ONLY goal!
            </p>

            <p>
                The Incognito Network (Nito) is a cross-chain Supernet for privacy conscious individuals.
                Nito aims to offer the MOST functional network while protecting the anonymity of its users.
            </p>
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
                Incognito Address Format
            </h2>

            <h3 class="text-xl font-bold tracking-widest">
                nito:nqtsq5g5sp33aj07d808w8xvv7kuarwcrv3z2fvskw2ej7dj
            </h3>

            <p>
                An address format that's very easy on the eyes.
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
                <code class="text-amber-500">OP_DATA</code> Inscriptions
            </h2>

            <p>
                A compact data format is immutable stored on the Host network for EVERY Hush transaction.
            </p>

<pre class="text-sm">
04 HUSH (protocol id)
20 921aa05b86a1bc9dc1d99583e2932657696e82cf9051219e3dccaeecfd463ee9 (hush tx idem)
14 875a1f6d7a6e33e27d61c43c26b70d4b8886f726 (aes read-ONLY key)
</pre>

            <p>
                A compact data format is immutable stored on the Host network for EVERY Hush transaction.
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
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

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
                256-bit Sharding
            </h2>

            <p>
                Commitment Centers (CCs) are sharded to maximum scalability.
            </p>

            <p>
                There are at least 2,048 (sharded) CCs deployed across the network to offer maximum scalability on the host's Supernet.
                Additional CCs may be deployed to meet the growing needs of the Host's network.
            </p>

            <p>
                Each CC is optimized to support at least 10x transactions per second (TPS).
                The total throughput, for all CCs, is estimated to be sustainable up to at least 20,000 TPS.
            </p>

            <p>
                Additional CCs may be deployed to meet the growing needs of the Host's network.
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
                Supernets: UTXO Layer 1+ (Plus)
            </h2>

            <p>
                The Incognito Network designed to run across multiple networks;
                specifically the latest bread in Layer 1 Supernet blockchains, like:

                <ol class="py-3 pl-10 list-decimal">
                    <li>Bitcoin Cash</li>
                    <li>Kaspa</li>
                    <li>Litecoin</li>
                    <li>Nexa</li>
                    <li>and more...</li>
                </ol>
            </p>

            <p>
                UTXO-based Supernets are the ideal technological platforms;
                offering a plethora of features and benefits, including:

                <ol class="py-3 pl-10 list-disc">
                    <li>BigNum support for Zero Knowledge math primitives</li>
                </ol>
            </p>

        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
                CashFusion
            </h2>

            <p>
                Not every UTXO network can/will offer Supernet capabilities.
                As a fallback to The Incognito Network (Nito), CashFusion offers a Pretty Good Privacy solution for its community of users.
            </p>

            <p>
                Access to the protocol is permissionless, which makes it an ideal solution.
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
                Flux Cloud
            </h2>

            <p>
                The FluxCloud is a People-Powered Network to help you build decentralized applications with increased flexibility, scalability, and censorship resistance.
            </p>

            <p>
                FluxCloud is connected worldwide, across all continents.
                Its strongest Availability Zones are the EU and United States.
                South Asia and Australia are also witnessing an increase of server deployments.
                Flux Cloud is the most decentralized and fastest growing network in the world.
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-4xl font-bold text-gray-500">
                Counterparty and Protocol Discovery (CAPD)
            </h2>

            <NuxtLink to="https://spec.nexa.org/network/capd/" target="_blank" class="text-lg text-blue-500 hover:underline font-medium">
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
