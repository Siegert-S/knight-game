class Keyboard {

    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;

    constructor() {
        this.addKeyListener();
    }

    addKeyListener() {
        this.addKeydownListener();
        this.addKeyupListener();
        this.addMouseDownListerner();
        this.addTouchListener();
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
            console.log(event);
            this.getXYCoordinates(event);
            // const rect = canvas.getBoundingClientRect();
            // const x = e.clientX - rect.left;
            // const y = e.clientY - rect.top;
            // console.log('Mouse X ' + x + ' Y ' + y);
            // alert('X ' + x + ' Y ' + y);
        })
    }

    addTouchListener() {
        canvas.addEventListener('touchstart', (event) => {
            console.log(event);

            for (let i = 0; i < event.touches.length; i++) {

                this.getXYCoordinates(event.touches[i]);
            }
        });
    }



    getXYCoordinates(touches) {
        const rect = canvas.getBoundingClientRect();
        const x = touches.clientX - rect.left;
        const y = touches.clientY - rect.top;
        console.log(' X ' + x + ' Y ' + y);
        // alert('X ' + x + ' Y ' + y);

    }
}