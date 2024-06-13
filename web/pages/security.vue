<script setup lang="ts">
useHead({
    title: `Security — Hush Your Money`,
    meta: [
        { name: 'description', content: `Security is VERY important and MUST NOT be underestimated.` }
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
            Security
        </h1>

        <p>
            Choose your gateway.
        </p>

        <section class="flex flex-col gap-6">
            <div>
                <h2 class="text-xl font-medium">
                    Self-compiled Source Code
                </h2>

                <ol class="pl-10 list-decimal">
                    <li>Gogs <em>(recommended)</em></li>
                    <li>GitHub</li>
                    <li>GitLab</li>
                </ol>
            </div>

            <div>
                <h2 class="text-xl font-medium">
                    IPFS "Self-hosted" Gateway
                </h2>

                <ol class="pl-10 list-decimal">
                    <li>Brave web browser</li>
                </ol>
            </div>

            <div>
                <h2 class="text-xl font-medium">
                    IPFS "Trusted" Gateway
                </h2>

                <ol class="pl-10 list-decimal">
                    <li>Dweb</li>
                    <li>Cloudflare</li>
                </ol>
            </div>

            <div>
                <h2 class="text-xl font-medium">
                    Web Gateway
                </h2>

                <ol class="pl-10 list-decimal">
                    <li>hushyourmoney.com</li>
                    <li>hushyourmoney.app.runonflux.io</li>
                </ol>
            </div>

        </section>
    </main>

    <Footer />
</template>
