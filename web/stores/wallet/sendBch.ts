/*
  Consolidate all UTXOs in an address into a single UTXO
*/

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v5/'

// bch-js-examples require code from the main bch-js repo
import BCHJS from '@psf/bch-js'

// Instantiate bch-js based on the network.
const bchjs = new BCHJS({ restURL: BCHN_MAINNET })

const SEND_ADDR = walletInfo.cashAddress
const SEND_MNEMONIC = walletInfo.mnemonic
const MAX_NUM_UTXOS = 100

async function consolidateUtxos () {
  try {
    // instance of transaction builder
    const transactionBuilder = new bchjs.TransactionBuilder()

    let sendAmount = 0
    const inputs = []

    const data = await bchjs.Electrumx.utxo(SEND_ADDR)
    const utxos = data.utxos

    let maxLen = utxos.length
    console.log(`There are ${maxLen} UTXOs to consolidate.`)
    if(maxLen > MAX_NUM_UTXOS) maxLen = MAX_NUM_UTXOS

    // Loop through each UTXO assigned to this address.
    for (let i = 0; i < maxLen; i++) {
      const thisUtxo = utxos[i]

      inputs.push(thisUtxo)

      sendAmount += thisUtxo.value

      // ..Add the utxo as an input to the transaction.
      transactionBuilder.addInput(thisUtxo.tx_hash, thisUtxo.tx_pos)
    }

    // get byte count to calculate fee. paying 1.2 sat/byte
    const byteCount = bchjs.BitcoinCash.getByteCount(
      { P2PKH: inputs.length },
      { P2PKH: 1 }
    )
    console.log(`byteCount: ${byteCount}`)

    const satoshisPerByte = 1.0
    const txFee = Math.ceil(satoshisPerByte * byteCount)
    console.log(`txFee: ${txFee}`)

    // Exit if the transaction costs too much to send.
    if (sendAmount - txFee < 0) {
      console.log(
        "Transaction fee costs more combined UTXOs. Can't send transaction."
      )
      return
    }

    // add output w/ address and amount to send
    transactionBuilder.addOutput(SEND_ADDR, sendAmount - txFee)

    // Generate a change address from a Mnemonic of a private key.
    const change = await changeAddrFromMnemonic(SEND_MNEMONIC)

    // Generate a keypair from the change address.
    const keyPair = bchjs.HDNode.toKeyPair(change)

    // sign w/ HDNode
    let redeemScript
    inputs.forEach((input, index) => {
      transactionBuilder.sign(
        index,
        keyPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        input.value
      )
    })

    // build tx
    const tx = transactionBuilder.build()
    // output rawhex
    const hex = tx.toHex()
    // console.log(`TX hex: ${hex}`)
    console.log(' ')

    // Broadcast transation to the network
    const txid = await bchjs.RawTransactions.sendRawTransaction([hex])

    // import from util.js file
    const util = require('../util.js')
    console.log(`Transaction ID: ${txid}`)
    console.log('Check the status of your transaction on this block explorer:')
    util.transactionStatus(txid, 'mainnet')
  } catch (err) {
    console.log('error: ', err)
  }
}
consolidateUtxos()

// Generate a change address from a Mnemonic of a private key.
async function changeAddrFromMnemonic (mnemonic) {
  // root seed buffer
  const rootSeed = await bchjs.Mnemonic.toSeed(mnemonic)

  // master HDNode
  const masterHDNode = bchjs.HDNode.fromSeed(rootSeed)

  // HDNode of BIP44 account
  const account = bchjs.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

  // derive the first external change address HDNode which is going to spend utxo
  const change = bchjs.HDNode.derivePath(account, '0/0')

  return change
}
