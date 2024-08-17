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
    <main class="flex flex-col gap-5">
        <h2 class="text-3xl font-bold text-fuchsia-700">
            Introduction
        </h2>

        <p>
            <span class="text-lg font-bold">Hush Your Money (<span class="text-xl">HYM</span>)</span> is a project of pure passion; forged after years of frustration from ALL the broken promises of "fungible" crypto payments.
        </p>

        <h3 class="font-bold">
            Choose from 1 of 3 convenient methods to Hush Your Money:
        </h3>

        <ol class="-mt-3 pl-10 list-decimal leading-[50px]">
            <li>Privatize <span class="font-bold">YOUR</span> assets <span class="font-bold">AHEAD OF TIME</span> using ANY <NuxtLink to="/admin/pools" class="text-blue-500 font-bold hover:underline">HYM Club pool</NuxtLink>.</li>
            <li>Transfer <span class="font-bold">ANY</span> asset (in real-time) <span class="font-bold">THROUGH</span> ANY <NuxtLink to="/admin/pools" class="text-blue-500 font-bold hover:underline">HYM Club pool</NuxtLink>.</li>
            <li>Transfer <span class="font-bold">NITO</span> assets <span class="font-bold">PRIVATELY</span> via ANY Incognito
                <NuxtLink to="https://nexa.wiki/supernet" target="_blank" class="text-blue-500 font-bold hover:underline">
                    Supernet

                    <svg class="inline h-5 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                    </svg>
                </NuxtLink>.
            </li>
        </ol>
    </main>
</template>
