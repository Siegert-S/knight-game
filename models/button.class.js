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
        this.drawButton();
        // let self = this;
        // setTimeout(() => { self.drawText(); }, 100);
        this.drawText();
    }

    drawButton() {
        // console.log('button is');
        // console.log(ctx.fillStyle);
        ctx.fillStyle = '#123456';
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    }

    drawText() {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';


        const textWidth = ctx.measureText(this.text).width;
        // console.log('Text width: von '+ this.text+' ist ' + textWidth + ' pixels');

        ctx.fillText(this.text, this.positionX + (this.width / 2), this.positionY + (this.height / 1.5));
    }
}