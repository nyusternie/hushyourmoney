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
    <footer class="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
            <div class="xl:grid xl:grid-cols-3 xl:gap-8">
                <div class="space-y-8">
                    <img class="h-16 w-auto" src="~/assets/icon.png" alt="Hush Your Money" />

                    <p class="text-xl leading-9 font-light text-gray-300 italic">
                        <span class="block font-bold text-rose-400">Spend Privately. Fearlessly!</span>
                        Making the world a better place with GUARANTEED financial freedom for every man, woman and child.
                    </p>

                    <div class="flex space-x-6">

                        <NuxtLink to="https://x.com/0xShomari" target="_blank" class="text-gray-400 hover:text-gray-300">
                            <span class="sr-only">X</span>
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"
                                />
                            </svg>
                        </NuxtLink>

                        <NuxtLink to="https://gogs.hos.im/nyusternie/hushyourmoney" target="_blank" class="text-gray-400 hover:text-gray-300">
                            <span class="sr-only">GitHub</span>
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </NuxtLink>

                    </div>
                </div>

                <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                    <div class="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 class="text-xl font-semibold leading-6 text-fuchsia-600">
                                Users
                            </h3>

                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        Marketing
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        Analytics
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        Commerce
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        Insights
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class="mt-10 md:mt-0">
                            <h3 class="text-xl font-semibold leading-6 text-fuchsia-600">
                                Investors
                            </h3>

                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        Pricing
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        Documentation
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        Guides
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        API Status
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 class="text-xl font-semibold leading-6 text-fuchsia-600">
                                Builders
                            </h3>

                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        About
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        Blog
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        Jobs
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        Press
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">
                                        Partners
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class="mt-10 md:mt-0">
                            <h3 class="text-xl font-semibold leading-6 text-fuchsia-600">
                                HYM Links
                            </h3>

                            <ul role="list" class="mt-6 space-y-4">
                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">Claim</a>
                                </li>
                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">Privacy</a>
                                </li>
                                <li>
                                    <a href="javascript://" class="text-base leading-6 text-gray-300 hover:text-gray-900">Terms</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4 sm:mt-20 lg:mt-24 flex flex-col sm:flex-row justify-between gap-4 border-t border-gray-900/10 pt-8">
                <p class="leading-5 text-gray-300 text-center sm:text-left text-sm lg:text-base">
                    <span class="px-1 block sm:inline">&copy; 2020-2024 The Hush DAO</span>
                    <span class="hidden lg:inline">—</span>
                    <span class="hidden sm:block lg:hidden"></span>
                    <span class="px-1 block sm:inline">All rights reserved.</span>
                </p>

                <div class="flex mb-2 lg:mb-5 justify-center lg:justify-end">
                    <NuxtLink to="https://runonflux.io" target="_blank">
                        <img src="~/assets/running-on-flux-white.png" class="h-10 lg:h-16 border border-gray-300 rounded-lg hover:border-sky-300" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>
