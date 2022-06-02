<!DOCTYPE html>
<html>
    <head>
        <title>LAMAS Project</title>
        <meta charset="UTF-8">
        <script type="text/javascript" src="https://unpkg.com/vis-data@latest/peer/umd/vis-data.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/vis-network@latest/peer/umd/vis-network.min.js"></script>
        <script type="text/javascript" src="/script/networks.js"></script>
        <script type="text/javascript" src="/script/model.js"></script>
        <script type="text/javascript" src="/script/support.js"></script>
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/vis-network/styles/vis-network.min.css" />
        <link rel="stylesheet" href="/style.css">
    </head>

    <body onload="onPageLoad(10, 0, 'mynetwork')">
        <!-- Import navigation bar -->
        <?php	include('bar.php'); ?>


        <h1>The Number Game</h1>
        
        <!-- Input for the number of nodes -->
        <div>
            Bound for the random numbers: 
            <div id="N_var" class=nobr>10</div>
            <button type="button" onclick="incrementDiv('N_var', 100);" class=nobr>+</button>
            <button type="button" onclick="decrementDiv('N_var',  1);" class=nobr>-</button>
        </div>
        
        <!-- Input for the number of iterations to run the model -->
        <div> 
            Number of iterations to run the model: 
            <div id="iter_var" class=nobr>0</div>
            <button type="button" onclick="incrementDiv('iter_var', 30);" class=nobr>+</button>
            <button type="button" onclick="decrementDiv('iter_var',  0);" class=nobr>-</button>
        </div>
        
        <!-- Button to update model and removed posibilities list -->
        <button type="button" onclick="setNetwork('N_var', 'iter_var', 'mynetwork', 'removedList');">Update model</button>

        <!-- Block containing network and column to output removed values at each iteration -->
        <hr>
        <div class="row">
            <div class="column48">
                <h2>Model:</h2>
                <div id="mynetwork" class="networkClass"></div>
            </div>
            <div class="column4"> &nbsp; &nbsp; &nbsp; &nbsp;</div>
            <div class="column48">
                <h2>Removed posibilities:</h2>
                <div id="removedList"></div>
            </div>
        </div>
        <hr>
    </body>
</html>
