<template>
    <main class="tab-pane">

        <div class="row">

            <div class="col-xs-12 col-sm-7">

                <p class="intro mt-2">
                    Hush Your Money is the <strong>open source</strong> and <strong>non-custodial</strong> solution for <strong>trustless anonymity management</strong> of your <strong class="text-success">Bitcoin Cash (BCH)</strong> using the leading standards in decentralized protocols.
                    <br /><small><a href="javascript://" class="text-danger">(learn more)</a></small>
                </p>

                <hr />

                <div class="info-text easy">
                    Shuffling is as easy as <span class="text-primary">1-2-3</span>
                </div>

                <div class="easy-steps">
                    <sup class="text-primary">1 <i class="fa fa-long-arrow-right"></i></sup>
                    Click the smiley face to select a <strong class="text-primary">UNIQUE</strong> photo or image file from your device's library.
                    If you're using a camera-enabled device, we recommend taking a new photo now.
                </div>

                <div class="easy-steps mt-2">
                    <sup class="text-primary">2 <i class="fa fa-long-arrow-right"></i></sup>
                    Next, send one or more coin(s) to the deposit address(es) shown in the Shuffler.
                </div>

                <div class="easy-steps mt-2">
                    <sup class="text-primary">3 <i class="fa fa-long-arrow-right"></i></sup>
                    After shuffling, spend your coins wisely or try a more advanced mixing solution like CashFusion.
                    <small><a href="javascript://" class="text-danger">(learn more)</a></small>
                </div>

            </div>

            <div class="col-xs-12 col-sm-5">

                <div class="row">
                    <div class="col-xs-8 col-xs-offset-2">
                        <div class="picture-container" @click="selectIdentity">
                            <div class="picture">
                                <img :src="dataUrl" class="picture-src" title="" />
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                <div class="row">
                    <div class="col-xs-10 col-xs-offset-1">
                        <div class="form-group">
                            <label>
                                Seed phrase
                                <small class="text-danger btn-privacy" @click="togglePrivacy">
                                    (click to show)
                                </small>
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                placeholder="Private seed phrase"
                                disabled
                                :value="displaySeedPhrase"
                            />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-10 col-xs-offset-1">
                        <div class="form-group">
                            <label>
                                Password
                                <small class="text-secondary">
                                    (optional)
                                </small>
                            </label>

                            <input
                                type="password"
                                class="form-control"
                                placeholder="Enter an optional password"
                                v-model="password"
                            />
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <!-- hidden input -->
        <input
            ref="fileInput"
            type="file"
            id="wizard-picture"
            @change="readURL"
        />
    </main>
</template>

<script>
/* Import modules. */
// import Nexa from 'nexajs'
let Nexa
import scrypt from 'scrypt-js'
import Swal from 'sweetalert2'


</script>

<style scoped>
.intro {
    font-size: 0.9em;
    color: rgba(30, 30, 30, 0.5);
}

.easy {
    font-size: 1.6em;
}
.easy-steps sup {
    font-weight: 600;
    /* font-size: 1.6em; */
}

.warning {
    font-size: 1.4em;
}
.warning-msg {
    margin-top: 10px;
}

.btn-privacy {
    cursor: pointer;
}

#wizard-picture {
    display: none;
}

.picture {
    margin-top: 20px;
}
</style>
