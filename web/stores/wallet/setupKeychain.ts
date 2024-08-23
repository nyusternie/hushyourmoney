/* Import modules. */
import moment from 'moment'

/* Set constants. */
const ADDRESS_POOL_SIZE = 20 // NOTE: Recommended default is 100 addresses.
const CHANGE_IDX = 0
const PROTOCOL_ID = 0

export default async function () {
    console.time('Keychain initialization')

    /* Initialize locals. */
    let address
    let addressIdx
    let pkg

    for (let i = 0; i < ADDRESS_POOL_SIZE; i++) {
        /* Set address index. */
        addressIdx = i

        address = await this.getBchAddress(PROTOCOL_ID, CHANGE_IDX, addressIdx)

        pkg = {
            address,
            isUsed: false,
            isLocked: false,
            updatedAt: moment().unix(),
        }
        // console.log('PKG', addressIdx, pkg)

        this._keychain[PROTOCOL_ID][addressIdx] = pkg
    }

    console.timeEnd('Keychain initialization')
}
