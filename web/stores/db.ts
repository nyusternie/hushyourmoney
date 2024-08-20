/* Import modules. */
import { defineStore } from 'pinia'

/**
 * Database Store
 *
 * A custom data storage, designed to operate efficiently on
 * "ephemeral" hardware (e.g. Flux Cloud, DePIN, etc).
 */
export const useDbStore = defineStore('db', {
    state: () => ({
        /**
         * CashFusions Datastore
         */
        fusionsDb: {},

        /**
         * Profiles Datastore
         */
        profilesDb: {},

        /**
         * Sessions Datastore
         */
        sessionsDb: {},

        /**
         * System Datastore
         */
        systemDb: {},
    }),

    getters: {
        fusions(_state) {
            return this.fusionsDb
        },

        profiles(_state) {
            return this.profilesDb
        },

        sessions(_state) {
            return this.sessionsDb
        },

        system(_state) {
            return this.systemDb
        },
    },

    actions: {
        // FIXME Add mutex/locks to prevent race conditions.
        async put (_dbname, _data) {
            try {
                switch(_dbname) {
                case 'fusions':
                    this.fusionsDb = _data
                    break
                case 'profiles':
                    this.profilesDb = _data
                    break
                case 'sessions':
                    this.sessionsDb = _data
                    break
                case 'system':
                    this.systemDb = _data
                    break
                }
            } catch (err) {
                console.error(err)
                return err
            }

            return `[ ${_dbname} data saved successfully! ]`
        },
    },
})
