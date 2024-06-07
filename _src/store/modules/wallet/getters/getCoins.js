/**
 * Get Coins
 */
const getCoins = (state) => {
    /* Validate state. */
    if (!state || !state.coins) {
        return null
    }

    /* Initialize coins. */
    // NOTE: Deep cloned to prevent mutation and preserve reactivity.
    const coins = JSON.parse(JSON.stringify(state.coins))

    /* Return coins. */
    return coins
}

/* Export module. */
export default getCoins
