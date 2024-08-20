/* Import modules. */
import { useProfileStore } from '@/stores/profile'

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let profiles

    /* Initialize database store. */
    const Profile = useProfileStore()

    profiles = await Profile.db
        .allDocs({
            include_docs: true,
        })
        .catch(err => console.error(err))
    // console.log('PROFILES', profiles)

    /* Validate profiles. */
    if (typeof profiles === 'undefined' || !profiles) {
        profiles = []
    } else {
        profiles = profiles.rows.map(_profile => {
            return {
                id: _profile.doc._id,
                createdAt: _profile.doc.createdAt,
                updatedAt: _profile.doc.updatedAt,
            }
        })
    }

    /* Return profiles. */
    return profiles
})
