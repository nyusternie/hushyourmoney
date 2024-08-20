/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const profilesDb = new PouchDB('./data/profiles')
const sessionsDb = new PouchDB('./data/sessions')


export default defineEventHandler(async (event) => {
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
    profile = await profilesDb
        .get(authid)
        .catch(err => console.error(err))
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
        response = await profilesDb
            .put(profile)
            .catch(err => console.error(err))
        console.log('SAVE NEW PROFILE', response)
    } else {
        /* Build profile package. */
        profile.updatedAt = moment().unix()

        /* Request session. */
        response = await profilesDb
            .put(profile)
            .catch(err => console.error(err))
        console.log('UPDATE PROFILE', response)
    }

    /* Return profile. */
    return {
        id: profile._id,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
    }

    // const challenge = session.challenge
    // const expiresAt = session.expiresAt

    // /* Set authorization parameters. */
    // params = [
    //     addr,
    //     sig,
    //     `awesomenexa.org_nexid_reg_${challenge}`,
    // ]
    // console.log('AUTH PARAMS', params)

    // /* Request message verification (from node). */
    // success = await Rpc
    //     .call('verifymessage', params, {
    //         username: 'user',
    //         password: 'password',
    //     })
    //     .catch(err => console.error(err))
    // console.log('AUTH VERIFICATION SUCCESS', success)

    // /* Verify challenge. */
    // if (success !== true) {
    //     return `Authorization FAILED!`
    // }

    /* Add profile (address + signature) to session. */
    session = {
        profileid: addr,
        auth: sig,
        ...session,
        updatedAt: moment().unix(),
    }

    /* Request session update. */
    response = await sessionsDb
        .put(session)
        .catch(err => console.error(err))
    console.log('SESSION UPDATE:', response)

    /* Request profile. */
    profile = await profilesDb
        .get(addr)
        .catch(err => console.error(err))
    console.log('PROFILE:', profile)

    if (!profile) {
        /* Create NEW profile. */
        profile = {
            _id: addr,
            nickname,
            email,
            auths: 1,
            createdAt: moment().unix(),
        }
    } else {
        profile = {
            ...profile,
            auths: profile.auths + 1,
            updatedAt: moment().unix(),
        }
    }

    /* Request profile update. */
    response = await profilesDb
        .put(profile)
        .catch(err => console.error(err))
    console.log('PROFILE UPDATE:', response)

    /* Return success. */
    return `Authorization SUCCESS!`
})
