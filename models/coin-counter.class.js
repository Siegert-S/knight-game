class CoinCounter extends AnimatedObject {
    cash = 0;

    constructor(x, y) {
        super();
        this.loadImage('assets/img/coins/Gold/Gold_5.png');
        this.width = 25;
        this.positionY = y;
        this.height = 25;
        this.positionX = x;
    }

    getCoins() {
        this.cash = Character.storage[0].cash;
    }

    draw() {
        this.getCoins();
        super.draw();
        this.drawText()

    }

    drawText() {
        ctx.font = '25px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.fillText(this.cash, this.positionX + 40, this.positionY + 21);
    }
}