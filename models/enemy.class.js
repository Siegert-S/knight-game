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

    /**
     * Creates an instance of the character with specified initial x-position and difficulty level.
     * Initializes images, hitbox, attack box, and positional offsets.
     *
     * @param {number} [x=500] - The initial x-position of the character.
     * @param {number} [difficulty=1] - The difficulty level, affecting power, health, and loot.
     */
    constructor(x = 500, difficulty = 1) {
        super(x, 0);
        this.loadImage(this.IDLE[0]);
        this.setAllImages();
        this.setValues(difficulty);
        this.setHitboxOffset(45, 50, 115, 100, -5);
        this.setAttackboxOffset(135, 80, 75, 80, 10);
        this.setPositionYRelativ(0);
    }

    /**
     * Loads all character images into designated animation states.
     * Sets images for idle, walking, attacking (different types), dead, and hurt states.
     */
    setAllImages() {
        this.setImages('idle', this.IDLE);
        this.setImages('walk', this.WALK);
        this.setImages('attack1', this.ATTACK1);
        this.setImages('attack2', this.ATTACK2);
        this.setImages('attack3', this.ATTACK3);
        this.setImages('dead', this.DEAD);
        this.setImages('hurt', this.HURT);
    }

    /**
     * Sets character's attribute values based on the difficulty level.
     * Adjusts health, maximum health, power, speed, loot, width, and height.
     *
     * @param {number} difficulty - The difficulty level, which scales power, health, and loot rewards.
     */
    setValues(difficulty) {
        this.faceingLeft = true;
        this.power = 5 * difficulty;
        this.speedX = 2;
        this.health = 20 * difficulty;
        this.maxhealth = 20 * difficulty;
        this.loot = 1 * difficulty;
        this.width = 220;
        this.height = 150;
    }

    /**
     * Updates the character's state each frame.
     * If the character's health is less than 1, it drops loot and sets its status to 'dead'.
     * If the character is in idle or walking status, it checks the facing direction 
     * and determines whether to move or attack based on the distance to the player.
     */
    upDate() {
        super.upDate();
        if (this.health < 1) {
            this.dropLoot();
            this.status = 'dead';
        } else if (this.status == 'idle' || this.status == 'walk') {
            this.setingFaceingDirection();
            this.checkForMoveOrAttack();
        }
    }

    /**
     * Sets the facing direction of the character based on the distance to the player.
     * If the distance is negative, the character is facing right; otherwise, it faces left.
     */
    setingFaceingDirection() {
        if (this.checkDistance() < 0) {
            this.faceingLeft = false;
        } else {
            this.faceingLeft = true;
        }
    }

    /**
     * Determines whether the character should move or attack based on its distance to the player.
     * If the character is too far away, it will move towards the player.
     * If it is within attacking range, it will attempt to strike the player.
     */
    checkForMoveOrAttack() {
        if (this.checkDistance() < -150) {
            this.doMove(false);
        } else if (this.checkDistance() > 140 && this.checkDistance() < 350) {
            this.doMove(true);
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

    /**
     * Moves the character in the specified direction.
     * If 'left' is true, the character moves left; otherwise, it moves right.
     *
     * @param {boolean} left - Indicates the direction to move: true for left, false for right.
     */
    doMove(left) {
        if (left) {
            this.moveLeft();
            this.status = 'walk'
        } else {
            this.moveRight();
            this.status = 'walk'
        }
    }

    /**
     * Drops loot in the form of a coin at the character's position.
     * Plays a sound effect for loot drop if the character has remaining loot.
     * Decreases the loot count by one after each drop.
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
     * Calculates the horizontal distance between this character and the main player character.
     *
     * @returns {number} - The distance in pixels between this character and the main player.
     */
    checkDistance() {
        return this.positionX - Character.storage[0].positionX;
    }
}