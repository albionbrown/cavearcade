
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
        if (leftPressed) {
            this.positionX--;
        }

        if (rightPressed) {
            this.positionX++;
        }

        if (upPressed) {
            this.positionY--;
        }

        if (downPressed) {
            this.positionY++;
        }
    }
}