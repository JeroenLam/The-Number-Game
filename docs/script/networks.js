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
function onPageLoad(Nmin, Nmax, iter, networkId)
{
    // Start with Bob (Agent 2)
    ret = find_pairs(Nmin, Nmax, iter, 2, 1);
    createNetwork(networkId, ret[0], ret[1]);
}

// Create network from html input
function setNetwork(NminVarId, NmaxVarId, iterVarId, radioAId, radioBId, transId, networkId, removedListId)
{
    // Parse random number bound
    Nmin = parseInt(document.getElementById(NminVarId).textContent);
    Nmax = parseInt(document.getElementById(NmaxVarId).textContent);
    
    // Parse number of iterations to run
    iter = parseInt(document.getElementById(iterVarId).textContent);
    // Parse Alice starts or bob starts
    startingAgent = -1;
    if (document.getElementById(radioAId).checked) 
        startingAgent = 1;
    if (document.getElementById(radioBId).checked) 
        startingAgent = 2;
    
    // Parse if we render the transitive relations
    transVal = document.getElementById(transId).checked;

    // Run simulation
    ret = find_pairs(Nmin, Nmax, iter, startingAgent, transVal);

    // Create network and render results
    createNetwork(networkId, ret[0], ret[1]);
    renderRemovedNodes(ret[2], removedListId, startingAgent);
}