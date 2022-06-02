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
    ret = find_pairs(N, iter);
    createNetwork(networkId, ret[0], ret[1]);
}

// Create network from html input
function setNetwork(NVarId, iterVarId, networkId, removedListId)
{
    N = parseInt(document.getElementById(NVarId).textContent);
    iter = parseInt(document.getElementById(iterVarId).textContent);
    ret = find_pairs(N, iter);
    createNetwork(networkId, ret[0], ret[1]);
    console.log(ret);
    renderRemovedNodes(ret[2], removedListId);
}