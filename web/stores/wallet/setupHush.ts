import { log } from "console"

const CHANGE_IDX = 0
const HUSH_PROTOCOL_ID = 0x48555348

export default async function () {
    console.log('Setting up Hush...')

    let address
    let addressIdx

    addressIdx = 0

    address = await this.getBchAddress(HUSH_PROTOCOL_ID, CHANGE_IDX, addressIdx)
    this._keychain[HUSH_PROTOCOL_ID][0] = address
    console.log('ADDRESS', addressIdx, address)
}
