/**
 * """ Validate a proof as far as we can without checking blockchain.

    Returns the deserialized InputComponent for further checking, if it was an
    input. """
 */
export default (proofblob, commitment, all_components, bad_components, component_feerate) => {
    msg = proto_strict_parse(pb.Proof(), proofblob)

    try:
        componentblob = all_components[msg.component_idx]
    except IndexError:
        raise ValidationError("component index out of range")

    check(msg.component_idx not in bad_components, "component in bad list")

    # these deserializations should always succeed since we've already done them before.
    comp = pb.Component()
    comp.ParseFromString(componentblob)
    assert comp.IsInitialized()

    check(len(msg.salt) == 32, "salt wrong length")
    check(sha256(msg.salt) == comp.salt_commitment, "salt commitment mismatch")
    check(sha256(msg.salt + componentblob) == commitment.salted_component_hash, "salted component hash mismatch")

    contrib = component_contrib(comp, component_feerate)

    P_committed = commitment.amount_commitment
    claimed_commit = Protocol.PEDERSEN.commit(contrib, int.from_bytes(msg.pedersen_nonce,'big'))
    check(P_committed == claimed_commit.P_uncompressed, "pedersen commitment mismatch")

    if comp.WhichOneof('component') == 'input':
        return comp.input
    else:
        return None
}
