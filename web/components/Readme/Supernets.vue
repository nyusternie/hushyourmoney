<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="flex flex-col gap-5">
        <h2 class="text-3xl font-bold text-fuchsia-700">
            Supernets: PoW Layer 1+ (Plus)
        </h2>

        <div>
            The Incognito Network (Nito) is specifically designed to run across multiple UTXO-style networks;
            specifically those Proof-of-Work (Layer 1) networks capable of efficiently running Supernets, like:

            <ol class="py-3 pl-10 list-decimal">
                <li>Bitcoin Cash</li>
                <li>Kaspa</li>
                <li>Litecoin</li>
                <li>Nexa</li>
                <li>and more...</li>
            </ol>
        </div>

        <div>
            UTXO-based Supernets are the ideal technological platforms;
            offering a plethora of features and benefits, including:

            <ol class="py-3 pl-10 list-disc">
                <li>BigNum support for Zero Knowledge math primitives</li>
            </ol>
        </div>
    </main>
</template>
