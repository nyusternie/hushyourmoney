<script setup lang="ts">
useHead({
    title: `Donations — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money developers greatly appreciate your support.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

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
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Donations
        </h1>

        <p>
            Your support is greatly appreciated!
        </p>

        <section class="grid grid-cols-3 gap-4">
            <div>
                Bitcoin

                <button class="px-3 py-2 block">
                    open wallet
                </button>

                <button class="px-3 py-2 block">
                    copy address
                </button>
            </div>

            <div>
                Bitcoin Cash

                <button class="px-3 py-2 block">
                    open wallet
                </button>

                <button class="px-3 py-2 block">
                    copy address
                </button>
            </div>

            <div>
                Nexa

                <button class="px-3 py-2 block">
                    open wallet
                </button>

                <button class="px-3 py-2 block">
                    copy address
                </button>
            </div>
        </section>

    </main>

    <Footer />
</template>
