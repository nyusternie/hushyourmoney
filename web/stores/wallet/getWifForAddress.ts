/* Import modules. */
import BCHJS from '@psf/bch-js'
import { mnemonicToSeed } from '@nexajs/hdnode'

/* Initialize BCHJS. */
const bchjs = new BCHJS()

/* Initialize constants. */
const HUSH_PROTOCOL_ID = 0x48555348


/**
 * Get WIF For An Address
 *
 * Will return the wallet import format (WIF) for a specific address.
 */
export default function (_address) {
    /* Initialize locals. */
    let accountIdx
    let addressIdx
    let changeIdx
    let childNode
    let mainAddress
    let wif

    /* Set main (wallet) address. */
    mainAddress = this.getBchAddress(0, 0, 0)

    if (mainAddress === _address) {
        /* Set account index. */
        accountIdx = 0 // NOTE: This is the Main chain

        /* Set address index. */
        addressIdx = 0
    } else {
        /* Set account index. */
        accountIdx = HUSH_PROTOCOL_ID // NOTE: This is the Hush chain

        /* Handle fusion addresses. */
        Object.keys(this.fusionAddrs).forEach(_addressIdx => {
            /* Set fusion address. */
            const fusionAddress = this.fusionAddrs[_addressIdx]

            /* Validate address. */
            if (_address === fusionAddress.address) {
                /* Set address index. */
                addressIdx = _addressIdx
            }
        })
    }
    // console.log('ACCOUNT IDX', accountIdx)
    // console.log('ADDRESS IDX', addressIdx)

    if (typeof addressIdx === 'undefined' || addressIdx === null) {
        throw new Error(`Oops! There is NO private key for [ ${_address} ]`)
    }

    /* Set change index. */
    changeIdx = 0

    /* Convert mnemonic to seed. */
    const seed = mnemonicToSeed(this.mnemonic)

    /* Conver to seed buffer. */
    // FIXME Migrate to TypedArrays.
    const seedBuffer = Buffer.from(seed, 'hex')

    /* Generate master node. */
    const masterNode = bchjs.HDNode.fromSeed(seedBuffer)

    /* Generate child node. */
    childNode = masterNode
        .derivePath(`m/44'/145'/${accountIdx}'/${changeIdx}/${addressIdx}`)

    /* Generate wallet import format (WIF). */
    wif = bchjs.HDNode.toWIF(childNode)
    // console.log('BCH WIF', i, wif)

    /* Return WIF. */
    return wif
}
