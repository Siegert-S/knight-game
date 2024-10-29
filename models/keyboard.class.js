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
        this.suppressContextMenu();
        this.addKeydownListener();
        this.addKeyupListener();
        this.addMouseDownListerner();
        this.addMouseUpListener();
        this.addMouseMoveListener();
        this.addTouchListener();
        this.addToucheEndListener();
    }

    suppressContextMenu() {
        canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
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
            event.preventDefault();
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
            event.preventDefault();
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
     * Calculates the adjusted x and y coordinates relative to the actual visible canvas area,
     * taking into account any offsets due to maintaining the canvas aspect ratio in fullscreen mode.
     *
     * @param {Touch | MouseEvent} touches - The event containing the x and y screen coordinates.
     * @returns {{x: number, y: number}} An object with the adjusted `x` and `y` coordinates
     * relative to the actual canvas content area.
     */
    getXYCoordinates(touches) {
        const rect = canvas.getBoundingClientRect();

        const { visibleWidth, visibleHeight, offsetX, offsetY } = this.getActualCanvasSize();

        const canvasX = (touches.clientX - rect.left - offsetX) * (canvas.width / visibleWidth);
        const canvasY = (touches.clientY - rect.top - offsetY) * (canvas.height / visibleHeight);

        return { "x": canvasX, "y": canvasY };
    }

    /**
     * Calculates the actual visible dimensions of the canvas within the screen bounds while
     * maintaining the original aspect ratio, as well as any horizontal or vertical offset 
     * (padding) needed to center the canvas area.
     *
     * @returns {{visibleWidth: number, visibleHeight: number, offsetX: number, offsetY: number}} 
     * An object containing:
     * - `visibleWidth`: The calculated width of the canvas while maintaining the aspect ratio.
     * - `visibleHeight`: The calculated height of the canvas while maintaining the aspect ratio.
     * - `offsetX`: Horizontal offset to center the canvas content within the available screen area.
     * - `offsetY`: Vertical offset to center the canvas content within the available screen area.
     */
    getActualCanvasSize() {
        const rect = canvas.getBoundingClientRect();
        const aspectRatio = 720 / 480;
        let visibleWidth = rect.width;
        let visibleHeight = rect.height;

        if (rect.width / rect.height > aspectRatio) {
            visibleWidth = rect.height * aspectRatio;
        } else {
            visibleHeight = rect.width / aspectRatio;
        }
        const offsetX = (rect.width - visibleWidth) / 2;
        const offsetY = (rect.height - visibleHeight) / 2;

        return { visibleWidth, visibleHeight, offsetX, offsetY };
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
            button.isHovered = false;
            if (button.isActiv == true) {
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