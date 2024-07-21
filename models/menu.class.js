class Menu {
    name;
    buttons = [];

    constructor(name) {
        this.name = name;

    }

    draw() {

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