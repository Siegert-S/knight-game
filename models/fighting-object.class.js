class FightingObject extends MoveableObject {
    health;
    maxhealth;
    power;
    armor = 0;
    lastHit = 0;
    lastAttack = 0;
    lastDefend = 0;

    attackbox = new Box(0, 0, this.width, this.height, 1);

    attackboxOffset = {
        "posX": 0,
        "posY": 0,
        "posXmirror": 0,

    };

    weaponSound_hit = 'assets/audio/sfx/sword/sword-hit.mp3';
    weaponSound_miss = 'assets/audio/sfx/sword/sword-miss.mp3';

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

    // isHiting(target) {
    //     let leftEdge = this.attackbox.posX2 >= target.hitbox.posX1 && target.hitbox.posX1 >= this.attackbox.posX1;
    //     let rightEdge = this.attackbox.posX2 >= target.hitbox.posX2 && target.hitbox.posX2 >= this.attackbox.posX1;
    //     let center = this.attackbox.posX2 <= target.hitbox.posX2 && target.hitbox.posX1 <= this.attackbox.posX1;

    //     let top = this.attackbox.posY2 >= target.hitbox.posY1 && target.hitbox.posY1 >= this.attackbox.posY1;
    //     let bottom = this.attackbox.posY2 >= target.hitbox.posY2 && target.hitbox.posY2 >= this.attackbox.posY1;
    //     let vcenter = this.attackbox.posY2 <= target.hitbox.posY2 && target.hitbox.posY1 <= this.attackbox.posY1;

    //     let horizontal = leftEdge || rightEdge || center;

    //     let vertical = top || bottom || vcenter;

    //     return horizontal && vertical;
    // }

    isHiting(target) {
        return this.isOverlapping(this.attackbox, target.hitbox);
    }

    strike(target) {
        if (!this.isAttacking()) {
            this.weaponSound();
            if (target.health > 0) {
                if (!target.isDefending()) {
                    target.health = target.health - this.power;
                }

                target.setHurt();
                this.setAttack();
            }
            if (target instanceof Projectile) {
                target.movingLeft = false;
            }
        }
    }

    isHurt() {
        return this.checkTime('lastHit', 300);
    }

    setHurt() {
        this.setTime('lastHit');
    }

    isAttacking() {
        return this.checkTime('lastAttack', 1000);
    }

    setAttack() {
        this.setTime('lastAttack');
    }

    isDefending() {
        return this.checkTime('lastDefend', 500);
    }

    setDefend() {
        this.setTime('lastDefend');
    }

    weaponSound(hit = true) {
        if (hit) {
            let sound = new Audio(this.weaponSound_hit);
            sound.volume = audio.SFX / 100;
            sound.play();
        } else {
            let sound = new Audio(this.weaponSound_miss);
            sound.volume = audio.SFX / 100;
            sound.play();
        }
    }
}

