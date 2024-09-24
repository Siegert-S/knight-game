class MoveableObject extends CollidableObject {

    speedX = 3;
    speedY = 0;
    // gForce = 0.1;
    gForce = 0.2;
    direction = 'left';
    throwID;
    groundlevel = 460;
    gravityIs;

    walking_sound_1 = 'assets/audio/sfx/footsteps/footstep_grass_000.ogg';
    walking_sound_2 = 'assets/audio/sfx/footsteps/footstep_grass_002.ogg';

    WALK;
    JUMP;

    step = true;
    laststep = 0;

    constructor(x = 0, y = 0, gravity = true) {
        super(x, y);
        this.gravityIs = gravity;
    }

    upDate() {
        super.upDate();
        if (this.gravityIs) {
            this.gravity();
        }
    }

    moveRight() {
        this.positionX += this.speedX;
        this.faceingLeft = false;
        this.footSteps();
    }

    moveLeft() {
        this.positionX -= this.speedX;
        this.faceingLeft = true;
        this.footSteps();
    }

    applyGravity() {
        this.setAndSaveIntervall(() => {
            this.gravity();
        }, 1000 / 120);
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
        if (this.isSteping()) {
            if (this.step) {
                let sound1 = new Audio(this.walking_sound_1);
                sound1.volume = 0.18;
                sound1.play();
                this.step = false;
            } else {
                let sound2 = new Audio(this.walking_sound_2);
                sound2.volume = 0.18;
                sound2.play();
                this.step = true;
            }
            this.setStep();
        }

    }

    isSteping() {
        let time = new Date().getTime();
        let timepassed = time - this.laststep;
        return timepassed > 300;
    }

    setStep() {
        this.laststep = new Date().getTime();
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