<script setup lang="ts">
/* Import modules. */
import moment from 'moment'

definePageMeta({
    layout: 'admin',
})

useHead({
    title: `Club Dashboard — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money makes spending safu.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const status = ref(null)
const system = ref(null)

const displayCreatedAt = computed(() => {
    if (!status.value || !status.value.createdAt) {
        return 'loading...'
    }

    return moment.unix(status.value.createdAt).format('llll')
})

const displayTimeAgo = computed(() => {
    if (!status.value || !status.value.createdAt) {
        return 'loading...'
    }

    return moment.unix(status.value.createdAt).fromNow()
})

const init = async () => {
    /* Request system (status). */
    system.value = await $fetch('/api/system')
        .catch(err => console.error(err))
    // console.log('SYSTEM', system.value)

    /* Set (system) status. */
    status.value = system.value.status
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
            Club Dashboard
        </h1>

        <p>
            Welcome to the Hush Your Money Administration Area.
        </p>

        <section class="w-fit px-5 py-3 flex flex-col gap-0 bg-amber-100 border-2 border-amber-300 rounded-2xl shadow">
            <h2 class="text-amber-500 text-base font-bold tracking-widest uppercase">
                Club Creation
            </h2>

            <h3 class="text-amber-700 text-2xl font-medium tracking-widest">
                {{displayCreatedAt}}
            </h3>

            <h3 class="text-amber-700 text-base text-right font-medium tracking-widest">
                {{displayTimeAgo}}
            </h3>
        </section>

        <pre class="text-xs">{{system}}</pre>
    </main>
</template>
