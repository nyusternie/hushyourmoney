<script setup lang="ts">
useHead({
    title: `Guides — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money makes spending safu.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const route = useRoute()
console.log('ROUTE', route)

const networkid = route?.params?.pageid[0]
console.log('NETWORK ID', networkid)

const guideid = route?.params?.pageid[1]
console.log('GUIDE ID', guideid)

let guide

const init = () => {
    switch(networkid) {
    case 'bch':
        guide = 'lorem ipsum'
        break
    default:
        // TODO
    }
}

onMounted(() => {
    // init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Guides — {{ networkid }} — {{ guideid }}
        </h1>

        <GuidesBCHWalletIntegration />
    </main>
</template>
