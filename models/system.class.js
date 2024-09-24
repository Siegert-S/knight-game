class System {
    show = 'main';
    menu = {};
    world;
    renderContent;
    backgroundAudio;

    constructor() {
        initButton();

        this.loadMenu();
        this.upDateCanvas();
        this.renderCanvas();
    }

    loadMenu() {
        this.menu['main'] = (this.selectContentOf('main'));
        this.menu['settings'] = (this.selectContentOf('settings'));
        this.menu['controlls'] = (this.selectContentOf('controlls'));
        this.menu['legal'] = (this.selectContentOf('legal'));
        this.menu['game'] = (this.selectContentOf('game'));
        this.menu['skills'] = (this.selectContentOf('skills'));
        this.menu['gamecontroll'] = (this.selectContentOf('gamecontroll'));

        this.menu['loadsave'] = (this.selectContentOf('loadsave'));
        this.menu['victoryPage'] = (this.selectContentOf('victoryPage'));
        this.menu['losePage'] = (this.selectContentOf('losePage'));

        this.menu['play'] = (this.selectContentOf('play'));

    }

    selectContentOf(name) {
        let bufferButton = this.selectFrom(MenuButton, name);
        let bufferPanel = this.selectFrom(Panel, name);
        let buffer = [...bufferButton, ...bufferPanel];
        return buffer;
    }

    selectFrom(classRef, name) {
        let buffer = [];

        classRef.storage.forEach(elenment => {
            if (elenment.partOfMenu == name) {
                buffer.push(elenment);
            }
        });
        return buffer;
    }

    activadPartsOf(name) {
        this.resetParts(MenuButton);
        this.resetParts(Panel);
        this.setPart(this.menu[name]);
    }

    resetParts(classRef) {
        classRef.storage.forEach(part => { part.isActiv = false; })
    }

    setPart(parts) {
        parts.forEach(part => { part.isActiv = true; })
    }

    setContentTo(name) {
        this.renderContent = this.menu[name];
        this.activadPartsOf(name);
    }

    upDateCanvas() {
        setInterval(() => {
            if (this.show == 'play' && !this.world) { this.world = new World(); }

            if (this.show != 'play') {
                this.renderContent.forEach(element => {
                    if (typeof element.upDate !== 'function') {
                        console.log(element); // Gibt das Objekt aus, wenn es die Methode `upDate()` nicht hat
                    }

                    element.upDate();
                })
            } else {
                this.world.upDate();
            }
        }, 1000 / 60);
    }

    renderCanvas() {

        this.setContentTo(this.show);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (this.show != 'play') {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.renderContent.forEach(element => { element.draw(); })
        } else {
            this.world.draw();
        }

        let self = this;
        requestAnimationFrame(() => { self.renderCanvas(); });
    }

    setContent() {
        this.renderContent = this.menu[this.show];
    }

    saveGame() {
        // funktion zum speichern des spielstandes
    }

    // sound handling

startBackgroundAudio(){
    this.backgroundAudio= new Audio()
}

    crossfade(duration, newAudio) {

    }

    // veraltet und nicht verwendet.
    scannAll(classRef) {
        classRef.storage.forEach(object => {
            if (object.partOfMenu == this.show) {
                object.draw();
            }
        });
    }

    objectWithName(classRef, name) {

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