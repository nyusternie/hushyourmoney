export default (tier, covert_domain_b, covert_port, covert_ssl, begin_time) => {
    return listhash([b'Cash Fusion Session',
                     Protocol.VERSION,
                     tier.to_bytes(8,'big'),
                     covert_domain_b,
                     covert_port.to_bytes(4,'big'),
                     b'\x01' if covert_ssl else b'\0',
                     begin_time.to_bytes(8,'big'),
                     ])
}
