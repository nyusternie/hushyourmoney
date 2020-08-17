<template>
    <div class="tab-pane" id="identity">
        <div class="row">

            <div class="col-xs-7">

                <h4 class="info-text">
                    Shuffling is as easy as <span class="text-success">1-2-3</span>
                </h4>

                <div>
                    Start by selecting a <strong>UNIQUE</strong> photo or image file from your device.
                    If you're on a mobile device, we recommend you use your device's camera to take a new photo now.

                    <hr />

                    <strong>
                        <span class="text-danger">!!!WARNING!!! !!!WARNING!!! !!!WARNING!!!</span><br />
                        To protect the security of your wallet, DO NOT use a PUBLIC photo/image, ie. one you have:
                    </strong>

                    <ol>
                        <li>downloaded online</li>
                        <li>previously published online</li>
                        <li>plans to publish online</li>
                    </ol>
                </div>

            </div>

            <div class="col-xs-5">

                <div class="row">
                    <div class="col-xs-8 col-xs-offset-2">
                        <div class="picture-container">
                            <div class="picture">
                                <!-- <img src="assets/img/default-avatar.jpg" class="picture-src" id="wizardPicturePreview" title="" /> -->
                                <img :src="dataUrl" class="picture-src" title="" />

                                <input
                                    type="file"
                                    id="wizard-picture"
                                    @change="readURL"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                <div class="row">
                    <div class="col-xs-10 col-xs-offset-1">
                        <div class="form-group">
                            <label>
                                Private key
                                <small class="text-danger btn-privacy" @click="togglePrivacy">
                                    (click to show)
                                </small>
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                placeholder="Private wallet key"
                                disabled
                                :value="displayMasterKey"

                            />
                        </div>
                    </div>
                </div>

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

            </div>

        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'
import scrypt from 'scrypt-js'

export default {
    components: {
        //
    },
    data: () => {
        return {
            hasPrivacy: null,
            dataUrl: null,
        }
    },
    computed: {
        ...mapGetters('wallet', [
            'getMasterSeed',
            'getMnemonic',
        ]),

        /**
         * Display Master Key
         */
        displayMasterKey() {
            if (this.getMasterSeed && this.hasPrivacy) {
                return 'Master seed is hidden for security'
            } else if (this.getMasterSeed) {
                return Buffer.from(this.getMasterSeed).toString('hex')
            } else {
                return null
            }
        },

        /**
         * Display Seed Phrase
         */
        displaySeedPhrase() {
            if (this.getMasterSeed && this.hasPrivacy) {
                return 'Seed phrase is hidden for security'
            } else if (this.getMasterSeed) {
                return this.getMnemonic
            } else {
                return null
            }
        },
    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

        ...mapActions('wallet', [
            'updateMasterSeed',
        ]),

        /**
         * Toggle Privacy
         */
        togglePrivacy() {
            this.hasPrivacy = !this.hasPrivacy
        },

        /**
         * Read URL
         */
        readURL(_evt) {
            /* Retrieve input. */
            const input = _evt.target

            /* Handle input. */
            if (input.files && input.files[0]) {
                // TODO: We should perform some validation here.
                //       Should we restrict to (JPG) photos ONLY??

                // FIXME: We need a modal to block interactions until this
                //        process has completed.

                // TODO: Test the performance on various mobile devices.
                //       Up to 10 seconds is fine, 15 for low-end devices.
                this.toast(['Please wait!', 'Processing identity photo. This may take a while...', 'warning'])

                /* Initialize file reader. */
                const reader = new FileReader()

                /* Handle onload event. */
                reader.onload = async (e) => {
                    // console.log('IMAGE SRC-', e.target.result)

                    /* Set data URL. */
                    const dataUrl = e.target.result

                    /* Calculate password. */
                    // NOTE: Due to concern over "extra-large" image/file
                    //       sizes, we will hash the data URL before
                    //       feeding it as the password for Scrypt.
                    const password = Nito.Crypto.hash(dataUrl, 'sha512')
                    // console.log('PASSWORD', password)

                    /* Calculate salt. */
                    const salt = Nito.Crypto.hash(dataUrl, 'sha256')
                    // console.log('SALT', salt)

                    /* Set CPU (memory) cost. */
                    // NOTE: increasing this increases the overall difficulty.
                    // TODO: Test params on mobile devices (scale back, if necessary).
                    // const N = 16384 // 2^14 (original recommendation)
                    // const N = 32768 // 2^15 (safe recommendation)
                    const N = 65536 // 2^16 (JS-native recommendation)
                    // const N = 1048576 // 2^20 (optimal recommendation)

                    /* Set block size. */
                    // NOTE: Increasing this increases the dependency on memory
                    //       latency and bandwidth.
                    const r = 8

                    /* Set parallelization cost. */
                    // NOTE: Increasing this increases the dependency on
                    //       multi-processing.
                    const p = 1

                    /* Set derived key length (in bytes). */
                    const dkLen = 32

                    /* Compute master seed. */
                    const masterSeed = await scrypt
                        .scrypt(password, salt, N, r, p, dkLen)
                    // console.log('MASTER SEED', masterSeed)

                    /* Update master seed. */
                    this.updateMasterSeed(masterSeed)

                    /* Set data URL. */
                    // NOTE: We do this last, as it will update the UI.
                    this.dataUrl = dataUrl
                }

                /* Convert to data URL. */
                reader.readAsDataURL(input.files[0])
            }
        },

    },
    created: function () {
        /* Set privacy flag. */
        this.hasPrivacy = true

        /* Initialize image data. */
        this.dataUrl = 'assets/img/default-avatar.jpg'
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
.btn-privacy {
    cursor: pointer;
}
</style>
