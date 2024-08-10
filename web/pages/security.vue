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
                    IPFS "Self-hosted" Gateways
                </h2>

                <ol class="pl-10 list-decimal">
                    <li>Brave web browser</li>
                    <li>Kubo (w/ HTTP enabled)</li>
                </ol>
            </div>

            <div>
                <h2 class="text-xl font-medium">
                    IPFS "Trusted" Gateways
                </h2>

                <ol class="pl-10 list-decimal">
                    <li>Dweb</li>
                    <li>Cloudflare</li>
                </ol>
            </div>

            <div>
                <h2 class="text-xl font-medium">
                    Web Gateways
                </h2>

                <ol class="pl-10 list-decimal">
                    <li>hushyourmoney.com</li>
                    <li>hushyourmoney.app.runonflux.io</li>
                    <li>shuffle.cash <em>(redirect)</em></li>
                    <li>blender.cash <em>(redirect)</em></li>
                </ol>
            </div>

        </section>
    </main>
</template>
