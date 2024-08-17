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
            You NEVER Go FULL Privacy
        </h2>

        <NuxtLink to="https://z.cash/zcashs-privacy-is-normal-goes-viral/" target="_blank" class="pl-5 flex flex-row gap-2 items-baseline text-xl text-blue-500 font-bold hover:underline">
            Because <span class="text-2xl">Censorship is REAL!</span>

            <svg class="h-5 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
            </svg>
        </NuxtLink>

    <p>
            Unlike MOST privacy coins/networks, Hush DOES NOT aim for TOTAL privacy.
            Amounts and Participants are 100% hidden by default, and everything ELSE remains transparent;
            allowing for MORE PRACTICAL applications to be built on top of the network.
        </p>

        <p>
            The #1 benefit of a non-TOTAL approach is that Incognito
            <NuxtLink to="https://nexa.wiki/supernet" target="_blank" class="text-blue-500 font-bold hover:underline">
                Supernet

                <svg class="inline h-5 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                </svg>
            </NuxtLink> assets CANNOT be banned by Centralized Exchanges (CEXs);
            as it would require banning the Host asset as well.
            100% of Incognito
            <NuxtLink to="https://nexa.wiki/supernet" target="_blank" class="text-blue-500 font-bold hover:underline">
                Supernet

                <svg class="inline h-5 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                </svg>
            </NuxtLink> assets are available for trading on Decentralized Exchanges (DEXs).
        </p>
    </main>
</template>
