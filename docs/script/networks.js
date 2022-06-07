// create a network
function createNetwork(elementId, nodes, edges)
{
    var container = document.getElementById(elementId);
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};
    var network = new vis.Network(container, data, options);
}


// On page load function
function onPageLoad(N, iter, networkId)
{
    // Start with Bob (Agent 2)
    ret = find_pairs(N, iter, 2);
    createNetwork(networkId, ret[0], ret[1]);
}

// Create network from html input
function setNetwork(NVarId, iterVarId, networkId, removedListId)
{
    // Parse random number bound
    N = parseInt(document.getElementById(NVarId).textContent);
    // Parse number of iterations to run
    iter = parseInt(document.getElementById(iterVarId).textContent);
    // Parse Alice starts or bob starts
    startingAgent = ;
    
    // Run simulation
    ret = find_pairs(N, iter, startingAgent);

    // Create network and render results
    createNetwork(networkId, ret[0], ret[1]);
    console.log(ret);
    renderRemovedNodes(ret[2], removedListId, startingAgent);
}