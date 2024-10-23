class Box {
    posX1;
    posY1;
    posX2;
    posY2;
    width;
    height;
    color;

    /**
     * Constructor for creating a rectangular box object.
     * Initializes position, dimensions, and color.
     * 
     * @param {number} x - The x-coordinate of the top-left corner of the box.
     * @param {number} y - The y-coordinate of the top-left corner of the box.
     * @param {number} w - The width of the box.
     * @param {number} h - The height of the box.
     * @param {number} color - A selector for the color of the box (0 or 1).
     */
    constructor(x, y, w, h, color) {
        this.posX1 = x;
        this.posY1 = y;
        this.width = w;
        this.height = h;
        this.setX2();
        this.setY2();
        this.setColor(color);
    }

    /**
     * Sets the right edge (`posX2`) of the box based on its left edge (`posX1`) and width.
     */
    setX2() {
        this.posX2 = this.posX1 + this.width;
    }

    /**
     * Sets the bottom edge (`posY2`) of the box based on its top edge (`posY1`) and height.
     */
    setY2() {
        this.posY2 = this.posY1 + this.height;
    }

    /**
     * Relocates the box to new x and y coordinates, and updates its edges.
     * 
     * @param {number} x - The new x-coordinate of the top-left corner of the box.
     * @param {number} y - The new y-coordinate of the top-left corner of the box.
     */
    relocateBox(x, y) {
        this.posX1 = x;
        this.posY1 = y;
        this.setX2();
        this.setY2();
    }

    /**
     * Sets the color of the box based on a selector value.
     * 
     * @param {number} selector - A number used to select the box color. 
     *                            0 sets the color to green, 1 sets the color to magenta.
     */
    setColor(selector) {
        switch (selector) {
            case 0:
                this.color = '#16ce10';
                break;
            case 1:
                this.color = '#ff00ff';
                break;
            default:
                this.color = '#16ce10';
                break;
        }
    }
}