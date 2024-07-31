class Keyboard {

    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;

    testtime = 0;

    constructor() {
        this.addKeyListener();
    }

    addKeyListener() {
        this.addKeydownListener();
        this.addKeyupListener();
        this.addMouseDownListerner();
        this.addMouseUpListener();
        this.addMouseMoveListener();
        this.addTouchListener();
        this.addToucheEndListener();
    }

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

    addMouseDownListerner() {
        canvas.addEventListener('mousedown', (event) => {
            let pos = this.getXYCoordinates(event);
            this.checkButtons(pos.x, pos.y, true);
        })
    }

    addMouseUpListener() {
        canvas.addEventListener('mouseup', (event) => {
            MenuButton.storage.forEach(button => {
                button.isClickt = false;
            });
        })
    }

    addMouseMoveListener() {
        canvas.addEventListener('mousemove', (event) => {
            let pos = this.getXYCoordinates(event);
            this.hoverButton(pos.x, pos.y);
        })
    }

    addTouchListener() {
        canvas.addEventListener('touchstart', (event) => {
            for (let i = 0; i < event.touches.length; i++) {
                let pos = this.getXYCoordinates(event.touches[i]);
                this.checkButtons(pos.x, pos.y, true);
            }
        });
    }

    addToucheEndListener() {
        canvas.addEventListener('touchend', (event) => {
            MenuButton.storage.forEach(button => {
                button.isClickt = false;
            });
            for (let i = 0; i < event.touches.length; i++) {

                let pos = this.getXYCoordinates(event.touches[i]);
                this.checkButtons(pos.x, pos.y, true);
            }
        });
    }

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

    checkButtons(x, y, set) {
        MenuButton.storage.forEach(button => {
            if (button.isActiv) {
                if (this.checkBoundrys(button, x, y)) {
                    button.isClickt = set;
                    button.onClick();
                }
            }
        });
    }

    hoverButton(x, y) {
        MenuButton.storage.forEach(button => {
            if (button.isActiv == true) {
                button.isHovered = false;
                if (this.checkBoundrys(button, x, y)) {
                    button.isHovered = true;
                }
            }
        })
    }

    checkBoundrys(button, x, y) {
        return button.positionX < x && x < button.positionX + button.width &&
            button.positionY < y && y < button.positionY + button.height;
    }

    setTime() {
        let time = new Date().getTime();
        console.log(time - this.testtime);
        this.testtime = time;
    }

    testin() {
        this.testtime = new Date().getTime();
    }

    testout() {
        let time = new Date().getTime();
        console.log(time - this.testtime);
    }
}