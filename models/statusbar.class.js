class Statusbar extends AnimatedObject {
    percentge = 65;
    color;
    backgroundImg;
    resources;
    constructor(x, y, type = 'health') {
        super().loadImage('assets/img/knight/Knight_1/single_images/Statusbar_2.png');
        this.loadBackgroundImage('assets/img/knight/Knight_1/single_images/Statusbar_Background.png');
        this.width = 160;
        this.positionY = y;
        this.height = 25;
        this.positionX = x;
        this.setStatusbarFor(type)
    }

    loadBackgroundImage(path) {
        let img = new Image();
        img.src = path;
        this.backgroundImg = img;
    }


    draw() {
        this.computePercentge();
        this.drawBackground();
        // console.log(ctx.fillStyle);
        this.drawFilling();
        // console.log(ctx.fillStyle);
        super.draw();
    }

    drawBackground() {
        // ctx.fillStyle = 'darkbrown';
        // ctx.fillRect(this.positionX + 4, this.positionY + 4, this.width - 8, this.height - 8);
        ctx.drawImage(this.backgroundImg, this.positionX + 4, this.positionY + 4, this.width - 8, this.height - 8);
    }

    drawFilling() {
        let filling = (this.width - 8) * (this.percentge / 100);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX + 4, this.positionY + 4, filling, this.height - 8);

        ctx.fillStyle = 'darkbrown';
    }

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

    playerHealth() {
        if (Character.storage[0].health > 0) {
            let health = Character.storage[0].health;
            let maxhealth = Character.storage[0].maxhealth;
            this.percentge = (health / maxhealth) * 100;
        } else {
            this.percentge = 0;
        }
    }

    playerMana() {
        if (Character.storage[0].mana > 0) {
            let mana = Character.storage[0].mana;
            let maxmana = Character.storage[0].maxmana;
            this.percentge = (mana / maxmana) * 100;
        } else {
            this.percentge = 0;
        }
    }

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