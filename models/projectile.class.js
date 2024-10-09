class Projectile extends MoveableObject {

    IDLE = MAGICBLAST;
    DEAD = MAGIC_EXPLOSION;
    movingLeft = true;

    constructor(x = 600) {
        super(x, 85, false);
        this.loadImage(this.IDLE[0]);
        this.setImages('idle', this.IDLE);
        this.setImages('dead', this.DEAD);
        this.status = 'idle';

        this.setHitboxOffset(0, 0, 40, 40, -20);
        this.setHitbox();
        // this.changeHitbox(50, 50);
        this.faceingLeft = true;

    }

    upDate() {
        super.upDate();
        this.move(this.movingLeft);
        this.touch();

    }

    move(left) {
        if (this.status == 'idle') {
            if (left) {
                this.moveLeft(false);
            } else {
                this.moveRight(false);
            }
        }
    }

    touch() {
        if (this.status == 'idle') {
            if (this.isColliding(Character.storage[0])) {
                this.onCollision();
                Character.storage[0].knockback(15);
            }
            if (Boss.storage[0]) {
                if (this.isColliding(Boss.storage[0])) {
                    this.onCollision();
                }
            }

        }

    }

    onCollision() {
        // console.log(this.hitbox);
        // console.log(new Error().stack);

        this.status = 'dead';
    }
}