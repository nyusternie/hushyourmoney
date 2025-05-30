<script setup lang="ts">
useHead({
    title: `Profile — Hush Your Money`,
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
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Profile
        </h1>

        <h3 class="text-rose-500 font-medium">
            NOTE: All settings are saved, ENCRYPTED, to the browser's local storage.
            (up to 5GiB limit)
        </h3>

        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id eius voluptatem minus natus at eveniet dolorum eos mollitia, maxime animi excepturi harum omnis illum odit recusandae pariatur! Unde, explicabo molestias.
        </p>

        <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
                <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                <p class="mt-1 text-sm leading-6 text-gray-500">This information will be displayed publicly so be careful what you share.</p>

                <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div class="pt-6 sm:flex">
                        <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div class="text-gray-900">Tom Cook</div>
                            <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
                        </dd>
                    </div>
                    <div class="pt-6 sm:flex">
                        <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div class="text-gray-900">tom.cook@example.com</div>
                            <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
                        </dd>
                    </div>
                    <div class="pt-6 sm:flex">
                        <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Title</dt>
                        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div class="text-gray-900">Human Resources Manager</div>
                            <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
                        </dd>
                    </div>
                </dl>
            </div>

            <div>
                <h2 class="text-base font-semibold leading-7 text-gray-900">Bank accounts</h2>
                <p class="mt-1 text-sm leading-6 text-gray-500">Connect bank accounts to your account.</p>

                <ul role="list" class="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <li class="flex justify-between gap-x-6 py-6">
                        <div class="font-medium text-gray-900">TD Canada Trust</div>
                        <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
                    </li>
                    <li class="flex justify-between gap-x-6 py-6">
                        <div class="font-medium text-gray-900">Royal Bank of Canada</div>
                        <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
                    </li>
                </ul>

                <div class="flex border-t border-gray-100 pt-6">
                    <button type="button" class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"><span aria-hidden="true">+</span> Add another bank</button>
                </div>
            </div>

            <div>
                <h2 class="text-base font-semibold leading-7 text-gray-900">Integrations</h2>
                <p class="mt-1 text-sm leading-6 text-gray-500">Connect applications to your account.</p>

                <ul role="list" class="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <li class="flex justify-between gap-x-6 py-6">
                        <div class="font-medium text-gray-900">QuickBooks</div>
                        <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
                    </li>
                </ul>

                <div class="flex border-t border-gray-100 pt-6">
                    <button type="button" class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"><span aria-hidden="true">+</span> Add another application</button>
                </div>
            </div>

            <div>
                <h2 class="text-base font-semibold leading-7 text-gray-900">Language and dates</h2>
                <p class="mt-1 text-sm leading-6 text-gray-500">Choose what language and date format to use throughout your account.</p>

                <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div class="pt-6 sm:flex">
                        <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>
                        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div class="text-gray-900">English</div>
                            <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
                        </dd>
                    </div>
                    <div class="pt-6 sm:flex">
                        <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date format</dt>
                        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div class="text-gray-900">DD-MM-YYYY</div>
                            <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
                        </dd>
                    </div>
                    <div class="flex pt-6">
                        <dt class="flex-none pr-6 font-medium text-gray-900 sm:w-64" id="timezone-option-label">Automatic timezone</dt>
                        <dd class="flex flex-auto items-center justify-end">
                            <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                            <button
                                type="button"
                                class="flex w-8 cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                role="switch"
                                aria-checked="true"
                                aria-labelledby="timezone-option-label"
                            >
                                <!-- Enabled: "translate-x-3.5", Not Enabled: "translate-x-0" -->
                                <span aria-hidden="true" class="h-4 w-4 translate-x-0 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"></span>
                            </button>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </main>
</template>
