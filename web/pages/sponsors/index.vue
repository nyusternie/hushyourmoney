<script setup lang="ts">
useHead({
    title: `Sponsors — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money developers greatly appreciate your support.` }
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
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-12">
        <h1 class="text-6xl lg:text-7xl font-light text-rose-400 tracking-widest italic leading-[60px]">
            Sponsors <span class="hidden lg:inline">💗</span>

            <!-- <svg class="inline h-16 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
            </svg> -->
        </h1>

        <h3 class="-mt-10 lg:pl-5 text-2xl text-rose-600 tracking-widest italic">
            Backing the Cost of a "Fair" FIGHT!
        </h3>

        <p class="-mt-8 w-full lg:w-4/5 text-base lg:text-xl text-sky-700 font-medium leading-6 lg:leading-9">
            Your support is SOOOO greatly appreciated!
            We're working <span class="font-bold text-sky-500">tirelessly &amp; fearlessly</span> around-the-clock to unlock NEW features across the leading UTXO-based L1 networks, including:
            <NuxtLink to="https://bitcoin.org" target="_blank" class="text-yellow-500 text-lg lg:text-2xl font-bold hover:text-yellow-400 hover:underline">Bitcoin</NuxtLink>,
            <NuxtLink to="https://bitcoincash.org" target="_blank" class="text-lime-500 text-lg lg:text-2xl font-bold hover:text-lime-400 hover:underline">Bitcoin Cash</NuxtLink>,
            <NuxtLink to="https://nexa.org" target="_blank" class="text-amber-500 text-lg lg:text-2xl font-bold hover:text-amber-400 hover:underline">Nexa</NuxtLink>
            and many more...
        </p>

        <SponsorHeading />

        <div>
            <h3 class="pl-3 text-sky-300 text-2xl font-medium uppercase">
                For Privacy Seekers
            </h3>

            <h2 class="text-sky-700 text-7xl font-light italic">
                Unlock Higher Tiers
            </h2>

            <p class="py-5 text-gray-600 text-lg leading-7">
                Will introduce higher CoinJoin tiers for large bag holders.
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NuxtLink to="/sponsors/btc/seekers" class="group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 hover:bg-sky-100">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin
                    </h2>

                    <h3 class="py-2 text-sm">
                        Unlock the 0.1 BTC tier for CoinJoin pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-center text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow group-hover:bg-sky-700 group-hover:text-sky-100 group-hover:border-sky-300">
                        <span class="text-2xl font-bold">0.100000 BTC</span>
                        <span class="block text-sm">remaining to unlock the next tier</span>
                    </h3>

                    <p class="mt-3 text-xs text-gray-700 text-center italic">
                        + qualified for $HUSH BRC-20 token airdrop
                    </p>
                </NuxtLink>

                <NuxtLink to="/sponsors/bch/seekers" class="group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 hover:bg-sky-100">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin Cash
                    </h2>

                    <h3 class="py-2 text-sm">
                        Unlock the 10 BCH tier for CoinJoin pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-center text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow group-hover:bg-sky-700 group-hover:text-sky-100 group-hover:border-sky-300">
                        <span class="text-2xl font-bold">10.000000 BCH</span>
                        <span class="block text-sm">remaining to unlock the next tier</span>
                    </h3>

                    <p class="mt-3 text-xs text-gray-700 text-center italic">
                        + qualified for $HUSH cash token airdrop
                    </p>
                </NuxtLink>

                <NuxtLink to="/sponsors/nexa/seekers" class="group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 hover:bg-sky-100">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Nexa
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 1B NEXA, 10B NEXA and 100B NEXA CoinJoin pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow group-hover:bg-sky-700 group-hover:text-sky-100 group-hover:border-sky-300">
                        <span class="text-2xl font-bold">1.00B NEXA</span> to unlock next tier
                    </h3>

                    <p class="mt-3 text-xs text-gray-700 text-center italic">
                        + qualified for $HUSH native token airdrop
                    </p>
                </NuxtLink>

                <div class="cursor-not-allowed group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 opacity-30">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Litecoin
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 50 LTC, 500 LTC and 5K LTC CoinJoin pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">50.000000 LTC</span> to unlock next tier
                    </h3>
                </div>

                <div class="cursor-not-allowed group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 opacity-30">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Flux
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 5K FLUX, 50K FLUX and 500K FLUX CoinJoin pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">5.00K FLUX</span> to unlock next tier
                    </h3>
                </div>

                <div class="cursor-not-allowed group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 opacity-30">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        eCash
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 5K XEC, 50K XEC and 500K XEC CoinJoin pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">5.00K XEC</span> to unlock next tier
                    </h3>
                </div>

                <div class="cursor-not-allowed group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 opacity-30">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Doge
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 5K DOGE, 50K DOGE and 500K DOGE CoinJoin pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">5K DOGE</span> to unlock next tier
                    </h3>
                </div>

                <div class="cursor-not-allowed group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 opacity-30">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Dash
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 5K DASH, 50K DASH and 500K DASH CoinJoin pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">5K DASH</span> to unlock next tier
                    </h3>
                </div>

                <div class="cursor-not-allowed group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 opacity-30">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Kaspa
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 50K KAS, 500K KAS and 5M KAS CoinJoin pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">50K KAS</span> to unlock next tier
                    </h3>
                </div>

                <div class="cursor-help group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300">
                    <h2 class="flex items-center gap-2 text-xl text-rose-700 font-medium tracking-widest uppercase">
                        Sponsors Vote

                        <!-- <svg class="h-8 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                        </svg> -->
                        <svg class="h-8 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"></path>
                        </svg>
                    </h2>

                    <p class="py-2 text-sm italic leading-6">
                        All Sponsors will be invited to vote for the <span class="font-bold">FINAL network integration</span> into the inaugural launch of the HYM cloud network, before <span class="font-bold">"locking in $HUSH rewards"</span> and moving on to Phase II (Zero-Knowledge + Incognito Cash).
                    </p>
                </div>

            </div>

            <!-- TODO: ADD PLEDGE BUTTON -->
        </div>

        <SponsorHeading />

        <div>
            <h3 class="pl-3 text-sky-300 text-2xl font-medium uppercase">
                For Privacy Masters
            </h3>

            <h2 class="text-sky-700 text-7xl font-light italic">
                Wallet Integrations + Dev Kits
            </h2>

            <p class="py-5 text-gray-600 text-lg leading-7">
                Will offer native integration with the ecosystem's MOST popular wallets.
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NuxtLink to="/sponsors/btc/masters" class="group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 hover:bg-sky-100">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin
                    </h2>

                    <h3 class="py-2 text-sm">
                        Integration with Bitcoin's MOST popular wallets.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-center text-amber-900 font-medium border border-amber-400 rounded-lg shadow group-hover:bg-sky-700 group-hover:text-sky-100 group-hover:border-sky-300">
                        <span class="block text-2xl font-bold">0.888000 BTC</span>
                        <span class="text-sm">qualifies for a NEW 3<sup>rd</sup> party wallet integration</span>
                    </h3>

                    <ol class="mt-3 pl-10 text-sm text-gray-700">
                        <li>
                            <svg class="inline h-4 w-auto text-green-700 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"></path>
                            </svg>
                            Edge wallet
                        </li>

                        <li>
                            <svg class="inline h-4 w-auto text-amber-500 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                            Bitcoin.com wallet
                        </li>

                        <li>
                            <svg class="inline h-4 w-auto text-amber-500 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                            Unstoppable wallet
                        </li>
                    </ol>

                    <p class="mt-3 text-xs text-gray-700 text-center italic">
                        + qualified for $HUSH BRC-20 token airdrop
                    </p>
                </NuxtLink>

                <section>
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin Cash
                    </h2>

                    <h3>
                        Integration with the leading wallets from Bitcoin Cash.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">88.800000 BCH</span> per 3rd-party wallet integration
                    </h3>

                    <ol class="mt-3 pl-10 text-sm text-gray-700">
                        <li>
                            <svg class="inline h-4 w-auto text-green-700 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"></path>
                            </svg>
                            Edge wallet
                        </li>

                        <li>
                            <svg class="inline h-4 w-auto text-amber-500 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                            Bitcoin.com wallet
                        </li>

                        <li>
                            <svg class="inline h-4 w-auto text-amber-500 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                            Paytaca wallet
                        </li>

                        <li>
                            <svg class="inline h-4 w-auto text-amber-500 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                            Selene wallet
                        </li>

                        <li>
                            <svg class="inline h-4 w-auto text-amber-500 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                            Cashonize wallet
                        </li>

                        <li>
                            <svg class="inline h-4 w-auto text-amber-500 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                            Zapit wallet
                        </li>

                        <li>
                            <svg class="inline h-4 w-auto text-amber-500 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                            Unstoppable wallet
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Nexa
                    </h2>

                    <h3>
                        Integration with the leading wallets from Nexa.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">8.88B</span> per 3rd-party wallet integration
                    </h3>

                    <ol class="mt-3 pl-10 text-sm text-gray-700">
                        <li>
                            <svg class="inline h-4 w-auto text-green-700 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"></path>
                            </svg>
                            Otoplo wallet
                        </li>

                        <li>
                            <svg class="inline h-4 w-auto text-amber-500 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                            Core Node wallet <em>(as a plug-in)</em>
                        </li>

                        <li>
                            <svg class="inline h-4 w-auto text-amber-500 font-bold" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                            Wally wallet
                        </li>
                    </ol>
                </section>

            </div>

            <!-- TODO: ADD PLEDGE BUTTON -->

            <small class="block py-5 text-rose-400 italic">
                <h3 class="text-sm font-bold tracking-wider">PLEASE NOTE</h3>
                The <strong>Order of Delivery</strong> is subject to change;
                and <strong>Time of Deployment</strong> for ALL third-party integrations is subject to the wallet Provider's cooperation and software release schedule.
            </small>

        </div>

        <SponsorHeading />

        <div>
            <h3 class="pl-3 text-sky-300 text-2xl font-medium uppercase">
                For Privacy Gurus
            </h3>

            <h2 class="text-sky-700 text-7xl font-light italic">
                Incognito Cash Apps
            </h2>

            <p class="py-5 text-gray-600 text-lg leading-7">
                We will introduce native Android and iOS applications to support the NEW Incognito network
                — supporting ALL networks with $NITO native assets.
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NuxtLink to="/sponsors/btc/gurus" class="group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 hover:bg-sky-100">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin
                    </h2>

                    <h3 class="py-2 text-sm">
                        Releasing native mobile applications.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-center text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">1.000000 BTC</span>
                        <span class="block text-sm">remaining to unlock the next release</span>
                    </h3>

                    <!-- TODO: ADD PLEDGE BUTTON -->
                    <ol class="mt-3 pl-10 list-disc">
                        <li>Windows desktop app</li>
                        <li>iOS mobile app</li>
                        <li>Android mobile app</li>
                        <li>Mac desktop app</li>
                        <li>Linux desktop app</li>
                    </ol>

                    <p class="mt-3 text-xs text-gray-700 text-center italic">
                        + qualified for $HUSH BRC-20 token airdrop
                    </p>
                </NuxtLink>

                <div class="cursor-not-allowed group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 opacity-30">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin Cash
                    </h2>

                    <h3 class="py-2 text-sm">
                        Releasing native mobile applications.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-center text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">100.000000 BCH</span>
                        <span class="block text-sm">remaining to unlock the next release</span>
                    </h3>

                    <!-- TODO: ADD PLEDGE BUTTON -->
                    <ol class="mt-3 pl-10 list-disc">
                        <li>Windows desktop app</li>
                        <li>iOS mobile app</li>
                        <li>Android mobile app</li>
                        <li>Mac desktop app</li>
                        <li>Linux desktop app</li>
                    </ol>

                    <p class="mt-3 text-xs text-gray-700 text-center italic">
                        + qualified for $HUSH cash token airdrop
                    </p>
                </div>

                <div class="cursor-not-allowed group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 opacity-30">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Nexa
                    </h2>

                    <h3 class="py-2 text-sm">
                        Releasing native mobile applications.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-center text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">10.00B NEXA</span>
                        <span class="block text-sm">remaining to unlock the next release</span>
                    </h3>

                    <!-- TODO: ADD PLEDGE BUTTON -->
                    <ol class="mt-3 pl-10 list-disc">
                        <li>Windows desktop app</li>
                        <li>iOS mobile app</li>
                        <li>Android mobile app</li>
                        <li>Mac desktop app</li>
                        <li>Linux desktop app</li>
                    </ol>

                    <p class="mt-3 text-xs text-gray-700 text-center italic">
                        + qualified for $HUSH native token airdrop
                    </p>
                </div>

            </div>

        </div>
    </main>
</template>
