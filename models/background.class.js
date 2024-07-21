class Background extends DrawableObject {

    constructor(path, x) {
        super(x, 0);
        this.loadImage(path);
        this.height = 480;
        this.width = 720;
        this.positionX = x * this.width;
        this.setPositionYRelativ(0);
    }
}