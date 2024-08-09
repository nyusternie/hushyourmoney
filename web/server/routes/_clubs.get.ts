/* Initialize clubs list. */
const clubs = []

/* Add Club Flux. */
clubs.push({
    id: '6f765750-2267-4601-87be-80a416143a28',
    name: 'Club Flux',
    address: 'hushyourmoney.app.runonflux.io',
    createdAt: 1723245503,
    updatedAt: 1723245503,
})

/* Add Club DePIN. */
clubs.push({
    id: '4eff6293-60e9-4a5a-83de-4b91da1f7de4',
    name: 'DePIN Lounge',
    address: 'hushyourmoney.tbd',
    createdAt: 1723245818,
    updatedAt: 1723245818,
})

export default defineEventHandler((event) => {
    /* Set project mnemonic. */
    // const mnemonic = process.env.PROJECT_MNEMONIC

    /* Build wallet. */
    // const wallet = {
    //     mnemonic,
    // }

    /* Return clubs list. */
    return clubs
})
