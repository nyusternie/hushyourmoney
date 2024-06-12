<template>
    <div class="image-container set-full-height" :style="{ backgroundImage: 'url(' + backgroundImg + ')' }">
        <router-link to="help" class="made-with-pk">
            <div class="brand"><i class="fa fa-question-circle"></i></div>
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
                </div> <!-- end col -->
            </div> <!-- end row -->
        </div> <!--  big container -->

        <div class="footer">
            <div class="container text-center">
                Made with <i class="fa fa-heart heart"></i> by <a href="https://twitter.com/0xShomari" target="_blank">0xShomari</a>.
                <br />&copy; {{curYear}}. All rights reserved.
            </div>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
// import { mapActions } from 'vuex'

/* Import modules. */
import moment from 'moment'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            backgroundImg: null,
        }
    },
    computed: {

        curYear() {
            return moment().format('YYYY')
        },

    },
    methods: {
        // ...mapActions('system', [
        //     // 'saveIpfs',
        // ]),

        /**
         * Send Message
         *
         * Broadcast the connection information for this IPFS node.
         */
        async sendMessage(_message) {
            console.log('MESSAGE', _message)
            try {
                /* Set message buffer. */
                // const msgBuf = Buffer.from(JSON.stringify(_message))

                // Publish the message to the pubsub channel.
                // await ipfs.pubsub.publish(this.roomName, msgBuf)

                // console.log(`Published message to ${this.roomName}\n`)
            } catch (err) {
                console.error('Error in sendMessage()')
                throw err
            }
        },

        // Renew connections to pubsub room peers.
        async connectToPeers() {
            // try {
            //     // TODO: In the future this should use an array of objects to cycle through
            //     // any new peers that connect to the pubsub channel.
            //
            //     /* Find a circuit relay that has successfully connected. */
            //     const circuitRelay = this.bootstrapNodes.filter(elem => elem.hasConnected)
            //     console.log('connectToPeers (circuitRelay):', circuitRelay)
            //
            //     /* Connect to node via circuit relay. */
            //     await ipfs.swarm.connect(
            //         `${circuitRelay[0].multiaddr}/p2p-circuit/p2p/${this.nodeid}`
            //     )
            //     console.log(`Connected to messaging peer [ ${this.nodeid} ]`)
            // } catch (err) {
            //     console.error('Error in connectToPeers()')
            //     throw err
            // }
        },

        async sendTest() {
            // const msgBuf = Buffer.from(`hi there! [ ${new Date()} ]`)
            //
            // // Publish the message to the pubsub channel.
            // await ipfs.pubsub.publish(this.roomName, msgBuf)
        },

    },
    created: async function () {
        /* Set background image. */
        this.backgroundImg = require('@/assets/background.jpg')

        /* Initialize campaign reminder. */
        // this.initFlipstarter()

        // this.bumpInit()

        /* Start IPFS. */
        // await this.startIpfs()
    },
    mounted: function () {
        // Wizard Initialization
        $(".wizard-card").bootstrapWizard()
    },
}
</script>

<style>
.tab-pane {
    margin-bottom: 30px;
}

.flex {
    display: flex;
}

.set-full-height {
    height: auto;
}

.brand {
    margin: -6px 0 0 -2px;
}
.brand i {
    display: block;
    font-size: 33px;
}

/* Until we upgrade to Bootstrap v4 */
.mt-0 {
    margin-top: 0;
}
.mt-1 {
    margin-top: 10px;
}
.mt-2 {
    margin-top: 15px;
}
.mt-3 {
    margin-top: 30px;
}
.mt-n1 {
    margin-top: -10px;
}
.mt-n2 {
    margin-top: -15px;
}
.mt-n3 {
    margin-top: -30px;
}
</style>
