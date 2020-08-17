<template>
    <div class="tab-pane" id="identity">
        <div class="row">

            <div class="col-xs-7">

                <h4 class="info-text">
                    Shuffling is as easy as <span class="text-success">1-2-3</span>
                </h4>

                <p>
                    Start by selecting a <strong>UNIQUE</strong> photo or image file from your device.
                    <strong class="text-danger">DO NOT USE AN IMAGE THAT YOU HAVE ALREADY PUBLISHED ONLINE.</strong>
                    If you're on a mobile device, you can use your phone to take a new photo now.
                </p>

            </div>

            <div class="col-xs-5">

                <div class="row">
                    <div class="col-xs-8 col-xs-offset-2">
                        <div class="picture-container">
                            <div class="picture">
                                <!-- <img src="assets/img/default-avatar.jpg" class="picture-src" id="wizardPicturePreview" title="" /> -->
                                <img :src="imageData" class="picture-src" title="" />

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

export default {
    components: {
        //
    },
    data: () => {
        return {
            hasPrivacy: null,
            imageData: null,
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
                /* Initialize file reader. */
                const reader = new FileReader()

                /* Handle onload event. */
                reader.onload = (e) => {
                    // console.log('IMAGE SRC', e.target.result)

                    /* Set master key. */
                    const masterKey = Nito.Crypto.hash(e.target.result, 'sha256')
                    // console.log('MASTER KEY', masterKey)

                    /* Update store. */
                    this.updateMasterSeed(masterKey)

                    /* Update image data. */
                    // $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow')
                    this.imageData = e.target.result
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
        this.imageData = 'assets/img/default-avatar.jpg'
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
