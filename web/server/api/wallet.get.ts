/* Import modules. */
import BCHJS from '@psf/bch-js'
import { binToHex } from '@nexajs/utils'

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v5/'

const runtimeConfig = useRuntimeConfig()
const jwtAuthToken = runtimeConfig.public.PSF_JWT_AUTH_TOKEN
// console.log('jwtAuthToken', jwtAuthToken)

// Instantiate bch-js based on the network.
// FIXME https://github.com/Permissionless-Software-Foundation/jwt-bch-demo/blob/master/lib/fullstack-jwt.js
const bchjs = new BCHJS({
    restURL: BCHN_MAINNET,
    apiToken: jwtAuthToken,
})
// console.log('bchjs', bchjs)

const lang = 'english' // Set the language of the wallet.

const aliceObj = {}
const bobObj = {}
const samObj = {}

async function createWallets () {
  try {
    // create 256 bit BIP39 mnemonic
    const aliceMnemonic = bchjs.Mnemonic.generate(
      128,
      bchjs.Mnemonic.wordLists()[lang]
    )
    console.log('aliceMnemonic', aliceMnemonic)
    const bobMnemonic = bchjs.Mnemonic.generate(
      128,
      bchjs.Mnemonic.wordLists()[lang]
    )
    console.log('bobMnemonic', bobMnemonic)
    const samMnemonic = bchjs.Mnemonic.generate(
      128,
      bchjs.Mnemonic.wordLists()[lang]
    )

    // root seed buffer
    const aliceRootSeed = await bchjs.Mnemonic.toSeed(aliceMnemonic)
    console.log('aliceRootSeed', aliceRootSeed)
    const bobRootSeed = await bchjs.Mnemonic.toSeed(bobMnemonic)
    const samRootSeed = await bchjs.Mnemonic.toSeed(samMnemonic)

    // master HDNode
    const aliceMasterHDNode = bchjs.HDNode.fromSeed(aliceRootSeed)
    const bobMasterHDNode = bchjs.HDNode.fromSeed(bobRootSeed)
    const samMasterHDNode = bchjs.HDNode.fromSeed(samRootSeed)

    // Use 245 derivation path, which is the BIP44 standard for SLP tokens.
    const aliceChildNode = aliceMasterHDNode.derivePath("m/44'/145'/0'/0/0")
    const bobChildNode = bobMasterHDNode.derivePath("m/44'/145'/0'/0/0")
    const samChildNode = samMasterHDNode.derivePath("m/44'/145'/0'/0/0")

    aliceObj.mnemonic = aliceMnemonic
    aliceObj.cashAddress = bchjs.HDNode.toCashAddress(aliceChildNode)
    aliceObj.legacyAddress = bchjs.HDNode.toLegacyAddress(aliceChildNode)
    aliceObj.slpAddress = bchjs.SLP.HDNode.toSLPAddress(aliceChildNode)
    aliceObj.WIF = bchjs.HDNode.toWIF(aliceChildNode)
    console.log('aliceObj', aliceObj)

    bobObj.mnemonic = bobMnemonic
    bobObj.cashAddress = bchjs.HDNode.toCashAddress(bobChildNode)
    bobObj.legacyAddress = bchjs.HDNode.toLegacyAddress(bobChildNode)
    bobObj.slpAddress = bchjs.SLP.HDNode.toSLPAddress(bobChildNode)
    bobObj.WIF = bchjs.HDNode.toWIF(bobChildNode)

    samObj.mnemonic = samMnemonic
    samObj.cashAddress = bchjs.HDNode.toCashAddress(samChildNode)
    samObj.legacyAddress = bchjs.HDNode.toLegacyAddress(samChildNode)
    samObj.slpAddress = bchjs.SLP.HDNode.toSLPAddress(samChildNode)
    samObj.WIF = bchjs.HDNode.toWIF(samChildNode)

    // Write out the basic information into a json file for other example apps to use.
    // fs.writeFileSync('alice-wallet.json', JSON.stringify(aliceObj, null, 2))
    // fs.writeFileSync('bob-wallet.json', JSON.stringify(bobObj, null, 2))
    // fs.writeFileSync('sam-wallet.json', JSON.stringify(samObj, null, 2))

    console.log(`
      Wallets created. To continue the example, you need to fund these wallets.

      Send 3000 sats to the Alice's address:
      ${aliceObj.cashAddress}

      Send 3000 sats to the Bob's address:
      ${bobObj.cashAddress}

      Send 3000 sats to the Sam's address:
      ${samObj.cashAddress}
      `)
  } catch (err) {
    console.error('Error in createWallets(): ', err)
  }
}

export default defineEventHandler((event) => {
    /* Set database. */
    const Db = event.context.Db
    // console.log('DB', Db)

    /* Set database. */
    const Wallet = event.context.Wallet
    // console.log('WALLET', Wallet)

    const walletPkg = {
        address: Wallet.address,
        publicKey: binToHex(Wallet.publicKey),
        assets: JSON.stringify(Wallet.assets, (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        ),
        coins: JSON.stringify(Wallet.coins, (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        ),
        mnemonic: Wallet.mnemonic,
        tokens: JSON.stringify(Wallet.tokens, (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        ),
        aliceObj,
        bobObj,
        samObj,
    }

    /* Sanitize private details. */
    delete walletPkg.mnemonic

    /* Return wallet details. */
    return walletPkg
})
