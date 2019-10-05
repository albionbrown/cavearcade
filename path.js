
class Path extends Entity
{

    constructor(positionX, positionY) {
        super(positionX, positionY);
        this.colour = "#575757";
    }

    draw() {

        // Starting coordinates
        var x = this.positionX * cellWidth;
        var y = this.positionY * cellHeight;

        ctx.beginPath();
        ctx.rect(x, y, cellWidth, cellHeight);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();
    }
}