
var caveGridWidth = 20;
var caveGridHeight = 20;
var cellWidth = 30;
var cellHeight = 30;
var level;

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
    if (!ratio) { ratiplayero = PIXEL_RATIO; }
    canvas = document.getElementById("gameCanvas");
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return canvas;
}

function createCanvas() {  
    return createHiDPICanvas(caveGridWidth * cellWidth, caveGridHeight * cellHeight, PIXEL_RATIO);
}

// Build cave array
var caveGrid = [];
for (let w = 0; w < caveGridWidth; w++) {
    caveGrid[w] = [];
    for (let h = 0; h < caveGridHeight; h++) {
        caveGrid[w][h] = {};
        caveGrid[w][h].path = false;
    }
}

function generateCave() {

    var beginMin = 5;
    var beginMax = 15;
    var rootPathX = Math.floor((Math.random() * (beginMax - beginMin)) + beginMin);
    var rootPathY = Math.floor((Math.random() * (beginMax - beginMin)) + beginMin);

    // Set the root path
    caveGrid[rootPathX][rootPathY].path = new Path(rootPathX, rootPathY);
    
    var direction = Math.floor((Math.random() * (4 - 1)) + 1);
    var currentX = rootPathX;
    var currentY = rootPathY;
    var maxPaths = 1;
    var maxTurns = 30;
    var minStraight = 3;
    var maxStraight = 6;
    var paths = [];

    // Set player starting position
    player.setPosition(rootPathX, rootPathY);

    // For every path
    for (let pth = 0; pth < maxPaths; pth++) {

        paths[pth] = [];
        var printedTorch = false;

        // For every turn allowed to be made in each path
        for (let t = 0; t < maxTurns; t++) {

            // Change direction. Must be perpendicular to previous direction
            switch (direction) {

                case 0:
                case 1:
                    direction = Math.floor(Math.random() + 2.4);
                    break;

                case 2:
                case 3:
                    direction = Math.floor(Math.random() + 0.4);
                    break;
            }

            var currentPathLength = Math.floor((Math.random() * (maxStraight - minStraight)) + minStraight);
            // Draw a straight path between minStraight and maxStraight long
            for (let p = 0; p < currentPathLength; p++) {

                switch (direction) {

                    // Up
                    case 0:

                        // If the path cannot go further up
                        if (currentY == 0) {
                            continue;
                        }
                        currentY--;
                        break;

                    // Down
                    case 1:

                        // If the path cannot go further down
                        if (currentY == (caveGridHeight - 1)) {
                            continue;
                        }
                        currentY++;
                        break;

                    // Left
                    case 2:

                        // If the path cannot go further left
                        if (currentX == 0) {
                            continue;
                        }
                        currentX--;
                        break;
                    
                    // Right
                    case 3:
                        
                        // If the path cannot go further right
                        if (currentX == (caveGridWidth - 1)) {
                            continue;
                        }
                        currentX++;
                        break;
                }
                
                caveGrid[currentX][currentY].path = new Path(currentX, currentY);
                paths[pth].push({x: currentX, y: currentY});

                // currentPathLength - p = max && haven't printed torch this path
                // random number between 0 and max
                // if number = 0
                    // print torch
                    // set printed torch this path = true
                if (printedTorch == false) {
                    let maxOdds = currentPathLength - p;
                    let odds = Math.floor(Math.random() * (maxOdds - minStraight) + minStraight);

                    if ((maxOdds - 1) == odds) {

                        caveGrid[currentX][currentY].item = new Torch(currentX, currentY);
                        printedTorch = true;
                    }
                }
            }
        }
    }
}

function drawCave() {

    var playerPositionX = player.getPosition()[0];
    var playerPositionY = player.getPosition()[1];
    var playerVision = player.getVision();

    // Draw paths left of the player
    for (let x = playerPositionX; x >= playerPositionX - playerVision; x--) {
        let y = playerPositionY;
        if (caveGrid[x] != undefined) {
            if (caveGrid[x][y] != undefined) {
                if (caveGrid[x][y].path instanceof Path) {
                    caveGrid[x][y].path.illuminate();
                    caveGrid[x][y].path.draw();

                    // If the path also has an item, draw it
                    if (caveGrid[x][y].item != undefined) {
                        caveGrid[x][y].item.draw();
                    }
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
        else {
            break;
        }
    }

    // Draw paths right of the player
    for (let x = playerPositionX; x <= playerPositionX + playerVision; x++) {
        let y = playerPositionY;
        if (caveGrid[x] != undefined) {
            if (caveGrid[x][y] != undefined) {
                if (caveGrid[x][y].path instanceof Path) {
                    caveGrid[x][y].path.illuminate();
                    caveGrid[x][y].path.draw();

                    // If the path also has an item, draw it
                    if (caveGrid[x][y].item != undefined) {
                        caveGrid[x][y].item.draw();
                    }
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
        else {
            break;
        }
    }

    // Draw paths above the player
    for (let y = playerPositionY; y >= playerPositionY - playerVision; y--) {
        let x = playerPositionX;
        if (caveGrid[x] != undefined) {
            if (caveGrid[x][y] != undefined) {
                if (caveGrid[x][y].path instanceof Path) {
                    caveGrid[x][y].path.illuminate();
                    caveGrid[x][y].path.draw();

                    // If the path also has an item, draw it
                    if (caveGrid[x][y].item != undefined) {
                        caveGrid[x][y].item.draw();
                    }
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
        else {
            break;
        }
    }

    // Draw paths below the player
    for (let y = playerPositionY; y <= playerPositionY + playerVision; y++) {
        let x = playerPositionX;
        if (caveGrid[x] != undefined) {
            if (caveGrid[x][y] != undefined) {
                if (caveGrid[x][y].path instanceof Path) {
                    caveGrid[x][y].path.illuminate();
                    caveGrid[x][y].path.draw();

                    // If the path also has an item, draw it
                    if (caveGrid[x][y].item != undefined) {
                        caveGrid[x][y].item.draw();
                    }
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
        else {
            break;
        }
    }

    // for (let w = 0; w < caveGridWidth; w++) {
    //     for (let h = 0; h < caveGridHeight; h++) {
            
    //         if (caveGrid[w][h].path != false) {

    //             if (player.canSee(w, h)) {
    //                 caveGrid[w][h].path.illuminate();
    //             }
    //             else {
    //                 caveGrid[w][h].path.darken(); 
    //             }

    //             caveGrid[w][h].path.draw();

    //             // If the path also has an item, draw it
    //             if (caveGrid[w][h].item != undefined) {
    //                 caveGrid[w][h].item.draw();
    //             }
    //         }
    //     }
    // }
}

function isPath(x, y) {

    if (caveGrid[x] == undefined) {
        return false;
    }

    if (caveGrid[x][y] == undefined) {
        return false;
    }

    if (caveGrid[x][y].path == undefined) {
        return false;
    }

    if (caveGrid[x][y].path == false) {
        return false;
    }

    return true;
}
