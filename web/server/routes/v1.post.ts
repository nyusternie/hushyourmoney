/* Import modules. */
import moment from 'moment'

// import { useProfileStore } from '@/stores/profile'

export default defineEventHandler(async (event) => {
    /* Initialize database store. */
    // const Profile = useProfileStore()

    /* Set database. */
    const Db = event.context.Db
    // console.log('DB', Db)

    /* Set (request) body. */
    const body = await readBody(event)
    console.log('BODY', body)

    if (!body) {
        return `Authorization FAILED!`
    }

    /* Set profile parameters. */
    const authid = body.authid
    console.log('AUTH ID', authid)

    const actionid = body.actionid
    console.log('ACTION ID', actionid)

    const sessionid = body.sessionid
    console.log('SESSION ID', sessionid)

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
    console.log('PROFILE', profile)

    /* Validate profile id. */
    if (typeof profile === 'undefined' || profile === null) {
        /* Set status code. */
        setResponseStatus(event, 404)

        // return 'Oops! Something went wrong..'

        /* Build profile. */
        profile = {
            _id: authid,
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        }

        /* Request session. */
        response = await Db.put('profiles', authid, profile)
        console.log('SAVE NEW PROFILE', response)
    } else {
        /* Build profile package. */
        profile.updatedAt = moment().unix()

        /* Request session. */
        response = await Db.put('profiles', authid, profile)
        console.log('UPDATE PROFILE', response)

console.log('DEBUG::INSERTING A NEW FUSION')
const fusion = {
    tierid: 680000,
    guests: 12,
    inputs: 111,
    outputs: 195,
    createdAt: 1723245503,
    updatedAt: 1723245503,
}
await Db.put('fusions', 'b2eedc48-52d1-4056-b441-c3c802c053a3', fusion)
    }

    /* Return profile. */
    return {
        id: profile._id,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
    }
})
