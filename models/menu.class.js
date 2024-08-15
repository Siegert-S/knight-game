class Menu {
    name;
    buttons = [];
    panels = [];

    constructor(name) {
        this.name = name;
        this.selectParts();
    }

    upDate() {
        this.activadParts();
    }

    draw() {
        this.drawBackground();
        this.drawParts(this.buttons);
        this.drawParts(this.panels);
    }

    drawBackground() {

        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawParts(elements) {
        elements.forEach(element => { element.draw(); })
    }

    selectParts() {
        this.buttons = this.selectFrom(MenuButton);
        this.panels = this.selectFrom(Panel);

    }

    activadParts() {
        this.resetParts(MenuButton);
        this.resetParts(Panel);
        this.setPart(this.buttons);
        this.setPart(this.panels);
    }

    resetParts(classRef) {
        classRef.storage.forEach(part => {
            part.isActiv = false;
        })
    }

    setPart(parts) {
        parts.forEach(part => {
            part.isActiv = true;
        })
    }

    selectFrom(classRef) {
        let buffer = [];

        classRef.storage.forEach(elenment => {
            if (elenment.partOfMenu == this.name) {
                buffer.push(elenment);
            }
        });

        return buffer;
    }
}