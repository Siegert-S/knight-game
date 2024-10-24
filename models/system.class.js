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

    /**
     * Initializes the game menu, loads the necessary components, sets up audio, and begins rendering and updating the canvas.
     */
    constructor() {
        initButton();
        this.initAudio();
        this.loadMenu();
        this.upDateCanvas();
        this.renderCanvas();
        this.loadingSaveFiles();
    }

    /**
     * Loads different menu content (main menu, settings, controls, etc.) into the game.
     */
    loadMenu() {
        this.menu['main'] = (this.selectContentOf('main'));
        this.menu['settings'] = (this.selectContentOf('settings'));
        this.menu['controlls'] = (this.selectContentOf('controlls'));
        this.menu['legal'] = (this.selectContentOf('legal'));
        this.menu['game'] = (this.selectContentOf('game'));
        this.menu['skills'] = (this.selectContentOf('skills'));
        this.menu['gamecontroll'] = (this.selectContentOf('gamecontroll'));
        this.menu['loadgame'] = (this.selectContentOf('loadgame'));
        this.menu['savegame'] = (this.selectContentOf('savegame'));
        this.menu['victoryPage'] = (this.selectContentOf('victoryPage'));
        this.menu['losePage'] = (this.selectContentOf('losePage'));
        this.menu['play'] = (this.selectContentOf('play'));
    }

    /**
     * Selects content (buttons, panels) of a specific menu by its name.
     * @param {string} name - The name of the menu to select content from.
     * @returns {Array} Array of selected content (buttons and panels).
     */
    selectContentOf(name) {
        let bufferButton = this.selectFrom(Button, name);
        let bufferPanel = this.selectFrom(Panel, name);
        let buffer = [...bufferButton, ...bufferPanel];
        return buffer;
    }

    /**
     * Selects elements of a specific class (Button or Panel) from storage that belong to a specific menu.
     * @param {class} classRef - The class reference (Button or Panel) to select elements from.
     * @param {string} name - The menu name to match against.
     * @returns {Array} Array of selected elements.
     */
    selectFrom(classRef, name) {
        let buffer = [];
        classRef.storage.forEach(elenment => {
            if (elenment.partOfMenu == name) {
                buffer.push(elenment);
            }
        });
        return buffer;
    }

    /**
     * Activates and displays the parts (buttons/panels) of the selected menu.
     * @param {string} name - The name of the menu to activate.
     */
    activadPartsOf(name) {
        this.resetParts(Button);
        this.resetParts(Panel);
        this.setPart(this.menu[name]);
    }

    /**
     * Resets all parts (buttons or panels) of a specific class (Button or Panel) to inactive.
     * @param {class} classRef - The class reference (Button or Panel) to reset.
     */
    resetParts(classRef) {
        classRef.storage.forEach(part => { part.isActiv = false; })
    }

    /**
     * Sets specific parts (buttons/panels) to active state.
     * @param {Array} parts - Array of parts (buttons/panels) to activate.
     */
    setPart(parts) {
        parts.forEach(part => { part.isActiv = true; })
    }

    /**
     * Sets the content to be rendered by activating parts of a specific menu.
     * @param {string} name - The name of the menu to set as the current content.
     */
    setContentTo(name) {
        this.renderContent = this.menu[name];
        this.activadPartsOf(name);
    }

    /**
     * Updates the canvas periodically, managing world updates and menu rendering.
     */
    upDateCanvas() {
        setInterval(() => {
            if (this.show == 'play' && !this.world) { this.world = new World(); }

            this.renderContent.forEach(element => {
                if (typeof element.upDate !== 'function') {
                    console.log(element); // Gibt das Objekt aus, wenn es die Methode `upDate()` nicht hat
                }
                element.upDate();
            })
            if (this.show == 'play') {
                this.world.upDate();
            }
        }, 1000 / 60);
    }

    /**
     * Continuously renders the canvas, clearing the screen, drawing menu elements, or drawing the game world.
     */
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

                this.renderContent.forEach(element => { element.draw(); })
            }
        }
        let self = this;
        requestAnimationFrame(() => { self.renderCanvas(); });
    }

    /**
     * Saves the current game state to the specified local storage slot.
     * @param {string} slot - The storage slot to save the game in.
     */
    saveGame(slot) {
        const playerString = JSON.stringify(player);
        localStorage.setItem(slot, playerString);
    }

    /**
     * Loads the game state from the specified local storage slot.
     * @param {string} slot - The storage slot to load the game from.
     * @returns {Object} The loaded game state, or an empty state if no saved data is found.
     */
    loadGame(slot) {
        let save = {};
        const playerString = localStorage.getItem(slot);
        if (playerString) {
            try {
                save = JSON.parse(playerString);
            } catch (error) {
                console.error("Fehler beim Laden des Spiels: Ungültige Daten.", error);
            }
        } else {
            save['totalCoins'] = 'EMPTY';
        }
        return save;
    }

    /**
     * Loads save files from three predefined slots into the application state.
     */
    loadingSaveFiles() {
        appState.save1 = this.loadGame('save1');
        appState.save2 = this.loadGame('save2');
        appState.save3 = this.loadGame('save3');
    }

    /**
     * Switches the active menu and handles background audio for the selected menu.
     * @param {string} menu - The name of the menu to switch to.
     */
    switchingTo(menu) {
        let audioNumber = this.audioFileForMenu(menu);

        if (this.backgroundAudio !== audioNumber && audioNumber !== -1) {
            this.crossfade(1000, audioNumber);
        }

        this.show = menu;
    }

    /**
     * Retrieves the index of the audio file associated with a specific menu.
     * @param {string} name - The name of the menu to find the audio for.
     * @returns {number} The index of the audio file, or -1 if no audio file is found.
     */
    audioFileForMenu(name) {
        for (let i = 0; i < this.audioList.length; i++) {
            if (this.audioList[i].includes(name)) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Initializes audio files, setting the volume and loop properties.
     */
    initAudio() {
        this.audioData.forEach(audioFile => {
            audioFile.volume = 0;
            audioFile.loop = true;
        })
    }

    /**
     * Starts background audio with a fade-in effect.
     * @param {number} [duration=5000] - The duration of the fade-in effect in milliseconds.
     */
    startBackgroundAudio(duration = 5000) {
        this.audioData[this.backgroundAudio].play();
        let setVolume = audio.volume / 100;
        let fadeIntervall = 50;
        let fadeStep = setVolume * (fadeIntervall / duration);
        let fadeProcess = setInterval(() => { this.fadeIn(this.backgroundAudio, fadeStep, setVolume, fadeProcess); }, fadeIntervall);
    }

    /**
     * Refreshes the current audio volume based on the global volume setting.
     */
    refreshAudioVolume() {
        this.audioData[this.backgroundAudio].volume = audio.volume / 100;
    }

    /**
     * Fades in the audio for the specified index over time.
     * @param {number} index - The index of the audio to fade in.
     * @param {number} step - The step size for the fade-in process.
     * @param {number} setVolume - The final volume to reach.
     * @param {number} intervallID - The ID of the interval controlling the fade.
     */
    fadeIn(index, step, setVolume, intervallID) {
        if (this.audioData[index].volume < setVolume) {
            this.audioData[index].volume = Math.min(setVolume, this.audioData[index].volume + step);
        }
        if (this.audioData[index].volume == setVolume) {
            clearInterval(intervallID);
        }
    }

    /**
     * Crossfades between the current background audio and a new audio file.
     * @param {number} duration - The duration of the crossfade effect in milliseconds.
     * @param {number} newAudioIndex - The index of the new audio to fade into.
     */
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

    /**
     * Manages the fading of old audio out and new audio in during a crossfade.
     * @param {number} oldIndex - The index of the audio to fade out.
     * @param {number} newIndex - The index of the audio to fade in.
     * @param {number} step - The step size for the fade process.
     * @param {number} setVolume - The target volume level for the new audio.
     * @param {number} intervallID - The ID of the interval controlling the fade process.
     */
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

    /**
     * Stops a specific audio file and resets its playback position.
     * @param {number} audioIndex - The index of the audio file to stop.
     */
    stopAudio(audioIndex) {
        this.audioData[audioIndex].pause();
        this.audioData[audioIndex].currentTime = 0;
    }

}