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
    <main class="flex flex-col gap-4">
        <h1 class="text-lime-600 text-6xl font-light italic">
            Bitcoin Cash Wallet Integration Guide
        </h1>

        <p>
            The HUSH Protocol can be easily implemented using ANY of the available software development kits (SDKs) available:
        </p>

        <ol class="pl-10 list-decimal">
            <li>C/C++</li>
            <li>JavaScript</li>
            <li>Python</li>
            <li>Rust</li>
        </ol>

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni error a, praesentium reprehenderit provident unde sapiente inventore, voluptas atque quidem qui quae repellat recusandae vel nulla, harum impedit adipisci non!
        </p>
    </main>
</template>
