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
    <main class="mx-auto my-8 max-w-7xl sm:my-10 sm:px-6 lg:px-8">
        <div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 class="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-fuchsia-100 sm:text-5xl">
                21 MILLION $HUSH
            </h2>

            <h3 class="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-fuchsia-600 sm:text-3xl">
                TOTAL SUPPLY EVER TO EXIST
            </h3>

            <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Aliquip reprehenderit incididunt amet quis fugiat ut velit. Sit occaecat labore proident cillum in nisi adipisicing officia excepteur tempor deserunt.
            </p>

            <div class="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-5">
                <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg" alt="Transistor" width="158" height="48" />
                <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg" alt="Reform" width="158" height="48" />
                <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg" alt="Tuple" width="158" height="48" />
                <img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg" alt="SavvyCal" width="158" height="48" />
                <img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg" alt="Statamic" width="158" height="48" />
            </div>
            <div class="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
                <div
                    class="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                    style="
                        clip-path: polygon(
                            73.6% 51.7%,
                            91.7% 11.8%,
                            100% 46.4%,
                            97.4% 82.2%,
                            92.5% 84.9%,
                            75.7% 64%,
                            55.3% 47.5%,
                            46.5% 49.4%,
                            45% 62.9%,
                            50.3% 87.2%,
                            21.3% 64.1%,
                            0.1% 100%,
                            5.4% 51.1%,
                            21.4% 63.9%,
                            58.9% 0.2%,
                            73.6% 51.7%
                        );
                    "
                ></div>
            </div>
        </div>
    </main>
</template>
