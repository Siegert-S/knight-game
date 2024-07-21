class CollidableObject extends AnimatedObject {
    hitbox = new Box(0, 0, this.width, this.height, 0);

    hitboxOffset = {
        "posX": 0,
        "posY": 0,
        "posXmirror": 0,
    };

    constructor(x = 0, y = 0) {
        super(x, y);
    }


    changeHitbox(width, height) {
        this.hitbox.width = width;
        this.hitbox.height = height;
    }

    setHitbox() {
        if (!this.faceingLeft) {
            this.hitbox.relocateBox(this.positionX + this.hitboxOffset.posX, this.positionY + this.hitboxOffset.posY);
        } else {
            this.hitbox.relocateBox(this.positionX + this.hitboxOffset.posX + this.hitboxOffset.posXmirror, this.positionY + this.hitboxOffset.posY);
        }
    }

    setHitboxOffset(x, y, w, h, xm) {
        this.hitboxOffset.posX = x;
        this.hitboxOffset.posY = y;
        this.changeHitbox(w, h);
        this.hitboxOffset.posXmirror = xm;
    }

    draw() {
        super.draw();
        this.setHitbox();
    }

    drawHitbox() {
        this.setHitbox();
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = this.hitbox.color;
        ctx.rect(this.hitbox.posX1, this.hitbox.posY1, this.hitbox.width, this.hitbox.height);
        ctx.stroke();
    }

    isColliding(object) {
        let leftEdge = this.hitbox.posX2 >= object.hitbox.posX1 && object.hitbox.posX1 >= this.hitbox.posX1;
        let rightEdge = this.hitbox.posX2 >= object.hitbox.posX2 && object.hitbox.posX2 >= this.hitbox.posX1;
        let center = this.hitbox.posX2 <= object.hitbox.posX2 && object.hitbox.posX1 <= this.hitbox.posX1;

        let top = this.hitbox.posY2 >= object.hitbox.posY1 && object.hitbox.posY1 >= this.hitbox.posY1;
        let bottom = this.hitbox.posY2 >= object.hitbox.posY2 && object.hitbox.posY2 >= this.hitbox.posY1;
        let vcenter = this.hitbox.posY2 <= object.hitbox.posY2 && object.hitbox.posY1 <= this.hitbox.posY1;

        let horizontal = leftEdge || rightEdge || center;
        let vertical = top || bottom || vcenter;

        return horizontal && vertical;
    }

    onCollision() {

    }
}
