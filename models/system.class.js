class System {
    show = 'main';
    menu = {};
    world;
    renderContent;
    backgroundAudio = 0;

    audioList = [
        ['main', 'settings', 'controlls', 'legal', 'game', 'skills', 'gamecontroll', 'loadsave'],
        ['play'],
        ['victoryPage'],
        ['losePage']
    ];

    audioData = [
        new Audio('assets/audio/music/traveler.mp3'),
        new Audio('assets/audio/music/where-the-brave-may-live-forever-viking-background-music-109867.mp3'),
        new Audio('assets/audio/music/victory.mp3'),
        new Audio('assets/audio/music/cloud-of-sorrow.mp3')
    ];

    constructor() {
        initButton();
        this.initAudio();
        this.startBackgroundAudio();
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
            if (this.world) {
                this.world.draw();
            }

        }

        let self = this;
        requestAnimationFrame(() => { self.renderCanvas(); });
    }

    setContent() {
        this.renderContent = this.menu[this.show];
    }

    saveGame(slot) {
        const playerString = JSON.stringify(player);
        localStorage.setItem(slot, playerString);
    }

    loadGame(slot) {
        const playerString = localStorage.getItem(slot);
        if (playerString) {
            try {
                player = JSON.parse(playerString);
            } catch (error) {
                console.error("Fehler beim Laden des Spiels: Ungültige Daten.", error);
            }
        } else {
            console.log("Kein gespeichertes Spiel gefunden.");
        }
    }

    switchingTo(menu) {

        let audioNumber = this.audioFileForMenu(menu);

        if (this.backgroundAudio !== audioNumber && audioNumber !== -1) {
            this.crossfade(3000, audioNumber);
        }

        this.show = menu;
    }

    audioFileForMenu(name) {
        // let index = -1;

        // this.audioList.forEach(menu => {
        //     if (menu.includes(name)) {
        //         index = this.audioList.indexOf(menu);
        //     }
        // });
        // return index;

        for (let i = 0; i < this.audioList.length; i++) {
            if (this.audioList[i].includes(name)) {
                return i;
            }
        }

        return -1;
    }





    // sound handling

    initAudio() {
        this.audioData.forEach(audioFile => {
            audioFile.volume = 0;
            audioFile.loop = true;
        })
    }

    startBackgroundAudio(duration = 5000) {
        this.audioData[this.backgroundAudio].play();

        let setVolume = audio.volume / 100;

        let fadeIntervall = 50;
        let fadeStep = setVolume * (fadeIntervall / duration);

        let fadeProcess = setInterval(() => { this.fadeIn(this.backgroundAudio, fadeStep, setVolume, fadeProcess); }, fadeIntervall);
    }

    refreshAudioVolume() {
        this.audioData[this.backgroundAudio].volume = audio.volume / 100;
    }

    fadeIn(index, step, setVolume, intervallID) {
        if (this.audioData[index].volume < setVolume) {
            this.audioData[index].volume = Math.min(setVolume, this.audioData[index].volume + step);
        }

        if (this.audioData[index].volume == setVolume) {
            clearInterval(intervallID);
        }
    }

    crossfade(duration, newAudioIndex) {
        this.audioData[newAudioIndex].volume = 0;
        this.audioData[newAudioIndex].play();
        let oldAudioIndex = this.backgroundAudio;

        let setVolume = audio.volume / 100;

        let fadeIntervall = 50;
        let fadeStep = setVolume * (fadeIntervall / duration);

        let fadeProcess = setInterval(() => { this.fadeFunction(oldAudioIndex, newAudioIndex, fadeStep, setVolume, fadeProcess); }, fadeIntervall);
        this.backgroundAudio = newAudioIndex;
    }

    fadeFunction(oldIndex, newIndex, step, setVolume, intervallID) {
        if (this.audioData[oldIndex].volume > 0) {
            this.audioData[oldIndex].volume = Math.max(0, this.audioData[oldIndex].volume - step);
        }

        if (this.audioData[newIndex].volume < 1) {
            this.audioData[newIndex].volume = Math.min(setVolume, this.audioData[newIndex].volume + step);
        }

        if (this.audioData[oldIndex].volume === 0 && this.audioData[newIndex].volume === setVolume) {
            this.stopAudio(oldIndex);
            clearInterval(intervallID);
        }
    }

    stopAudio(audioIndex) {
        this.audioData[audioIndex].pause();
        this.audioData[audioIndex].currentTime = 0;
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