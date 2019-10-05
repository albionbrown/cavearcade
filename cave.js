
var caveWidth = 10;
var caveHeight = 10;
var level;

// Build cave array
var caveGrid = [];
for (let w = 0; w < caveWidth; w++) {
    caveGrid[w] = [];
    for (let h = 0; h < caveHeight; h++) {
        caveGrid[w][h] = "";
    }
}

console.log(caveGrid);
