<script setup lang="ts">
useHead({
    title: `Roadmap — Hush Your Money`,
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
    <main class="flex flex-col gap-4">
        <h1 class="text-sky-500 text-5xl font-light italic">
            Roadmap
        </h1>

        <p>
            While Bitcoin is considered to be a privacy-oriented system, the blockchain is open to analyze by anyone, and there are numerous transaction tracing tools like Chainalysis, Coinfirm, Elliptic, CipherTrace, and Crystal.
            They're all not free, and Bitcoin users rarely have a chance to see how deep the rabbit hole goes.
            <strong>We start with a simple transaction scoring tool, and will soon expand this even further.</strong>
            We'll provide this service for free as we hope it'd help Bitcoin users to take some of their privacy back.
        </p>

        <h4>Version 0.1</h4>

        <ol>
            <li>Full transaction history</li>
        </ol>

        <p>
            The rapid evolution of the cryptocurrency industry continues to hold the attention of governments and regulators worldwide.
            Cypherpunks' dream of free and independent payment methods seems be a notion from light years ago.
            Here and now have to deal with the harsh reality.
            <strong>The regulation of cryptocurrencies is following suit of how the bank industry is being controlled.</strong>
        </p>

        <section class="bg-white py-24 sm:py-32">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    <div>
                        <time datetime="2021-08" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Aug 2021
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>
                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">Founded company</p>
                        <p class="mt-1 text-base leading-7 text-gray-600">Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae.</p>
                    </div>
                    <div>
                        <time datetime="2021-12" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Dec 2021
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>
                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">Secured $65m in funding</p>
                        <p class="mt-1 text-base leading-7 text-gray-600">Provident quia ut esse. Vero vel eos repudiandae aspernatur. Cumque minima impedit sapiente a architecto nihil.</p>
                    </div>
                    <div>
                        <time datetime="2022-02" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Feb 2022
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>
                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">Released beta</p>
                        <p class="mt-1 text-base leading-7 text-gray-600">Sunt perspiciatis incidunt. Non necessitatibus aliquid. Consequatur ut officiis earum eum quia facilis. Hic deleniti dolorem quia et.</p>
                    </div>
                    <div>
                        <time datetime="2022-12" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Dec 2022
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>
                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">Global launch of product</p>
                        <p class="mt-1 text-base leading-7 text-gray-600">Ut ipsa sint distinctio quod itaque nam qui. Possimus aut unde id architecto voluptatem hic aut pariatur velit.</p>
                    </div>
                </div>
            </div>
        </section>

    </main>
</template>
