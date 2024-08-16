/**
 * Generate a uniform number in the range [0 ... `num_positions` - 1] by hashing
    `seed` (bytes) and `counter` (int). Note that proper uniformity requires that
    num_positions should be much less than 2**64.

    (see https://lemire.me/blog/2016/06/27/a-fast-alternative-to-the-modulo-reduction/)
    """
 */
export default (seed, num_positions, counter) => {
    int64 = int.from_bytes(sha256(seed + counter.to_bytes(4, 'big'))[:8], 'big')

    return (int64 * num_positions) >> 64
}
