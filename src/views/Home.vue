<template>
    <div class="image-container set-full-height" style="background-image: url('assets/img/eric-prouzet.jpg');">
        <!--  Made With Paper Kit  -->
        <a href="https://causes.cash/@BCHPlease/hush-your-money-c4657f3c" target="_blank" class="made-with-pk">
            <div class="brand">C$</div>
            <div class="made-with">Causes <strong>Cash</strong></div>
        </a>

        <!--   Big container   -->
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2">
                    <!--      Wizard container        -->
                    <div class="wizard-container">
                        <div class="card wizard-card" data-color="green" id="wizardProfile">
                            <form action="" method="">
                                <div class="wizard-header text-center">
                                    <h3 class="wizard-title">
                                        Hush Your Money
                                    </h3>

                                    <p class="category">
                                        Sessions offer you maximum freedom to manage your coins.
                                    </p>
                                </div>

                                <div class="wizard-navigation">
                                    <div class="progress-with-circle">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3" style="width: 21%;"></div>
                                    </div>

                                    <ul>
                                        <li>
                                            <a href="#about" data-toggle="tab">
                                                <div class="icon-circle">
                                                    <i class="ti-user"></i>
                                                </div>
                                                Identity
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#account" data-toggle="tab">
                                                <div class="icon-circle">
                                                    <i class="ti-control-shuffle"></i>
                                                </div>
                                                Shuffler
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#address" data-toggle="tab">
                                                <div class="icon-circle">
                                                    <i class="ti-time"></i>
                                                </div>
                                                History
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="tab-content">
                                    <div class="tab-pane" id="about">
                                        <div class="row">
                                            <h5 class="info-text">
                                                We'll get your coins shuffled in just a bit.
                                            </h5>

                                            <div class="col-sm-4 col-sm-offset-1">
                                                <div class="picture-container">
                                                    <div class="picture">
                                                        <img src="assets/img/default-avatar.jpg" class="picture-src" id="wizardPicturePreview" title="" />
                                                        <input type="file" id="wizard-picture" />
                                                    </div>

                                                    <h6>Choose an ORIGINAL photo from your device (<a href="javascript://">?</a>)</h6>
                                                </div>
                                            </div>

                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label>Session Title <small>(required)</small></label>
                                                    <input name="firstname" type="text" class="form-control" placeholder="Minding my own business" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane" id="account">
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

                                    <div class="tab-pane" id="address">
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
                                </div>

                                <div class="wizard-footer">
                                    <div class="pull-right">
                                        <input type="button" class="btn btn-next btn-fill btn-warning btn-wd" name="next" value="Next" />
                                        <input type="button" class="btn btn-finish btn-fill btn-warning btn-wd" name="finish" value="Finish" />
                                    </div>

                                    <div class="pull-left">
                                        <input type="button" class="btn btn-previous btn-default btn-wd" name="previous" value="Previous" />
                                    </div>

                                    <div class="clearfix"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- wizard container -->
                </div>
            </div>
            <!-- end row -->
        </div>
        <!--  big container -->

        <div class="footer">
            <div class="container text-center">
                Made with <i class="fa fa-heart heart"></i> by <a href="https://bchplease.org" target="_blank">Bitcoin Cash Please</a>.
                &copy 2020. All rights reserved.
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

// let searchVisible = 0;
// let transparent = true;

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            console.log('IMAGE SRC', e.target.result);
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

export default {
    components: {
        // HelloWorld
    },
    mounted: function () {
        /*  Activate the tooltips      */
        $('[rel="tooltip"]').tooltip();

        // Code for the Validator
        var $validator = $(".wizard-card form").validate({
            rules: {
                firstname: {
                    required: true,
                    minlength: 3,
                },
                lastname: {
                    required: true,
                    minlength: 3,
                },
                email: {
                    required: true,
                },
            },
        });

        // Wizard Initialization
        $(".wizard-card").bootstrapWizard({
            tabClass: "nav nav-pills",
            nextSelector: ".btn-next",
            previousSelector: ".btn-previous",

            // onNext: function (tab, navigation, index) {
            onNext: function () {
                var $valid = $(".wizard-card form").valid();
                if (!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },

            // onInit: function (tab, navigation, index) {
            onInit: function (tab, navigation) {
                //check number of tabs and fill the entire row
                const $total = navigation.find("li").length;
                const $width = 100 / $total;

                navigation.find("li").css("width", $width + "%");
            },

            // onTabClick: function (tab, navigation, index) {
            onTabClick: function () {
                var $valid = $(".wizard-card form").valid();

                if (!$valid) {
                    return false;
                } else {
                    return true;
                }
            },

            onTabShow: function (tab, navigation, index) {
                var $total = navigation.find("li").length;
                var $current = index + 1;

                var $wizard = navigation.closest(".wizard-card");

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find(".btn-next").hide();
                    $($wizard).find(".btn-finish").show();
                } else {
                    $($wizard).find(".btn-next").show();
                    $($wizard).find(".btn-finish").hide();
                }

                //update progress
                var move_distance = 100 / $total;
                move_distance = move_distance * index + move_distance / 2;

                $wizard.find($(".progress-bar")).css({ width: move_distance + "%" });
                //e.relatedTarget // previous tab

                $wizard.find($(".wizard-card .nav-pills li.active a .icon-circle")).addClass("checked");
            },
        });

        // Prepare the preview for profile picture
        $("#wizard-picture").change(function () {
            readURL(this);
        });

        $('[data-toggle="wizard-radio"]').click(function () {
            const wizard = $(this).closest(".wizard-card");

            wizard.find('[data-toggle="wizard-radio"]').removeClass("active");
            $(this).addClass("active");
            $(wizard).find('[type="radio"]').removeAttr("checked");
            $(this).find('[type="radio"]').attr("checked", "true");
        });

        $('[data-toggle="wizard-checkbox"]').click(function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).find('[type="checkbox"]').removeAttr("checked");
            } else {
                $(this).addClass("active");
                $(this).find('[type="checkbox"]').attr("checked", "true");
            }
        });

        $(".set-full-height").css("height", "auto");

    },
}
</script>

<style>
/*  */
</style>
