export default defineEventHandler(async (event) => {
    /* Set database. */
    const fusionid = event.context.params?.fusionid
    console.log('FUSION ID', fusionid)

    /* Set database. */
    const Db = event.context.Db

    /* Validate fusions. */
    if (typeof Db.fusions === 'undefined' || !Db.fusions) {
        return 'Fusions fail!'
    }
console.log('FOUND', Db.fusions[fusionid])

    /* Search for fusion. */
    if (Db.fusions[fusionid]) {
        return Db.fusions[fusionid]
    } else {
        setResponseStatus(event, 404)

        return 'Sorry, that fusion COULD NOT be found.'
    }
})
