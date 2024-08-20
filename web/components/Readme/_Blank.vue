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
            Blank: Summary
        </h2>

        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla quis sapiente, minus laboriosam officiis ex sequi. Nostrum praesentium cupiditate temporibus tenetur officiis inventore, nemo culpa quos exercitationem facilis quidem minus.
        </p>
    </main>
</template>
