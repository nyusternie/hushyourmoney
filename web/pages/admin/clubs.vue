<script setup lang="ts">
definePageMeta({
    layout: 'admin',
})

useHead({
    title: `Clubs — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money makes spending safu.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const clubs = ref(null)

const init = async () => {
    /* Request all clubs. */
    clubs.value = await $fetch('/_clubs')
        .catch(err => console.error(err))
    console.log('CLUBS', clubs.value)
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Clubs
        </h1>

        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id eius voluptatem minus natus at eveniet dolorum eos mollitia, maxime animi excepturi harum omnis illum odit recusandae pariatur! Unde, explicabo molestias.
        </p>

        <pre v-if="clubs">{{clubs}}</pre>
    </main>
</template>
