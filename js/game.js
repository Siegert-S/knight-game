let canvas;
let ctx;
let world;
let keyboard;
let system;

let audio = {
    'volume': 50,
    'SFX': 50
}

// let;
// let SFX = 50;

let player = new Player();

window.addEventListener('blur', endClick)
document.addEventListener('click', startAudio);




function init() {
    // console.log('finish loading');

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    // initButton();
    keyboard = new Keyboard();
    // console.log(canvas);
    // console.log(canvas.getAttribute('width'));
    // world = new World();
    system = new System();
}

function startAudio() {
    system.backgroundAudio.play();
    document.removeEventListener('click', startAudio);
}

function saveAudio() {

}

function openNewPage(url) {
    window.open(url, '_blank');
}

function endClick() {
    MenuButton.storage.forEach(button => {
        button.isClickt = false;
    })
}