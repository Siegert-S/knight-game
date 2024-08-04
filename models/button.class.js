class MenuButton extends DrawableObject {
    isClickt = false;
    isHovered = false;
    text;
    partOfMenu;
    isActiv = false;
    connectedFunction;

    refreshButton;

    constructor(x, y, width, height, partOfMenu, text, connectedFunction = () => { console.log(this.text + ' wurde geclickt'); }) {
        super();
        this.positionX = x;
        this.positionY = y;
        this.width = width;
        this.height = height;
        this.partOfMenu = partOfMenu;
        this.text = text;
        this.connectedFunction = connectedFunction;
        this.loadImage('assets/img/brett/brett_2.png');
    }

    refreshContent(text) {

        ctx.fillStyle = (player.coins < text) ? 'red' : 'white'

    }

    setButtonContent(text) {
        switch (text) {
            case 'attack':
                this.refreshButton = () => { this.refreshContent(text); }
                break;

            default:
                break;
        }
    }



    onClick() {
        if (this.isClickt) {
            this.connectedFunction();
            setTimeout(this.onClick.bind(this), 200);
        }
    }

    draw() {
        this.drawButton();
        this.drawText();
    }

    drawButton() {
        ctx.fillStyle = (this.isHovered) ? this.loadImage('assets/img/brett/brett.png') : this.loadImage('assets/img/brett/brett_2.png');
        if (this.isClickt) {
            ctx.drawImage(this.img, this.positionX, this.positionY + 5, this.width, this.height);
            // ctx.fillRect(this.positionX, this.positionY + 5, this.width, this.height);
        } else {
            ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);
            // ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
        }

    }

    drawText() {
        ctx.font = '20px Tahoma';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';


        const textWidth = ctx.measureText(this.text).width;
        // console.log('Text width: von '+ this.text+' ist ' + textWidth + ' pixels');

        if (this.isClickt) {
            ctx.fillText(this.text, this.positionX + (this.width / 2), this.positionY + (this.height / 1.5) + 5);
        } else {
            ctx.fillText(this.text, this.positionX + (this.width / 2), this.positionY + (this.height / 1.5));
        }


    }
}