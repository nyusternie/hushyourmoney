<template>
    <main class="tab-pane">

        <div class="row">
            <div class="col-xs-12 col-sm-4">

                <!-- <div class="info-text mode-select">
                    Menu
                </div> -->

                <div class="row mode-select-container">

                    <div class="col-sm-12 col-sm-offset-0">

                        <div class="col-xs-12 col-sm-6">
                            <div
                                class="choice"
                                :class="{ active: menuIndex === 0 }"
                                @click="menuIndex = 0"
                            >
                                <div class="card card-checkboxes card-hover-effect">
                                    <i class="fa fa-bar-chart"></i>
                                    <p>Stats</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-6">
                            <div
                                class="choice"
                                :class="{ active: menuIndex === 1 }"
                                @click="menuIndex = 1"
                            >
                                <div class="card card-checkboxes card-hover-effect">
                                    <i class="fa fa-trophy"></i>
                                    <p>Score</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-6">
                            <div
                                class="choice"
                                :class="{ active: menuIndex === 2 }"
                                @click="menuIndex = 2"
                            >
                                <div class="card card-checkboxes card-hover-effect">
                                    <i class="fa fa-sitemap"></i>
                                    <p>Mapper</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div class="col-xs-12 col-sm-8">
                <Stats v-if="menuIndex === 0" />
                <Score v-if="menuIndex === 1" />
                <Mapper v-if="menuIndex === 2" />
            </div>

        </div>

    </main>
</template>

<script>
/* Import components. */
import Mapper from './Analysis/Mapper'
import Score from './Analysis/Score'
import Stats from './Analysis/Stats'

export default {
    components: {
        Mapper,
        Score,
        Stats,
    },
    data: () => {
        return {
            menuIndex: null,
        }
    },
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        /* Set menu index. */
        this.menuIndex = 0
    },
    mounted: function () {
        //
    },
    beforeDestroy() {
        //
    },
}
</script>

<style scoped>
.mode-select, .menu-title {
    font-size: 2.0em;
}
.mode-select-container {
    margin-top: -30px;
}

.choice.active {
    box-shadow: 0px 12px 17px -7px rgba(0, 0, 0, 0.3);
    -webkit-transform: translateY(-10px);
    -moz-transform: translateY(-10px);
    -o-transition: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
}
.choice.active:hover {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -o-transition: translateY(0px);
    -ms-transform: translateY(0px);
    transform: translateY(0px);
}
</style>
