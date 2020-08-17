<template>
    <div class="tab-pane" id="shuffler">
        <h5 class="info-text">What are you doing? (checkboxes)</h5>

        <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
                <div class="col-sm-4">
                    <div class="choice" data-toggle="wizard-checkbox">
                        <input type="checkbox" name="jobb" value="Design" />

                        <div class="card card-checkboxes card-hover-effect">
                            <i class="ti-paint-roller"></i>
                            <p>Design</p>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="choice" data-toggle="wizard-checkbox">
                        <input type="checkbox" name="jobb" value="Code" />

                        <div class="card card-checkboxes card-hover-effect">
                            <i class="ti-pencil-alt"></i>
                            <p>Code</p>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="choice" data-toggle="wizard-checkbox">
                        <input type="checkbox" name="jobb" value="Develop" />

                        <div class="card card-checkboxes card-hover-effect">
                            <i class="ti-star"></i>
                            <p>Develop</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        //
    },
}
</script>

<style scoped>
/*  */
</style>
