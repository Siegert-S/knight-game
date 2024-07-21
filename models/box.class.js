class Box {
    posX1;
    posY1;
    posX2;
    posY2;
    width;
    height;
    color;

    constructor(x, y, w, h, color) {
        this.posX1 = x;
        this.posY1 = y;
        this.width = w;
        this.height = h;
        this.setX2();
        this.setY2();
        this.setColor(color);
    }

    setX2() {
        this.posX2 = this.posX1 + this.width;
    }

    setY2() {
        this.posY2 = this.posY1 + this.height;
    }

    relocateBox(x, y) {
        this.posX1 = x;
        this.posY1 = y;
        this.setX2();
        this.setY2();
    }

    setColor(selector) {
        switch (selector) {
            case 0:
                this.color = '#16ce10';
                break;
            case 1:
                this.color = '#ff00ff';
                break;
            case 2:
                this.color = '';
                break;

            default:
                this.color = '#16ce10';
                break;
        }
    }
}