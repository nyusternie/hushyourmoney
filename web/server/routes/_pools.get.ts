export default defineEventHandler((event) => {
    /* Set project mnemonic. */
    const mnemonic = process.env.PROJECT_MNEMONIC

    /* Build wallet. */
    const wallet = {
        mnemonic,
    }

    /* Return wallet details. */
    // return wallet
    return [
        {
            id: 'small',
            min: 1,
            max: 10,
        },
        {
            id: 'big',
            min: 10,
            max: 100,
        },
    ]
})
