/* Import modules. */
import { encryptForPubkey } from '@nexajs/crypto'
import { randomOutputsForTier } from '@nexajs/privacy'
import { binToHex } from '@nexajs/utils'
import BCHJS from '@psf/bch-js'

/* Initialize BCHJS. */
const bchjs = new BCHJS()


export default async function () {
    console.log('Starting fusion...')

    /* Initialize locals. */
    let bestTiers
    let blindComponents
    let components
    let cipherTokens
    let clubWallet
    let fusionInputs
    let inputAmount
    let publicKey
    let rawTx
    let inputs
    let outputs
    let response
    let tierid
    let tierScale

    const feeOffset = 1034//10034
    const maxOutputCount = 17

    /* Clone fusion inputs. */
    fusionInputs = []

    Object.keys(this.fusionInputs).forEach(_outpoint => {
        fusionInputs.push(this.fusionInputs[_outpoint])
    })

    const tierScales = [
        10000,      12000,      15000,      18000,      22000,      27000,      33000,      39000,      47000,      56000,      68000,      82000,
        100000,     120000,     150000,     180000,     220000,     270000,     330000,     390000,     470000,     560000,     680000,     820000,
        1000000,    1200000,    1500000,    1800000,    2200000,    2700000,    3300000,    3900000,    4700000,    5600000,    6800000,    8200000,
        10000000,   12000000,   15000000,   18000000,   22000000,   27000000,   33000000,   39000000,   47000000,   56000000,   68000000,   82000000,
        100000000,  120000000,  150000000,  180000000,  220000000,  270000000,  330000000,  390000000,  470000000,  560000000,  680000000,  820000000,
        1000000000, 1200000000, 1500000000, 1800000000, 2200000000, 2700000000, 3300000000, 3900000000, 4700000000, 5600000000, 6800000000, 8200000000,
    ]



    // for (let i = 0; i < fusionInputs.length; i++) {
    // inputAmount =

    /* Set input amount. */
    inputAmount = fusionInputs.reduce(
        (acc, input) => acc + input.value, 0
    )
    console.log('INPUT AMOUNT', fusionInputs.length, inputAmount)

    /* Handle ALL tier scales. */
    tierScales.forEach(_tierScale => {
        try {
            /* Request (random) outputs. */
            response = randomOutputsForTier(
                inputAmount,
                _tierScale,
                feeOffset,
                maxOutputCount,
            )

            /* Validate tier outputs. */
            if (response && response.length > 1) {
                console.log('TIER', _tierScale, response)

                /* Test for the best tiers. */
                if (typeof bestTiers === 'undefined' || response.length > bestTiers?.outputs.length) {
                    const numOutputs = response.length
                    console.log('NUM OUTPUTS', numOutputs)

                    // FIXME THE RESULTING BYTE COUNTS ARE WRONG!!
                    //       THIS FUNCTION MAY BE OUTDATED!!
                    const fee = bchjs.BitcoinCash
                        .getByteCount({ P2PKH: fusionInputs.length }, { P2PKH: numOutputs })
                    // const fee = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 })
                    console.log('FEE', fee)

                    const safeFee = (fee * 2) + (fee * Math.random())
                    console.log('SAFE FEE', safeFee)

                    const feeOffset = Math.ceil(safeFee / numOutputs)
                    console.log('FEE OFFSET', feeOffset)

                    const outputs = response.map(_outputValue => {
                        return {
                            address: this.getFusionAddress(),
                            value: (_outputValue - feeOffset),
                            // value: (_outputValue - fee),
                        }
                    })

                    bestTiers = {
                        tierid: _tierScale,
                        outputs,
                    }
                }
            }
        } catch (err) {
            // console.error(err)
        }
    })
    console.log('BEST TIERS', bestTiers)
// return

    /* Initialize components. */
    // NOTE: Automatically clone + add ALL fusion inputs.
    components = [ ...fusionInputs ]

    /* Sanitize (cloned input) components. */
    Object.keys(components).forEach(_outpoint => {
        const component = components[_outpoint]

        /* Delete WIF. */
        delete component.wif
    })

    /* Set tier ID. */
    tierid = bestTiers.tierid

    /* Add best tiers to components. */
    // NOTE: Best tiers index is derived from inputs index.
    for (let i = 0; i < bestTiers.outputs.length; i++) {
        /* Set tier. */
        const tier = bestTiers.outputs[i]
        console.log('TIER', tier)

        /* Add (output) components. */
        components.push(tier)
    }

    /* Validate components. */
    if (components.length === 0) {
        throw new Error('Oops! You MUST provide components to the Club.')
    }

    /* Prepare components for encryption. */
    components = JSON.stringify(components)
    // console.log('FUSION (components)', components)

    // TODO Handle any filtering required BEFORE submitting for fusion.

    clubWallet = await $fetch('/api/wallet')
        .catch(err => console.error(err))
    // console.log('CLUB WALLET', clubWallet)

    // FIXME Retrieve public key from a "public" endpoint.
    publicKey = clubWallet.publicKey
    // console.log('CLUB PUBLIC KEY', publicKey)

    /* Generate blind components. */
    blindComponents = encryptForPubkey(publicKey, components)
    // console.log('BLINDED COMPONENTS', blindComponents)

    const body = {
        authid: binToHex(this.wallet.publicKey),
        actionid: 'submit-components',
        tierid,
        components: blindComponents,
    }
    // console.log('BODY', body)

    response = await $fetch('/v1', {
        method: 'POST',
        body,
    })
    .catch(err => console.error(err))
    console.log('RESPONSE', response)
}
