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
            Mineable $HUSH
        </h2>

        <p>
            At least <span class="text-lg font-bold"><span class="text-xl text-rose-500">50%</span> of the Total Supply of $HUSH</span> will be available for PoW token mining (or melted).
        </p>
    </main>
</template>
