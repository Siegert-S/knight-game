class Boss extends FightingObject {

    IDLE = MAGE_IDLE;
    HURT = MAGE_HURT;
    DEAD = MAGE_DEAD;
    ATTACK = MAGE_ATTACK;
    SPELLCAST = MAGE_SPELLCAST;

    attackCount = 0;

    loot;
    lootDrop = 'assets/audio/sfx/coin/impactMetal_light_004.ogg';

    constructor(difficulty = 1) {
        super(5500, 0);
        this.loadImage(this.IDLE[0]);

        this.setImages('idle', this.IDLE);
        this.setImages('cast', this.SPELLCAST);
        this.setImages('dead', this.DEAD);
        this.setImages('hurt', this.HURT);
        this.setImages('attack', this.ATTACK);


        this.faceingLeft = true;
        this.power = 2 * difficulty;
        this.speedX = 0;
        this.health = 50 * difficulty;
        this.maxhealth = 50 * difficulty;
        this.loot = 3 * difficulty;

        this.width = 220;
        this.height = 150;
        this.setHitboxOffset(50, 18, 80, 133, -5);
        // this.setHitboxOffset(45, 50, 115, 100, -5);
        this.setAttackboxOffset(110, 20, 90, 100, 10);
        // this.setAttackboxOffset(145, 20, 85, 120, 10);
        this.setPositionYRelativ(0);
    }

    checkDistance() {
        return this.positionX - Character.storage[0].positionX;
    }

    dropLoot() {
        if (this.loot > 0) {
            Coin.produce(this.positionX + (this.width / 2), 'cash', true);
            this.loot--;
            const sound = new Audio(this.lootDrop);
            sound.play();
        }
    }

    upDate() {
        super.upDate();
        let distance = this.checkDistance();
        // console.log(distance);
        if (this.health < 1) {
            this.dropLoot();
            this.status = 'dead';
        } else if (this.status == 'idle' || this.status == 'walk') {
            if (distance < 0) {
                this.faceingLeft = false;
            } else {
                this.faceingLeft = true;
            }
            if (distance < -150) {
                // this.moveRight();
                // this.status = 'walk'
            } else if (distance > 160 && distance < 400) {
                // this.moveLeft();
                // this.status = 'walk'
                // console.log('180 - 400');

                // this.status = 'attack'
                this.status = `cast`;
                Projectile.produce(this.positionX + 20);
            } else if (distance > -140 && distance < 160) {
                this.status = 'attack'

                // console.log('-120 - 140');
            } else {
                if (this.isHiting(Character.storage[0])) {
                    // this.strike(Character.storage[0]);
                    // this.status = `cast`;
                }
            }
        }
    }
}