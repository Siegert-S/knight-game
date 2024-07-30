class Panel extends DrawableObject {
    partOfMenu;
    text;
    name;
    isActiv = false;

    refreshPanel;

    constructor(x, y, width, height, partOfMenu, name, text = undefined) {
        super();
        this.positionX = x;
        this.positionY = y;
        this.width = width;
        this.height = height;
        this.partOfMenu = partOfMenu;
        this.name = name;
        this.loadImage('assets/img/brett/brett_2.png');
        this.setTextValue(text);
        this.refreshPanel();
    }



    refreshText(text) {
        this.text = text;
    }

    setTextValue(text) {
        switch (text) {
            case 'volumevalue':
                this.refreshPanel = () => { this.refreshText(volume) };
                break;

            case 'sfxvalue':
                this.refreshPanel = () => { this.refreshText(SFX) };
                break;

            default:
                this.refreshPanel = () => { this.refreshText(text) };
                break;
        }
    }

    draw() {
        this.drawFrame();
        this.drawText();
    }

    drawFrame() {
        // ctx.fillStyle = '#123456';
        // ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
        ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);
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