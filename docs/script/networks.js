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
    ret = find_pairs(Nmin, Nmax, iter, 2, 1, 1, 2);
    createNetwork(networkId, ret[0], ret[1]);
}

// Create network from html input
function setNetwork(NminVarId, NmaxVarId, iterVarId, startingAgentID, opAId, opBId, transId, networkId, removedListId, renderModelId)
{
    // Parse random number bound
    Nmin = parseInt(document.getElementById(NminVarId).textContent);
    Nmax = parseInt(document.getElementById(NmaxVarId).textContent);
    
    // Parse number of iterations to run
    iter = parseInt(document.getElementById(iterVarId).textContent);

    // Parse Alice starts or bob starts
    startingAgent = parseInt(document.getElementById(startingAgentID).value);

    // Parse operation enum Alice
    opA = parseInt(document.getElementById(opAId).value);

    // Parse operation enum Bob
    opB = parseInt(document.getElementById(opBId).value);
    
    // Parse if we render the transitive relations
    transVal = document.getElementById(transId).checked;

    // Run simulation
    ret = find_pairs(Nmin, Nmax, iter, startingAgent, transVal, opA, opB);

    // Parse if we want to render the model
    renderModel = document.getElementById(renderModelId).checked;

    // Create network and render results
    if (renderModel)
        createNetwork(networkId, ret[0], ret[1]);
    renderRemovedNodes(ret[2], removedListId, startingAgent);
}

// Create network from variable input
// Nmin : Inclusive lower bound of random numbers considered
// Nmax : Exclusive upper bound of random numbers considered
// iter : Number of 'I do not know' anouncements considered
// startingAgent : (1,Alice) (2,Bob)
// transBool : Indicates if we want to render the transitive relations
// networkId : htmlID of the div to include the rendered network in
function drawNetwork(Nmin, Nmax, iter, startingAgent, transBool, networkId)
{   
    // Run simulation
    ret = find_pairs(Nmin, Nmax, iter, startingAgent, transBool, 1, 2);

    // Create network and render results
    createNetwork(networkId, ret[0], ret[1]);
}