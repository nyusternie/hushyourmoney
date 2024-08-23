<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'

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

const bchAddresses = ref(null)
const btcAddresses = ref(null)
const hushAddresses = ref(null)
const nexaAddresses = ref(null)

const HUSH_PROTOCOL_ID = 0x48555348

const balance = computed(() => {
    if (!Wallet.fusionInputs) {
        return 0
    }

    const totalValue = Wallet.fusionInputs.reduce(
        (acc, utxo) => acc + utxo.value, 0
    )
    // console.log('TOTAL VALUE', totalValue)

    return numeral(totalValue).format('0,0')
})

const cashout = () => {
    alert('WIP?? sorry...')
}

const consolidate = () => {
    alert('WIP?? sorry...')
}

const startFusions = () => {
    Wallet.startFusions()
}

const init = () => {
    /* Initialize locals. */
    let address

    /* Initialize #? Hush addresses. */
    hushAddresses.value = []

    for (let i = 0; i < 20; i++) {
        // HUSH == 0x48555348 == 1,213,551,432
        // address = await Wallet.getBchAddress(HUSH_PROTOCOL_ID, 0, i)
        address = Wallet.keychain[HUSH_PROTOCOL_ID][i].address
        // console.log('GET BCH ADDRESS', i, address)
        hushAddresses.value.push(address)
    }

}

onMounted(() => {
    console.log('KEYCHAIN', Wallet.keychain)
    // init()
    setTimeout(init, 1000)
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main>
        <h2 class="text-6xl font-light text-gray-600">
            LP Wallets
        </h2>

<!-- <pre class="text-xs">{{Wallet.fusionInputs}}</pre> -->
<!-- <hr /> -->
<!-- <pre class="text-xs">{{Wallet.utxos}}</pre> -->

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="w-full lg:w-fit">
                <section class="my-3 px-3 py-2 grid grid-cols-2 items-center gap-1 bg-green-300 border-2 border-green-500 rounded-xl shadow">
                    <h2 class="col-span-2 text-green-900 text-base font-medium uppercase tracking-widest">
                        Bitcoin Cash Address
                    </h2>

                    <NuxtLink :to="'https://3xpl.com/bitcoin-cash/address/' + props.cashAddress.slice(12)" target="_blank" class="col-span-2 text-base sm:text-xl text-blue-500 truncate hover:underline">
                        {{props.cashAddress.slice(12)}}
                    </NuxtLink>

                    <h3 class="text-green-900 text-sm font-medium text-right uppercase">
                        Current Balance
                    </h3>

                    <h3 class="text-green-900 text-xl font-medium">
                        {{balance}}
                        <small class="text-sm">sats</small>
                    </h3>
                </section>

                <div v-for="(address, index) of hushAddresses" :key="address" class="text-xs">
                    <div class="grid grid-cols-4 items-center gap-3">
                        <span class="text-right">Hush #{{(index + 1)}}</span>
                        <NuxtLink :to="'https://3xpl.com/bitcoin-cash/address/' + address.slice(12)" target="_blank" class="col-span-3 text-blue-500 hover:underline">{{address}}</NuxtLink>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-fit">
                <section class="my-3 px-3 py-2 grid grid-cols-2 items-center gap-1 bg-yellow-200 border-2 border-yellow-400 rounded-xl shadow">
                    <h2 class="col-span-2 text-yellow-900 text-base font-medium uppercase tracking-widest">
                        Nexa Address
                    </h2>

                    <NuxtLink :to="'https://explorer.nexa.org/address/' + Wallet.address" target="_blank" class="col-span-2 text-base sm:text-xl text-blue-500 truncate hover:underline">
                        {{Wallet.address.slice(5)}}
                    </NuxtLink>

                    <h3 class="text-yellow-900 text-sm font-medium text-right uppercase">
                        Current Balance
                    </h3>

                    <h3 class="text-yellow-900 text-xl font-medium">
                        n/a
                    </h3>
                </section>

                <!-- <div v-for="(address, index) of hushAddresses" :key="address" class="text-xs">
                    <div class="grid grid-cols-4 items-center gap-3">
                        <span class="text-right">Hush #{{(index + 1)}}</span>
                        <NuxtLink :to="'https://3xpl.com/bitcoin-cash/address/' + address.slice(12)" target="_blank" class="col-span-3 text-blue-500 hover:underline">{{address}}</NuxtLink>
                    </div>
                </div> -->
            </div>
        </div>

        <hr />

        <div class="my-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button @click="startFusions" class="px-3 py-2 bg-lime-200 border-2 border-lime-400 text-2xl text-lime-800 font-medium rounded-lg shadow hover:bg-lime-100">
                Start Fusions
            </button>

            <button @click="consolidate" class="px-3 py-2 bg-lime-200 border-2 border-lime-400 text-2xl text-lime-800 font-medium rounded-lg shadow hover:bg-lime-100">
                Consolidate UTXOs
            </button>

            <button @click="cashout" class="px-3 py-2 bg-lime-200 border-2 border-lime-400 text-2xl text-lime-800 font-medium rounded-lg shadow hover:bg-lime-100">
                Cashout Wallet
            </button>

        </div>

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
