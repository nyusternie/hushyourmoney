/* Import modules. */
import moment from 'moment'

import { useSystemStore } from '@/stores/system'

export default defineEventHandler(async (event) => {
    /* Initialize database store. */
    const System = useSystemStore()

    /* Set session. */
    const sessionid = event.context.params.sessionid
    console.log('SESSION ID', sessionid)

    // FIXME Validate session id.

    const response = await System.sessions
        .get(sessionid)
        .catch(err => console.error(err))
    console.log('RESPONSE', response)

    /* Initialize status. */
    const status = {}

    /* Set (session) ID. */
    status.id = sessionid

    /* Return status. */
    return status
})
