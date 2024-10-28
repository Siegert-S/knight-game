class Boss extends FightingObject {

    IDLE = MAGE_IDLE;
    HURT = MAGE_HURT;
    DEAD = MAGE_DEAD;
    ATTACK = MAGE_ATTACK;
    SPELLCAST = MAGE_SPELLCAST;

    attackCount = 0;

    loot;
    lootDrop = 'assets/audio/sfx/coin/impactMetal_light_004.ogg';

    /**
     * Constructs an enemy object with a given difficulty, setting initial properties like position, image, and hitbox.
     * @constructor
     * @param {number} [difficulty=1] - The difficulty level which influences the power, health, and loot of the enemy.
     */
    constructor(difficulty = 1) {
        super(5500, 0);
        this.loadImage(this.IDLE[0]);
        this.setAllImages();
        this.setValues(difficulty);
        this.setHitboxOffset(50, 18, 80, 133, -5);
        this.setAttackboxOffset(110, 20, 90, 100, 10);
        this.setPositionYRelativ(0);
    }

    /**
     * Loads and sets all the animation images (idle, cast, dead, hurt, attack) for the enemy.
     */
    setAllImages() {
        this.setImages('idle', this.IDLE);
        this.setImages('cast', this.SPELLCAST);
        this.setImages('dead', this.DEAD);
        this.setImages('hurt', this.HURT);
        this.setImages('attack', this.ATTACK);
    }

    /**
     * Sets various values such as power, health, and size based on the difficulty level.
     * @param {number} difficulty - The difficulty level affecting attributes like power, health, and loot.
     */
    setValues(difficulty) {
        this.faceingLeft = true;
        this.power = 10 * difficulty;
        this.speedX = 0;
        this.health = 50 * difficulty;
        this.maxhealth = 50 * difficulty;
        this.loot = 3 * difficulty;
        this.width = 220;
        this.height = 150;
    }

    /**
     * Checks and returns the horizontal distance between this enemy and the player character.
     * @returns {number} - The distance between the enemy and the player character.
     */
    checkDistance() {
        return this.positionX - Character.storage[0].positionX;
    }

    /**
     * Drops loot (coins) at the enemy's position if loot is available, playing a sound when dropping.
     */
    dropLoot() {
        if (this.loot > 0) {
            Coin.produce(this.positionX + (this.width / 2), 'cash', true);
            this.loot--;
            const sound = new Audio(this.lootDrop);
            sound.volume = audio.volume / 100;
            sound.play();
        }
    }

    /**
     * Updates the enemy's state, checking for health, distance to the player, and deciding between idle, attack, or cast actions.
     */
    upDate() {
        super.upDate();
        let distance = this.checkDistance();
        if (this.health < 1) {
            this.dropLoot();
            this.status = 'dead';
        } else if (this.status == 'idle' || this.status == 'walk') {
            this.faceingLeft = (distance < 0) ? false : true;
            if (distance > 160 && distance < 400) {
                this.rangedAttack();
            } else if (distance > -140 && distance < 160) {
                this.meleeAttack();
            }
        }
    }

    /**
     * Initiates a ranged attack by casting a projectile towards the player character.
     */
    rangedAttack() {
        this.status = `cast`;
        Projectile.produce(this.positionX + 20, this.power);
    }

    /**
     * Performs a melee attack if the enemy is in range and can hit the player character.
     */
    meleeAttack() {
        if (this.isHiting(Character.storage[0])) {
            this.strike(Character.storage[0]);
        }
        this.status = 'attack'
    }
}