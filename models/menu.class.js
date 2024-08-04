class Menu {
    name;
    buttons = [];

    constructor(name) {
        this.name = name;
    }

    draw() {
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

    selectButtons() {
        MenuButton.storage.forEach(button => {
            button.isActiv = false;
            if (button.partOfMenu == this.name) {
                this.buttons.push(button);
                button.isActiv = true;
            }
        });
    }
}