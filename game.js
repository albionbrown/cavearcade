
var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    canvas = document.getElementById("gameCanvas");
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return canvas;
}

function gameTurn() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.turn();
    player.draw();
}

//Create canvas with the device resolution.
var canvas = createHiDPICanvas(800, 600);
var ctx = canvas.getContext("2d")

var startPos = 0;
var player = new Player(0, 10);

setInterval(gameTurn, 10); 
