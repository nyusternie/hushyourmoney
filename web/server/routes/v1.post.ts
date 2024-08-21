/* Import modules. */
import moment from 'moment'
import { decryptForPubkey } from '@nexajs/crypto'
import {
    binToHex,
    binToUtf8,
} from '@nexajs/utils'

// import { useProfileStore } from '@/stores/profile'

export default defineEventHandler(async (event) => {
    /* Set database. */
    const Db = event.context.Db

    /* Set wallet. */
    const Wallet = event.context.Wallet

    /* Set (request) body. */
    const body = await readBody(event)
    console.log('BODY', body)

    if (!body) {
        return `Authorization FAILED!`
    }

    /* Set profile parameters. */
    const authid = body.authid
    // console.log('AUTH ID', authid)

    const actionid = body.actionid
    // console.log('ACTION ID', actionid)

    const sessionid = body.sessionid
    // console.log('SESSION ID', sessionid)

    const coins = body.coins
    // console.log('COINS', coins)

    const tokens = body.tokens
    // console.log('TOKENS', tokens)

    const ciphertext = body.ciphertext
    // console.log('CIPHERTEXT', ciphertext)

    /* Initialize locals. */
    let params
    let profile
    let response
    let session
    let success

    /* Validate auth ID. */
    if (typeof authid === 'undefined' || authid === null) {
        setResponseStatus(event, 401)

        return 'Authorization failed!'
    }

    /* Request session. */
    profile = Db.profiles[authid]
    // console.log('PROFILE', profile)

    /* Validate profile id. */
    if (typeof profile === 'undefined' || profile === null) {
        /* Set status code. */
        // setResponseStatus(event, 404)

        // return 'Oops! Something went wrong..'

        /* Build profile. */
        profile = {
            _id: authid,
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        }

        /* Request session. */
        response = await Db.put('profiles', authid, profile)
            .catch(err => console.error(err))
        // console.log('SAVE NEW PROFILE', response)
    } else {
        /* Build profile package. */
        profile.updatedAt = moment().unix()

        /* Request session. */
        response = await Db.put('profiles', authid, profile)
            .catch(err => console.error(err))
        // console.log('UPDATE PROFILE', response)
    }

    console.log('DEBUG::INSERTING A NEW FUSION')
    const fusion = Db.fusions['4e9654f9-3de9-4f9a-8169-3834f40847f5']
    console.log('FUSION', fusion)

    const plaintext = decryptForPubkey(binToHex(Wallet.privateKey), ciphertext)
    console.log('PLAINTEXT', binToUtf8(plaintext))

    fusion.coins = coins
    fusion.tokens = tokens
    fusion.ciphertext = ciphertext

    await Db.put('fusions', '4e9654f9-3de9-4f9a-8169-3834f40847f5', fusion)

    /* Build (response) package. */
    const pkg = {
        id: profile._id,
        plaintext: binToUtf8(plaintext),
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
    }
    // console.log('PKG', pkg)

    /* Return pkg. */
    return pkg
})
