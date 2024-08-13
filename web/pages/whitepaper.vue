<script setup lang="ts">
definePageMeta({
    layout: 'info',
})

useHead({
    title: `Whitepaper — Hush Your Money`,
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
            Whitepaper
        </h1>

        <p>
            A total privacy network to complete the Trifecta:
        </p>

        <pre>
Form     : Scaling, Security + Decentralization
Function : Tokenized Assets + Smart Contracts
Freedom  : Always on Privacy offering 100% anonymity
        </pre>

        <p>
            Hush is a Nexa L1+ network for privacy conscious individuals.
            Hush aims to offer the MOST functional network while protecting the anonymity of its users.
        </p>

        <h2 class="text-4xl font-bold text-gray-400">
            Never Go FULL Privacy
        </h2>

        <p>
            Unlike MOST privacy coins/networks, Hush DOES NOT aim for TOTAL privacy.
            Amounts and Participants are 100% hidden by default, and everything ELSE remains transparent;
            allowing for MORE PRACTICAL applications to be built on top of the network.
        </p>
    </main>
</template>
