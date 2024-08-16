/**
 * """ Validate a BlameProof. Can:
    - return string indicating why the accused (src) is guilty
    - raise ValidationError, if the accuser (dest) was blatantly wrong.
    - return input component for further investigation, if everything internal checked out.
    """
 */
export default (blame, encproof, src_commit_blob, dest_commit_blob, all_components, bad_components, component_feerate) => {
    dest_commit = pb.InitialCommitment()
    dest_commit.ParseFromString(dest_commit_blob)
    dest_pubkey = dest_commit.communication_key

    src_commit = pb.InitialCommitment()
    src_commit.ParseFromString(src_commit_blob)

    decrypter = blame.WhichOneof('decrypter')
    if decrypter == 'privkey':
        privkey = blame.privkey
        check(len(privkey) == 32, 'bad blame privkey')
        pubU, pubC = pubkeys_from_privkey(privkey)
        check(dest_commit.communication_key == pubC, 'bad blame privkey')
        try:
            encrypt.decrypt(encproof, privkey)
        except encrypt.DecryptionFailed:
            # good! the blame was telling us about decryption failure and they were right.
            return 'undecryptable'
        raise ValidationError('blame gave privkey but decryption worked')
    elif decrypter != 'session_key':
        raise ValidationError('unknown blame decrypter')
    key = blame.session_key
    check(len(key) == 32, 'bad blame session key')
    try:
        proofblob = encrypt.decrypt_with_symmkey(encproof, key)
    except encrypt.DecryptionFailed:
        raise ValidationError('bad blame session key')

    try:
        inpcomp = validate_proof_internal(proofblob, src_commit, all_components, bad_components, component_feerate)
    except ValidationError as e:
        # good! the blame told us something was wrong, and it was right
        return e.args[0]

    # OK so the proof was good and internally consistent, that means the only
    # reason they should be sending us a blame is if it's an inconsistency with
    # blockchain.
    if not blame.need_lookup_blockchain:
        raise ValidationError('blame indicated internal inconsistency, none found!')

    if inpcomp is None:
        raise ValidationError('blame indicated blockchain error on a non-input component')

    return inpcomp
}
