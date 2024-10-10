class Projectile extends MoveableObject {

    IDLE = MAGICBLAST;
    DEAD = MAGIC_EXPLOSION;
    movingLeft = true;
    power;


    constructor(x = 600, power = 150) {
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

    upDate() {
        super.upDate();
        // this.move(this.movingLeft);
        this.touch();
        this.outOfBounds();
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
        // console.log('touch check');
        // console.log(this.status);
        if (this.status == 'idle') {
            // console.log('projectile is idle');

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

    outOfBounds() {
        if (this.positionX < -20 || this.positionX > 6700) {
            this.deleteSelf();
        }
    }

    onCollision(target) {
        if (this.status != 'dead') {
            this.status = 'dead';
            // console.log(this.status);

            // console.log('collide with');
            // console.log(target);

            if (target.isDefending()) {
                // console.log('target is defending');

                let damage = (this.power - target.armor < 0) ? 0 : this.power - target.armor;
                target.health -= damage;
            } else {
                // console.log('target is not defending');
                target.health -= this.power;
            }

        }

    }
}