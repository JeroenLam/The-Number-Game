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



def find_pairs(N, debug_toggle = 0):
    # First, generate all possible pairs from (1, 1) to (N-1, N-1).
    candidate_pairs = set()
    for i in range(1, N):
        for j in range(i, N):
            candidate_pairs.add((i, j))

    # Swap between hearing from Peter or Sandy every round (product or sum)
    do_not_know_product = True
    number_removed = 0
    step = 1
    total_removed = 0
    total_elements = len(candidate_pairs)
    while True:
        sums = generate_sums(candidate_pairs)
        products = generate_products(candidate_pairs)
        number_removed = 0

        if do_not_know_product:
            # Go through products. For any product that only has a single pair,
            # we can remove those from the candidates for the next round.
            for product in products:
                if len(products[product]) == 1:
                    tuple_pair = products[product][0]
                    # Remove from candidates.
                    if debug_toggle:
                        print(tuple_pair)
                    candidate_pairs.remove(tuple_pair)
                    number_removed += 1
            if debug_toggle:
                print(f'Step {step}: Peter removes {number_removed} elements:')
            do_not_know_product = False
        else:
            # Go through sums. For any product that only has a single pair,
            # we can remove those from the candidates for the next round.
            for sum in sums:
                if len(sums[sum]) == 1:
                    tuple_pair = sums[sum][0]
                    # Remove from candidates.
                    if debug_toggle:
                        print(tuple_pair)
                    candidate_pairs.remove(tuple_pair)
                    number_removed += 1
            if debug_toggle:
                print(f'Step {step}: Sandy removes {number_removed} elements:')
            do_not_know_product = True

        total_removed += number_removed

        if number_removed == 0:
            if debug_toggle:
                print(f'Removed a total of {total_removed} elements')
                print(f'{len(candidate_pairs)} / {total_elements} elements left that do not converge')
                print(candidate_pairs)
            else:
                print(f'{N}, {total_removed}, {len(candidate_pairs)}, {total_elements}, {step}')
            return
        step += 1

if __name__ == '__main__':
    N = 100

    node_id = 1
    nodes = []
    node_lookup = {}

    edges = []
    edge_col_a1 = "rgb(255,0,0)"
    edge_col_a2 = "rgb(0,0,255)"

    candidate_pairs = set()
    for i in range(1, N):
        for j in range(i, N):
            candidate_pairs.add((i, j))
            label = f'({i},{j})'
            nodes.append({"id": str(node_id), "label": label})
            node_lookup[(i,j)] = node_id
            node_id += 1

    # Agent 1
    sums = generate_sums(candidate_pairs)
    for element in sums:
        # # Add reflexive arrows
        # for node in sums[element]:
        #     nodeId = node_lookup[node]
        #     edges.append({"from": nodeId, "to": nodeId, "color": edge_col_a1})
        
        # Connect all nodes of the same class
        tempNodes = sums[element]
        size = len(tempNodes)
        baseNodeId = node_lookup[tempNodes[0]]
        for idx in range(1, size):
            newNodeId = node_lookup[tempNodes[idx]]
            edges.append({"from": baseNodeId,
                          "to": newNodeId,
                          "color": edge_col_a1})
            baseNodeId = newNodeId


    # Agent 2
    products = generate_products(candidate_pairs)
    for element in products:
        # # Add reflexive arrows
        # for node in products[element]:
        #     nodeId = node_lookup[node]
        #     edges.append({"from": nodeId, "to": nodeId, "color": edge_col_a2})
        
        # Connect all nodes of the same class
        tempNodes = products[element]
        size = len(tempNodes)
        baseNodeId = node_lookup[tempNodes[0]]
        for idx in range(1, size):
            newNodeId = node_lookup[tempNodes[idx]]
            edges.append({"from": baseNodeId, "to": newNodeId, "color": edge_col_a2})
            baseNodeId = newNodeId

    print(nodes)
    print(edges)
