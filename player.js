
var playerStartingX = 0;
var playerStartingY = 0;

class Player extends Entity
{

    constructor(positionX, positionY) {
        super(positionX, positionY);
        this.colour = "#FFFFFF";
    }

    draw() {

        // Starting coordinates
        var x = this.positionX * cellWidth;
        var y = this.positionY * cellHeight;
        ctx.beginPath();
        // var top = x + (this.width / 2);
        ctx.moveTo(x + (this.width / 2), y);
        // var bRightx = x + this.width;
        // var bRighty = y + this.height;
        ctx.lineTo(x + this.width, y + this.height);
        // var bLeft = y + this.height
        ctx.lineTo(x, y + this.height);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();
    }

    turn() {

        // Remove the player's position from the cave grid
        delete caveGrid[this.positionX][this.positionY]['player'];

        // @TODO rotation
        if (leftPressed && !lastTurnLeftPressed && this.positionX > 0) {
            this.positionX -= 1;
        }

        if (rightPressed && !lastTurnRightPressed && this.positionX < (caveGridWidth - 1)) {
            this.positionX += 1;
        }

        if (upPressed && !lastTurnUpPressed && this.positionY > 0) {
            this.positionY -= 1;
        }

        if (downPressed && !lastTurnDownPressed && this.positionY < (caveGridHeight - 1)) {
            this.positionY += 1;
        }

        // Add the new player's position to the cave grid
        caveGrid[this.positionX][this.positionY]['player'] = this;
    }

    setPosition(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }
}