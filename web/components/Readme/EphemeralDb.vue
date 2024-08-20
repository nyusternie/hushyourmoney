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
            Ephemeral Database: ZERO Logs
        </h2>

        <p>
            100% of HYM Club data is stored in "ephemeral" data storage.
            Seeders and fast-sync allow Clubs to "spin-up" near instantly, ready to serve the community.
        </p>
    </main>
</template>
