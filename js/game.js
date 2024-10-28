let canvas;
let ctx;
let world;
let keyboard;
let system;

loadAudio();

window.addEventListener('blur', endClick)
document.addEventListener('click', startAudio);

/**
 * Initializes the canvas and the main system components, including keyboard input and system setup.
 */
function init() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    keyboard = new Keyboard();
    system = new System();
}

/**
 * Starts the background audio by invoking the system's audio method.
 * Removes the event listener after starting the audio to prevent multiple starts.
 */
function startAudio() {
    system.startBackgroundAudio(2000);
    document.removeEventListener('click', startAudio);
}

/**
 * Saves the audio settings to localStorage.
 * @param {Object} audio - The audio object containing volume and SFX settings.
 */
function saveAudio() {
    saveLocal('audio', audio);
}

/**
 * Loads the audio settings from localStorage and applies them to the audio object.
 * If saved audio settings exist, updates the volume and SFX settings.
 */
function loadAudio() {
    let buffer = loadLocal('audio')

    if (buffer) {
        audio.volume = buffer.volume;
        audio.SFX = buffer.SFX;
    }
}

/**
 * Opens a new page in a separate browser tab.
 * @param {string} url - The URL of the page to open.
 */
function openNewPage(url) {
    window.open(url, '_blank');
}

/**
 * Resets the 'isClickt' state of all buttons stored in the Button storage.
 */
function endClick() {
    Button.storage.forEach(button => {
        button.isClickt = false;
    })
}

/**
 * Saves a key-value pair to localStorage after serializing the value.
 * @param {string} key - The key under which the value will be stored.
 * @param {Object} value - The value to be serialized and stored.
 */
function saveLocal(key, value) {
    let buffer = JSON.stringify(value);
    localStorage.setItem(key, buffer);
}

/**
 * Loads and parses a stored value from localStorage based on the provided key.
 * @param {string} key - The key associated with the stored value.
 * @returns {Object|null} The parsed value or null if no data is found.
 */
function loadLocal(key) {
    let buffer = localStorage.getItem(key);
    return JSON.parse(buffer);
}