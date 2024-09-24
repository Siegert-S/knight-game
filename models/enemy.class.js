class Enemy extends FightingObject {

    WALK = SKELETON_WARRIOR_WALK;
    IDLE = SKELETON_WARRIOR_IDLE;
    HURT = SKELETON_WARRIOR_HURT;
    DEAD = SKELETON_WARRIOR_DEAD;
    ATTACK1 = SKELETON_WARRIOR_ATTACK1;
    ATTACK2 = SKELETON_WARRIOR_ATTACK2;
    ATTACK3 = SKELETON_WARRIOR_ATTACK3;

    attackCount = 0;

    loot;
    lootDrop = 'assets/audio/sfx/coin/impactMetal_light_004.ogg';
    count = 0;

    constructor(x = 500, difficulty = 1) {
        super(x, 0);
        this.loadImage(this.IDLE[0]);

        this.setImages('idle', this.IDLE);
        this.setImages('walk', this.WALK);
        this.setImages('attack1', this.ATTACK1);
        this.setImages('attack2', this.ATTACK2);
        this.setImages('attack3', this.ATTACK3);
        this.setImages('dead', this.DEAD);
        this.setImages('hurt', this.HURT);

        // this.loadImages(this.IDLE);
        // this.loadImages(this.WALK);
        // this.loadImages(this.ATTACK);
        // this.loadImages(this.DEAD);
        // this.loadImages(this.HURT);

        this.faceingLeft = true;
        this.power = 2 * difficulty;
        this.speedX = 2;
        this.health = 20 * difficulty;
        this.maxhealth = 20 * difficulty;
        this.loot = 3 * difficulty;

        this.width = 220;
        this.height = 150;
        this.setHitboxOffset(45, 50, 115, 100, -5);
        this.setAttackboxOffset(145, 20, 85, 120, 10);
        this.setPositionYRelativ(0);
        // this.startAnimation();
        // this.play();

    }

    upDate() {
        super.upDate();
        if (this.health < 1) {
            this.dropLoot();
            this.status = 'dead';
        } else if (this.status == 'idle' || this.status == 'walk') {
            if (this.checkDistance() < 0) {
                this.faceingLeft = false;
            } else {
                this.faceingLeft = true;
            }
            if (this.checkDistance() < -150) {
                this.moveRight();
                this.status = 'walk'
            } else if (this.checkDistance() > 140 && this.checkDistance() < 350) {
                this.moveLeft();
                this.status = 'walk'
            } else if (this.checkDistance() > 350) {
                this.status = 'idle'
            } else {
                if (this.isHiting(Character.storage[0])) {
                    this.strike(Character.storage[0]);
                    let attack = (this.attackCount % 3) + 1;
                    this.status = `attack${attack}`;
                    this.attackCount++;
                }
            }
        }
    }

    play() {
        this.setAndSaveIntervall(() => {

            if (this.health < 1) {
                this.dropLoot();
                this.status = 'dead';
            } else if (this.status == 'idle' || this.status == 'walk') {
                if (this.checkDistance() < 0) {
                    this.faceingLeft = false;
                } else {
                    this.faceingLeft = true;
                }
                if (this.checkDistance() < -150) {
                    this.moveRight();
                    this.status = 'walk'
                } else if (this.checkDistance() > 140 && this.checkDistance() < 350) {
                    this.moveLeft();
                    this.status = 'walk'
                } else if (this.checkDistance() > 350) {
                    this.status = 'idle'
                } else {
                    if (this.isHiting(Character.storage[0])) {
                        this.strike(Character.storage[0]);
                        let attack = (this.attackCount % 3) + 1;
                        this.status = `attack${attack}`;
                        this.attackCount++;
                    }
                }
            }



        }, 1000 / 60);
    }

    dropLoot() {
        if (this.loot > 0) {
            Coin.produce(this.positionX + (this.width / 2), 'cash', true);
            this.loot--;
            const sound = new Audio(this.lootDrop);
            sound.play();
        }
    }

    checkDistance() {
        return this.positionX - Character.storage[0].positionX;
    }
}