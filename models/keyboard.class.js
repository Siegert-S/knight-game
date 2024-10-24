class Keyboard {

    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;

    testtime = 0;

    /**
     * Creates an instance of the InputHandler class and adds key and mouse listeners.
     */
    constructor() {
        this.addKeyListener();
    }

    /**
     * Adds key and mouse event listeners.
     */
    addKeyListener() {
        this.addKeydownListener();
        this.addKeyupListener();
        this.addMouseDownListerner();
        this.addMouseUpListener();
        this.addMouseMoveListener();
        this.addTouchListener();
        this.addToucheEndListener();
    }

    /**
     * Adds a listener for keydown events to track pressed keys.
     */
    addKeydownListener() {
        window.addEventListener('keydown', (e) => {
            // console.log(e.keyCode);
            if (e.keyCode == 37 || e.keyCode == 65) {
                this.LEFT = true;
            } if (e.keyCode == 38 || e.keyCode == 87) {
                this.UP = true;
            } if (e.keyCode == 39 || e.keyCode == 68) {
                this.RIGHT = true;
            } if (e.keyCode == 40 || e.keyCode == 83) {
                this.DOWN = true;
            } if (e.keyCode == 32) {
                this.SPACE = true;
            }
        });
    }

    /**
     * Adds a listener for keyup events to track released keys.
     */
    addKeyupListener() {
        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 37 || e.keyCode == 65) {
                this.LEFT = false;
            } if (e.keyCode == 38 || e.keyCode == 87) {
                this.UP = false;
            } if (e.keyCode == 39 || e.keyCode == 68) {
                this.RIGHT = false;
            } if (e.keyCode == 40 || e.keyCode == 83) {
                this.DOWN = false;
            } if (e.keyCode == 32) {
                this.SPACE = false;
            }
        });
    }

    /**
     * Adds a listener for mousedown events to detect mouse clicks.
     */
    addMouseDownListerner() {
        canvas.addEventListener('mousedown', (event) => {
            let pos = this.getXYCoordinates(event);
            this.checkButtons(pos.x, pos.y, true);
        })
    }

    /**
     * Adds a listener for mouseup events to reset button states.
     */
    addMouseUpListener() {
        canvas.addEventListener('mouseup', (event) => {
            Button.storage.forEach(button => {
                button.isClickt = false;
            });
        })
    }

    /**
     * Adds a listener for mousemove events to handle hover states on buttons.
     */
    addMouseMoveListener() {
        canvas.addEventListener('mousemove', (event) => {
            let pos = this.getXYCoordinates(event);
            this.hoverButton(pos.x, pos.y);
        })
    }

    /**
     * Adds a listener for touchstart events to handle touch inputs.
     */
    addTouchListener() {
        canvas.addEventListener('touchstart', (event) => {
            for (let i = 0; i < event.touches.length; i++) {
                let pos = this.getXYCoordinates(event.touches[i]);
                this.checkButtons(pos.x, pos.y, true);
            }
        });
    }

    /**
     * Adds a listener for touchend events to reset button states after touch interactions.
     */
    addToucheEndListener() {
        canvas.addEventListener('touchend', (event) => {
            Button.storage.forEach(button => {
                button.isClickt = false;
            });
            for (let i = 0; i < event.touches.length; i++) {

                let pos = this.getXYCoordinates(event.touches[i]);
                this.checkButtons(pos.x, pos.y, true);
            }
        });
    }

    /**
     * Converts touch or mouse event coordinates to canvas coordinates.
     * @param {TouchEvent|MouseEvent} touches - The touch or mouse event to extract coordinates from.
     * @returns {{x: number, y: number}} The converted x and y coordinates relative to the canvas.
     */
    getXYCoordinates(touches) {
        const rect = canvas.getBoundingClientRect();

        const x = touches.clientX - rect.left;
        let faktorOfX = x / rect.width;
        let canvasX = canvas.width * faktorOfX;

        const y = touches.clientY - rect.top;
        let faktorOfY = y / rect.height;
        let canvasY = canvas.height * faktorOfY;

        return { "x": canvasX, "y": canvasY };
    }

    /**
    * Checks if the given coordinates (x, y) are within the boundaries of any active button.
    * If true, the button is marked as clicked and the associated `onClick` method is called.
    * 
    * @param {number} x - The X-coordinate to check.
    * @param {number} y - The Y-coordinate to check.
    * @param {boolean} set - Determines whether the button should be marked as clicked (`true` = clicked, `false` = not clicked).
    */
    checkButtons(x, y, set) {
        Button.storage.forEach(button => {
            if (button.isActiv) {
                if (this.checkBoundrys(button, x, y)) {
                    button.isClickt = set;
                    if (!button.useOnClickEnd) {
                        button.onClick();
                    }
                }
            }
        });
    }

    /**
     * Handles hover state for buttons based on mouse or touch coordinates.
     * @param {number} x - The x-coordinate of the mouse or touch.
     * @param {number} y - The y-coordinate of the mouse or touch.
     */
    hoverButton(x, y) {
        Button.storage.forEach(button => {
            if (button.isActiv == true) {
                button.isHovered = false;
                if (this.checkBoundrys(button, x, y)) {
                    button.isHovered = true;
                }
            }
        })
    }

    /**
     * Checks if the provided coordinates are within the boundaries of the specified button.
     * @param {Button} button - The button to check against.
     * @param {number} x - The x-coordinate to check.
     * @param {number} y - The y-coordinate to check.
     * @returns {boolean} True if the coordinates are within the button's boundaries; otherwise, false.
     */
    checkBoundrys(button, x, y) {
        return button.positionX < x && x < button.positionX + button.width &&
            button.positionY < y && y < button.positionY + button.height;
    }

}