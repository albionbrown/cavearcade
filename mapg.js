

var caveGridWidth = 20;
var caveGridHeight = 20;
var cellWidth = 30;
var cellHeight = 30;
var level;
var minStraight = 3;
var maxStraight = 8;

// Build cave array
var caveGrid = [];
for (let w = 0; w < caveGridWidth; w++) {
    caveGrid[w] = [];
    for (let h = 0; h < caveGridHeight; h++) {
        caveGrid[w][h] = [];
        caveGrid[w][h]['path'] = false;
    }
}

function generateLevelWalls(caveGrid) {

    var beginMin = 5;
    var beginMax = 15;
    var beginX = Math.floor(Math.random() * ((beginMax - beginMin) + beginMin));
    var beginY = Math.floor(Math.random() * ((beginMax - beginMin) + beginMin));
    var direction = Math.floor(Math.random() * 4);
    var routing = true;
    var currentX = beginX;
    var currentY = beginY;
    var maxPaths = 1;
    var maxTurns;

    while (routing) {

        var currentPathLength = Math.floor(Math.random() * ((maxStraight - minStraight) + minStraight));
        for (let p = 0; p < currentPathLength; p++) {

            // Decide direction
            switch (direction) {

                // Up
                case 0:
                    currentY--;
                    break;

                // Right
                case 1:
                    currentX++;
                    break;

                // Down
                case 2:
                    currentY++;
                    break;
                
                // Left
                case 3:
                    currentX--;
                    break;
            }
            caveGrid[currentX][currentY]['path'] = true;
        }
    }

    return caveGrid;
}

caveGrid = generateLevelWalls(caveGrid);

// begin with one path
// re follow that path to extend routes

// Being at coordinates
// loop
    // decide direction
    // continue in that direction for random number been mix and max straight
