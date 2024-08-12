/* Initialize vaults list. */
const vaults = []

const guests_nexa_00000001 = [
    {
        id: 'b19f512e-734c-459c-82a5-7ebb03264a65',
        createdAt: 1723246952,
        updatedAt: 1723246952,
    }
]

/* Add Club Flux. */
vaults.push({
    id: 'nexa.00000001',
    guests: guests_nexa_00000001,
    createdAt: 1723245503,
    updatedAt: 1723245503,
})

/* Add Club DePIN. */
vaults.push({
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

    /* Return vaults list. */
    return vaults
})
