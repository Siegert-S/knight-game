class CoinCounter extends AnimatedObject {
    cash = 0;

    /**
     * Represents a coin display for the player, showing the amount of cash.
     * @param {number} x - The x-coordinate of the coin display's position.
     * @param {number} y - The y-coordinate of the coin display's position.
     */
    constructor(x, y) {
        super();
        this.loadImage('assets/img/coins/Gold/Gold_5.png');
        this.width = 25;
        this.positionY = y;
        this.height = 25;
        this.positionX = x;
    }

    /**
     * Retrieves the current amount of cash from the player's character.
     * @returns {void}
     */
    getCoins() {
        this.cash = Character.storage[0].cash;
    }

    /**
     * Draws the coin display on the canvas, including the cash amount.
     * @returns {void}
     */
    draw() {
        this.getCoins();
        super.draw();
        this.drawText()

    }

    /**
     * Draws the text displaying the amount of cash next to the coin image.
     * @returns {void}
     */
    drawText() {
        ctx.font = '25px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.fillText(this.cash, this.positionX + 40, this.positionY + 21);
    }
}