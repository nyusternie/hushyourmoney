<script setup lang="ts">
useHead({
    title: `Support Center — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money makes spending safu.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const faqs = []

faqs.push({
    question: 'How do I setup my Wallet?',
    answer: 'Very carefully, please!',
    isShowing: false,
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
    <main class="flex flex-col gap-4">
        <h1 class="text-sky-500 text-5xl font-light italic">
            Support Center
        </h1>

        <p>
            While Bitcoin is considered to be a privacy-oriented system, the blockchain is open to analyze by anyone, and there are numerous transaction tracing tools like Chainalysis, Coinfirm, Elliptic, CipherTrace, and Crystal.
            They're all not free, and Bitcoin users rarely have a chance to see how deep the rabbit hole goes.
            <strong>We start with a simple transaction scoring tool, and will soon expand this even further.</strong>
            We'll provide this service for free as we hope it'd help Bitcoin users to take some of their privacy back.
        </p>

        <h4>ROADMAP</h4>

        <ol>
            <li>Full transaction history</li>
        </ol>

        <p>
            The rapid evolution of the cryptocurrency industry continues to hold the attention of governments and regulators worldwide.
            Cypherpunks' dream of free and independent payment methods seems be a notion from light years ago.
            Here and now have to deal with the harsh reality.
            <strong>The regulation of cryptocurrencies is following suit of how the bank industry is being controlled.</strong>
        </p>

        <hr />

        <h2 class="text-gray-500 text-4xl font-bold">
            Guides and Tutorials
        </h2>

        <NuxtLink to="/help/bch/wallet-integration" class="text-blue-500 text-xl font-medium hover:text-blue-400 hover:underline">
            Bitcoin Cash Wallet Integration
        </NuxtLink>

        <section class="bg-white">
            <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
                    <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">

                        <div v-for="faq of faqs" :key="faq.question" class="pt-6">
                            <dt>
                                <!-- Expand/collapse question button -->
                                <button type="button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" aria-expanded="false">
                                    <span class="text-base font-semibold leading-7">{{faq.question}}</span>
                                    <span class="ml-6 flex h-7 items-center">
                                        <!--
                          Icon when question is collapsed.

                          Item expanded: "hidden", Item collapsed: ""
                        -->
                                        <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                        </svg>
                                        <!--
                          Icon when question is expanded.

                          Item expanded: "", Item collapsed: "hidden"
                        -->
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                        </svg>
                                    </span>
                                </button>
                            </dt>
                            <dd class="mt-2 pr-12" id="faq-0">
                                <p class="text-base leading-7 text-gray-600">{{faq.answer}}</p>
                            </dd>
                        </div>

                        <div class="pt-6">
                            <dt>
                                <!-- Expand/collapse question button -->
                                <button type="button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" aria-expanded="false">
                                    <span class="text-base font-semibold leading-7">What&#039;s the best thing about Switzerland?</span>
                                    <span class="ml-6 flex h-7 items-center">
                                        <!--
                          Icon when question is collapsed.

                          Item expanded: "hidden", Item collapsed: ""
                        -->
                                        <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                        </svg>
                                        <!--
                          Icon when question is expanded.

                          Item expanded: "", Item collapsed: "hidden"
                        -->
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                        </svg>
                                    </span>
                                </button>
                            </dt>
                            <dd class="mt-2 pr-12" id="faq-0">
                                <p class="text-base leading-7 text-gray-600">I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</p>
                            </dd>
                        </div>

                        <div class="pt-6">
                            <dt>
                                <!-- Expand/collapse question button -->
                                <button type="button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" aria-expanded="false">
                                    <span class="text-base font-semibold leading-7">How do you make holy water?</span>
                                    <span class="ml-6 flex h-7 items-center">
                                        <!--
                          Icon when question is collapsed.

                          Item expanded: "hidden", Item collapsed: ""
                        -->
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                        </svg>
                                        <!--
                          Icon when question is expanded.

                          Item expanded: "", Item collapsed: "hidden"
                        -->
                                        <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                        </svg>
                                    </span>
                                </button>
                            </dt>
                            <dd class="hidden mt-2 pr-12" id="faq-0">
                                <p class="text-base leading-7 text-gray-600">You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus.</p>
                            </dd>
                        </div>

                        <!-- More questions... -->
                    </dl>
                </div>
            </div>
        </section>

    </main>
</template>
