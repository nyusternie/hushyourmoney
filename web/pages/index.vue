<script setup lang="ts">
import { getTip } from '@nexajs/rostrum'
import numeral from 'numeral'

definePageMeta({
    layout: 'fullscreen',
})

const blockHeight = ref(0)

const init = async () => {
    const currentTip = await getTip()
    console.log('CURRENT TIP', currentTip)

    blockHeight.value = numeral(currentTip.height).format('0,0')
}

onMounted(() => {
    console.log('Mounted!')
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main class="w-screen h-screen flex flex-col bg-gradient-to-r from-lime-200 to-lime-100">
        <div class="h-full flex flex-col justify-center pb-32 items-center gap-5 sm:gap-8">
            <NuxtLink to="/security">
                <img src="~/assets/icon.png" class="w-24 sm:w-32 lg:w-40" />
            </NuxtLink>

            <h1 class="text-4xl sm:text-6xl lg:text-8xl text-lime-800 font-light italic">
                Hush Your Money
            </h1>

            <h1 class="text-2xl sm:text-4xl lg:text-5xl text-lime-600 font-light italic">
                Spend Privately. Fearlessly!
            </h1>

        </div>

        <footer class="px-2 py-1 flex flex-row justify-between">
            <div class="flex flex-row gap-2 text-rose-500 text-xs font-medium opacity-30">
                <NuxtLink to="/legal">
                    legal
                </NuxtLink>

                |

                <NuxtLink to="/sponsors">
                    sponsors 💗
                </NuxtLink>
            </div>

            <NuxtLink to="https://nexa.sh/blocks" target="_blank" class="text-rose-500 text-xs font-medium italic opacity-30">
                block # {{ blockHeight }}
            </NuxtLink>
        </footer>
    </main>
</template>
