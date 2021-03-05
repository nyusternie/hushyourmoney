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
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'
import scrypt from 'scrypt-js'
import Swal from 'sweetalert2'

/**
 * Delay (Execution)
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default {
    components: {
        //
    },
    data: () => {
        return {
            blockchain: null,
            hasPrivacy: null,
            dataUrl: null,
            password: null,
        }
    },
    watch: {
        getCoins: function (_coins) {
            // console.log('COINS HAS CHANGED', _coins)

            if (_coins) {
                /* Update balance. */
                this.updateBalance()
            }
        },

        getMasterSeed: function (_seed) {
            // console.log('MASTER SEED HAS CHANGED', _seed)

            /* Validate seed. */
            if (_seed) {
                /* Update balance. */
                this.updateBalance()
            }
        },

        // TODO: Watch shuffle queue from here
    },
    computed: {
        ...mapGetters('profile', [
            'getDataUrl',
        ]),

        ...mapGetters('utils', [
            'getFormattedValue',
        ]),

        ...mapGetters('wallet', [
            'getAddress',
            'getCoins',
            'getMasterSeed',
            'getMnemonic',
        ]),

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
        ...mapActions('profile', [
            'updateDataUrl',
        ]),

        ...mapActions('utils', [
            'toast',
        ]),

        ...mapActions('wallet', [
            'initWallet',
            'updateCoins',
            'updateMasterSeed',
        ]),

        /**
         * Initialize Blockchain
         */
        initBlockchain() {
            /* Initialize Nito blockchain. */
            this.blockchain = new Nito.Blockchain()
            // console.log('NITO BLOCKCHAIN', this.blockchain)

            if (this.getAddress('deposit')) {
                /* Subscribe to address updates. */
                this.blockchain
                    .subscribe('address', this.getAddress('deposit'))
            }

            /* Handle blockchain updates. */
            this.blockchain.on('update', (_msg) => {
                console.info('Blockchain update (msg):', _msg) // eslint-disable-line no-console

                /* Update coins. */
                // FIXME: Why is this blocking the entire initial UI setup??
                this.updateCoins()

                /* Update balance. */
                this.updateBalance()
            })

            /* Update coins. */
            // FIXME: Why is this blocking the entire initial UI setup??
            // this.updateCoins()
        },

        /**
         * Update Balance
         */
        async updateBalance() {
            /* Retreive wallet balance. */
            // this.balance = await this
            //     .getBalance('USD')
            //     .catch(err => {
            //         console.error(err) // eslint-disable-line no-console
            //
            //         /* Report error. */
            //         this.report(err)
            //     })
            // console.log('DEPOSIT (balance):', this.balance)

            /* Initialize wallet balance. */
            let balance = 0

            /* Validate coins. */
            if (this.getCoins) {
                /* Initialize coins. */
                const coins = this.getCoins

                Object.keys(coins).forEach(async coinId => {
                    /* Initialize coin. */
                    const coin = coins[coinId]
                    // console.log('COINS (coin):', coin)

                    if (coin.status === 'active' || coin.status === 'locked') {
                        /* Add satoshis. */
                        balance += coin.satoshis
                    }
                })
            }

            /* Retrieve market price. */
            const marketPrice = await Nito.Markets.getTicker('BCH', 'USD')
            console.info(`Market price (USD)`, marketPrice) // eslint-disable-line no-console

            const formattedBalance =
                this.getFormattedValue(balance, marketPrice, 'USD')
            // console.log('NEW BALANCE IS', formattedBalance)

            /* Set wallet balance. */
            this.balance = formattedBalance
        },

        /**
         * Toggle Privacy
         */
        togglePrivacy() {
            this.hasPrivacy = !this.hasPrivacy
        },

        /**
         * Read URL
         */
        async readURL(_evt) {
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

                Swal.fire({
                    title: 'Please Wait!',
                    text: 'Processing identity photo. This may take a while...',
                    // imageUrl: 'https://i.imgur.com/gZa7NYc.png', // full image
                    // imageUrl: 'https://i.imgur.com/NNHddFp.png', // 400 x 200
                    // imageUrl: 'https://i.imgur.com/CiRtOqi.png', // 500 x 400
                    imageUrl: require('@/assets/identity-setup.png'), // 500 x 400
                    imageWidth: 250,
                    imageHeight: 200,
                    imageAlt: 'Processing identity photo.',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                })

                /* Wait a bit before locking process. */
                await delay(100)

                /* Initialize file reader. */
                const reader = new FileReader()

                /* Handle onload event. */
                reader.onload = async (e) => {
                    // console.log('IMAGE SRC-', e.target.result)

                    /* Set data URL. */
                    const dataUrl = e.target.result

                    /* Update store. */
                    this.updateDataUrl(dataUrl)

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

                    /* Initialize wallet. */
                    this.initWallet()

                    /* Initialize blockchain. */
                    this.initBlockchain()

                    /* Update balance. */
                    this.updateBalance()

                    /* Set data URL. */
                    // NOTE: We do this last, as it will update the UI.
                    this.dataUrl = dataUrl

                    /* Close the popup. */
                    Swal.close()
                }

                /* Convert to data URL. */
                reader.readAsDataURL(input.files[0])
            }
        },

        selectIdentity() {
            Swal.fire({
                title: '!!! SECURITY WARNING !!!',
                text: `To maximize the protection of your coin wallet, DO NOT use a PUBLIC photo or image, ie. one you have: (1) downloaded online, \n(2) previously published online, (3) plans to publish online`,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay, I got it!',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: `Cancel`,
            }).then((result) => {
                if (result.value) {
                    this.$refs.fileInput.click()
                }
            })
        },

    },
    created: function () {
        /* Set privacy flag. */
        this.hasPrivacy = true

        /* Initialize image data. */
        this.dataUrl = require('@/assets/missing-avatar.jpg')

    },
    mounted: function () {
        /* Validate data URL. */
        if (this.getDataUrl) {
            this.dataUrl = this.getDataUrl
        }
    },
    beforeDestroy() {
        console.info('Destroying Shuffle idendity..')

        /* Validate blockchain. */
        if (this.blockchain) {
            console.info('Unsubscribing from blockchain..')

            /* Stop blockchain. */
            this.blockchain.unsubscribe()
        }
    },
}
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
