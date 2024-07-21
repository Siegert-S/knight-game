class MenuButton extends DrawableObject {
    // x;
    // y;
    // width;
    // height;
    isClickt = false;
    isHovered = false;
    text;
    partOfMenu;
    isActiv = false;
    connectedFunction;

    constructor(x, y, width, height, partOfMenu, text, connectedFunction = () => { console.log(this.text + 'wurde geclickt'); }) {
        super();
        this.positionX = x;
        this.positionY = y;
        this.width = width;
        this.height = height;
        this.partOfMenu = partOfMenu;
        this.text = text;
        this.connectedFunction = connectedFunction;
    }

    onClick() {
        this.connectedFunction();
    }

    draw() {

    }

    drawButton() {

        ctx.fillStyle = 'darkbrown';
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    }

    drawText() {
        ctx.font = '25px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(this.cash, this.positionX + 40, this.positionY + 21);
    }
}