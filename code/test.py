N = 100


# Helper functions to regenerate the sums/products data structures every round.
# Not optimal but hey this is for fun.
def generate_sums(candidate_pairs):
    sums = {}
    for tuple_pair in candidate_pairs:
        (i, j) = tuple_pair
        sum = i + j
        if sum not in sums:
            sums[sum] = [tuple_pair]
        else:
            sums[sum].append(tuple_pair)
    return sums


def generate_products(candidate_pairs):
    products = {}
    for tuple_pair in candidate_pairs:
        (i, j) = tuple_pair
        product = i * j
        if product not in products:
            products[product] = [tuple_pair]
        else:
            products[product].append(tuple_pair)
    return products


def find_pairs():
    # First, generate all possible pairs from (1, 1) to (N-1, N-1).
    candidate_pairs = set()
    for i in range(1, N):
        for j in range(i, N):
            candidate_pairs.add((i, j))

    # Swap between hearing from Peter or Sandy every round (product or sum)
    do_not_know_product = True
    round = 1
    while True:
        sums = generate_sums(candidate_pairs)
        products = generate_products(candidate_pairs)
        # First, check if there's a single product left with one pair.
        if round == 15:
            for product in products:
                if len(products[product]) == 1:
                    print('Peter: I do know the numbers')
                    print(products[product][0])
                    return

        if do_not_know_product:
            print('Peter: I don\'t know the numbers')
            # Go through products. For any product that only has a single pair,
            # we can remove those from the candidates for the next round.
            for product in products:
                if len(products[product]) == 1:
                    tuple_pair = products[product][0]
                    # Remove from candidates.
                    candidate_pairs.remove(tuple_pair)
            do_not_know_product = False
        else:
            print('Sandy: I don\'t know the numbers')
            # Go through sums. For any product that only has a single pair,
            # we can remove those from the candidates for the next round.
            for sum in sums:
                if len(sums[sum]) == 1:
                    tuple_pair = sums[sum][0]
                    # Remove from candidates.
                    candidate_pairs.remove(tuple_pair)
            do_not_know_product = True
        round += 1


if __name__ == '__main__':
    find_pairs()
