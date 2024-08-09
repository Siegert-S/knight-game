class Menu {
    name;
    buttons = [];

    constructor(name) {
        this.name = name;
        this.selectButtons();
    }

    draw() {
        this.activadButtons();
        this.drawBackground();
        this.drawButtons();
    }

    drawBackground() {

        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawButtons() {
        this.buttons.forEach(button => { button.draw(); })
    }

    activadButtons() {
        this.resetButtons();
        this.setButtons();
    }

    resetButtons() {
        MenuButton.storage.forEach(button => {
            button.isActiv = false;
        })
    }

    setButtons() {
        this.buttons.forEach(button => {
            button.isActiv = true;
        })
    }

    selectButtons() {
        MenuButton.storage.forEach(button => {
            let buffer = [];
            // button.isActiv = false;
            if (button.partOfMenu == this.name) {
                buffer.push(button);
                // button.isActiv = true;
            }
            this.buttons = buffer;
        });
    }
}