/**
 * """ Make up to `max_number` random output values, chosen using exponential
    distribution function. All parameters should be positive `int`s.

    None can be returned for expected types of failures, which will often occur
    when the input_amount is too small or too large, since it becomes uncommon
    to find a random assortment of values that satisfy the desired constraints.

    On success, this returns a list of length 1 to max_count, of non-negative
    integer values that sum up to exactly input_amount.

    The returned values will always exactly sum up to input_amount. This is done
    by renormalizing them, which means the actual effective `scale` will vary
    depending on random conditions.

    If `allow_extra_change` is passed (this is abnormal!) then this may return
    max_count+1 outputs; the last output will be the leftover change if all
    max_counts outputs were exhausted.
    """
 */
export default (rng, input_amount, scale, offset, max_count, allow_extra_change=False) => {
    if input_amount < offset:
        return None

    lambd = 1./scale

    remaining = input_amount
    values = []  # list of fractional random values without offset
    for _ in range(max_count+1):
        val = rng.expovariate(lambd)
        # A ceil here makes sure rounding errors won't sometimes put us over the top.
        # Provided that scale is much larger than 1, the impact is negligible.
        remaining -= ceil(val) + offset
        if remaining < 0:
            break
        values.append(val)
    else:
        if allow_extra_change:
            result = [(round(v) + offset) for v in values[:-1]]
            result.append(input_amount - sum(result))
            return result
        # Fail because we would need too many outputs
        # (most likely, scale was too small)
        return None
    assert len(values) <= max_count

    if not values:
        # Our first try put us over the limit, so we have nothing to work with.
        # (most likely, scale was too large)
        return None

    desired_random_sum = input_amount - len(values) * offset
    assert desired_random_sum >= 0

    # Now we need to rescale and round the values so they fill up the desired.
    # input amount exactly. We perform rounding in cumulative space so that the
    # sum is exact, and the rounding is distributed fairly.
    cumsum = list(itertools.accumulate(values))
    rescale = desired_random_sum / cumsum[-1]
    normed_cumsum = [round(rescale * v) for v in cumsum]
    assert normed_cumsum[-1] == desired_random_sum

    differences = ((a - b) for a,b in zip(normed_cumsum, itertools.chain((0,),normed_cumsum)))
    result = [(offset + d) for d in differences]
    assert sum(result) == input_amount

    return result
}
