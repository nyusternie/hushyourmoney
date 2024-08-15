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
            Not every UTXO network can/will offer Supernet capabilities.
            As a fallback to Incognito Network (Nito), CashFusion offers a Pretty Good Privacy solution for its community of users.
        </p>

        <p>
            Access to the protocol is permissionless, which makes it an ideal solution.
        </p>
    </main>
</template>
