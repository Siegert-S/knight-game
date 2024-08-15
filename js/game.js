let canvas;
let ctx;
let world;
let keyboard;
let system;

let volume = 50;
let SFX = 50;

let player = new Player();

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

function testwelt() {
    console.log('starte welt');
    
    world = new World();
}