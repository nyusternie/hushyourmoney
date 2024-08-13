<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

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
    <main class="mt-20 mb-10 flex flex-col gap-12">

        <!-- Timeline section -->
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-2">

                <div>
                    <time datetime="2021-08" class="flex items-center text-lg font-semibold leading-6 text-indigo-600">
                        <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                            <circle cx="2" cy="2" r="2" fill="currentColor" />
                        </svg>
                        Fall '24
                        <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                    </time>

                    <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                        Publish Web, Mobile and Desktop Apps
                    </p>

                    <p class="mt-1 text-sm leading-6 text-gray-600">
                        Introduce the Hush Your Money platform to a private group of beta testers.
                    </p>
                </div>

                <div>
                    <time datetime="2021-12" class="flex items-center text-lg font-semibold leading-6 text-indigo-600">
                        <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                            <circle cx="2" cy="2" r="2" fill="currentColor" />
                        </svg>
                        Winter '24
                        <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                    </time>

                    <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                        Offer Licenses for $HUSH Mining
                    </p>

                    <p class="mt-1 text-base leading-7 text-gray-600">
                        Launch the $HUSH token on Nexa blockchain and $NITO as the native Hush asset.
                    </p>
                </div>

            </div>
        </div>

        <!-- Timeline section -->
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-2">

                <div>
                    <time datetime="2022-02" class="flex items-center text-lg font-semibold leading-6 text-indigo-600">
                        <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                            <circle cx="2" cy="2" r="2" fill="currentColor" />
                        </svg>
                        Spring '25
                        <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                    </time>

                    <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                        Deploy 1st $NITO Testnet
                    </p>

                    <p class="mt-1 text-base leading-7 text-gray-600">
                        Sunt perspiciatis incidunt. Non necessitatibus aliquid. Consequatur ut officiis earum eum quia facilis. Hic deleniti dolorem quia et.
                    </p>
                </div>

                <div>
                    <time datetime="2022-12" class="flex items-center text-lg font-semibold leading-6 text-indigo-600">
                        <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                            <circle cx="2" cy="2" r="2" fill="currentColor" />
                        </svg>
                        Summer '25
                        <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                    </time>

                    <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                        Release $NITO Vaults + Mainnet
                    </p>

                    <p class="mt-1 text-base leading-7 text-gray-600">
                        Ut ipsa sint distinctio quod itaque nam qui. Possimus aut unde id architecto voluptatem hic aut pariatur velit.
                    </p>
                </div>

                <div>
                    <time datetime="2022-12" class="flex items-center text-lg font-semibold leading-6 text-indigo-600">
                        <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                            <circle cx="2" cy="2" r="2" fill="currentColor" />
                        </svg>
                        Fall '25
                        <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                    </time>

                    <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                        EPIC30 Airdrop to ALL Sponsors
                    </p>

                    <p class="mt-1 text-base leading-7 text-gray-600">
                        30% of ALL $HUSH tokens will be airdrop to ALL supporters of ALL the HYM campaigns, spread across ALL supported networks.
                    </p>
                </div>

                <div>
                    <time datetime="2022-12" class="flex items-center text-lg font-semibold leading-6 text-indigo-600">
                        <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                            <circle cx="2" cy="2" r="2" fill="currentColor" />
                        </svg>
                        Winter '25
                        <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                    </time>

                    <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                        Partnerships + Integrations
                    </p>

                    <p class="mt-1 text-base leading-7 text-gray-600">
                        Our goal is to "natively" integrate into the Incognito wallets of TOP browsers, namely Brave and Opera.
                    </p>
                </div>
            </div>
        </div>


    </main>
</template>
