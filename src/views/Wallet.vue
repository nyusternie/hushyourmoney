<template>
    <div class="tab-pane" id="wallet">
        <div class="row">
            <div class="col-sm-12">
                <h5 class="info-text">Are you living in a nice area?</h5>
            </div>

            <div class="col-sm-7 col-sm-offset-1">
                <div class="form-group">
                    <label>Street Name</label>
                    <input type="text" class="form-control" placeholder="5h Avenue" />
                </div>
            </div>

            <div class="col-sm-3">
                <div class="form-group">
                    <label>Street Number</label>
                    <input type="text" class="form-control" placeholder="242" />
                </div>
            </div>

            <div class="col-sm-5 col-sm-offset-1">
                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" placeholder="New York..." />
                </div>
            </div>

            <div class="col-sm-5">
                <div class="form-group">
                    <label>Country</label><br />

                    <select name="country" class="form-control">
                        <option value="Afghanistan"> Afghanistan </option>
                        <option value="Albania"> Albania </option>
                        <option value="Algeria"> Algeria </option>
                        <option value="American Samoa"> American Samoa </option>
                        <option value="Andorra"> Andorra </option>
                        <option value="Angola"> Angola </option>
                        <option value="Anguilla"> Anguilla </option>
                        <option value="Antarctica"> Antarctica </option>
                        <option value="...">...</option>
                    </select>
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
