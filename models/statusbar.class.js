class Statusbar extends AnimatedObject {
    percentge = 100;
    color;
    backgroundImg;
    resources;

    /**
     * Represents a status bar for the player, either for health or mana.
     * @param {number} x - The x-coordinate of the status bar's position.
     * @param {number} y - The y-coordinate of the status bar's position.
     * @param {string} [type='health'] - The type of the status bar ('health' or 'mana').
     */
    constructor(x, y, type = 'health') {
        super().loadImage('assets/img/knight/Knight_1/single_images/Statusbar_2.png');
        this.loadBackgroundImage('assets/img/knight/Knight_1/single_images/Statusbar_Background.png');
        this.width = 160;
        this.positionY = y;
        this.height = 25;
        this.positionX = x;
        this.setStatusbarFor(type)
    }

    /**
     * Loads the background image for the status bar.
     * @param {string} path - The path to the background image.
     * @returns {void}
     */
    loadBackgroundImage(path) {
        let img = new Image();
        img.src = path;
        this.backgroundImg = img;
    }

    /**
     * Draws the status bar on the canvas.
     * @returns {void}
     */
    draw() {
        this.computePercentge();
        this.drawBackground();
        this.drawFilling();
        super.draw();
    }

    /**
     * Draws the background of the status bar.
     * @returns {void}
     */
    drawBackground() {
        ctx.drawImage(this.backgroundImg, this.positionX + 4, this.positionY + 4, this.width - 8, this.height - 8);
    }

    /**
     * Draws the filling of the status bar based on the current percentage.
     * @returns {void}
     */
    drawFilling() {
        let filling = (this.width - 8) * (this.percentge / 100);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX + 4, this.positionY + 4, filling, this.height - 8);

        ctx.fillStyle = 'darkbrown';
    }

    /**
     * Computes the current percentage for the status bar based on the resource type.
     * @returns {void}
     */
    computePercentge() {
        switch (this.resources) {
            case 'health':
                this.playerHealth();
                break;
            case 'mana':
                this.playerMana();
                break;

            default:
                break;
        }
    }

    /**
     * Computes the health percentage of the player.
     * @returns {void}
     */
    playerHealth() {
        if (Character.storage[0].health > 0) {
            let health = Character.storage[0].health;
            let maxhealth = Character.storage[0].maxhealth;
            this.percentge = (health / maxhealth) * 100;
        } else {
            this.percentge = 0;
        }
    }

    /**
     * Computes the mana percentage of the player.
     * @returns {void}
     */
    playerMana() {
        if (Character.storage[0].mana > 0) {
            let mana = Character.storage[0].mana;
            let maxmana = Character.storage[0].maxmana;
            this.percentge = (mana / maxmana) * 100;
        } else {
            this.percentge = 0;
        }
    }

    /**
     * Sets the status bar properties based on the specified type.
     * @param {string} type - The type of the status bar ('health' or 'mana').
     * @returns {void}
     */
    setStatusbarFor(type) {
        switch (type) {
            case 'health':
                this.resources = 'health';
                this.color = 'red';
                break;
            case 'mana':
                this.resources = 'mana';
                this.color = 'blue';
                break;
            default:
                this.resources = 'health';
                this.color = 'red';
                break;
        }
    }
}