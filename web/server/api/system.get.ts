/* Import modules. */
import moment from 'moment'
import Db from '@/stores/libs/db.ts'

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let response
    let status
console.log('Db.system', Db.system)
    /* Validate system. */
    if (typeof Db.system === 'undefined' || !Db.system) {
        return 'System fail!'
    }

    /* Validate data. */
    if (Object.keys(Db.system).length === 0) {
        status = {
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        },

        response = await Db
            .put('system', 'status', status)
            .catch(err => console.error(err))
        // console.log('RESPONSE (system)', response)
    } else {
        status = Db.system.status

        status.updatedAt = moment().unix()

        response = await Db
            .put('system', 'status', status)
            .catch(err => console.error(err))
        // console.log('RESPONSE (status)', response)
    }

    /* Return (database) system. */
    return Db.system
})
