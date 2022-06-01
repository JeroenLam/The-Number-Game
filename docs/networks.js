var nodes = new vis.DataSet(
    [{'id': '1', 'label': '(1,1)'}, {'id': '2', 'label': '(1,2)'}, {'id': '3', 'label': '(1,3)'}, {'id': '4', 'label': '(1,4)'}, {'id': '5', 'label': '(1,5)'}, {'id': '6', 'label': '(1,6)'}, {'id': '7', 'label': '(1,7)'}, {'id': '8', 'label': '(1,8)'}, {'id': '9', 'label': '(1,9)'}, {'id': '10', 'label': '(2,2)'}, {'id': '11', 'label': '(2,3)'}, {'id': '12', 'label': '(2,4)'}, {'id': '13', 'label': '(2,5)'}, {'id': '14', 'label': '(2,6)'}, {'id': '15', 'label': '(2,7)'}, {'id': '16', 'label': '(2,8)'}, {'id': '17', 'label': '(2,9)'}, {'id': '18', 'label': '(3,3)'}, {'id': '19', 'label': '(3,4)'}, {'id': '20', 'label': '(3,5)'}, {'id': '21', 'label': '(3,6)'}, {'id': '22', 'label': '(3,7)'}, {'id': '23', 'label': '(3,8)'}, {'id': '24', 'label': '(3,9)'}, {'id': '25', 'label': '(4,4)'}, {'id': '26', 'label': '(4,5)'}, {'id': '27', 'label': '(4,6)'}, {'id': '28', 'label': '(4,7)'}, {'id': '29', 'label': '(4,8)'}, {'id': '30', 'label': '(4,9)'}, {'id': '31', 'label': '(5,5)'}, {'id': '32', 'label': '(5,6)'}, {'id': '33', 'label': '(5,7)'}, {'id': '34', 'label': '(5,8)'}, {'id': '35', 'label': '(5,9)'}, {'id': '36', 'label': '(6,6)'}, {'id': '37', 'label': '(6,7)'}, {'id': '38', 'label': '(6,8)'}, {'id': '39', 'label': '(6,9)'}, {'id': '40', 'label': '(7,7)'}, {'id': '41', 'label': '(7,8)'}, {'id': '42', 'label': '(7,9)'}, {'id': '43', 'label': '(8,8)'}, {'id': '44', 'label': '(8,9)'}, {'id': '45', 'label': '(9,9)'}]
);
var edges = new vis.DataSet(
    [{'from': 19, 'to': 6, 'color': 'rgb(255,0,0)'}, {'from': 6, 'to': 13, 'color': 'rgb(255,0,0)'}, {'from': 30, 'to': 37, 'color': 'rgb(255,0,0)'}, {'from': 37, 'to': 34, 'color': 'rgb(255,0,0)'}, {'from': 22, 'to': 27, 'color': 'rgb(255,0,0)'}, {'from': 27, 'to': 9, 'color': 'rgb(255,0,0)'}, {'from': 9, 'to': 16, 'color': 'rgb(255,0,0)'}, {'from': 16, 'to': 31, 'color': 'rgb(255,0,0)'}, {'from': 33, 'to': 24, 'color': 'rgb(255,0,0)'}, {'from': 24, 'to': 29, 'color': 'rgb(255,0,0)'}, {'from': 29, 'to': 36, 'color': 'rgb(255,0,0)'}, {'from': 10, 'to': 3, 'color': 'rgb(255,0,0)'}, {'from': 40, 'to': 38, 'color': 'rgb(255,0,0)'}, {'from': 38, 'to': 35, 'color': 'rgb(255,0,0)'}, {'from': 26, 'to': 21, 'color': 'rgb(255,0,0)'}, {'from': 21, 'to': 15, 'color': 'rgb(255,0,0)'}, {'from': 15, 'to': 8, 'color': 'rgb(255,0,0)'}, {'from': 18, 'to': 12, 'color': 'rgb(255,0,0)'}, {'from': 12, 'to': 5, 'color': 'rgb(255,0,0)'}, {'from': 32, 'to': 28, 'color': 'rgb(255,0,0)'}, {'from': 28, 'to': 23, 'color': 'rgb(255,0,0)'}, {'from': 23, 'to': 17, 'color': 'rgb(255,0,0)'}, {'from': 43, 'to': 42, 'color': 'rgb(255,0,0)'}, {'from': 20, 'to': 25, 'color': 'rgb(255,0,0)'}, {'from': 25, 'to': 7, 'color': 'rgb(255,0,0)'}, {'from': 7, 'to': 14, 'color': 'rgb(255,0,0)'}, {'from': 4, 'to': 11, 'color': 'rgb(255,0,0)'}, {'from': 39, 'to': 41, 'color': 'rgb(255,0,0)'}, {'from': 19, 'to': 14, 'color': 'rgb(0,0,255)'}, {'from': 30, 'to': 36, 'color': 'rgb(0,0,255)'}, {'from': 27, 'to': 23, 'color': 'rgb(0,0,255)'}, {'from': 10, 'to': 4, 'color': 'rgb(0,0,255)'}, {'from': 6, 'to': 11, 'color': 'rgb(0,0,255)'}, {'from': 9, 'to': 18, 'color': 'rgb(0,0,255)'}, {'from': 16, 'to': 25, 'color': 'rgb(0,0,255)'}, {'from': 21, 'to': 17, 'color': 'rgb(0,0,255)'}, {'from': 12, 'to': 8, 'color': 'rgb(0,0,255)'}]
);

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
function onPageLoad()
{
    createNetwork("mynetwork", nodes, edges);
}