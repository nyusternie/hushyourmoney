<script setup lang="ts">
useHead({
    title: `Specification — Hush Your Money`,
    meta: [
        { name: 'description', content: `Hush Your Money makes spending safu.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

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
    <main class="max-w-5xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            HUSH Specification
        </h1>

        <h4 class="w-2/3 text-xl text-rose-500 font-light italic">
            TL;DR — HUSH automagically manages the <span class="text-2xl font-medium">"toxic waste"</span> produced by your CoinJoin transaction;
            using a <span class="text-2xl font-medium">"TOR-free"</span> variation of the <NuxtLink to="https://cashfusion.org" target="_blank" class="text-2xl font-medium hover:underline">CashFusion</NuxtLink> protocol running on the <NuxtLink to="https://runonflux.io" target="_blank" class="text-2xl font-medium hover:underline">Flux Cloud</NuxtLink> network.
        </h4>

        <section class="mt-12 grid grid-cols-3">
            <div class="col-span-2 flex flex-col gap-4">
                <h2 class="text-3xl font-medium">
                    Communication
                </h2>

                <ul class="pl-10 list-disc leading-8">
                    <li>The server should support TLSv1.2 between the client and server.</li>
                    <li>
                        The server should only accept messages on the wire with the following structure:
                        <ol class="pl-10 list-decimal">
                            <li>Magic prefix `0x42bcc32669467873`.</li>
                            <li>4-bytes specifying the length of the message in bytes in big endian order.</li>
                            <li>The protobuf payload.</li>
                        </ol>
                    </li>
                </ul>

            </div>

            <div class="px-3 py-2 col-span-1 h-64 bg-sky-300 border-2 border-sky-500 rounded-xl shadow">
                <h3 class="text-xl text-white font-medium opacity-50">
                    THIS IS A SIDEBAR
                </h3>
            </div>
        </section>

        <section class="mt-12 grid grid-cols-3">
            <div class="col-span-2 flex flex-col gap-4">
                <h2 class="text-3xl font-medium">
                    Shuffle Transaction
                </h2>

                <p>
                    In order to avoid client identification and ensure compatibility:
                </p>

                <ul class="pl-10 list-disc leading-8">
                    <li>Transactions should use only ECDSA signing.</li>
                    <li>Transactions should use `nLockTime = 0`.</li>
                    <li>Transactions should use `nVersion = 1`.</li>
                    <li>Each input should use `nSequence = 0xfffffffe`.</li>
                </ul>

            </div>

            <div class="px-3 py-2 col-span-1 h-64 bg-sky-300 border-2 border-sky-500 rounded-xl shadow">
                <h3 class="text-xl text-white font-medium opacity-50">
                    THIS IS A SIDEBAR
                </h3>
            </div>
        </section>


<pre class="p-5 bg-amber-100 text-lg">

## Protobuf payload

- The client and server should communicate according to the [protobuf specification](https://github.com/Electron-Cash/Electron-Cash/blob/master/plugins/shuffle_deprecated/protobuf/message.proto) for messages.
- The server should only receive messages of the `Packets` type.

Example payload content for client registering with the server:

```
Packets: [
    Signed{
    packet: Packet{
        registration: Registration{
        amount:  bch_in_sats
        version: latest_version
        type:    shuffle_type
        }
    }
    }
]
```

Example payload serialized bytes:

```
Work in Progress
```

## Flow

[Flowchart (work in progress)](/images/single-player-flowchart.svg)

### Entering a Shuffle

After the SSL connection is established, the client should send the server a message containing only the `verification key` of the player and the desired amount to shuffle in satoshis, the type of shuffle and the protocol version. This message should be unsigned.

```
Packets: [
    Signed{
    packet: Packet{
        from_key: VerificationKey{
        key: verification_key
        }
        registration: Registration{
        amount:  bch_in_sats
        version: latest_version
        type:    shuffle_type
        }
    }
    }
]
```

If all is well with the verification key, the server should send back an simple message with a session value and the player's number in the pool.

```
Packets: [
    Signed{
    packet: Packet{
        session: some_UUID
        number:  number_in_pool
    }
    }
]
```

If something goes wrong with the handshake, the server should send a blame message and close the connection.

```
Packets: [
    Signed{
    packet: Packet{
        message: Message{
        blame: Blame{
            reason: blame_reason_enum
        }
        }
    }
    }
]
```

### Forming the pool

The server forms pools of a fixed size `N`. Every player who successfully registers should be added to the current pool and receive a confirmation as above. As long as the pool is not yet full, the server should also broadcast a simple message with the new player's number to all players in the pool, including the new player.

```
Packets: [
    Signed{
    packet: Packet{
        number: new_player_number_in_pool
    }
    }
]
```

After the pool reaches its limit (`N`), instead of the new player broadcast, the server should broadcast that the pool has entered Phase 1 (Announcement) to all pool participants.

```
Packets: [
    Signed{
    packet: Packet{
        phase: ANNOUNCEMENT
        number: pool_size_N
    }
    }
]
```

### Player messaging

After the client is registered as a player (it has a session UUID and number in the pool)
it switches to game mode and can send/receive messages. There are two types of messages `broadcast` and
`unicast`. `broadcast` messages are for everyone in the pool and `unicast` messages are only from one player to another.

Every time the server accepts a message from the client it should check if it has:

- A valid session UUID.
- A valid verification key.
- A valid player number.
- A valid `from_key` field.
- A valid or null `to_key` field where `to_key` must be in the same pool.

If the message has a null value for `to_key` field, it means that it should be broadcast to every pool member
If the message does not have a null value for `to_key` it should be unicast to the specified player.

### Blame messages

In the blame phase, players can exclude unreliable players from the pool.
If server got `N-1` messages from players to exclude a player with verification key `accused_key` then the player with this verification key should be excluded. The message should be in the following form:

```
packet {
    packet {
    session: "session"
    from_key {
        key: "from_key"
    }
    phase: BLAME
    message {
        blame {
        reason: LIAR
        accused {
            key: "excluded_key"
        }
        }
    }
    }
}
Packets: [
    Signed{
    packet: Packet{
        session: session_id
        from_key: VerificationKey{
        key: verification_key
        }
        phase: BLAME
        message {
        blame Blame{
            reason: LIAR
            accused VerificationKey{
            key: accused_key
            }
        }
        }
    }
    }
]
```

### Losing the connection

If one of the players closes their connection during a round of shuffling then the shuffle is terminated and a new shuffle should be initiated by reconnecting to the server.

### Exiting from the Shuffle

If everything goes well, all the clients will disconnect when shuffling is complete.

## Definitions / Glossary

- CoinJoin: A method by which transactions for a Bitcoin-based blockchain can be built to better protect the privacy of the parties involved. CoinJoin builds a transaction so that it uses identical `input` amounts thus normalizing the uniquely identifiable characteristic which `privacy attackers` rely upon to track the owner's of a particular `coin` over time.
- CoinShuffle: A privacy protocol for Bitcoin based blockchains that attempts to achieve the benefits of the `CoinJoin` protocol in a decentralized way that does not rely on a trusted middle man.
- CashShuffle: A companion to the `CoinShuffle` protocol. CashShuffle adds a low-trust infrastructure layer that allows for the discovery of `CashShuffle` participants as well as facilitating anonymous communication between them as they execute the `CashShuffle` protocol to create trustless `CoinJoin` transactions.


- Blame: This may describe either the `Phase` immediately following a failed `CashShuffle` `Round` or the specific `Protocol Message` that is sent by a `Player` to signal a failed `Round`. The `Blame` `Protocol Message` takes a specific form. See the `Server Message` docs for more info.
- Client: Any device or application that connects to a `CashShuffle` server with the intention and capability of carrying out the steps in the `CashShuffle` protocol. Clients manage most of the shuffling complexity thus minimizing the influence and involvement of the `Server`.
- Coin: Frequently used as shorthand for an `Output` in a Bitcoin transaction.
- Connection: The underlying network socket between `Client` and `Server` used to exchange `Protocol Messages`. Note, `Connections` have a 1:1 relationship with a `Player`.
- Equivocation:
- Packet: A specific data type used in the formation of a `Protocol Message`. See the communication spec for syntax.
- Phase: Describes each of the stages within a `CashShuffle` `Round`. For complete descriptions see the "flow specification"
- Player: The unique representation of a `Client` within a `Pool`. A `Client` may participate simultaneously in multiple `Pools`. It may be helpful to think of a `Player` as being linked to its ephemeral keypair ( `Verification Key` and `Signing Key` ) because all three die at the end of a `Round`, regardless of its outcome.
- Pool: A group of `Players` within the `Server` that participate in a `Round`. `Players` are grouped based on the value of the `Coin` they intend to shuffle and the type of shuffle they intend to perform. While `Clients` may have multiple `Players` in different `Pools`, no client should be allowed in the same `Pool` instance as it would reduce the effectiveness of the `CashShuffle` protocol.
- Protocol Message: A standardized message sent by either the `Server` or a `Player` in a shuffle `Round` containing data relevant to the state of a shuffle `Round`. Protocol messages must adhere to the `Protobuf` communcation spec outlined in this document.
- Round: An abstraction describing the sequence of events that take place in a single attempt by a `Pool` of `Players` to shuffle their coins in adherence to the `CashShuffle` protocol.
- Server: An intentionally minimal server whose primary duties are to put `Clients` into `Pools` and act as a blind ( minimal logs ) and dumb ( minimal complexity ) relay of `Protocol Message` during shuffles.
- Signing Key: The private key portion of the ephemeral keypair created to be used exclusively for signing and verifying protocol messages for a particular `CashShuffle` `Round`. The `Verification Key` and its corresponding `Signing Key` are both intended for one time use.
- Verification Key: The public key portion of the ephemeral keypair created to be used exclusively for signing and verifying protocol messages for a particular `CashShuffle` `Round`. The `Verification Key` and its corresponding `Signing Key` are both intended for one time use.

</pre>
    </main>

    <Footer />
</template>
