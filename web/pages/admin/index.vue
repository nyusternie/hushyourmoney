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

const profiles = ref(null)
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

const numProfiles = computed(() => {
    if (!profiles.value) {
        return 'loading...'
    }

    return Object.keys(profiles.value).length
})

const lastProfileUpdate = computed(() => {
    if (!profiles.value) {
        return 'loading...'
    }

    const times = []
    Object.keys(profiles.value).forEach(_profileid => {
        const profile = profiles.value[_profileid]
        const time = profile.updatedAt
        console.log('UPDATE TIME', time)
        times.push(time)
    })

    const sorted = times.sort((a, b) => {
        return b - a
    })

    return moment.unix(sorted[0]).format('llll')
})

const displayProfileTimeAgo = computed(() => {
    if (!profiles.value) {
        return 'loading...'
    }

    const times = []
    Object.keys(profiles.value).forEach(_profileid => {
        const profile = profiles.value[_profileid]
        const time = profile.updatedAt
        console.log('UPDATE TIME', time)
        times.push(time)
    })

    const sorted = times.sort((a, b) => {
        return b - a
    })

    return moment.unix(sorted[0]).fromNow()
})

const init = async () => {
    /* Request system (status). */
    system.value = await $fetch('/api/system')
        .catch(err => console.error(err))
    // console.log('SYSTEM', system.value)

    /* Set (system) status. */
    status.value = system.value.status

    /* Request profiles. */
    profiles.value = await $fetch('/api/profiles')
        .catch(err => console.error(err))
    // console.log('PROFILES', profiles.value)
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

        <div class="grid grid-cols-2 gap-6">
            <section class="w-full px-5 py-3 flex flex-col gap-0 bg-amber-100 border-2 border-amber-300 rounded-2xl shadow">
                <h2 class="text-amber-500 text-base font-bold tracking-widest uppercase">
                    {{numProfiles * 2}} Fusions??
                </h2>

                <h3 class="text-amber-700 text-2xl font-medium tracking-widest">
                    {{lastProfileUpdate}}
                </h3>

                <h3 class="text-amber-700 text-base text-right font-medium tracking-widest">
                    {{displayProfileTimeAgo}}
                </h3>
            </section>

            <section class="w-full px-5 py-3 flex flex-col gap-0 bg-amber-100 border-2 border-amber-300 rounded-2xl shadow">
                <h2 class="text-amber-500 text-base font-bold tracking-widest uppercase">
                    {{numProfiles}} Profiles
                </h2>

                <h3 class="text-amber-700 text-2xl font-medium tracking-widest">
                    {{lastProfileUpdate}}
                </h3>

                <h3 class="text-amber-700 text-base text-right font-medium tracking-widest">
                    {{displayProfileTimeAgo}}
                </h3>
            </section>

            <section class="w-full px-5 py-3 flex flex-col gap-0 bg-amber-100 border-2 border-amber-300 rounded-2xl shadow">
                <h2 class="text-amber-500 text-base font-bold tracking-widest uppercase">
                    {{Math.ceil(numProfiles * 3.33)}} Sessions??
                </h2>

                <h3 class="text-amber-700 text-2xl font-medium tracking-widest">
                    {{lastProfileUpdate}}
                </h3>

                <h3 class="text-amber-700 text-base text-right font-medium tracking-widest">
                    {{displayProfileTimeAgo}}
                </h3>
            </section>

            <section class="w-full px-5 py-3 flex flex-col gap-0 bg-amber-100 border-2 border-amber-300 rounded-2xl shadow">
                <h2 class="text-amber-500 text-base font-bold tracking-widest uppercase">
                    Last Club Startup
                </h2>

                <h3 class="text-amber-700 text-2xl font-medium tracking-widest">
                    {{displayCreatedAt}}
                </h3>

                <h3 class="text-amber-700 text-base text-right font-medium tracking-widest">
                    {{displayTimeAgo}}
                </h3>
            </section>
        </div>

        <pre class="text-xs">{{system}}</pre>
        <pre class="text-xs">{{profiles}}</pre>
    </main>
</template>
