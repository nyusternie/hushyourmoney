<script setup lang="ts">
/* Import modules. */
import { Transaction } from 'bitcoinjs-lib'
import BCHJS from '@psf/bch-js'
import { encryptForPubkey } from '@nexajs/crypto'
import { mnemonicToSeed } from '@nexajs/hdnode'
import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'

/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    balances: Object,
    cashAddress: String,
    utxos: Object,
})

/* Initialize stores. */
import { useWalletStore } from '@/stores/wallet'
const Wallet = useWalletStore()

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v5/'

const runtimeConfig = useRuntimeConfig()
const jwtAuthToken = runtimeConfig.public.PSF_JWT_AUTH_TOKEN

// Instantiate bch-js based on the network.
const bchjs = new BCHJS({
    restURL: BCHN_MAINNET,
    apiToken: jwtAuthToken,
})
// console.log('bchjs', bchjs)


// Combine all accounts inputs and outputs in one unsigned Tx
const buildUnsignedTx = () => {
    /* Initialize locals. */
    let rawTx
    let utxo

    try {
        const safeBalance = props.utxos.reduce(
            (acc, utxo) => (utxo.value > 10000) ? acc + utxo.value : 0, 0
        )
        console.log('SAFE BALANCE', safeBalance)
        const fee = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 })
        console.log('FEE', fee)

        const paymentAmount = safeBalance - fee

        const satsNeeded = fee + paymentAmount

        const receiver = 'bitcoincash:qq27zfgmy7hckrrxygjdz6rr847pjkzzyc6d0un4e4'
        console.log(`payment (+fee): ${satsNeeded}`)

        const transactionBuilder = new bchjs.TransactionBuilder()
let inputIdx
        props.utxos.forEach((_utxo) => {
            /* Set UTXO. */
            utxo = _utxo
            console.log('UTXO', utxo)
inputIdx = 0//utxo.tx_pos
            transactionBuilder.addInput(utxo.tx_hash, utxo.tx_pos)

            const originalAmount = utxo.value

            const remainder = originalAmount - satsNeeded
            console.log('REMAINDER', remainder);

            if (remainder < 0) {
                throw new Error('Selected UTXO does not have enough satoshis')
            }



console.log('bchjs.Script.opcodes.OP_RETURN', bchjs.Script.opcodes.OP_RETURN)
console.log('MSG', Buffer.from(`${msg}`))
            const msg = '1337dev'
            const script = [
                bchjs.Script.opcodes.OP_RETURN,
                // Buffer.from('6d02', 'hex'), // Makes message comply with the memo.cash protocol.
                Buffer.from(`${msg}`)
            ]

            // Compile the script array into a bitcoin-compliant hex encoded string.
            const data = bchjs.Script.encode(script)
            console.log('OP_RETURN (data)', data)

            // Add the OP_RETURN output.
            transactionBuilder.addOutput(data, 0)



            // Send payment
            // transactionBuilder.addOutput(receiver, satsNeeded)
            transactionBuilder.addOutput(receiver, paymentAmount)

            // Send the BCH change back to the payment part
            // transactionBuilder.addOutput(account.address, remainder - 300)
        })

        /* Initialize redeem script. */
        // FIXME Why do we need this??
        let redeemScript

        /* Convert mnemonic to seed. */
        const seed = mnemonicToSeed(Wallet.mnemonic)

        /* Conver to seed buffer. */
        // FIXME Migrate to TypedArrays.
        const seedBuffer = Buffer.from(seed, 'hex')

        /* Generate master node. */
        const masterNode = bchjs.HDNode.fromSeed(seedBuffer)

/* Set account index. */
const accountIdx = 0
/* Set change index. */
const changeIdx = 0
/* Set address index. */
const addressIdx = 0

        /* Generate child node. */
        const chidleNode = masterNode
            .derivePath(`m/44'/145'/${accountIdx}'/${changeIdx}/${addressIdx}`)

        /* Generate wallet import format (WIF). */
        const wif = bchjs.HDNode.toWIF(chidleNode)
        // console.log('BCH WIF', wif)

        /* Generate elliptic pair. */
        const ecPair = bchjs.ECPair.fromWIF(wif)

        /* Sign transaction. */
        transactionBuilder.sign(
            inputIdx,
            ecPair,
            redeemScript,
            Transaction.SIGHASH_ALL,
            utxo.value,
        )

        /* Generate (incomplete) transaction. */
        const tx = transactionBuilder.transaction.buildIncomplete()
        // console.log('TRANSACTION', tx)

        /* Convert to (raw) hex. */
        rawTx = tx.toHex()
    } catch (err) {
        console.error(`Error in buildUnsignedTx(): ${err}`)
        throw err
    }

    /* Return raw (hex) transaction. */
    return rawTx
}


const cashout = () => {
    alert('WIP?? sorry...')
}

const start = async () => {
    console.log('Starting...')

    /* Initialize locals. */
    let cipherCoins
    let cipherTokens
    let publicKey
    let rawTx
    let readyToFuse
    let response
    let wallet

    rawTx = buildUnsignedTx()
    console.log('RAW TX (HEX)', rawTx)

    readyToFuse = JSON.stringify(props.utxos)
    console.log('READY TO FUSE', readyToFuse)

    // TODO Handle any filtering required BEFORE submitting for fusion.

    wallet = await $fetch('/api/wallet')
        .catch(err => console.error(err))
    // console.log('WALLET', wallet)

    // FIXME Retrieve public key from a "public" endpoint.
    publicKey = wallet.publicKey
    console.log('PUBLIC KEY', publicKey)

    /* Generate cipher coins. */
    cipherCoins = encryptForPubkey(publicKey, readyToFuse)
    console.log('CIPHER COINS', cipherCoins)



    response = await $fetch('/v1', {
        method: 'POST',
        body: {
            authid: binToHex(Wallet.wallet.publicKey),
            coins: cipherCoins,
            tokens: [],
            rawTx,
        },
    })
    .catch(err => console.error(err))
    console.log('RESPONSE', response)
}

onMounted(() => {
    // console.log('Mounted!', props.balances)
    // Now it's safe to perform setup operations.
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main>
        <h2 class="text-base font-semibold leading-6 text-gray-900">
            Wallets
        </h2>

        <p class="mt-1 text-sm text-gray-500">
            You haven’t created a Wallet yet.
            Get started by selecting a template or start from an empty project.
        </p>

        <section>
            <h2>
                Cash Address
            </h2>

            <h3>
                {{props.cashAddress}}
            </h3>

            <h3>
                Confirmed: {{props.balances?.confirmed}}
            </h3>
            <h3>
                Unconfirmed: {{props.balances?.unconfirmed}}
            </h3>

            <div class="my-3 grid grid-cols-2 gap-4">
                <button @click="cashout" class="px-3 py-2 bg-lime-200 border-2 border-lime-400 text-2xl text-lime-800 font-medium rounded shadow hover:bg-lime-100">
                    Cashout Wallet
                </button>

                <button @click="start" class="px-3 py-2 bg-lime-200 border-2 border-lime-400 text-2xl text-lime-800 font-medium rounded shadow hover:bg-lime-100">
                    Start Fusions
                </button>
            </div>

            <pre class="text-xs">{{props.utxos}}</pre>

        </section>

        <ul role="list" class="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-200 py-6 sm:grid-cols-2">
            <li class="flow-root">
                <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                    <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-pink-500">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </div>

                    <div>
                        <h3 class="text-2xl font-medium text-gray-900">
                            <a href="javascript://" class="focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                <span>Bitcoin</span>
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </h3>

                        <p class="mt-1 text-sm text-gray-500">
                            Another to-do system you’ll try but eventually give up on.
                        </p>
                    </div>
                </div>
            </li>

            <li class="flow-root">
                <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                    <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-500">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                            />
                        </svg>
                    </div>

                    <div>
                        <h3 class="text-2xl font-medium text-gray-900">
                            <a href="javascript://" class="focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                <span>Bitcoin Cash</span>
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">Stay on top of your deadlines, or don’t — it’s up to you.</p>
                    </div>
                </div>
            </li>

            <li class="flow-root">
                <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                    <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-green-500">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-medium text-gray-900">
                            <a href="javascript://" class="focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                <span>Nexa</span>
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">Great for mood boards and inspiration.</p>
                    </div>
                </div>
            </li>

            <li class="flow-root">
                <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                    <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-medium text-gray-900">
                            <a href="javascript://" class="focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                <span>Litecoin</span>
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">Track tasks in different stages of your project.</p>
                    </div>
                </div>
            </li>

            <li class="flow-root">
                <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                    <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-medium text-gray-900">
                            <a href="javascript://" class="focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                <span>Flux</span>
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">Lots of numbers and things — good for nerds.</p>
                    </div>
                </div>
            </li>

            <li class="flow-root">
                <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                    <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-medium text-gray-900">
                            <a href="javascript://" class="focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                <span>eCash</span>
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">Get a birds-eye-view of your procrastination.</p>
                    </div>
                </div>
            </li>

        </ul>

        <div class="mt-4 flex">
            <a href="javascript://" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Or select another Blockchain wallet
                <span aria-hidden="true"> &rarr;</span>
            </a>
        </div>
    </main>
</template>
