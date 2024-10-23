class DrawableObject extends ManageableObject {
    positionX = 0;
    positionXrevers = 0;
    positionY = 0;
    width = 40;
    height = 40;
    img;
    faceingLeft = false;
    groundlevel = 480;

    /**
    * Constructor for the object.
    * 
    * Initializes the object's position using the provided x and y coordinates.
    * 
    * @param {number} [x=0] - The x-coordinate of the object. Defaults to 0.
    * @param {number} [y=0] - The y-coordinate relative to the ground. Defaults to 0.
    */
    constructor(x = 0, y = 0) {
        super();
        this.positionX = x;
        this.setPositionYRelativ(y);
    }

    /**
    * Loads an image from a given file path.
    * 
    * @param {string} path - The path to the image file.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Draws the object on the canvas.
    * 
    * If the object is facing left, it flips the image horizontally; otherwise, it draws the image normally.
    */
    draw() {
        if (!this.faceingLeft) {
            ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);

        } else {
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            this.positionXrevers = (this.positionX - 20) * -1;
            ctx.drawImage(this.img, this.positionXrevers, this.positionY, this.width, this.height);
            ctx.restore();
        }
    }

    /**
    * Draws a rectangle around the object, representing its bounding box.
    * 
    * Calls a different method depending on the direction the object is facing.
    */
    drawRect() {
        if (this instanceof MoveableObject) {
            if (!this.faceingLeft) {
                this.drawFrame();
            } else {
                this.drawFrameMirrored();
            }
        }
    }

    /**
    * Draws a blue rectangle around the object on the canvas.
    */
    drawFrame() {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.positionX, this.positionY, this.width, this.height);
        ctx.stroke();
    }

    /**
    * Draws a mirrored blue rectangle around the object when it is facing left.
    */
    drawFrameMirrored() {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.positionXrevers = (this.positionX - 20) * -1;
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.positionXrevers, this.positionY, this.width, this.height);
        ctx.stroke();
        ctx.restore();
    }

    /**
    * Sets the Y position of the object relative to the ground.
    * 
    * @param {number} setY - The vertical offset from the ground.
    */
    setPositionYRelativ(setY) {
        this.positionY = this.getGroundHeight() - setY;
    }

    /**
    * Gets the height of the ground relative to the object's height.
    * 
    * @returns {number} The Y coordinate representing the ground level minus the object's height.
    */
    getGroundHeight() {
        return this.groundlevel - this.height;
    }
}