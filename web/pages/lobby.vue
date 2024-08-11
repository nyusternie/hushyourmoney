<script setup lang="ts">
useHead({
    title: `Lobby — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money makes spending safu.` }
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
    <h1 class="text-6xl text-fuchsia-500 font-light italic">
        Club Flux Lobby
    </h1>

    <form action="" method="">
        <div class="wizard-header text-center">
            <h3 class="wizard-title">
                Hush Your Money
            </h3>

            <p class="category">
                Spend Privately. Fearlessly!
            </p>
        </div>

        <div class="wizard-navigation">
            <div class="progress-with-circle">
                <div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" :style="{ width: pbWidth }"></div>
            </div>

            <ul>
                <li :class="{ active: tabIndex === 0 }">
                    <a href="javascript://" @click="showIdentity">
                        <div class="icon-circle" :class="{ checked: tabIndex === 0 }">
                            <i class="ti-user"></i>
                        </div>
                        Identity
                    </a>
                </li>

                <li :class="{ active: tabIndex === 1 }">
                    <a href="javascript://" @click="showAnalysis">
                        <div class="icon-circle" :class="{ checked: tabIndex === 2 }">
                            <i class="ti-receipt"></i>
                        </div>
                        Analysis
                    </a>
                </li>

                <li :class="{ active: tabIndex === 2 }">
                    <a href="javascript://" @click="showShuffler">
                        <div class="icon-circle" :class="{ checked: tabIndex === 1 }">
                            <i class="ti-control-shuffle"></i>
                        </div>
                        Shuffler
                    </a>
                </li>
            </ul>
        </div>

        <div class="win-content">
            <Identity v-if="tabIndex === 0" />
            <Analysis v-if="tabIndex === 1" />
            <Shuffler v-if="tabIndex === 2" />
        </div>

        <div class="wizard-footer flex">
            <div class="footer-item">
                <input
                    v-if="tabIndex !== 0"
                    type="button"
                    class="btn btn-previous btn-default btn-wd"
                    :value="lblPrevious"
                    @click="previous"
                />
            </div>

            <div class="footer-item">
                <input
                    v-if="tabIndex === 2"
                    type="button"
                    class="btn btn-warning btn-wd"
                    value="Options"
                    @click="showOptions"
                />
            </div>

            <div class="footer-item">
                <input
                    v-if="tabIndex !== 2"
                    type="button"
                    class="btn btn-next btn-fill btn-primary btn-wd"
                    :value="lblNext"
                    @click="next"
                />
            </div>
        </div>
    </form>
</template>
