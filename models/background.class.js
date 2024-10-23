class Background extends DrawableObject {

    /**
     * Creates an instance of the Background class.
     * @param {string} path - The file path of the background image.
     * @param {number} x - The horizontal position multiplier for the background.
     */
    constructor(path, x) {
        super(x, 0);
        this.loadImage(path);
        this.height = 480;
        this.width = 720;
        this.positionX = x * this.width;
        this.setPositionYRelativ(0);
    }
}