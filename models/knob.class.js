class Button extends DrawableObject {
    isClickt = false;
    isHovered = false;
    isActiv = false;
    enabel = true;

    useOnClickEnd = false;
    wasClicked = false;

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
     * Creates a new button object with specified properties such as position, size, images, and functionality.
     * 
     * @constructor
     * @param {number} x - The X-coordinate for the button's position.
     * @param {number} y - The Y-coordinate for the button's position.
     * @param {number} w - The width of the button.
     * @param {number} h - The height of the button.
     * @param {boolean} useOnClickEnd - If `true`, the button's `onClick` function will be triggered on mouse up.
     * @param {string} imgDef - The source path for the default button image.
     * @param {string} imgHov - The source path for the hover state button image.
     * @param {string} partof - Identifier for the menu that the button is a part of.
     * @param {string} content - The content to be displayed on the button.
     * @param {Function} funktion - The function to be called when the button is clicked.
     * @param {Function} encon - A function that determines if the button is enabled.
     * @param {Function} focon - A function that determines the font color condition.
     */
    constructor(x, y, w, h, useOnClickEnd, imgDef, imgHov, partof, content, funktion, encon, focon) {
        super();
        this.positionX = x;
        this.posY = y;
        this.posYClicked = this.posY + 5;
        this.width = w;
        this.height = h;
        this.useOnClickEnd = useOnClickEnd;
        this.imageDefault.src = imgDef;
        this.imageHover.src = imgHov;
        this.partOfMenu = partof;
        this.content = content;
        this.connectedFunction = funktion;
        this.enabelCondition = encon;
        this.fontColorCondition = focon;
    }

    /**
     * Updates the button's state. Enables or disables the button based on conditions, selects the font color,
     * and depending on the `useOnClickEnd` flag, either handles repeat clicks or checks the button's state.
     */
    upDate() {
        this.enabelButton(this.enabelCondition);
        this.selectFontColor(this.fontColorCondition);
        if (!this.useOnClickEnd) {
            this.repeatClick();
        } else {
            this.checkButtonState();
        }
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
     * Executes the function connected to the button when the button is clicked.
     * This method is triggered if the button is enabled, active, and has been clicked.
     * 
     * @returns {boolean} - Returns `true` if the function was successfully triggered, otherwise returns `false`.
     */
    onClick() {
        if (this.enabel && this.isClickt && this.isActiv) {
            this.connectedFunction(true);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Executes the function connected to the button when the click has ended. 
     * This method is triggered only if the button is enabled, has been clicked, is active, and the `useOnClickEnd` flag is true.
     *
     * @returns {boolean} - Returns `false` after the click event is processed.
     */
    onClickEnd() {
        if (this.enabel && !this.isClickt && this.isActiv && this.useOnClickEnd) {
            this.connectedFunction(false);
            return false
        }
    }

    /**
     * Checks the current state of the button to determine whether to trigger an onClick or onClickEnd event.
     * - If the button is clicked and wasn't previously clicked, `onClick` is triggered.
     * - If the button is no longer clicked and was previously clicked, `onClickEnd` is triggered.
     */
    checkButtonState() {
        if (this.isClickt && !this.wasClicked) {
            this.wasClicked = this.onClick()
        }
        if (!this.isClickt && this.wasClicked) {
            this.wasClicked = this.onClickEnd();
        }
    }

    /**
     * Repeats the click action based on the button's click frequency.
     * @returns {void}
     */
    repeatClick() {
        if (!(this.clock % this.frequency)) {
            this.frequency = (this.onClick()) ? Math.max(3, this.frequency - 1) : 30;
        }
        this.clock++;
    }
}