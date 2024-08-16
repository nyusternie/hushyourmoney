/* Import modules. */
import { defineStore } from 'pinia'


// used for tagging fusions in a way privately derived from wallet name
const tag_seed = secrets.token_bytes(16)

// Safety limits to prevent loss of funds / limit fees:
// (Note that if we enter multiply into the same fusion, our limits apply
// separately for each "player".)

// Deny server that asks for more than this component feerate (sat/kbyte).
const MAX_COMPONENT_FEERATE = 5000
// The largest 'excess fee' that we are willing to pay in a fusion (fees beyond
// those needed to pay for our components' inclusion)
const MAX_EXCESS_FEE = 10000
// Even if the server allows more, put at most this many inputs+outputs+blanks
const MAX_COMPONENTS = 40
// The largest total fee we are willing to pay (our contribution to transaction
// size should not exceed 7 kB even with 40 largest components).
const MAX_FEE = MAX_COMPONENT_FEERATE * 7 + MAX_EXCESS_FEE

// For privacy reasons, don't submit less than this many distinct tx components.
// (distinct tx inputs, and tx outputs)
const MIN_TX_COMPONENTS = 11



const Autofuse = False
const AutofuseCoinbase = False
const AutofuseConfirmedOnly = False
const CoinbaseSeenLatch = False
const FusionMode = 'normal'
const QueudAutofuse = 4
const FuseDepth = 0  # Fuse forever by default
const Selector = ('fraction', 0.1)  # coin selector options
const SelfFusePlayers = 1 # self-fusing control (1 = just self, more than 1 = self fuse up to N times)
const SpendOnlyFusedCoins = False  # spendable_coin_filter @hook

const HUSH_OP_DATA_HEX = '48555348' // HUSH (as hex)
const HUSH_DERIVATION_PATH = `m/44'/0'/1213551432'` // HUSH (as decimal)



def size_of_input(pubkey):
    # Sizes of inputs after signing:
    #   32+8+1+1+[length of sig]+1+[length of pubkey]
    #   == 141 for compressed pubkeys, 173 for uncompressed.
    # (we use schnorr signatures, always)
    assert 1 < len(pubkey) < 76  # need to assume regular push opcode
    return 108 + len(pubkey)

def size_of_output(scriptpubkey):
    # == 34 for P2PKH, 32 for P2SH
    assert len(scriptpubkey) < 253  # need to assume 1-byte varint
    return 9 + len(scriptpubkey)

def component_fee(size, feerate):
    # feerate in sat/kB
    # size and feerate should both be integer
    # fee is always rounded up
    return (size * feerate + 999) // 1000

def dust_limit(lenscriptpubkey):
    return 3*(lenscriptpubkey + 148)



/**
 * Fusion Store
 */
export const useFusionStore = defineStore('fusion', {
    state: () => ({
            /* Initialize session. */
            _session: null,

            _apiKeys: {},
    }),

    getters: {
        session(_state) {
            return _state._session || null
        },

        sessionid(_state) {
            return _state._session?.id || null
        },

        challenge(_state) {
            return _state._session?.challenge || null
        },

        apiKey(_state) {
            return (_exchangeid) => _state._apiKeys[_exchangeid] || null
        },
    },

    actions: {
        async initFusion () {
            console.log('INIT FUSION (before):', this._session)
            /* Check for existing session. */
            if (this._session) {
                return this._session
            }

            /* Request new session. */
            const session = await $fetch('/api/newFusion')
            console.log('INIT FUSION (after fetch):', session)

            /* Set session. */
            this._setFusion(session)

            /* Return session. */
            return session
        },

        deleteFusion() {
            /* Set session. */
            this._setFusion(null)
        },

        saveFusion(_session) {
            /* Set session. */
            this._setFusion(_session)
        },

        /**
         * Set Fusion
         *
         * @param {Object} _session Save session details.
         */
        _setFusion (_session) {
            /* Set session. */
            this._session = _session
            console.log('SET FUSION', this._session)
        },

        /**
         * Set API Key
         *
         * @param {Object} _key Information for the Exchange's API key.
         */
        setApiKey (_key: Object) {
            /* Set session. */
            this._apiKeys[_key.exchangeid] = _key
            console.log('SET API KEY', this._apiKeys)
        },


        /**
         * Make up to `max_number` random output values, chosen using exponential
        distribution function. All parameters should be positive `int`s.

        None can be returned for expected types of failures, which will often occur
        when the input_amount is too small or too large, since it becomes uncommon
        to find a random assortment of values that satisfy the desired constraints.

        On success, this returns a list of length 1 to max_count, of non-negative
        integer values that sum up to exactly input_amount.

        The returned values will always exactly sum up to input_amount. This is done
        by renormalizing them, which means the actual effective `scale` will vary
        depending on random conditions.

        If `allow_extra_change` is passed (this is abnormal!) then this may return
        max_count+1 outputs; the last output will be the leftover change if all
        max_counts outputs were exhausted.
        */
        random_outputs_for_tier(rng, input_amount, scale, offset, max_count, allow_extra_change=False),


        /**
         * Generate a full set of fusion components, commitments, keys, and proofs.

        count: int
        inputs: dict of {(prevout_hash, prevout_n): (pubkey, integer value in sats)}
        outputs: list of [(value, addr), (value, addr) ...]
        feerate: int (sat/kB)

        Returns:
            list of InitialCommitment,
            list of component original indices (inputs then outputs then blanks),
            list of serialized Component,
            list of Proof,
            list of communication privkey,
            Pedersen amount for total, (== excess fee)
            Pedersen nonce for total,
        */
        gen_components(num_blanks, inputs, outputs, feerate),




    },
})
