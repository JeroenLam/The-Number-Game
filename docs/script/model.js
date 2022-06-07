// Javascript version of example.py

// Generate all sum options from input array
function generate_sums(candidate_pairs)
{
    // Define map to store results
    sums = new Map();
    // Loop over all pairs
    for (pair of candidate_pairs.values())
    {
        sum = pair[0] + pair[1];
        // If sum is not in map, add an empty array
        if (!sums.has(sum))
            sums.set(sum, []);
        // Add the pair to the array
        temp = sums.get(sum);
        temp.push(pair);
        sums.set(sum, temp);
    }
    return sums;
}

// Generate all product options from input array
function generate_products(candidate_pairs)
{
    // Define map to store results
    products = new Map();
    // Loop over all pairs
    for (pair of candidate_pairs.values())
    {
        product = pair[0] * pair[1];
        // If product is not in map, add an empty array
        if (!products.has(product))
            products.set(product, []);
        // Add the pair to the array
        temp = products.get(product);
        temp.push(pair);
        products.set(product, temp);
    }
    return products;
}

function find_pairs(N, iterations)
{
    // Generate all possible pairs
    candidate_pairs = new Set();
    for (let x = 1; x < N; ++x)
        for (let y = x; y < N; ++y)
            candidate_pairs.add([x, y]);
    
    // Swap between hearing from the agents every round (product or sum)
    do_not_know_product = true;

    // Compute the initial set of sums and products
    sums = generate_sums(candidate_pairs);
    products = generate_products(candidate_pairs);

    // Allocate a array to keep track of the removed nodes
    removedNodes = [];

    // Simulate 'iterations' times noting that you do not know the numbers
    for (let iter = 0; iter < iterations; ++iter)
    {
        // Compute the set of sums and products
        sums = generate_sums(candidate_pairs);
        products = generate_products(candidate_pairs);

        // Add a empty array to removedNodes array at index 'iter'
        removedNodes.push([]);

        // Check who's turn it is
        if (do_not_know_product)
        {
            // Go through products. For any product that only has a single pair,
            // we can remove those from the candidates for the next round.
            // Agent 2 (Bob) : Blue
            products.forEach(function(value, key) {
                // Check how many pairs satisfy the product
                if (value.length == 1)
                {
                    // Remove from candidate pairs 
                    removedNodes[iter].push(value[0]);
                    candidate_pairs.delete(value[0]);
                }
            });
            do_not_know_product = false
        }
        else
        {
            // Go through sums. For any product that only has a single pair,
            // we can remove those from the candidates for the next round.
            // Agent 1 (Alice) : red
            sums.forEach(function(value, key) {
                // Check how many pairs satisfy the product
                if (value.length == 1)
                {
                    // Remove from candidate pairs
                    removedNodes[iter].push(value[0]);
                    candidate_pairs.delete(value[0]);
                }
            });
            do_not_know_product = true
        }
    }

    // Construct a nodes and edges array from candidate pairs, sums and products
    node_id = 1;
    nodes = [];
    node_lookup = new Map();


    // Convert all potential pairs into nodes
    candidate_pairs.forEach (function(pair) {
        // Create node in network
        nodes.push({
            'id':    node_id,
            'label': '(' + pair[0] + ',' + pair[1] + ')'
        });
        // Add node to lookup table to retreive id
        node_lookup.set(pair, node_id);
        ++node_id;
    });

    edges = [];

    console.log(sums);
    console.log(products);

    // Convert all sums relations into edges of agent 1
    sums.forEach (function(arr, key) {
        baseNode = arr[0];
        for (let idx = 1, max = arr.length; idx < max; ++idx)
        {
            newNode = arr[idx];
            edges.push({
                'from': node_lookup.get(baseNode),
                'to':   node_lookup.get(newNode),
                'color': 'rgb(255,0,0)'
            });
            baseNode = newNode;
        }
    });

    // Convert all products relations into edges of agent 2
    products.forEach (function(arr, key) {
        baseNode = arr[0];
        for (let idx = 1, max = arr.length; idx < max; ++idx)
        {
            newNode = arr[idx];
            edges.push({
                'from': node_lookup.get(baseNode),
                'to':   node_lookup.get(newNode),
                'color': 'rgb(0,0,255)'
            });
            baseNode = newNode;
        }
    });
    return [nodes, edges, removedNodes];
}

function renderRemovedNodes(removedNodes, removedListId)
{
    const element = document.getElementById(removedListId);
    element.innerHTML = "";
    // Create output string by looping over elements
    for (let idx = 0, max = removedNodes.length; idx < max; ++idx)
    {
        text = ""
        if (idx % 2 == 0)
        {
            text += "<div class='bobRemoved'>";

            text += "<p>" + (idx + 1) + ") Bob: I do not know the numbers:</p>";
            removedNodes[idx].forEach (function(pair) {
                text += "(" + pair[0] + "," + pair[1] + "), ";
            });

            text += "</div>";
        }
        else
        {
            text += "<div class='aliceRemoved'>";
            text += "<p>" + (idx + 1) + ") Alice: I do not know the numbers:</p>";
            removedNodes[idx].forEach (function(pair) {
                text += "(" + pair[0] + "," + pair[1] + "), ";
            });
            text += "</div>";
        }
        element.innerHTML += text;
    }
}