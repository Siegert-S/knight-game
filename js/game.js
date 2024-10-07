let canvas;
let ctx;
let world;
let keyboard;
let system;

// let audio = {
//     'volume': 50,
//     'SFX': 50
// }

// let player = new Player();

loadAudio();

window.addEventListener('blur', endClick)
document.addEventListener('click', startAudio);




function init() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    keyboard = new Keyboard();
    // console.log(canvas.getAttribute('width'));
    system = new System();
}

function startAudio() {
    system.startBackgroundAudio();
    document.removeEventListener('click', startAudio);
}

function saveAudio() {
    saveLocal('audio', audio);
}

function loadAudio() {
    let buffer = loadLocal('audio')

    if (buffer) {
        audio.volume = buffer.volume;
        audio.SFX = buffer.SFX;

    }
}

function openNewPage(url) {
    window.open(url, '_blank');
}

function endClick() {
    MenuButton.storage.forEach(button => {
        button.isClickt = false;
    })
}

function saveLocal(key, value) {
    let buffer = JSON.stringify(value);
    localStorage.setItem(key, buffer);
}

function loadLocal(key) {
    let buffer = localStorage.getItem(key);
    return JSON.parse(buffer);
}