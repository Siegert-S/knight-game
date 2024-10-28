class Character extends FightingObject {

    cash = 0;
    gameOver = false;

    IDLE = KNIGHT_IDLE;
    WALK = KNIGHT_WALK;
    JUMP = KNIGHT_JUMP;
    DEFEND = KNIGHT_DEFEND;
    ATTACK = KNIGHT_ATTACK;
    HURT = KNIGHT_HURT;
    DEAD = KNIGHT_DEAD;

    /**
     * Constructor for the character  class, initializing default settings and configurations.
     * Loads initial image, sets up hitbox and attack box dimensions, and adjusts Y-position.
     */
    constructor() {
        super();
        this.loadImage(this.IDLE[0]);
        this.setAllImages();
        this.setValues();
        this.setHitboxOffset(55, 20, 85, 130)
        this.setAttackboxOffset(140, 10, 80, 130, 35);
        this.setPositionYRelativ(0);
    }

    /**
     * Loads and configures all image states for the character or entity.
     * Each state (idle, walk, attack, dead, hurt, jump, defend) is associated with a set of images.
     */
    setAllImages() {
        this.setImages('idle', this.IDLE);
        this.setImages('walk', this.WALK);
        this.setImages('attack', this.ATTACK);
        this.setImages('dead', this.DEAD);
        this.setImages('hurt', this.HURT);
        this.setImages('jump', this.JUMP);
        this.setImages('defend', this.DEFEND);
    }

    /**
     * Sets the initial values for various character  properties.
     * Includes health, max health, power, armor, speed, position, width, and height.
     */
    setValues() {
        this.health = 100 + (player.health * 5);
        this.maxhealth = 100 + (player.health * 5);
        this.power = 15 * (player.attack + 1);
        this.armor = 5 * (player.armor + 1);
        this.speedX = 4;

        this.positionX = 50;
        this.width = 220;
        this.height = 150;
    }

    /**
     * Updates the object’s state, including input checks, hitbox adjustments, and camera positioning.
     * If the object's status is set to "defend," it adjusts the hitbox offset based on the facing direction.
     * For any other status, a default hitbox offset is applied.
     */
    upDate() {
        super.upDate();
        this.inputCheck();
        if (this.status == 'defend') {
            if (this.faceingLeft) {
                this.setHitboxOffset(70, 20, 85, 130, 5);
            } else {
                this.setHitboxOffset(40, 20, 85, 130, 5);
            }
        }
        if (!(this.status == 'defend')) {
            this.setHitboxOffset(55, 20, 85, 130, 5)
        }
        system.world.cameraX = -(this.positionX - 50);
    }

    /**
     * Checks the character's status and health to determine allowable input actions.
     * If the character's status is 'idle', 'walk', or 'jump', it checks if health is above zero.
     * - Sets status to 'dead' if health is zero or below.
     * - Otherwise, allows further key input checks.
     */
    inputCheck() {
        if (this.status == 'idle' || this.status == 'walk' || this.status == 'jump') {
            if (this.health < 1) {
                this.status = 'dead';
            } else {
                this.checkKeyInput();
            }
        }
    }

    /**
     * Checks for player key input and adjusts character state accordingly.
     * Sets the character to defend if the down key is pressed, attacks if the space key is pressed,
     * otherwise checks movement input or resets to idle.
     */
    checkKeyInput() {
        if (keyboard.DOWN) {
            this.setDefend();
            this.status = 'defend';
        } else if (keyboard.SPACE) {
            this.doAttack();
            this.status = 'attack';
        } else {
            this.checkMovementInput();
            this.resetToIdle();
        }
    }

    /**
     * Checks movement-related key inputs and updates the character's state.
     * Triggers jump if the up key is pressed, moves the character right if the right key is pressed,
     * and moves the character left if the left key is pressed.
     */
    checkMovementInput() {
        if (keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.status = 'jump';
        }
        if (keyboard.RIGHT && this.positionX < 6500) {
            this.moveRight();
            this.status = 'walk';
        }
        if (keyboard.LEFT && this.positionX > 50) {
            this.moveLeft();
            this.status = 'walk';
        }
    }

    /**
     * Resets the character's status to idle if no movement keys are pressed.
     * Specifically checks if the character was walking and changes status to 'idle' if
     * right, left, or up keys are not actively pressed.
     */
    resetToIdle() {
        if (!keyboard.RIGHT && !keyboard.LEFT && !keyboard.UP) {
            if (this.status == 'walk') {
                this.status = 'idle';
            }
        }
    }

    /**
     * Executes an attack by checking for a hit on enemies, projectiles, or bosses in sequence.
     * If a hit is detected, it triggers a strike on the target; otherwise, it plays a miss sound.
     */
    doAttack() {
        let hitEnemy;
        hitEnemy = this.checkHit(Enemy);
        if (hitEnemy == null) {
            hitEnemy = this.checkHit(Projectile);
        }
        if (hitEnemy == null) {
            hitEnemy = this.checkHit(Boss);
        }
        if (hitEnemy != null) {
            this.strike(hitEnemy);
        } else {
            this.weaponSound(false);
        }
    }

    /**
     * Checks if an attack has hit any target within the specified class type's storage.
     *
     * @param {Object} classRef - A reference to the class type being checked for hits ( Enemy, Projectile, Boss).
     * @returns {Object|null} - Returns the first detected target that was hit, or null if no target was hit.
     */
    checkHit(classRef) {
        for (let i = 0; i < classRef.storage.length; i++) {
            let enemy = classRef.storage[i];
            if (this.isHiting(enemy)) {
                return enemy;
            }
        }
        return null;
    }

}