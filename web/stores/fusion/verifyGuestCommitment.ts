export default (msg, min_excess_fee, max_excess_fee, num_components) => {
    # validate a PlayerCommit message; return the parsed InitialCommitments
    check(len(msg.initial_commitments) == num_components, "wrong number of component commitments")
    check(len(msg.blind_sig_requests) == num_components, "wrong number of blind sig requests")

    check(min_excess_fee <= msg.excess_fee <= max_excess_fee, "bad excess fee")
    check(len(msg.random_number_commitment) == 32, "bad random commit")
    check(len(msg.pedersen_total_nonce) == 32, "bad nonce")
    check(all(len(r) == 32 for r in msg.blind_sig_requests), "bad blind sig request")

    commit_messages = []
    for cblob in msg.initial_commitments:
        cmsg = proto_strict_parse(pb.InitialCommitment(), cblob)
        check(len(cmsg.salted_component_hash) == 32, "bad salted hash")
        P = cmsg.amount_commitment
        check(len(P) == 65 and P[0] == 4, "bad commitment point")
        check(len(cmsg.communication_key) == 33 and cmsg.communication_key[0] in (2,3), "bad communication key")
        commit_messages.append(cmsg)

    # Verify pedersen commitment
    try:
        pointsum = pedersen.add_points([m.amount_commitment for m in commit_messages])
        claimed_commit = Protocol.PEDERSEN.commit(msg.excess_fee, int.from_bytes(msg.pedersen_total_nonce,'big'))
    except Exception as e:
        raise ValidationError("pedersen commitment verification error")
    check(pointsum == claimed_commit.P_uncompressed, "pedersen commitment mismatch")

    return commit_messages
}
