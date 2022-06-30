// Funtion to pick corresponding generator
function generate_map(candidate_pairs, operation)
{
    switch(operation) {
        case 1:
            map = generate_sums(candidate_pairs);
            break;
        case 2:
            map = generate_products(candidate_pairs);
            break;
        case 3:
            map = generate_sqr_add(candidate_pairs);
            break;
        case 4:
            map = generate_abs_sub(candidate_pairs);
            break;
        case 5: 
            map = generated_mod_add(candidate_pairs);
            break;
        case 6: 
            map = generated_mod_mult(candidate_pairs);
            break;  
        default:
            map = new Map();
    }
    return map;
}

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

// Generate all additions of squares from input array
function generate_sqr_add(candidate_pairs)
{
    // Define map to store results
    products = new Map();
    // Loop over all pairs
    for (pair of candidate_pairs.values())
    {
        product = (pair[0]*pair[0]) + (pair[1]*pair[1]);
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

// Generate all absolute values of subtractions from input array
function generate_abs_sub(candidate_pairs)
{
    // Define map to store results
    products = new Map();
    // Loop over all pairs
    for (pair of candidate_pairs.values())
    {
        product = Math.abs(pair[0] - pair[1]);
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

// Generate all sums mod 6 from input array
function generated_mod_add(candidate_pairs)
{
    // Define map to store results
    products = new Map();
    // Loop over all pairs
    for (pair of candidate_pairs.values())
    {
        product = (pair[0] + pair[1]) % 6;
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

// Generate products mod 6 from input array
function generated_mod_mult(candidate_pairs)
{
    // Define map to store results
    products = new Map();
    // Loop over all pairs
    for (pair of candidate_pairs.values())
    {
        product = (pair[0] * pair[1]) % 6;
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

function find_pairs(Nmin, Nmax, iterations, startingAgent, transTogle, opA, opB)
{
    // Generate all possible pairs
    candidate_pairs = new Set();
    for (let x = Nmin; x < Nmax; ++x)
        for (let y = x; y < Nmax; ++y)
            candidate_pairs.add([x, y]);
    
    totalNodes = candidate_pairs.size;
            
    // Swap between hearing from the agents every round (product or sum)
    if (startingAgent == 1) // Alice
        turn_bob = false;
    if (startingAgent == 2) // Bob
        turn_bob = true;

    // Compute the initial set of sums and products
    set_A = generate_map(candidate_pairs, opA);
    set_B = generate_map(candidate_pairs, opB);

    // Allocate a array to keep track of the removed nodes
    removedNodes = [];

    // Simulate 'iterations' times noting that you do not know the numbers
    for (let iter = 0; iter < iterations; ++iter)
    {
        
        // Add a empty array to removedNodes array at index 'iter'
        removedNodes.push([]);
        
        // Check who's turn it is
        if (turn_bob)
        {
            // Go through set_B. For any product that only has a single pair,
            // we can remove those from the candidates for the next round.
            // Agent 2 (Bob) : Blue
            set_B.forEach(function(value, key) {
                // Check how many pairs satisfy the product
                if (value.length == 1)
                {
                    // Remove from candidate pairs 
                    removedNodes[iter].push(value[0]);
                    candidate_pairs.delete(value[0]);
                }
            });
            turn_bob = false
        }
        else
        {
            // Go through set_A. For any product that only has a single pair,
            // we can remove those from the candidates for the next round.
            // Agent 1 (Alice) : red
            set_A.forEach(function(value, key) {
                // Check how many pairs satisfy the product
                if (value.length == 1)
                {
                    // Remove from candidate pairs
                    removedNodes[iter].push(value[0]);
                    candidate_pairs.delete(value[0]);
                }
            });
            turn_bob = true
        }

        // Compute the set of set_A and set_B
        set_A = generate_map(candidate_pairs, opA);
        set_B = generate_map(candidate_pairs, opB);
    }

    // Construct a nodes and edges array from candidate pairs, set_A and set_B
    node_id = 1;
    nodes = [];
    node_lookup = new Map();


    // Convert all potential pairs into nodes
    candidate_pairs.forEach (function(pair) {
        // Create node in network
        nodes.push({
            'id':    node_id,
            'label': '(' + pair[0] + ',' + pair[1] + ')',
            'shape': 'circle'
        });
        // Add node to lookup table to retreive id
        node_lookup.set(pair, node_id);
        ++node_id;
    });

    edges = [];

    // ==============================================================
    // No transitive relations
    // ==============================================================
    if (transTogle == 0)
    {
        // Convert all set_A relations into edges of agent 1
        set_A.forEach (function(arr, key) {
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
        // Convert all set_B relations into edges of agent 2
        set_B.forEach (function(arr, key) {
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
    }

    // ==============================================================
    // Transitive relations
    // ==============================================================
    else
    {
        // Convert all set_A relations into edges of agent 1
        set_A.forEach (function(arr, key) {
            for (let idx1 = 0; idx1 < arr.length; ++idx1){
                for (let idx2 = idx1 + 1; idx2 < arr.length; ++idx2){
                    edges.push({
                        'from': node_lookup.get(arr[idx1]),
                        'to':   node_lookup.get(arr[idx2]),
                        'color': 'rgb(255,0,0)'
                    });
                }
            }
        });
        // Convert all set_B relations into edges of agent 2
        set_B.forEach (function(arr, key) {
            for (let idx1 = 0; idx1 < arr.length; ++idx1){
                for (let idx2 = idx1 + 1; idx2 < arr.length; ++idx2){
                    edges.push({
                        'from': node_lookup.get(arr[idx1]),
                        'to':   node_lookup.get(arr[idx2]),
                        'color': 'rgb(0,0,255)'
                    });
                }
            }
        });
    }


    return [nodes, edges, removedNodes, totalNodes];
}

function renderRemovedNodes(removedNodes, removedListId, startingAgent, totalNodes)
{
    const element = document.getElementById(removedListId);
    element.innerHTML = "";

    removedCount = 0;
    // Create output string by looping over elements
    for (let idx = 0, max = removedNodes.length; idx < max; ++idx)
    {
        removedCount += removedNodes[idx].length;
        text = ""
        if ((idx + startingAgent) % 2 == 0)
        {
            text += "<div class='bobRemoved'>";

            text += "<p>" + (idx + 1) + ") Bob: I do not know the numbers: (removed: " + removedNodes[idx].length + ", Left: " + (totalNodes - removedCount) + "/" + totalNodes + ")</p>";
            removedNodes[idx].forEach (function(pair) {
                text += "(" + pair[0] + "," + pair[1] + "), ";
            });

            text += "</div>";
        }
        else
        {
            text += "<div class='aliceRemoved'>";
            text += "<p>" + (idx + 1) + ") Alice: I do not know the numbers: (removed: " + removedNodes[idx].length + ", Left: " + (totalNodes - removedCount) + "/" + totalNodes + ")</p>";
            removedNodes[idx].forEach (function(pair) {
                text += "(" + pair[0] + "," + pair[1] + "), ";
            });
            text += "</div>";
        }
        element.innerHTML += text;
    }
}