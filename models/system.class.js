class System {
    show = 'main';
    menu = {};
    world;
    renderContent;
    constructor() {
        initButton();
        this.loadMenu();
        this.renderCanvas();
    }

    loadMenu() {
        this.menu['main'] = (new Menu('main'));
        this.menu['settings'] = (new Menu('settings'));
        this.menu['controlls'] = (new Menu('controlls'));
        this.menu['legal'] = (new Menu('legal'));
        this.menu['game'] = (new Menu('game'));
        this.menu['skills'] = (new Menu('skills'));
        // this.menu.push(new Menu('settings'));
        // this.menu.push(new Menu('controlls'));
        // this.menu.push(new Menu('legal'));
        // this.menu.push(new Menu('game'));
        // this.menu.push(new Menu('skills'));
    }

    loadWorld(stage, difficulty) {
        this.world = new World(stage, difficulty);
    }

    renderCanvas() {
        // die schleifen die den ihalt des canvas rendert
        this.setContent();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.renderContent.draw();

        let self = this;
        requestAnimationFrame(() => { self.renderCanvas(); });
    }

    setContent() {
        this.renderContent = this.menu[this.show];
        this.menu[this.show].selectButtons();
    }

    switchingMenu() {
        // die funktion wechseld das angezeigte menu bzw das spiel
        // breits in buttons implementiert
    }

    saveGame() {
        // funktion zum speichern des spielstandes
    }
}