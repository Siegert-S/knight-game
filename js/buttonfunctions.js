
/**
 * Calculates the horizontal center position of an element based on its index and the total amount.
 * 
 * @param {number} index - The index of the element in the row.
 * @param {number} amount - The total number of elements in the row.
 * @param {number} buWi - The width of each button.
 * @returns {number} - The calculated center position for the element.
 */
function canvasCenter(index, amount, buWi) {
    let center = canvas.width / 2;
    if (amount == 1) {
        return center - (buWi / 2);
    } else {
        let row = center - (((buWi * amount) + (spaceBetweenHorizontel * (amount - 1))) / 2);
        let position = row + (index * (buWi + spaceBetweenHorizontel));
        return position;
    }

}

/**
 * Calculates the vertical stacking position of buttons based on their index and the total amount.
 * 
 * @param {number} index - The index of the button in the stack.
 * @param {number} amount - The total number of buttons in the stack.
 * @returns {number} - The calculated position for the button.
 */
function stackButtons(index, amount) {
    let center = canvas.height / 2;
    if (amount == 1) {
        return center - buHi / 2;
    } else {
        let startStack = center - (((buHi * amount) + (spaceBetweenVertical * (amount - 1))) / 2);
        let position = startStack + (index * (buHi + spaceBetweenVertical));
        return position;
    }
}

/**
 * Switches to the specified menu.
 * 
 * @param {string} menu - The name of the menu to switch to.
 */
function switchTo(menu) {
    system.switchingTo(menu);
}


/**
 * Increases the audio volume by 1, ensuring it doesn't exceed 100.
 */
function increaseVolume() {
    if (audio.volume < 100) {
        audio.volume++;
    }
    saveAudio();
    system.refreshAudioVolume();
}


/**
 * Decreases the audio volume by 1, ensuring it doesn't go below 0.
 */
function decreaseVolume() {
    if (audio.volume > 0) {
        audio.volume--;
    }
    saveAudio();
    system.refreshAudioVolume();
}

/**
 * Increases the sound effects (SFX) volume by 1, ensuring it doesn't exceed 100.
 */
function increaseSfx() {
    if (audio.SFX < 100) {
        audio.SFX++;
    }
    saveAudio();
}

/**
 * Decreases the sound effects (SFX) volume by 1, ensuring it doesn't go below 0.
 */
function decreaseSfx() {
    if (audio.SFX > 0) {
        audio.SFX--;
    }
    saveAudio();
}

/**
 * Decreases the player's stage level by 1 if it's above the minimum level.
 */
function decreaseStage() {
    if (condition.levelMoreThenMin()) {
        player.stage--;
    }
}

/**
 * Increases the player's stage level by 1 if it's below the maximum level.
 */
function increaseStage() {
    if (condition.levelLessThenMax()) {
        player.stage++;
    }
}

/**
 * Decreases the player's difficulty level by 1 if it's above the minimum difficulty.
 */
function decreaseDifficulty() {
    if (condition.difficultyMoreThenMin()) {
        player.difficulty--;
    }
}

/**
 * Increases the player's difficulty level by 1 if it's below the maximum difficulty.
 */
function increaseDifficulty() {
    if (condition.difficultyLessThenMax()) {
        player.difficulty++;
    }
}


/**
 * Saves the player's game state to the specified slot.
 * 
 * @param {string} slot - The save slot to use.
 */
function saveGame(slot) {
    system.saveGame(slot);
    appState[slot] = player;
}

/**
 * Loads the player's game state from the specified slot if a save exists.
 * 
 * @param {string} slot - The save slot to load from.
 */
function loadGame(slot) {
    if (checkSave(slot)) {
        appState.loaded = slot;
        player.load(appState[slot]);
    }
}

/**
 * Checks if a save exists in the specified slot and matches the player's structure.
 * 
 * @param {string} slot - The save slot to check.
 * @returns {boolean} - True if the save is valid, false otherwise.
 */
function checkSave(slot) {
    let keyset1 = Object.keys(player);
    let keyset2 = Object.keys(appState[slot]);
    if (keyset1.length !== keyset2.length) {
        return false
    }
    return keyset1.every(key => keyset2.includes(key));
}

/**
 * Sets the state of a specific keyboard input.
 * 
 * @param {string} name - The name of the keyboard input to set.
 * @param {boolean} state - The state to assign (true for pressed, false for released).
 */
function setInput(name, state) {
    keyboard[name] = state;
}

/**
 * Changes the application language based on the button press.
 * If the button is pressed down, the language is switched according to the 
 * specified key in the appState.
 *
 * @param {boolean} buttonDown - Indicates whether the button is currently pressed.
 */
function changeLanguage(buttonDown) {
    if (buttonDown) {
        appState.text = language[appState.text.switchLanguageTo];
    }
}

/**
 * Mutes or unmutes the audio based on the button press.
 * If the button is pressed down, the audio state toggles between muted and unmuted.
 * It also stores backup values for sound effects and volume to restore them when unmuted.
 *
 * @param {boolean} buttonDown - Indicates whether the button is currently pressed.
 */
function muteSound(buttonDown) {
    if (buttonDown) {
        if (appState.audio.mute) {
            appState.audio.mute = false;
            appState.audio.SFX = appState.audio.backUpSFX;
            appState.audio.volume = appState.audio.backUpVol;
        } else {
            appState.audio.mute = true;
            appState.audio.backUpSFX = appState.audio.SFX;
            appState.audio.SFX = 0;
            appState.audio.backUpVol = appState.audio.volume;
            appState.audio.volume = 0
        }
        system.refreshAudioVolume();
    }
}

/**
 * Checks if the current device is a mobile device.
 * This function examines the user agent string to determine if the device
 * is running on Android or iOS (including iPhone, iPad, and iPod).
 *
 * @returns {boolean} True if the device is a mobile device, false otherwise.
 */
function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android|iPad|iPhone|iPod/i.test(userAgent)) {
        return true;
    }
    return false;
}