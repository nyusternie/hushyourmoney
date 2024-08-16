export default (privkey) => {
    P = int.from_bytes(privkey, 'big') * ecdsa.SECP256k1.generator

    return (b'\x04' + int(P.x()).to_bytes(32,'big') + int(P.y()).to_bytes(32,'big'),
            bytes((2 + (P.y()&1),)) + int(P.x()).to_bytes(32,'big'),
            )
}
