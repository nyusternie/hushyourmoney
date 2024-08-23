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
            CoinJoins: à la CashFusion
        </h2>

        <p>
            CashFusion is the leading protocol in production use on the Bitcoin Cash network since 2020.
        </p>

        <p>
            Not every UTXO-based network can/will offer
            <NuxtLink to="https://nexa.wiki/supernet" target="_blank" class="text-blue-500 font-bold hover:underline">
                Supernet

                <svg class="inline h-5 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                </svg>
            </NuxtLink>
            capabilities; so as a fallback to Incognito Network (Nito), CashFusion has been employed as a Pretty Good Privacy solution for each network's community of users.
        </p>

        <p>
            Access to the protocol is permissionless, which makes it an ideal solution.
        </p>

        <section>
            <h3 class="text-xl text-red-500 font-bold uppercase">
                Please Note
            </h3>

            <p>
                As an alternative to TOR's anonymity network, Hush uses a <span class="font-bold">Peer-to-peer Anonymity Relay Network (PARN)</span> made up of the Guests themselves.
                The PARN offers an assurance to each Guest that the Club Server (on its own) CANNOT compromise their financial privacy.
            </p>
        </section>
    </main>
</template>
