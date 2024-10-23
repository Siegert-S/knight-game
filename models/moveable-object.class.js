class MoveableObject extends CollidableObject {

    speedX = 3;
    speedY = 0;
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

    /**
     * Constructor for an object with optional gravity.
     * Calls the parent constructor and initializes gravity settings.
     * 
     * @param {number} [x=0] - The x-coordinate of the object.
     * @param {number} [y=0] - The y-coordinate of the object.
     * @param {boolean} [gravity=true] - Whether gravity is enabled for the object.
     */
    constructor(x = 0, y = 0, gravity = true) {
        super(x, y);
        this.gravityIsOn = gravity;
    }

    /**
     * Updates the object state. 
     * If gravity is enabled, applies gravity to the object.
     */
    upDate() {
        super.upDate();
        if (this.gravityIsOn) {
            this.gravity();
        }
    }

    /**
     * Moves the object to the right and optionally plays footstep sounds.
     * 
     * @param {boolean} [walk=true] - Whether to play footstep sounds when moving.
     */
    moveRight(walk = true) {
        this.positionX += this.speedX;
        this.faceingLeft = false;
        if (walk) {
            this.footSteps();
        }
    }

    /**
     * Moves the object to the left and optionally plays footstep sounds.
     * 
     * @param {boolean} [walk=true] - Whether to play footstep sounds when moving.
     */
    moveLeft(walk = true) {
        this.positionX -= this.speedX;
        this.faceingLeft = true;
        if (walk) {
            this.footSteps();
        }
    }

    /**
     * Applies a knockback effect to the object, moving it backwards and setting its status to "hurt".
     * 
     * @param {number} power - The strength of the knockback.
     */
    knockback(power) {
        this.positionX -= power;
        this.status = 'hurt';
    }

    /**
     * Applies gravity to the object, reducing its vertical speed until it reaches the ground.
     */
    gravity() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.positionY -= this.speedY;
            this.speedY -= this.gForce;
        } else {
            this.speedY = 0;
        }
    }

    /**
     * Checks if the object is above the ground.
     * 
     * @returns {boolean} - Returns true if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this.positionY > this.getGroundHeight()) {
            this.positionY = this.getGroundHeight()
        }
        let check = this.positionY < this.getGroundHeight();
        return check;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     * 
     * @param {number} [speed=9] - The speed of the jump.
     */
    jump(speed = 9) {
        this.speedY = speed;
    }

    /**
     * Throws the object in a specified direction with a certain height and horizontal speed.
     * 
     * @param {number} height - The height of the throw (vertical speed).
     * @param {number} speed - The horizontal speed of the throw.
     */
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

    /**
     * Plays footstep sounds while the object is moving.
     */
    footSteps() {
        if (!this.isSteping()) {
            if (this.step) {
                let sound1 = new Audio(this.walking_sound_1);
                sound1.volume = audio.SFX / 100;
                sound1.play();
                this.step = false;
            } else {
                let sound2 = new Audio(this.walking_sound_2);
                sound2.volume = audio.SFX / 100;
                sound2.play();
                this.step = true;
            }
            this.setStep();
        }
    }

    /**
     * Checks if the object is stepping (time-based check to control sound timing).
     * 
     * @returns {boolean} - Returns true if the object is stepping, otherwise false.
     */
    isSteping() {
        return this.checkTime('laststep', 300);
    }

    /**
     * Sets the last step time to the current time.
     */
    setStep() {
        this.setTime('laststep');
    }

    /**
     * Checks if a certain time duration has passed since a recorded event.
     * 
     * @param {string} name - The name of the time variable.
     * @param {number} duration - The duration in milliseconds to check against.
     * @returns {boolean} - Returns true if the duration has not yet passed, otherwise false.
     */
    checkTime(name, duration) {
        let time = new Date().getTime();
        let timepassed = time - this[name];
        return timepassed < duration;
    }

    /**
     * Sets the current time for a named event.
     * 
     * @param {string} name - The name of the time variable to set.
     */
    setTime(name) {
        this[name] = new Date().getTime();
    }
}