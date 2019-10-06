

// Create canvas with the device resolution.
var canvas = createCanvas();
var ctx = canvas.getContext("2d");

var player = new Player(0, 0);

generateCave();

var dialogBox = new Dialog(0, 0);

function gameTurn() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.turn();
    drawCave();
    player.draw();
    // dialogBox.draw();
    storeKeysForNextTurn();
    // console.log(caveGrid);
}

// Run game loop
setInterval(gameTurn, 10); 
