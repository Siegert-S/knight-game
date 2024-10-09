class DrawableObject extends ManageableObject {
    positionX = 0;
    positionXrevers = 0;
    positionY = 0;
    width = 40;
    height = 40;
    img;
    faceingLeft = false;
    groundlevel = 480;






    constructor(x = 0, y = 0) {
        super();
        this.positionX = x;
        this.setPositionYRelativ(y);
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw() {
        if (!this.faceingLeft) {
            try {
                ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);
            } catch (error) {
                console.log(this);

                console.log(this.img);
            }
        } else {
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            this.positionXrevers = (this.positionX - 20) * -1;
            ctx.drawImage(this.img, this.positionXrevers, this.positionY, this.width, this.height);
            ctx.restore();
        }
    }

    drawRect() {
        if (this instanceof MoveableObject) {
            if (!this.faceingLeft) {
                ctx.beginPath();
                ctx.lineWidth = '2';
                ctx.strokeStyle = 'blue';
                ctx.rect(this.positionX, this.positionY, this.width, this.height);
                ctx.stroke();
            } else {
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
        }
    }


    setPositionYRelativ(setY) {
        this.positionY = this.getGroundHeight() - setY;
    }

    getGroundHeight() {
        return this.groundlevel - this.height;
    }

}