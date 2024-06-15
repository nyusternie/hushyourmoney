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
            Donate To Our Cause
        </h1>

        <p class="w-2/3">
            We are grateful to live in a world where peer-to-peer support can thrive!
            Your support is SOOOOO greatly appreciated!
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

                <h3>
                    nexa:nqtsq5g5wnltcdpm82g5t4rgxx3repxzpc5x6ceav5pqt9ty
                </h3>

                <button class="px-3 py-2 block">
                    open wallet
                </button>

                <button class="px-3 py-2 block">
                    copy address
                </button>
            </div>
        </section>

        <h2 class="text-4xl font-medium">
            Why Donate?
        </h2>

        <ol class="pl-10 list-disc">
            <li>Because those with power often abuse it</li>
            <li>Because Developers and Builders should NEVER fear tyranny!</li>
        </ol>

    </main>

    <Footer />
</template>
