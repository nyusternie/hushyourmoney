/* Import modules. */
import moment from 'moment'

/* Initialize globals. */
let fusionsDb

/**
 * Initialize
 */
const init = async (_fusionsDb) => {
    fusionsDb = _fusionsDb

    fusionsDb['4fa84224-be56-49ba-830a-fa3b6774eb01'] = {
        tierid: 888000,
        sessionid: null,
        progress: 0.1,
        numGuests: 0,
        numInputs: 0,
        numOutputs: 0,
        guests: {},
        inputs: {},
        outputs: {},
        rawTx: null,
        txid: null,
        createdAt: moment().unix(),
        updatedAt: moment().unix(),
        completedAt: null,
    }

    fusionsDb['6f765750-2267-4601-87be-80a416143a28'] = {
        tierid: 820000,
        sessionid: '61c13c42-a961-4ad5-8f9b-f71bea2c343c',
        progress: 100.0,
        numGuests: 20,
        numInputs: 36,
        numOutputs: 68,
        guests: {},
        inputs: {},
        outputs: {},
        rawTx: '010000000196ca5d62049e3a87a42262d424b3f6074f098ed585a768cffc8466f5aa17531c020000006441e02048ad5c08672ea824765d812f81e7d2cac73c9e4965ba1627332bbaadf0a281d4c8863a4a7664b6a69bfe6d30b75b08ba115bd85ae5448901d6295f4ca492412102bd71022b471ff54d33d0730f9ce72758832a6c2e0cab035bdc5ace4df48f2fa6ffffffff032a150000000000001976a9148f480dcea25edfab38be25d687bf4807b1065ca888ac970a0000000000001976a9147544c540698887f774f4ed3764e706a7b23e0b2088accbc89305000000001976a9145599439512e36aabca88aefd744a8506096c6cb888ac00000000',
        txid: '01c5bb298e4ac2d92a14600a6ae5b4f2a0a146ccefaaad9ca8e3c01cfee0a80c',
        createdAt: 1723245503,
        updatedAt: 1723245503,
        completedAt: 1723245503,
    }

    fusionsDb['4eff6293-60e9-4a5a-83de-4b91da1f7de4'] = {
        tierid: 1800000,
        sessionid: 'c759b697-9c24-4f24-bc72-d3c08abd20d1',
        progress: 100.0,
        numGuests: 22,
        numInputs: 51,
        numOutputs: 181,
        guests: {},
        inputs: {},
        outputs: {},
        rawTx: '01000000011964909d679ca68e61a815d38073814f07aebdc0a3c8402ee11fde4ad3a10d61020000006b483045022100a0f4f5193478a110917ae20485e1b1862e0e9d6f21b67e68bc42e44631d2644a0220687713f4ffa9ef95994d55a94b7d4a802159e4c5d711dd16cc8bd87cb2aef458412103c2ceaaac7c644d0c36a2fd8763398107beff5b563468b61cfdffb75beb5d73f1ffffffff067bb13a00000000001976a9143333dbca3f997aef9224be3d2a034b507e52e03788acb5e0b104000000001976a9141cc8013ec164298b6ef743300d32e37754d6a98888acf0e0b104000000001976a9141d5c4baeee3088a0974c040a1b8e991b42fe731f88acfbe0b104000000001976a91458acf0fdf18a118f4077a5a1321c42f696303d6f88acfae0b104000000001976a91443e2bfe4a8cc4dac7877b4f06d5f0162137fc56a88acbfdfb104000000001976a9144fb80207786cf688b4c3f60736973e35f4c7c9ec88ac00000000',
        txid: '05f98e307d97e5ed7df464b29af2e911218a268f46c8ad7b2497aa13c7544f12',
        createdAt: 1723245818,
        updatedAt: 1723245818,
        completedAt: 1723245818,
    }
    console.log('FUSIONS DB', fusionsDb)
}


/**
 * Initialize Fusions
 */
export default async (_fusionsDb) => {
    /* Initialize. */
    init(_fusionsDb)
}
