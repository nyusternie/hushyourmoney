/* Initialize Stats */
const stats = {}

/* Initialize Guests */
const guests = []

guests.push({
    id: '55019603-6e8a-4475-9a7d-9a465b1eea9a',
    userid: 'satoshi',
    createdAt: 1723246451,
    updatedAt: 1723246451,
})

stats.num_guests_active = guests.length
stats.num_guests_24h = guests.length
stats.num_guests_7d = guests.length
stats.num_guests_30d = guests.length

class Stats {

    static report() {
        return stats
    }

}

export default defineEventHandler((event) => {
    /* Set project mnemonic. */
    // const mnemonic = process.env.PROJECT_MNEMONIC

    /* Build wallet. */
    // const wallet = {
    //     mnemonic,
    // }

    /* Return wallet details. */
    // return wallet
    return Stats.report()
})
