export default (last_hash, round_pubkey, round_time, all_commitments, all_components) => {
    return listhash([b'Cash Fusion Round',
                     last_hash,
                     round_pubkey,
                     round_time.to_bytes(8,'big'),
                     listhash(all_commitments),
                     listhash(all_components),
                     ])
}
