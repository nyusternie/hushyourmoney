# Introducing a "serverless" CashFusion network

> __TL;DR —__ In 2001, Napster's entire global "peer-to-peer" network went dark from a single server outage. This weakness immediately triggered RIAA lawsuits, goverment intervention and the destruction of a nascent music network. __CashFusion MUST have a more resilient operational network__ if it's to be the primary tool for fungibility and user privacy on Bitcoin's BCH blockchain. Hush Your Money aims to deliver that resiliency in 8 weeks to (3) consumer-ready applications.

After over 1+ year of research and development, the first __"SERVERLESS"__ privacy solution is now powering Bitcoin's first mainstream privacy protocol, CashShuffle. The NEW Unstoppable CashShuffle network can no longer be shutdown from a single server outage.

__try it out @ https://shuffle.cash__

## Hush Your Money aims to deliver a serverless CashFusion network into (3) consumer-ready applications:

1. Nito Blender _(desktop)_
2. Electron Cash _(plugin)_
3. Bitcoin.com wallet _(Link API)_

## SLP rewards

The reality is that it's quite difficult to successfully fund a Flipstarter without the support of a whale or two, but YOU can show YOUR support for this campaign with as little as $1.00 by pledging from the __[Bitcoin.com wallet app](https://wallet.bitcoin.com)__ using Causes Cash.

__PLEASE INCLUDE YOUR SLP ADDRESS FOR A SHARE OF [NITO TOKENS](https://explorer.bitcoin.com/bch/tx/53b1a445aafcd07a38c31ad7ee4218b6e567628c675a8116e2d7c08b57d0cc67)__

Just click on __"Your SLP address"__ and it will be automatically populated from your Bitcoin.com wallet. Easy!

__YOUR SUPPORT IS VERY MUCH APPRECIATED__  
🙏 🚀





--------------------------------------------------------------------------------





## The problem

Centralization eventually fails, if not for technical reasons, then for (government) regulatory reasons. Migrating CashFusion from a client-server protocol to a peer-to-peer protocol will add exponential resiliancy to the network with each and every node that contributes to its health and liquidity.

> __Did you know?__ Today, a single server (cashfusion.electroncash.dk) powers the entire CashFusion network. Any outage at that node results in the entire CashFusion network becoming unavailable to the entire Bitcoin community.

Cash DevOps runs a fallback server (cashfusion.devops.cash) which offers a drop-in replacement that's 100% compatible with Electron Cash. However, this doesn't solve the problem of a single point of failure. Each CashFusion server segregates its own pool of participants, which means reduced privacy & liquidity for the whole network.

## The solution

__CashFusion should follow CashShuffle and go SERVERLESS. NO SINGLE POINT OF FAILURE!__ At any point in time, multiple nodes can serve to process CashFusion transactions, very similar to how __[ElectrumX](https://electrumx.readthedocs.io/en/latest/)__ and __[Fulcrum](https://github.com/cculianu/Fulcrum)__ work today.

ANY client can connect to ANY CashFusion server to process their coins. ANY node can perform the same function as another other node in the network. Each CashFusion server works together with the other servers to process a SINGLE pool, which maximizes privacy & liquidity for the whole network.

__Hush Your Money aims to deliver such a network to Bitcoin's BCH blockchain__

100% of the funds raised in this campaign will be applied to delivering consumer-ready solutions that add immediate value to the Bitcoin BCH ecosystem.

## Hush Your Money is ambitiously pursuing (3) goals with the introduction of this NEW serverless CashFusion network:

1. Complete an MVP of the NEW Nito Blender desktop application
2. Complete a serverless CashFusion plugin for the Electron Cash wallet
3. Complete a serverless CashFusion PoC for the Bitcoin.com wallet

__Estimated completion time is 8 weeks from the funding date__

---

## Nito Blender desktop

https://nitoblender.com

A new desktop application is currently being built to support the new serverless protocol. This application will serve one purpose and that's to process CashFusion transactions and add liquidity to the network.

> __NOTE:__ For the purpose of prototyping a working solution ASAP, this application is being written in __[Electron](https://www.electronjs.org/)__ and will be available on Windows, Mac & Linux at release.

__Nito Blender will implement the TOP3 CashFusion wishlist items, as discussed on messaging forums, notably Reddit, Slack and Twitter:__

__1. Customize your coin (UTXO) outputs__

This is probably the most requested feature of all. Take full control of the UTXO sizes generated from your CashFusion transactions.

```
For example:
Input 1.0 BCH
Output [~0.5, ~0.3, ~0.2] BCH
```

__2. Mobile proxy__

A lightweight proxy to securely manage a user's mobile wallet keys. This is run from a device that is permanently connected to the network _(eg. @home desktop);_ thereby avoiding the bandwidth and battery issues that come from running fusions directly on a mobile device.

> __NOTE:__ In the case of Apple's iOS devices, it's simply NOT possible to control background processes. This poses a critical problem as CashFusion is inherintly dependent on queueing in the background and processing in real-time.

A single running node can trustlessly provide proxy services to multiple mobile devices. In turn, a single mobile device can be connected to multiple proxies simultaneously.

__3. Speed__

If you're a frequent user of CashFusion, you have no doubt hit a dry spell. In the "real" world, users are not interested in running a node 24x7, and will be discouraged to wait hours for a single fusion.

Months of extensive testing show that "nearly" perfect privacy can be achieved with multiple FAST fusion rounds, as opposed to waiting for a single perfect fusion. The additional transaction cost is negligable and __privacy can be achieved in minutes instead of hours.__

> __NOTE:__ Fusion Fridays are still the best days to fuse. However, depending on the size of your UTXOs, it can still take hours for a single fusion.

Every individual is different and will have different needs; so we aim to provide flexibility in allowing users to choose their level of privacy in relation to the speed of the fusion process.

---

## Electron Cash plugin

Native support in CashFusion's flagship application is a top priority. We will add an integration to the serverless CashFusion network by extending the current CashFusion plugin.

> __NOTE:__ Extra care will be taken to conform to current EC coding guidelines & practices, as the goal is to see this plugin eventually become part of the native implementation.

---

## Bitcoin.com wallet

A recent proof-of-concept was demonstrated in __[How-to use CashFusion with the Bitcoin.com wallet](https://www.reddit.com/r/btc/comments/kwz433/howto_use_cashfusion_with_the_bitcoincom_wallet/)__. This campaign extends that work by now offering an unstoppable communications network to further strenghten the MVP app.

We will continue to work with __[Corbin Fraser](https://twitter.com/maplesyrupsuckr)__ and his team at Bitcoin.com to introduce this privacy protocol to the wallet asap.

__Q1 2021 IS STILL THE GOAL!__

---

## What's next?

__liquidity. Liquidity. LIQUIDITY!__

Arguably, the biggest problem with the CashFusion network today is its liquidity. Waiting 20 minutes for a CashFusion to process is likely to be unacceptable for most users. And honestly, that's if you're lucky.

> __Did you know?__ On mobile, fusion times MUST be absoutely minimal in order to minimize battery drain and badwidth overuse, otherwise you risk actually losing users who get discouraged and uninstall the app.

Extensive CashShuffle testing confirms that shuffling can be guaranteed in 30 seconds or less. We aim to introduce the same expediency to the CashFusion network. At the end of this development process, our goal is to guarantee fusion of ANY coin 1.0 BCH or less in under 60 seconds. _(higher values are possible with additional liquidity)_

---

## BCHDevCon3 (Sept '20)

https://github.com/BCHDEVCON3/hush-your-money

This is where it all started. The concept was to deliver a CashFusion solution for the Bitcoin.com wallet using the __[Link API](https://developer.bitcoin.com/bitcoincom-link/docs/getting-started/)__. It's the event where we were first introduced to the Bitcoin.com wallet team. We now share a Slack channel that allows our two teams to collaborate in bringing this privacy protocol to your favorite mobile wallet.

[![Shomari Prince](https://i.imgur.com/hn4mZ0t.jpg)](https://lbry.tv/@BCHPlease:1/BCHDevCon3-Hush-Your-Money-Presentation:7)

_(click the image above to watch the presentation video)_

## CoinParty (Jan '21)

https://devpost.com/software/bitcoin-apps

An exciting week was spent working on the very technology that now powers the Unstoppable CashShuffle network. We still carry the momentum from that event in the work that we're doing today.

[![Unstoppable Web](https://i.imgur.com/tYGOAyg.jpg)](https://devpost.com/software/bitcoin-apps)

_(click the image above to watch the presentation video)_

---

## Credits

Special mention must be given to __[Chris Troutner](https://twitter.com/christroutner)__ and his work on delivering a working __[IPFS PubSub prototype](https://github.com/christroutner/ipfs-pubsub-prototype).__

Eternal gratitude to __[Jonald Fyookball](https://www.reddit.com/user/jonald_fyookball/)__ and __[Mark B. Lundeberg](https://twitter.com/MarkLundeberg)__ for creating the most advanced privacy protocol any Bitcoin team has delivered in the last 10 years.

---

## Contact

Please don't hesitate to reach out with comments or questions.  
s.prince@bchplease.org  
https://bchplease.org

Donate:  
__[bitcoincash:qqvl7fwcthhhntsew056t8007pw55k258vmlm053fy](https://explorer.bitcoin.com/bch/address/bitcoincash:qqvl7fwcthhhntsew056t8007pw55k258vmlm053fy)__
