<script setup lang="ts">
/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const System = useSystemStore()
const Wallet = useWalletStore()

onBeforeMount(() => {
    // TODO Move this block to @nexajs/app
    try {
        Profile.$state = JSON.parse(localStorage.getItem('profile'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        System.$state = JSON.parse(localStorage.getItem('system'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        Wallet.$state = JSON.parse(localStorage.getItem('wallet'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        // add additional states here...
    } catch (err) {
        console.error(err)
    }
})

// TODO Move this block to @nexajs/app
watch([Profile.$state, System.$state, Wallet.$state], (_state) => {
    localStorage.setItem('profile',
        JSON.stringify(_state[0], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    localStorage.setItem('system',
        JSON.stringify(_state[1], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    localStorage.setItem('wallet',
        JSON.stringify(_state[2], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    // watch additional states here...
})

onMounted(() => {
    /* Initailize system. */
    System.init()

    /* Initialize wallet. */
    Wallet.init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <div class="min-h-full">
        <Header />

        <main class="-mt-24 pb-8">
            <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 class="sr-only">
                    Hush Your Money
                </h1>

                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">

                    <!-- Left column -->
                    <div class="grid grid-cols-1 gap-4 lg:col-span-2">
                        <section aria-labelledby="section-1-title">
                            <h2 class="sr-only" id="section-1-title">
                                Dashboard
                            </h2>

                            <div class="overflow-hidden rounded-lg bg-white shadow">
                                <div class="p-6">

                                    <!-- Your content -->
                                    <slot />

                                </div>
                            </div>
                        </section>
                    </div>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <section aria-labelledby="section-2-title">
                            <h2 class="sr-only" id="section-2-title">
                                Wealth Diary
                            </h2>

                            <div class="overflow-hidden rounded-lg bg-white shadow">
                                <div class="p-6">

                                    <!-- Your content -->
                                    TBD...

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>

        <Footer />
    </div>
</template>
