export default defineEventHandler(async (event) => {
    /* Set tier id. */
    const tierid = event.context.params.tierid
    console.log('TIER ID', typeof tierid, tierid)

    /* Set database. */
    const fusionid = event.context.params?.fusionid

    /* Set database. */
    const Db = event.context.Db

    /* Validate fusions. */
    if (typeof Db.fusions === 'undefined' || !Db.fusions) {
        return 'Fusions fail!'
    }

    /* Search for fusion. */
    if (Db.fusions) {
        const fusionid = Object.keys(Db.fusions).find(_fusionid => {
            /* Set fusion. */
            const fusion = Db.fusions[_fusionid]

            /* Return match. */
            return Number(fusion.tierid) === Number(tierid)
        })

        /* Validate fusion. */
        if (typeof fusionid !== 'undefined') {
            /* Set ALL tier fusions. */
            // TODO All for more than ONE fusion per tier.
            const tierFusions = []

            tierFusions.push({
                fusionid,
                ...Db.fusions[fusionid],
            })

            /* Return tier fusions. */
            return tierFusions
        } else {
            setResponseStatus(event, 404)

            return 'Sorry, that fusion COULD NOT be found.'
        }
    } else {
        setResponseStatus(event, 404)

        return 'Sorry, that fusion COULD NOT be found.'
    }
})
