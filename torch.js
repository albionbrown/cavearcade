
class Torch extends Entity 
{

    image;

    constructor(positionX, positionY) {
        super(positionX, positionY);
        this.image = document.getElementById('torch');
    }

    draw() {
        
        let x = this.positionX * cellWidth;
        let y = this.positionY * cellHeight;
        ctx.drawImage(this.image, x, y);
    }
}