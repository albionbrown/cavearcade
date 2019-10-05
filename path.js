
class Path extends Entity
{

    constructor(positionX, positionY) {
        super(positionX, positionY);
        this.illuminatedColour = "#575757";
        this.darkColour = "#000000";
        this.colour = this.illuminatedColour;
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

    illuminate() {
        this.colour = this.illuminatedColour;
    }

    darken() {
        this.colour = this.darkColour;
    }
}