/* Import modules. */
import moment from 'moment'

import { useProfileStore } from '@/stores/profile'

export default defineEventHandler(async (event) => {
    /* Initialize database store. */
    const Profile = useProfileStore()

    /* Set (request) body. */
    const body = await readBody(event)
    console.log('BODY', body)

    if (!body) {
        return `Authorization FAILED!`
    }

    /* Set profile parameters. */
    const authid = body.authid

    console.log({
        authid,
    })

    /* Initialize locals. */
    let params
    let profile
    let response
    let session
    let success

    // FIXME Validate authid

    /* Request session. */
    profile = await Profile.db
        .get(authid)
        .catch(err => console.error(err))
    // console.log('PROFILE', profile)

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
        response = await Profile.db
            .put(profile)
            .catch(err => console.error(err))
        // console.log('SAVE NEW PROFILE', response)
    } else {
        /* Build profile package. */
        profile.updatedAt = moment().unix()

        /* Request session. */
        response = await Profile.db
            .put(profile)
            .catch(err => console.error(err))
        // console.log('UPDATE PROFILE', response)
    }

    /* Return profile. */
    return {
        id: profile._id,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
    }
})
