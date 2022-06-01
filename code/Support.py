# Define the operation on the items used by agent 1
def agent1_op(item1, item2):
    return item1 + item2

# Define the opetation on the items used by agent 2
def agent2_op(item1, item2):
    return item1 * item2


# Function to generate the possibility set for the sum agent
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

# Function to generate the possibility set of the product agent
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