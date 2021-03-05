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
                Made with <i class="fa fa-heart heart"></i> by <a href="https://bchplease.org" target="_blank">Bitcoin Please</a>.
                <br />&copy; {{curYear}}. All rights reserved.
            </div>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions } from 'vuex'

/* Import modules. */
import moment from 'moment'
import IPFS from 'ipfs-core'
import Swal from 'sweetalert2'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

/* Set campaign delay. */
const CAMPAIGN_DELAY = 300000 // default: 5 minutes

/* Set global variable. */
let ipfs

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
        ...mapActions('system', [
            'saveIpfs',
        ]),

        /**
         * Initialize Flipstarter
         */
        initFlipstarter() {
            setTimeout(() => {
                Swal.fire({
                    title: 'Just a moment!',
                    text: `Our team is currently running a fundraiser to help speed up development of our current Roadmap. Do you have a minute to take a look?`,
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, show me',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'No, not now',
                }).then((result) => {
                    if (result.value) {
                        window.open('https://hushyourmoney.com')
                    } else if (result.isDismissed) {
                        // if (result.dismiss === 'cancel') { // backdrop | cancel | esc
                            // Swal.fire({
                            //     title: '24x7x365 Support',
                            //     text: `Check out the help page anytime by clicking on the icon in the bottom right of the screen.`,
                            //     icon: 'info',
                            //     showConfirmButton: false,
                            //     allowOutsideClick: false,
                            //     allowEscapeKey: false,
                            //     timer: 5000,
                            //     timerProgressBar: true,
                            // })
                        // }
                    }
                })
            }, CAMPAIGN_DELAY)
        },

        /**
         * BUMP Initialization
         */
        bumpInit() {
            // Run the node.js app first and get it's IPFS ID.
            this.nodeid = 'QmcLnv6wdstv5pVnUqLuS38NGUPpvorfFMn3VqkXHayH38' // nito.exchange (blenderd)

            // Pubsub channel that nodes will use to coordinate.
            this.roomName = 'af84de592984f9403c9539c1049a01369e6302f08043b79db783bd34ad344190' // #lobby:nitoblender.com

            // Known IPFS nodes to connect to for bootstrapping.
            this.bootstrapNodes = [
                {
                  name: 'relay.devops.cash',
                  multiaddr: `/dns4/relay.devops.cash/tcp/443/wss/p2p/12D3KooWRpNvnBDVQ5NVwjxPuj7EY5u42kmFQaP8y5jYfcCpCGSW`,
                  hasConnected: false
                }
            ]

        },

        /**
         * Start IPFS
         *
         * Top level function for controlling the IPFS node.
         */
        async startIpfs() {
            try {
                console.log('Setting up instance of IPFS...')

                /* Create new IPFS instance. */
                ipfs = await IPFS.create()

                // Pass the IPFS instance to the window object. Makes it easy to debug IPFS
                // issues in the browser console.
                if (typeof window !== 'undefined') {
                    window.ipfs = ipfs
                }

                /* Initialize IPFS. */
                await this.initIpfs()

                // Get this nodes IPFS ID
                const id = await ipfs.id()

                const ipfsid = id.id
                console.log(`This IPFS node ID: ${ipfsid}`)

                console.log('IPFS node setup complete.')

                // Subscribe to the pubsub room.
                await ipfs.pubsub.subscribe(this.roomName, msg => {
                    // print out any messages recieved.
                    console.log(msg.data.toString())
                })
                console.log(`Subscribed to BUMP (pubsub) room ${this.roomName}`)

                // Periodically broadcast identity on the pubsub channel
                setInterval(async () => {
                    const now = new Date()

                    // Date-stamped connection information.
                    const connectionInfo = {
                        date: now.toLocaleString(),
                        ipfsid,
                        message: `Message from Shuffle Cash app @ ${now.toLocaleString()}`
                    }

                    await this.sendMessage(connectionInfo)
                }, 15000)

                // Periodically renew connections to other pubsub channel peers
                setInterval(async () => {
                    await this.connectToPeers()
                }, 30000)
            } catch (err) {
                console.error('Error in startIpfs(): ', err)
                console.log('Error trying to initialize IPFS node!')
            }
        },

        /**
         * Initialize the IPFS node and try to connect to the Cash DevOps
         * bootstrap node(s).
         */
        async initIpfs() {
            try {
                /* Periodically renew connection to the bootstrap nodes. */
                const bootstrapIntervalHandle = setInterval(() => {
                    this.connectToBootstrapNodes()
                }, 15000)

                /* Connect to bootstrap nodes. */
                await this.connectToBootstrapNodes()

                /* Return handle. */
                return bootstrapIntervalHandle
            } catch (err) {
                console.error('Error in initIpfs()')
                throw err
            }
        },

        // Attempt to connect to the bootstrap nodes. Cycles through each node in the
        // bootstrapNodes array.
        async connectToBootstrapNodes() {
            try {
                const now = new Date()

                for (let i = 0; i < this.bootstrapNodes.length; i++) {
                    const name = this.bootstrapNodes[i].name

                    const multiaddr = this.bootstrapNodes[i].multiaddr

                    try {
                        await ipfs.swarm.connect(multiaddr)
                        // console.log('...IPFS node connected PSF node!')
                        console.log(
                            `${now.toLocaleString()} - Successfully connected to ${name}`
                        )
                        this.bootstrapNodes[i].hasConnected = true
                    } catch (err) {
                        console.log(
                            `${now.toLocaleString()} - Failed to connect to ${name} - ${multiaddr}`
                        )
                        this.bootstrapNodes[i].hasConnected = false
                    }
                }
            } catch (err) {
                console.error('Error in connectToBootstrapNodes()')
                throw err
            }
        },

        /**
         * Send Message
         *
         * Broadcast the connection information for this IPFS node.
         */
        async sendMessage(_message) {
            try {
                /* Set message buffer. */
                const msgBuf = Buffer.from(JSON.stringify(_message))

                // Publish the message to the pubsub channel.
                await ipfs.pubsub.publish(this.roomName, msgBuf)

                console.log(`Published message to ${this.roomName}\n`)
            } catch (err) {
                console.error('Error in sendMessage()')
                throw err
            }
        },

        // Renew connections to pubsub room peers.
        async connectToPeers() {
            try {
                // TODO: In the future this should use an array of objects to cycle through
                // any new peers that connect to the pubsub channel.

                /* Find a circuit relay that has successfully connected. */
                const circuitRelay = this.bootstrapNodes.filter(elem => elem.hasConnected)

                /* Connect to node via circuit relay. */
                await ipfs.swarm.connect(
                    `${circuitRelay[0].multiaddr}/p2p-circuit/p2p/${this.nodeid}`
                )
                console.log(`Connected to messaging peer [ ${this.nodeid} ]`)
            } catch (err) {
                console.error('Error in connectToPeers()')
                throw err
            }
        },

        async sendTest() {
            const msgBuf = Buffer.from(`hi there! [ ${new Date()} ]`)

            // Publish the message to the pubsub channel.
            await ipfs.pubsub.publish(this.roomName, msgBuf)
        },

    },
    created: async function () {
        /* Set background image. */
        this.backgroundImg = require('@/assets/background.jpg')

        /* Initialize campaign reminder. */
        this.initFlipstarter()

        this.bumpInit()

        /* Start IPFS. */
        await this.startIpfs()
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
