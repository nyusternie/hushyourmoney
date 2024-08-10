<script setup lang="ts">
useHead({
    title: `Donate — Hush Your Money`,
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
        <h1 class="text-7xl font-light text-rose-400 tracking-widest italic">
            Sponsors

            <svg class="inline h-16 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
            </svg>
        </h1>

        <h3 class="-mt-10 pl-5 text-2xl text-rose-600 tracking-widest">
            To Our Continued Development...
        </h3>

        <p class="-mt-8 w-4/5 text-xl text-sky-700 font-medium">
            Your support is SOOOO greatly appreciated!
            We're working around-the-clock to unlock NEW features across the leading UTXO-based networks, including:
            <span class="text-2xl font-bold">Bitcoin</span>, <span class="text-2xl font-bold">Bitcoin Cash</span>, <span class="text-2xl font-bold">Nexa</span> and many more...
        </p>

        <div>
            <h2 class="text-4xl font-medium">
                Privacy Seekers - New Tiers
            </h2>

            <p class="py-5">
                Will introduce higher blending tiers for large bag holders.
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NuxtLink to="/sponsors/btc/seekers" class="group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 hover:bg-sky-100">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 0.1 BTC, 1.0 BTC and 10.0 BTC blender pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow group-hover:bg-sky-700 group-hover:text-sky-100 group-hover:border-sky-300">
                        <span class="text-2xl font-bold">0.1 BTC</span> to unlock next tier
                    </h3>
                </NuxtLink>

                <NuxtLink to="/sponsors/bch/seekers" class="group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 hover:bg-sky-100">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin Cash
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 10 BCH, 100 BCH and 1K BCH blender pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow group-hover:bg-sky-700 group-hover:text-sky-100 group-hover:border-sky-300">
                        <span class="text-2xl font-bold">10 BCH</span> to unlock next tier
                    </h3>
                </NuxtLink>

                <NuxtLink to="/sponsors/nexa/seekers" class="group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 hover:bg-sky-100">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Nexa
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 1B NEXA, 10B NEXA and 100B NEXA blender pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow group-hover:bg-sky-700 group-hover:text-sky-100 group-hover:border-sky-300">
                        <span class="text-2xl font-bold">1B NEXA</span> to unlock next tier
                    </h3>
                </NuxtLink>

                <div class="cursor-not-allowed group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 opacity-30">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Litecoin
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 50 LTC, 500 LTC and 5K LTC blender pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">50 LTC</span> to unlock next tier
                    </h3>
                </div>

                <div class="cursor-not-allowed group px-5 py-7 bg-sky-200 rounded-xl border border-sky-300 opacity-30">
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Flux
                    </h2>

                    <h3 class="py-2 text-sm">
                        Adding 5K FLUX, 50K FLUX and 500K FLUX blender pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">5K FLUX</span> to unlock next tier
                    </h3>
                </div>

            </div>

            <!-- TODO: ADD PLEDGE BUTTON -->
        </div>

        <div>
            <h2 class="text-4xl font-medium">
                Privacy Masters - Wallet Integrations
            </h2>

            <p>
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
                        <span class="block text-2xl font-bold">0.888 BTC</span>
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
                </NuxtLink>

                <section>
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin Cash
                    </h2>

                    <h3>
                        Integration with the leading wallets from Bitcoin Cash.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">88.8 BCH</span> per 3rd-party wallet integration
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
                            Core node wallet plug-in
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
                The <strong>Order of Delivery</strong> is subject to change; and <strong>Time of Deployment</strong> for ALL third-party integrations is subject to the wallet Provider's cooperation and release schedule.
            </small>

        </div>

        <div>
            <h2 class="text-4xl font-medium">
                Privacy Gurus - Native Apps + SDKs
            </h2>

            <p>
                Will introduce native Android and iOS applications.
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section>
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin
                    </h2>

                    <h3>
                        Releasing native mobile applications.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">1.0 BTC</span> per application release
                    </h3>
                </section>

                <section>
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin Cash
                    </h2>

                    <h3>
                        Releasing native mobile applications.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">100 BCH</span> per application release
                    </h3>
                </section>

                <section>
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Nexa
                    </h2>

                    <h3>
                        Releasing native mobile applications.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">10.0B NEXA</span> per application release
                    </h3>
                </section>

                <!-- TODO: ADD PLEDGE BUTTON -->
                <ol class="pl-10 list-disc">
                    <li>Windows desktop app</li>
                    <li>iOS mobile app</li>
                    <li>Android mobile app</li>
                    <li>Mac desktop app</li>
                    <li>Linux desktop app</li>
                </ol>

                <!-- TODO: ADD PLEDGE BUTTON -->
                <ol class="pl-10 list-disc">
                    <li>Windows desktop app</li>
                    <li>iOS mobile app</li>
                    <li>Android mobile app</li>
                    <li>Mac desktop app</li>
                    <li>Linux desktop app</li>
                </ol>

                <!-- TODO: ADD PLEDGE BUTTON -->
                <ol class="pl-10 list-disc">
                    <li>Windows desktop app</li>
                    <li>iOS mobile app</li>
                    <li>Android mobile app</li>
                    <li>Mac desktop app</li>
                    <li>Linux desktop app</li>
                </ol>
            </div>

        </div>
    </main>
</template>
