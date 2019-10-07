
var playerStartingX = 0;
var playerStartingY = 0;

class Player extends Entity
{

    vision;

    constructor(positionX, positionY) {
        super(positionX, positionY);
        this.colour = "#FFFFFF";
        this.vision = 1;
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

        if (leftPressed && !lastTurnLeftPressed && this.positionX > 0 && isPath(this.positionX - 1, this.positionY)) {
            this.positionX -= 1;
        }

        if (rightPressed && !lastTurnRightPressed && this.positionX < (caveGridWidth - 1) && isPath(this.positionX + 1, this.positionY)) {
            this.positionX += 1;
        }

        if (upPressed && !lastTurnUpPressed && this.positionY > 0 && isPath(this.positionX, this.positionY - 1)) {
            this.positionY -= 1;
        }

        if (downPressed && !lastTurnDownPressed && this.positionY < (caveGridHeight - 1) && isPath(this.positionX, this.positionY + 1)) {
            this.positionY += 1;
        }

        // Add the new player's position to the cave grid
        caveGrid[this.positionX][this.positionY]['player'] = this;

        // Is the player on an item?
        if (this.isOnItem()) {
            this.pickUpItem();
        }
    }

    setPosition(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    getPosition() {
        return [this.positionX, this.positionY];
	}
	
	setVision(vision) {
		this.vision = vision;
	}

	getVision() {
		return this.vision;
	}

    canSee(x, y) {

        // The block the player is on
        if (this.positionX == x && this.positionY == y) {
            return true;
        }

        // Blocks up and down of the player
        if (this.positionX == x) {

			for (let b = this.positionY; b >= (this.positionY - this.vision); b--) {

				// If the next block up is a path
				if (caveGrid[this.positionX][b].path == false) {
					break;
				}
				else {

				}
			}
		} 

        // Blocks right and left of the player
        if (this.positionY == y && (this.positionX == (x - this.vision) || this.positionX == (x + this.vision))) {
            return true;
        }

        return false;
    }

    isOnItem() {

        if (caveGrid[this.positionX][this.positionY].item != undefined) {

            return true;
        }
        else {
            return false;
        }
    }

    pickUpItem() {

        if (caveGrid[this.positionX][this.positionY].item != undefined) {

            if (caveGrid[this.positionX][this.positionY].item instanceof Torch) {
                this.vision = 3;
            }
            
            delete caveGrid[this.positionX][this.positionY].item;
        }
    }
}