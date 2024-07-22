let canvas;
let ctx;
let world;
let keyboard;
let system;

function init() {
    // console.log('finish loading');

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    keyboard = new Keyboard();
    // console.log(canvas);
    // console.log(canvas.getAttribute('width'));
    // world = new World();
    system = new System();
}