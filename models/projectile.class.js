class Projectile extends MoveableObject {

    IDLE = MAGICBLAST;
    DEAD = MAGIC_EXPLOSION;
    movingLeft = true;
    power;

    /**
     * Constructs a projectile object with a given position and power.
     * @constructor
     * @param {number} [x=600] - The initial X position of the projectile.
     * @param {number} [power=15] - The attack power of the projectile.
     */
    constructor(x = 600, power = 15) {
        super(x, 85, false);
        this.power = power;
        this.loadImage(this.IDLE[0]);
        this.setImages('idle', this.IDLE);
        this.setImages('dead', this.DEAD);
        this.status = 'idle';

        this.setHitboxOffset(0, 0, 40, 40, -20);
        this.setHitbox();
        this.faceingLeft = true;

    }

    /**
     * Updates the projectile's position, checks for collisions, and handles boundary limits.
     */
    upDate() {
        super.upDate();
        this.move(this.movingLeft);
        this.touch();
        this.outOfBounds();
    }

    /**
     * Moves the projectile left or right, depending on the specified direction and its current status.
     * @param {boolean} left - Indicates if the projectile is moving left.
     */
    move(left) {
        if (this.status == 'idle') {
            if (left) {
                this.moveLeft(false);
            } else {
                this.moveRight(false);
            }
        }
    }

    /**
     * Checks for collisions with the player character or the boss, triggering the onCollision method if contact occurs.
     */
    touch() {
        if (this.status == 'idle') {
            if (this.isColliding(Character.storage[0])) {
                this.onCollision(Character.storage[0]);
                Character.storage[0].knockback(15);
            }
            if (Boss.storage[0]) {
                if (this.isColliding(Boss.storage[0])) {
                    this.onCollision(Boss.storage[0]);
                }
            }
        }
    }

    /**
     * Deletes the projectile if it moves out of the game boundaries.
     */
    outOfBounds() {
        if (this.positionX < -20 || this.positionX > 6700) {
            this.deleteSelf();
        }
    }

    /**
     * Handles collision with a target (either the player or a boss). Deals damage based on whether the target is defending.
     * @param {Object} target - The object the projectile collided with.
     */
    onCollision(target) {
        if (this.status != 'dead') {
            this.status = 'dead';
            if (target.isDefending()) {
                let damage = (this.power - target.armor < 0) ? 0 : this.power - target.armor;
                target.health -= damage;
            } else {
                target.health -= this.power;
            }
        }
    }

}