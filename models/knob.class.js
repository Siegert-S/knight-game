class Button extends DrawableObject {
    isClickt = false;
    isHovered = false;
    isActiv = false;
    enabel = true;

    posY;
    posYClicked;

    imageHover = new Image();
    imageDefault = new Image();
    content;
    partOfMenu;

    enabelCondition;
    fontColorCondition;
    connectedFunction;

    frequency = 30;
    clock = 0;
    fontColor = 'white';

    /**
     * Represents a button in the menu.
     * @param {number} x - The x-coordinate of the button's position.
     * @param {number} y - The y-coordinate of the button's position.
     * @param {number} w - The width of the button.
     * @param {number} h - The height of the button.
     * @param {string} imgDef - The source path for the default button image.
     * @param {string} imgHov - The source path for the hover button image.
     * @param {string} partof - The part of the menu this button belongs to.
     * @param {string} content - The content that the button will display.
     * @param {function} funktion - The function to be executed when the button is clicked.
     * @param {function} encon - A condition function that enables/disables the button.
     * @param {function} focon - A condition function to determine the font color.
     */
    constructor(x, y, w, h, imgDef, imgHov, partof, content, funktion, encon, focon) {
        super();
        this.positionX = x;
        this.posY = y;
        this.posYClicked = this.posY + 5;
        this.width = w;
        this.height = h;
        this.imageDefault.src = imgDef;
        this.imageHover.src = imgHov;
        this.partOfMenu = partof;
        this.content = content;
        this.connectedFunction = funktion;
        this.enabelCondition = encon;
        this.fontColorCondition = focon;
    }

    /**
     * Updates the button state by enabling/disabling it and selecting the font color.
     * @returns {void}
     */
    upDate() {
        this.enabelButton(this.enabelCondition);
        this.selectFontColor(this.fontColorCondition);
        this.repeatClick();
    }

    /**
     * Enables or disables the button based on the provided condition.
     * @param {function} condition - A function that returns a boolean indicating whether the button should be enabled.
     * @returns {void}
     */
    enabelButton(condition) {
        const check = (!condition || condition());
        this.enabel = check;
    }

    /**
     * Selects the font color based on the provided condition.
     * @param {function} condition - A function that returns a boolean indicating the font color condition.
     * @returns {void}
     */
    selectFontColor(condition) {
        const check = (!condition || condition());
        this.fontColor = (check) ? 'white' : 'red';
    }

    /**
     * Draws the button and its text onto the canvas.
     * @returns {void}
     */
    draw() {
        if (!this.enabel) {
            ctx.globalAlpha = 0.75;
            this.img = this.imageDefault;
            this.positionY = this.posY;
        } else {
            this.img = (this.isHovered) ? this.imageHover : this.imageDefault;
            this.positionY = (this.isClickt) ? this.posYClicked : this.posY;
        }
        super.draw();
        this.drawText();
        ctx.globalAlpha = 1;
    }

    /**
     * Draws the button's text onto the canvas.
     * @returns {void}
     */
    drawText() {
        ctx.font = '20px Tahoma';
        ctx.fillStyle = this.fontColor;
        ctx.textAlign = 'center';

        ctx.fillText(this.selectValue(this.content), this.positionX + (this.width / 2), this.positionY + (this.height / 1.5));
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

    /**
     * Handles click events for the button. Calls the connected function if the button is enabled and active.
     * @returns {void}
     */
    onClick() {
        if (this.enabel && this.isClickt && this.isActiv) {
            this.connectedFunction();
            this.frequency = Math.max(3, this.frequency - 1);
        } else {
            this.frequency = 30;
        }
    }

    /**
     * Repeats the click action based on the button's click frequency.
     * @returns {void}
     */
    repeatClick() {
        if (!(this.clock % this.frequency)) {
            this.onClick();
        }
        this.clock++;
    }
}