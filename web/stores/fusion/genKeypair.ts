/**
 * # Returns privkey (32 bytes), pubkey (65 bytes, uncompressed), pubkey (33 bytes, compressed)
 */
export default () => {
    privkey = ecdsa.util.randrange(ecdsa.SECP256k1.order)

    P = privkey * ecdsa.SECP256k1.generator

    return (int(privkey).to_bytes(32,'big'),
            b'\x04' + int(P.x()).to_bytes(32,'big') + int(P.y()).to_bytes(32,'big'),
            bytes((2 + (P.y()&1),)) + int(P.x()).to_bytes(32,'big'),
            )
}
