class Panel extends DrawableObject {

    isHovered = false;
    isActiv = false;
    enabel = true;


    content;
    partOfMenu;

    enabelCondition;
    fontColorCondition;

    fontColor = 'white';

    /**
     * Represents a panel in the menu.
     * @param {number} x - The x-coordinate of the panel's position.
     * @param {number} y - The y-coordinate of the panel's position.
     * @param {number} w - The width of the panel.
     * @param {number} h - The height of the panel.
     * @param {string} img - The source path for the panel's image.
     * @param {string} partof - The part of the menu this panel belongs to.
     * @param {string} [fontColor='white'] - The font color for the panel text.
     * @param {string} content - The content that the panel will display.
     * @param {function} encon - A condition function that enables/disables the panel.
     * @param {function} focon - A condition function to determine the font color.
     */
    constructor(x, y, w, h, img, partof, fontColor = 'white', content, encon, focon) {
        super();
        this.positionX = x;
        this.positionY = y;
        this.width = w;
        this.height = h;
        this.loadImage(img);
        this.partOfMenu = partof;
        this.fontColor = fontColor;
        this.content = content;
        this.enabelCondition = encon;
        this.fontColorCondition = focon;
    }

    /**
     * Updates the panel state by enabling/disabling it and selecting the font color.
     * @returns {void}
     */
    upDate() {
        this.enabelPanel(this.enabelCondition);
        this.selectFontColor(this.fontColorCondition);
    }

    /**
     * Enables or disables the panel based on the provided condition.
     * @param {function} condition - A function that returns a boolean indicating whether the panel should be enabled.
     * @returns {void}
     */
    enabelPanel(condition) {
        let check = (!condition || condition());
        this.enabel = check;
    }

    /**
     * Selects the font color based on the provided condition.
     * @param {function} condition - A function that returns a boolean indicating the font color condition.
     * @returns {void}
     */
    selectFontColor(condition) {
        const check = (!condition || condition());
        this.fontColor = (check) ? this.fontColor : 'red';
    }

    /**
     * Draws the panel onto the canvas if it is enabled.
     * @returns {void}
     */
    draw() {
        if (this.enabel) {
            this.drawFrame();
            this.drawText();
        }
    }

    /**
     * Draws the panel's frame onto the canvas.
     * @returns {void}
     */
    drawFrame() {
        ctx.drawImage(this.img, this.positionX, this.positionY, this.width, this.height);
    }

    /**
     * Draws the text of the panel onto the canvas.
     * @returns {void}
     */
    drawText() {
        ctx.font = '20px Tahoma';
        ctx.fillStyle = this.fontColor;
        ctx.textAlign = 'center';

        // const textWidth = ctx.measureText(this.text).width;
        // console.log('Text width: von '+ this.text+' ist ' + textWidth + ' pixels');

        ctx.fillText(this.selectValue(this.content), this.positionX + (this.width / 2), this.positionY + ((this.height / 2) + 10));
    }

    /**
     * Selects a value from the content based on the application state.
     * @param {string} content - The content string in the format 'object.property'.
     * @returns {any} The selected value from the application state.
     */
    selectValue(content) {
        let target = content.split('.');
        return appState[target[0]][target[1]];
    }

}