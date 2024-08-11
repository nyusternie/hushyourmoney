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
    <main aria-labelledby="section-2-title">
        <h2 class="sr-only" id="section-2-title">
            Wealth Diary
        </h2>

        <div class="overflow-hidden rounded-lg bg-white shadow">
            <div class="p-6">

                <!-- Your content -->
                Wealth Diary

            </div>
        </div>
    </main>
</template>
