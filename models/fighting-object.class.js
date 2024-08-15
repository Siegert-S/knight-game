class FightingObject extends MoveableObject {
    health;
    maxhealth;
    power;
    lastHit = 0;
    lastAttack = 0;
    lastDefend = 0;

    attackbox = new Box(0, 0, this.width, this.height, 1);

    attackboxOffset = {
        "posX": 0,
        "posY": 0,
        "posXmirror": 0,

    };

    HURT;
    DEAD;
    ATTACK;
    DEFEND;




    constructor(x = 0, y = 0) {
        super(x, y);
    }

    changeAttackbox(width, height) {
        this.attackbox.width = width;
        this.attackbox.height = height;
    }

    setAttackbox() {
        if (!this.faceingLeft) {
            this.attackbox.relocateBox(this.positionX + this.attackboxOffset.posX, this.positionY + this.attackboxOffset.posY);
        } else {
            this.attackbox.relocateBox(this.positionX - this.attackboxOffset.posX + this.hitbox.width + this.attackboxOffset.posXmirror, this.positionY + this.attackboxOffset.posY);
        }
    }

    setAttackboxOffset(x, y, w, h, xm) {
        this.attackboxOffset.posX = x;
        this.attackboxOffset.posY = y;
        this.changeAttackbox(w, h);
        this.attackboxOffset.posXmirror = xm;
    }

    draw() {
        super.draw();
        this.setAttackbox();
    }

    drawAttackbox() {
        this.setAttackbox();
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = this.attackbox.color;
        ctx.rect(this.attackbox.posX1, this.attackbox.posY1, this.attackbox.width, this.attackbox.height);
        ctx.stroke();
    }

    isHiting(target) {
        let leftEdge = this.attackbox.posX2 >= target.hitbox.posX1 && target.hitbox.posX1 >= this.attackbox.posX1;
        let rightEdge = this.attackbox.posX2 >= target.hitbox.posX2 && target.hitbox.posX2 >= this.attackbox.posX1;
        let center = this.attackbox.posX2 <= target.hitbox.posX2 && target.hitbox.posX1 <= this.attackbox.posX1;

        let top = this.attackbox.posY2 >= target.hitbox.posY1 && target.hitbox.posY1 >= this.attackbox.posY1;
        let bottom = this.attackbox.posY2 >= target.hitbox.posY2 && target.hitbox.posY2 >= this.attackbox.posY1;
        let vcenter = this.attackbox.posY2 <= target.hitbox.posY2 && target.hitbox.posY1 <= this.attackbox.posY1;

        let horizontal = leftEdge || rightEdge || center;

        let vertical = top || bottom || vcenter;

        return horizontal && vertical;
    }

    strike(target) {
        if (!this.isAttacking()) {
            if (target.health > 0) {
                if (!target.isDefending()) {
                    target.health = target.health - this.power;
                }
                target.setHurt();
                this.setAttack();
            }
        } else {

        }
    }

    isHurt() {
        let time = new Date().getTime();
        let timepassed = time - this.lastHit;
        // timepassed = timepassed / 1000;

        return timepassed < 300;
    }

    setHurt() {
        this.lastHit = new Date().getTime();
    }

    isAttacking() {
        let time = new Date().getTime();
        let timepassed = time - this.lastAttack;
        return timepassed < 1000;
    }

    setAttack() {
        this.lastAttack = new Date().getTime();
    }

    isDefending() {
        let time = new Date().getTime();
        let timepassed = time - this.lastDefend;
        return timepassed < 500;
    }

    setDefend() {
        this.lastDefend = new Date().getTime();
    }

    // animateObject() {
    //     if (this.status == 'hurt') {
    //         this.animateImage(this.HURT);
    //     }
    //     if (this.status == 'dead') {
    //         this.animateImage(this.DEAD);
    //     }
    //     if (this.status == 'attack') {
    //         this.animateImage(this.ATTACK);
    //     }
    //     if (this.status == 'defend') {
    //         this.animateImage(this.DEFEND);
    //     }
    //     super.animateObject();
    // }

    stopAnimateImage() {
        if (this.lastImage == this.status) {
            if (this.status == 'dead') {
                // this.deleteAllIntervalls();
                // let self = this;
                setTimeout(() => {
                    this.deleteSelf();
                }, 2000);
                return false;
            }
        }
        return true;
    }
}

