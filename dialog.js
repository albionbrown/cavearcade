
class Dialog extends Entity
{

    text;

    constructor(positionX, positionY) {
        super(positionX, positionY);
    }

    draw() {

    }

    setText(text) {
        this.text = text;
    }
}