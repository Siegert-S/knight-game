class Panel extends DrawableObject {
    partOfMenu;
    text;
    name;
    isActiv = false;
    isHovered = false;

    refreshPanel;

    constructor(x, y, width, height, partOfMenu, name, text = undefined, img = 'assets/img/brett/brett_2.png') {
        super();
        this.positionX = x;
        this.positionY = y;
        this.width = width;
        this.height = height;
        this.partOfMenu = partOfMenu;
        this.name = name;
        this.loadImage(img);
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

            case 'difficultyvalue':
                this.refreshPanel = () => { this.refreshText(player.difficulty) };
                break;

            case 'Levelvalue':
                this.refreshPanel = () => { this.refreshText(player.stage) };
                break;
                
            default:
                this.refreshPanel = () => { this.refreshText(text) };
                break;
        }
    }

    draw() {
        this.refreshPanel();
        this.drawFrame();
        this.drawText();
    }

    drawFrame() {
        // ctx.fillStyle = '#123456';
        // ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
        ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);
    }

    drawText() {
        ctx.font = '20px Tahoma';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';


        const textWidth = ctx.measureText(this.text).width;
        // console.log('Text width: von '+ this.text+' ist ' + textWidth + ' pixels');

        ctx.fillText(this.text, this.positionX + (this.width / 2), this.positionY + (this.height / 1.5));
    }

}