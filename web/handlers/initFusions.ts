/* Initialize globals. */
let fusionsDb

const setupGlobalDb = async (_fusionsDb) => {
    fusionsDb = _fusionsDb

    fusionsDb['4e9654f9-3de9-4f9a-8169-3834f40847f5'] = {
        tierid: 270000,
        guests: 5,
        inputs: 0,
        outputs: 0,
        createdAt: 1723245503,
        updatedAt: 1723245503,
    }

    fusionsDb['6f765750-2267-4601-87be-80a416143a28'] = {
        tierid: 820000,
        guests: 20,
        inputs: 36,
        outputs: 68,
        createdAt: 1723245503,
        updatedAt: 1723245503,
        completedAt: 1723245503,
        txid: '12285e89b8aed041372f8fdfa2a057b41f37ea4fa4b4757f3c9cb3ac86623ddd',
    }

    fusionsDb['4eff6293-60e9-4a5a-83de-4b91da1f7de4'] = {
        tierid: 1800000,
        guests: 22,
        inputs: 51,
        outputs: 181,
        createdAt: 1723245818,
        updatedAt: 1723245818,
        complatedAt: 1723245818,
        txid: 'e05a9d2dd56f7e7c0158e176131d43bbfc39ea7a8855c6913ddb08e851439c60',
    }
}

const init = async () => {
    setTimeout(() => {
        console.log('ADD ONE MORE', fusionsDb)
        fusionsDb['af371828-7199-4e4e-baca-bcd11d01edda'] = {
            tierid: 5600000,
            guests: 2,
            inputs: 0,
            outputs: 0,
            createdAt: 1723245503,
            updatedAt: 1723245503,
        }

    }, 10000)
}

/**
 * Initialize Fusions
 */
export default async (_fusionsDb) => {
    /* Setup global database. */
    setupGlobalDb(_fusionsDb)

    /* Initialize. */
    init()
}
