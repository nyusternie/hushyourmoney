<template>
    <div class="image-container set-full-height" style="background-image: url('assets/img/eric-prouzet.jpg');">
        <router-link to="help" class="made-with-pk">
            <div class="brand">???</div>
            <div class="made-with">Need help?</div>
        </router-link>

        <!--   Big container   -->
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2">

                    <div class="wizard-container">
                        <div class="card wizard-card" data-color="green" id="wizardProfile">

                            <router-view/>

                        </div>
                    </div>

                </div>
            </div>
            <!-- end row -->
        </div>
        <!--  big container -->

        <div class="footer">
            <div class="container text-center">
                Made with <i class="fa fa-heart heart"></i> by <a href="https://bchplease.org" target="_blank">Bitcoin Cash Please</a>.
                &copy; 2020. All rights reserved.
            </div>
        </div>
    </div>
</template>

<script>
/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            //
        }
    },
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        // Wizard Initialization
        $(".wizard-card").bootstrapWizard({
            // tabClass: "nav nav-pills",
            // nextSelector: ".btn-next",
            // previousSelector: ".btn-previous",
        })
    },
}
</script>

<style>
.set-full-height {
    height: auto;
}
</style>
