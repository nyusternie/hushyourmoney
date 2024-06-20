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
        <h1 class="text-5xl font-medium">
            Donate
            <span class="text-2xl text-sky-500">
                To Our Continued Development...
            </span>
        </h1>

        <p class="-mt-8 w-2/3 text-xl text-sky-700 font-medium">
            Your support is SOOOO greatly appreciated!
            We're working around-the-clock, unlocking NEW features across the leading UTXO networks, including:
            <span class="text-2xl font-bold">Bitcoin</span>, <span class="text-2xl font-bold">Bitcoin Cash</span> and <span class="text-2xl font-bold">Nexa</span>.
        </p>

        <div>
            <h2 class="text-4xl font-medium">
                Privacy Seeker - New Tiers
            </h2>

            <p>
                Will introduce higher blending tiers for large bag holders.
            </p>

            <div class="grid grid-cols-3 gap-6">
                <section>
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin
                    </h2>

                    <h3>
                        Adding 0.1 BTC, 1.0 BTC and 10.0 BTC blender pools
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">0.1 BTC</span> to unlock next tier
                    </h3>
                </section>

                <section>
                    <h3>
                        Bitcoin Cash
                    </h3>

                    <h3>
                        Adding 10 BCH, 100 BCH and 1K BCH blender pools
                    </h3>

                    <h3>
                        Unlocking At: 10 BCH
                    </h3>
                </section>

                <section>
                    <h3>
                        Nexa
                    </h3>

                    <h3>
                        Adding 1B NEXA, 10B NEXA and 100B NEXA blender pools
                    </h3>

                    <h3>
                        Unlocking At: 1B NEXA
                    </h3>
                </section>

            </div>

            <!-- TODO: ADD PLEDGE BUTTON -->
        </div>

        <div>
            <h2 class="text-4xl font-medium">
                Privacy Master - Hardware Wallets
            </h2>

            <p>
                Will introduce Trezor / OneKey and Ledger support.
            </p>

            <div class="grid grid-cols-3 gap-6">
                <section>
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin
                    </h2>

                    <h3>
                        Adding hardware wallet support.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">1.0 BTC</span> to unlock HW wallets
                    </h3>
                </section>

                <section>
                    <h3>
                        Bitcoin Cash
                    </h3>

                    <h3>
                        TBD
                    </h3>

                    <h3>
                        Unlocking At: 100 BCH
                    </h3>
                </section>

                <section>
                    <h3>
                        Nexa
                    </h3>

                    <h3>
                        TBD
                    </h3>

                    <h3>
                        Unlocking At: 10B NEXA
                    </h3>
                </section>

            </div>

            <!-- TODO: ADD PLEDGE BUTTON -->
        </div>

        <div>
            <h2 class="text-4xl font-medium">
                Privacy Guru - Native Apps + SDKs
            </h2>

            <p>
                Will introduce native Android and iOS applications.
            </p>

            <div class="grid grid-cols-3 gap-6">
                <section>
                    <h2 class="text-xl text-gray-700 font-medium tracking-widest uppercase">
                        Bitcoin
                    </h2>

                    <h3>
                        Releasing native mobile applications.
                    </h3>

                    <h3 class="px-3 py-1 bg-amber-200 text-lg text-amber-900 font-medium border border-amber-400 rounded-lg shadow">
                        <span class="text-2xl font-bold">1.0 BTC</span> to release application
                    </h3>
                </section>

                <section>
                    <h3>
                        Bitcoin Cash
                    </h3>

                    <h3>
                        TBD
                    </h3>

                    <h3>
                        Unlocking At: 100 BCH
                    </h3>
                </section>

                <section>
                    <h3>
                        Nexa
                    </h3>

                    <h3>
                        TBD
                    </h3>

                    <h3>
                        Unlocking At: 10B NEXA
                    </h3>
                </section>

            </div>

            <!-- TODO: ADD PLEDGE BUTTON -->
            <ol class="pl-10 list-disc">
                <li>Android mobile app</li>
                <li>iOS mobile app</li>
                <li>Windows desktop app</li>
                <li>Mac desktop app</li>
                <li>Linux desktop app</li>
            </ol>
        </div>
    </main>

    <Footer />
</template>
