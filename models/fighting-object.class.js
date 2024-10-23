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



    /**
     * Constructor for the object with initial position (x, y).
     * Calls the parent constructor.
     * 
     * @param {number} [x=0] - The x-coordinate of the object.
     * @param {number} [y=0] - The y-coordinate of the object.
     */
    constructor(x = 0, y = 0) {
        super(x, y);
    }

    /**
     * Changes the size of the attack box.
     * 
     * @param {number} width - The new width of the attack box.
     * @param {number} height - The new height of the attack box.
     */
    changeAttackbox(width, height) {
        this.attackbox.width = width;
        this.attackbox.height = height;
    }

    /**
     * Sets the position of the attack box based on the object's current position and direction (facing left or right).
     */
    setAttackbox() {
        if (!this.faceingLeft) {
            this.attackbox.relocateBox(this.positionX + this.attackboxOffset.posX, this.positionY + this.attackboxOffset.posY);
        } else {
            this.attackbox.relocateBox(this.positionX - this.attackboxOffset.posX + this.hitbox.width + this.attackboxOffset.posXmirror, this.positionY + this.attackboxOffset.posY);
        }
    }

    /**
     * Sets the offset values for the attack box and changes its dimensions.
     * 
     * @param {number} x - The x-offset of the attack box.
     * @param {number} y - The y-offset of the attack box.
     * @param {number} w - The width of the attack box.
     * @param {number} h - The height of the attack box.
     * @param {number} xm - The mirrored x-offset when facing left.
     */
    setAttackboxOffset(x, y, w, h, xm) {
        this.attackboxOffset.posX = x;
        this.attackboxOffset.posY = y;
        this.changeAttackbox(w, h);
        this.attackboxOffset.posXmirror = xm;
    }


    /**
     * Draws the object and updates the position of the attack box.
     */
    draw() {
        super.draw();
        this.setAttackbox();
    }

    /**
     * Draws the attack box outline on the canvas.
     */
    drawAttackbox() {
        this.setAttackbox();
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = this.attackbox.color;
        ctx.rect(this.attackbox.posX1, this.attackbox.posY1, this.attackbox.width, this.attackbox.height);
        ctx.stroke();
    }

    /**
     * Checks if the object's attack box is hitting the target's hitbox.
     * 
     * @param {Object} target - The target object to check for collision.
     * @returns {boolean} - Returns true if the attack box overlaps with the target's hitbox, otherwise false.
     */
    isHiting(target) {
        return this.isOverlapping(this.attackbox, target.hitbox);
    }

    /**
     * Performs a strike on the target if the object is not currently attacking.
     * Plays the weapon sound and deals damage to the target.
     * 
     * @param {Object} target - The target object to attack.
     */
    strike(target) {
        if (!this.isAttacking()) {
            this.weaponSound();
            if (target.health > 0) {
                this.doDamage(target);
            }
            if (target instanceof Projectile) {
                target.movingLeft = false;
            }
        }
    }

    /**
     * Applies damage to the target, taking into account its armor and defense status.
     * 
     * @param {Object} target - The target object to apply damage to.
     */
    doDamage(target) {
        if (!target.isDefending()) {
            target.health -= this.power;
        } else {
            target.health -= Math.max(0, this.power - target.armor);
        }

        target.setHurt();
        this.setAttack();
    }

    /**
     * Checks if the object is currently in a "hurt" state.
     * 
     * @returns {boolean} - Returns true if the object was recently hurt, otherwise false.
     */
    isHurt() {
        return this.checkTime('lastHit', 300);
    }

    /**
     * Sets the object to a "hurt" state, recording the current time.
     */
    setHurt() {
        this.setTime('lastHit');
    }

    /**
     * Checks if the object is currently in an attacking state.
     * 
     * @returns {boolean} - Returns true if the object is attacking, otherwise false.
     */
    isAttacking() {
        return this.checkTime('lastAttack', 1000);
    }

    /**
     * Sets the object to an attacking state, recording the current time.
     */
    setAttack() {
        this.setTime('lastAttack');
    }

    /**
     * Checks if the object is currently defending.
     * 
     * @returns {boolean} - Returns true if the object is defending, otherwise false.
     */
    isDefending() {
        return this.checkTime('lastDefend', 500);
    }

    /**
     * Sets the object to a defending state, recording the current time.
     */
    setDefend() {
        this.setTime('lastDefend');
    }

    /**
     * Plays the sound of the weapon, depending on whether the hit was successful or not.
     * 
     * @param {boolean} [hit=true] - Whether the weapon hit or missed the target.
     */
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

