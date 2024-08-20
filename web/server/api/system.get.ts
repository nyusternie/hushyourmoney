/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const systemDb = new PouchDB('./data/system')

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let response
    let status
    let system

    system = await systemDb
        .allDocs({
            include_docs: true,
        })
        .catch(err => console.error(err))
    console.log('SYSTEM', system)

    /* Validate system. */
    if (typeof system === 'undefined' || !system) {
        return 'System fail!'
    }

    if (system.rows.length === 0) {
        system = {
            _id: 'status',
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        }

        response = await systemDb
            .put(system)
            .catch(err => console.error(err))
        console.log('RESPONSE (system)', response)
    } else {
        status = system.rows.find(_system => {
            return _system.id === 'status'
        })

        status = status.doc

        console.log('FOUND STATUS', status)

        status.updatedAt = moment().unix()

        response = await systemDb
            .put(status)
            .catch(err => console.error(err))
        console.log('RESPONSE (status)', response)
    }

    /* Handle system. */
    system = system.rows.map(_system => {
        return _system.doc
    })

    /* Return system. */
    return system
})
