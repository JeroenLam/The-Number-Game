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
function setNetwork(NminVarId, NmaxVarId, iterVarId, radioAId, radioBId, transId, networkId, removedListId, renderModelId)
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
    ret = find_pairs(Nmin, Nmax, iter, startingAgent, transBool);

    // Create network and render results
    createNetwork(networkId, ret[0], ret[1]);
}

function drawDemoExAlice(networkId)
{
    nodes = [
        {
            'id': 18,
            'label': '(1,8)',
            'shape': 'box',
        },{
            'id': 24,
            'label': '(2,4)',
            'shape': 'circle',
        },{
            'id': 33,
            'label': '(3,3)',
            'shape': 'circle',
            'opacity': 0.3,
        },{
            'id': 19,
            'label': '(1,9)',
            'shape': 'circle',
            'opacity': 0.3,
        },{
            'id': 46,
            'label': '(4,6)',
            'shape': 'circle',
            'opacity': 0.3,
        },{
            'id': 38,
            'label': '(3,8)',
            'shape': 'circle',
            'opacity': 0.3,
        },{
            'id': 29,
            'label': '(2,9)',
            'shape': 'circle',
        },{
            'id': 36,
            'label': '(3,6)',
            'shape': 'circle',
        }
    ];
    edges = [
        {
            'from': 18,
            'to': 24,
            'color': 'rgb(0,0,255)',
        },{
            'from': 24,
            'to': 33,
            'color': 'rgb(255,0,0)',
        },{
            'from': 33,
            'to': 19,
            'color': 'rgb(0,0,255)',
        },{
            'from': 19,
            'to': 46,
            'color': 'rgb(255,0,0)',
        },{
            'from': 46,
            'to': 38,
            'color': 'rgb(0,0,255)',
        },{
            'from': 38,
            'to': 29,
            'color': 'rgb(255,0,0)',
        },{
            'from': 29,
            'to': 36,
            'color': 'rgb(0,0,255)',
        },{
            'from': 36,
            'to': 18,
            'color': 'rgb(255,0,0)',
        }
    ];


    // Create network and render results
    createNetwork(networkId, nodes, edges);
}

function drawDemoExBob(networkId)
{
    nodes = [
        {
            'id': 18,
            'label': '(1,8)',
            'shape': 'box',
        },{
            'id': 24,
            'label': '(2,4)',
            'shape': 'circle',
        },{
            'id': 33,
            'label': '(3,3)',
            'shape': 'circle',
        },{
            'id': 19,
            'label': '(1,9)',
            'shape': 'circle',
            'opacity': 0.3,
        },{
            'id': 46,
            'label': '(4,6)',
            'shape': 'circle',
            'opacity': 0.3,
        },{
            'id': 38,
            'label': '(3,8)',
            'shape': 'circle',
            'opacity': 0.3,
        },{
            'id': 29,
            'label': '(2,9)',
            'shape': 'circle',
            'opacity': 0.3,
        },{
            'id': 36,
            'label': '(3,6)',
            'shape': 'circle',
        }
    ];
    edges = [
        {
            'from': 18,
            'to': 24,
            'color': 'rgb(0,0,255)',
        },{
            'from': 24,
            'to': 33,
            'color': 'rgb(255,0,0)',
        },{
            'from': 33,
            'to': 19,
            'color': 'rgb(0,0,255)',
        },{
            'from': 19,
            'to': 46,
            'color': 'rgb(255,0,0)',
        },{
            'from': 46,
            'to': 38,
            'color': 'rgb(0,0,255)',
        },{
            'from': 38,
            'to': 29,
            'color': 'rgb(255,0,0)',
        },{
            'from': 29,
            'to': 36,
            'color': 'rgb(0,0,255)',
        },{
            'from': 36,
            'to': 18,
            'color': 'rgb(255,0,0)',
        }
    ];


    // Create network and render results
    createNetwork(networkId, nodes, edges);
}