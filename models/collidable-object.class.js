class CollidableObject extends AnimatedObject {
    hitbox = new Box(0, 0, this.width, this.height, 0);

    hitboxOffset = {
        "posX": 0,
        "posY": 0,
        "posXmirror": 0,
    };

    /**
     * Constructor for the object with initial position (x, y).
     * Calls the parent constructor.
     * 
     * @param {number} [x=0] - The x-coordinate of the object.
     * @param {number} [y=0] - The y-coordinate of the object.
     */
    constructor(x = 0, y = 0) {
        super(x, y);
    }

    /**
     * Changes the hitbox dimensions.
     * 
     * @param {number} width - The new width of the hitbox.
     * @param {number} height - The new height of the hitbox.
     */
    changeHitbox(width, height) {
        this.hitbox.width = width;
        this.hitbox.height = height;
    }

    /**
     * Updates the hitbox position based on the object's current position and orientation.
     */
    setHitbox() {
        if (!this.faceingLeft) {
            this.hitbox.relocateBox(this.positionX + this.hitboxOffset.posX, this.positionY + this.hitboxOffset.posY);
        } else {
            this.hitbox.relocateBox(this.positionX + this.hitboxOffset.posX + this.hitboxOffset.posXmirror, this.positionY + this.hitboxOffset.posY);
        }
    }

    /**
     * Sets the offset values for the hitbox and adjusts the hitbox dimensions.
     * 
     * @param {number} x - The x-offset of the hitbox.
     * @param {number} y - The y-offset of the hitbox.
     * @param {number} w - The width of the hitbox.
     * @param {number} h - The height of the hitbox.
     * @param {number} xm - The mirrored x-offset for when the object is facing left.
     */
    setHitboxOffset(x, y, w, h, xm) {
        this.hitboxOffset.posX = x;
        this.hitboxOffset.posY = y;
        this.changeHitbox(w, h);
        this.hitboxOffset.posXmirror = xm;
    }

    /**
     * Draws the object and updates its hitbox.
     */
    draw() {
        super.draw();
        this.setHitbox();
    }

    /**
     * Draws the object's hitbox on the canvas.
     * 
     * This method visually renders the hitbox for debugging purposes.
     */
    drawHitbox() {
        this.setHitbox();
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = this.hitbox.color;
        ctx.rect(this.hitbox.posX1, this.hitbox.posY1, this.hitbox.width, this.hitbox.height);
        ctx.stroke();
    }

    /**
     * Checks if the object is colliding with another object by comparing hitboxes.
     * 
     * @param {Object} object - The object to check collision with.
     * @returns {boolean} - Returns true if the two objects are colliding, otherwise false.
     */
    isColliding(object) {
        return this.isOverlapping(this.hitbox, object.hitbox);
    }

    /**
     * Determines if two hitboxes are overlapping.
     * 
     * @param {Object} thisBox - The hitbox of the current object.
     * @param {Object} targetBox - The hitbox of the target object.
     * @returns {boolean} - Returns true if the hitboxes overlap, otherwise false.
     */
    isOverlapping(thisBox, targetBox) {
        let leftEdge = thisBox.posX2 >= targetBox.posX1 && targetBox.posX1 >= thisBox.posX1;
        let rightEdge = thisBox.posX2 >= targetBox.posX2 && targetBox.posX2 >= thisBox.posX1;
        let center = thisBox.posX2 <= targetBox.posX2 && targetBox.posX1 <= thisBox.posX1;

        let top = thisBox.posY2 >= targetBox.posY1 && targetBox.posY1 >= thisBox.posY1;
        let bottom = thisBox.posY2 >= targetBox.posY2 && targetBox.posY2 >= thisBox.posY1;
        let vcenter = thisBox.posY2 <= targetBox.posY2 && targetBox.posY1 <= thisBox.posY1;

        let horizontal = leftEdge || rightEdge || center;
        let vertical = top || bottom || vcenter;

        return horizontal && vertical;
    }

    /**
     * Placeholder for handling collision logic.
     * 
     * Override this function to define custom collision behavior.
     */
    onCollision() {
        // Custom collision behavior goes here.
    }
}
