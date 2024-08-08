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
        this.menu['gamecontroll'] = (new Menu('gamecontroll'));
        
        this.menu['loadsave'] = (new Menu('loadsave'));
        this.menu['play']= (new World());
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
        // this.renderContent.draw();
        // Panel.storage.forEach(element => {
        //     if (element.partOfMenu == this.show) {
        //         element.draw();
        //     }
        // });
        this.refresh();
        this.scannAll(MenuButton);
        this.scannAll(Panel);



        let self = this;
        requestAnimationFrame(() => { self.renderCanvas(); });
    }

    setContent() {
        this.renderContent = this.menu[this.show];
        // this.menu[this.show].selectButtons();
    }

    switchingMenu() {
        // die funktion wechseld das angezeigte menu bzw das spiel
        // breits in buttons implementiert
    }

    saveGame() {
        // funktion zum speichern des spielstandes
    }

    scannAll(classRef) {
        classRef.storage.forEach(object => {
            if (object.partOfMenu == this.show) {
                // console.log(object.partOfMenu);
                object.draw();
            }
        });
    }

    objectWithName(classRef, name) {
        // classRef.storage.forEach(object => {
        //     if (object.name == name) {
        //         console.log(object);
        //         return object;
        //     }
        // });

        for (let object of classRef.storage) {
            if (object.name === name) {
                return object;
            }
        }
    }

    refresh() {
        // let sound = this.objectWithName(Panel, 'volumevalue');
        // sound.refreshText(volume);
        // let sfx = this.objectWithName(Panel, 'sfxvalue');
        // sfx.refreshText(SFX);
        Panel.storage.forEach(obj => { obj.refreshPanel(); });
    }
}