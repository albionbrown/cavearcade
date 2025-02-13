
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

var rightPressed = false;
var leftPressed = false
var upPressed = false;
var downPressed = false;

var lastTurnRightPressed = false;
var lastTurnLeftPressed = false;
var lastTurnUpPressed = false;
var lastTurnDownPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {

    if ((e.key == "Right" || e.key == "ArrowRight")) {
        rightPressed = true;
    }
    else if ((e.key == "Left" || e.key == "ArrowLeft")) {
        leftPressed = true;
    }
    else if ((e.key == "Up" || e.key == "ArrowUp")) {
        upPressed = true;
    }
    else if ((e.key == "Down" || e.key == "ArrowDown")) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

function storeKeysForNextTurn() {

    // Store the last turn's keys
    lastTurnRightPressed = rightPressed;
    lastTurnLeftPressed  = leftPressed;
    lastTurnUpPressed    = upPressed;
    lastTurnDownPressed  = downPressed;
}
