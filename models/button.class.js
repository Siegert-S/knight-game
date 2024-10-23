class MenuButton extends DrawableObject {
    isClickt = false;
    isHovered = false;
    text;
    partOfMenu;
    isActiv = false;
    enabel = true;
    connectedFunction;
    fontColor = 'white';

    refreshButton;

    constructor(x, y, width, height, partOfMenu, text, connectedFunction = () => { console.log(this.text + ' wurde geclickt'); }) {
        super();
        this.positionX = x;
        this.positionY = y;
        this.width = width;
        this.height = height;
        this.partOfMenu = partOfMenu;
        this.text = text;
        this.setButtonContent(text);
        this.connectedFunction = connectedFunction;
        this.loadImage('assets/img/brett/brett_2.png');
    }

    onClick() {
        if (this.enabel) {
            if (this.isClickt) {
                this.connectedFunction();
                setTimeout(this.onClick.bind(this), 200);
            }
        }
    }

    handleAction(action, ...args) {
        const result = action(...args);
        if (result === true) {

        } else if (result === false) {

        }

    }

    useFunction (action, ...args){
        [action](...args);
    }

    refreshContent(text) {
        this.text = player.getCoinCostOf(text);
        this.fontColor = (player.coins < player.getCoinCostOf(text)) ? 'red' : 'white';

    }

    setButtonContent(text) {
        switch (text) {
            case 'attack':
                this.refreshButton = () => { this.refreshContent(text); }
                break;
            case 'health':
                this.refreshButton = () => { this.refreshContent(text); }
                break;
            case 'armor':
                this.refreshButton = () => { this.refreshContent(text); }
                break;

            default:
                this.refreshButton = () => { }
                break;
        }
    }

    upDate() {
        this.refreshButton();
    }

    draw() {

        if (!this.enabel) {
            ctx.globalAlpha = 0.75;
        }
        this.drawButton();
        this.drawText();


        ctx.globalAlpha = 1;
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
        ctx.fillStyle = this.fontColor;
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