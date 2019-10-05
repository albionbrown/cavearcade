
class Player extends Entity
{

    constructor(positionX, positionY) {
        super(positionX, positionY);
    }

    draw() {

        // Get cave position
        ctx.beginPath();
        ctx.moveTo((this.positionX + (this.width / 2)), (this.positionY));
        ctx.lineTo((this.positionX + this.width), (this.positionY + this.height));
        ctx.lineTo(this.positionX, (this.positionY + this.height));
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    }

    turn() {

        // @TODO rotation
        if (leftPressed && !lastTurnLeftPressed) {
            this.positionX -= caveWidth;
        }

        if (rightPressed && !lastTurnRightPressed) {
            this.positionX += caveWidth;
        }

        if (upPressed && !lastTurnUpPressed) {
            this.positionY -= caveHeight;
        }

        if (downPressed && !lastTurnDownPressed) {
            this.positionY += caveHeight;
        }
    }
}