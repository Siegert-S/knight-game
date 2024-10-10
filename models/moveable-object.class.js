class MoveableObject extends CollidableObject {

    speedX = 3;
    speedY = 0;
    // gForce = 0.1;
    gForce = 0.2;
    direction = 'left';
    throwID;
    groundlevel = 460;
    gravityIsOn;

    walking_sound_1 = 'assets/audio/sfx/footsteps/footstep_grass_000.ogg';
    walking_sound_2 = 'assets/audio/sfx/footsteps/footstep_grass_002.ogg';

    WALK;
    JUMP;

    step = true;
    laststep = 0;

    constructor(x = 0, y = 0, gravity = true) {
        super(x, y);
        this.gravityIsOn = gravity;
    }

    upDate() {
        super.upDate();
        if (this.gravityIsOn) {
            this.gravity();
        }
    }

    moveRight(walk = true) {
        this.positionX += this.speedX;
        this.faceingLeft = false;
        if (walk) {
            this.footSteps();
        }
    }

    moveLeft(walk = true) {
        this.positionX -= this.speedX;
        this.faceingLeft = true;
        if (walk) {
            this.footSteps();
        }
    }

    knockback(power) {
        this.positionX -= power;
        this.status = 'hurt';
    }

    gravity() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.positionY -= this.speedY;
            this.speedY -= this.gForce;
        } else {
            this.speedY = 0;
        }
    }

    isAboveGround() {
        if (this.positionY > this.getGroundHeight()) {
            this.positionY = this.getGroundHeight()
        }
        let check = this.positionY < this.getGroundHeight();

        return check;
    }

    // jump(speed = 6) {
    //     this.speedY = speed;
    // }

    jump(speed = 9) {
        this.speedY = speed;
    }

    throw(height, speed) {
        this.jump(height);
        this.speedX = speed;

        this.throwID = setInterval(() => {
            if (this.isAboveGround()) {
                this.positionX += this.speedX;
            } else {
                clearInterval(this.throwID);
            }
        }, 1000 / 60);
    }

    footSteps() {
        if (!this.isSteping()) {
            if (this.step) {
                let sound1 = new Audio(this.walking_sound_1);
                // sound1.volume = 0.18;
                sound1.volume = audio.SFX / 100;
                sound1.play();
                this.step = false;
            } else {
                let sound2 = new Audio(this.walking_sound_2);
                // sound2.volume = 0.18;
                sound2.volume = audio.SFX / 100;
                sound2.play();
                this.step = true;
            }
            this.setStep();
        }

    }

    isSteping() {
        return this.checkTime('laststep', 300);
    }

    setStep() {
        this.setTime('laststep');
    }

    checkTime(name, duration) {
        let time = new Date().getTime();
        let timepassed = time - this[name];
        return timepassed < duration;
    }

    setTime(name) {
        this[name] = new Date().getTime();
    }

    // animateObject() {
    //     if (this.status == 'walk') {
    //         this.animateImage(this.WALK);
    //     }
    //     if (this.status == 'jump') {
    //         this.animateImage(this.JUMP);
    //     }
    //     super.animateObject();
    // }
}