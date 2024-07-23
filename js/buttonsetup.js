let buttonWidth = 100


function initButton() {
    MenuButton.produce(canvasCenter(), 10, buttonWidth, 25, 'main', 'Play', () => { console.log('Play is pressed'); });
    MenuButton.produce(canvasCenter(), 55, buttonWidth, 25, 'main', 'Settings', () => { console.log('Settings is pressed'); });
    MenuButton.produce(canvasCenter(), 100, buttonWidth, 25, 'main', 'Controlls', () => { console.log('Controlls is pressed'); });

    MenuButton.produce(10, 430, 40, 40, 'controlls', 'left', () => { console.log('left'); });
    MenuButton.produce(60, 430, 40, 40, 'controlls', 'reight', () => { console.log('reight'); });

}

function canvasCenter() {
    return (canvas.width / 2) - (buttonWidth / 2);
}