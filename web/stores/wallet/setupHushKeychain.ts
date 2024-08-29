/* Import modules. */
import moment from 'moment'

/* Set constants. */
const ADDRESS_POOL_SIZE = 40 // NOTE: Recommended default is 100 addresses.
const CHANGE_IDX = 0
const HUSH_PROTOCOL_ID = 0x48555348

export default async function () {
    console.time('Hush keychain initialization')

    /* Initialize locals. */
    let address
    let addressIdx
    let pkg

    for (let i = 0; i < ADDRESS_POOL_SIZE; i++) {
        /* Set address index. */
        addressIdx = i

        address = this.getBchAddress(HUSH_PROTOCOL_ID, CHANGE_IDX, addressIdx)

        pkg = {
            address,
            isUsed: false,
            isLocked: false,
            updatedAt: moment().unix(),
        }
        // console.log('PKG', addressIdx, pkg)

        this._keychain[HUSH_PROTOCOL_ID][addressIdx] = pkg
    }

    console.timeEnd('Hush keychain initialization')
}
