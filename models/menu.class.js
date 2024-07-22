class Menu {
    name;
    buttons = [];

    constructor(name) {
        this.name = name;
        this.selectButtons();
    }

    draw() {
        this.drawBachground();
        this.drawButtons();
    }

    drawBachground() {

        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawButtons() {
        this.buttons.forEach(button => { button.draw(); })
    }

    selectButtons() {
        MenuButton.storage.forEach(button => {
            if (button.partOfMenu == this.name) {
                this.buttons.push(button);
                button.isActiv = true;
            } else {
                button.isActiv = false;
            }
        });
    }
}