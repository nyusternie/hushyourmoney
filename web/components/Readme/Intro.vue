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
            Choose 1 of 3 convenient methods to Hush Your Money:
        </h3>

        <ol class="-mt-3 pl-10 list-decimal leading-[50px]">
            <li>Privatize your assets ahead of time using ANY HYM/Club pool.</li>
            <li>Transfer ANY asset (in real-time) directly from ANY HYM/Club pool.</li>
            <li>Transfer NITO assets to anyone privately via ANY <NuxtLink to="https://nexa.wiki/supernet" target="_blank" class="text-blue-500 font-bold hover:underline">Incognito Supernet</NuxtLink>.</li>
        </ol>
    </main>
</template>
