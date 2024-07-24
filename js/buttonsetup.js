let buttonWidth = 175;
let buttonHeight = 50;
let spaceBetweenVertical = 20;

function initButton() {
    MenuButton.produce(canvasCenter(), stackButtons(0, 3), buttonWidth, buttonHeight, 'main', 'Play', () => { console.log('Play is pressed'); });
    MenuButton.produce(canvasCenter(), stackButtons(1, 3), buttonWidth, buttonHeight, 'main', 'Settings', () => { console.log('Settings is pressed'); switchTo('settings'); });
    MenuButton.produce(canvasCenter(), stackButtons(2, 3), buttonWidth, buttonHeight, 'main', 'Controlls', () => { console.log('Controlls is pressed'); });


    // MenuButton.produce(canvasCenter(), 10, buttonWidth, 25, 'settings', 'Main Menu', () => { console.log('Main Menu is pressed'); switchTo('main') });

    MenuButton.produce(10, 430, 40, 40, 'controlls', 'left', () => { console.log('left'); });
    MenuButton.produce(60, 430, 40, 40, 'controlls', 'reight', () => { console.log('reight'); });
    MenuButton.produce(110,430,40,40,'controlls', 'jump',()=>{ console.log('jump');});
    MenuButton.produce(160,430,40,40,'controlls', 'attack',()=>{console.log('attack');});
    MenuButton.produce(210,430,40,40,'controlls', 'defend',()=>{console.log('defend');});


    MenuButton.produce(canvasCenter(), stackButtons(0, 5), buttonWidth, buttonHeight, 'settings', 'Volume', () => { console.log('Volume on/off'); });
    MenuButton.produce(canvasCenter(), stackButtons(1, 5), buttonWidth, buttonHeight, 'settings', 'up',()=>{console.log('volume UP');});
    MenuButton.produce(canvasCenter(), stackButtons(1, 5), buttonWidth, buttonHeight, 'settings', 'down',()=>{console.log('volume DOWN');});
    MenuButton.produce(canvasCenter(), stackButtons(2, 5), buttonWidth, buttonHeight, 'settings', 'SFX', () => { console.log('SFX sound on/off'); });
    MenuButton.produce(canvasCenter(), stackButtons(3, 5), buttonWidht, buttonHeight, 'settings', 'up',()=>{console.log('SFX UP');});
    MenuButton.produce(canvasCenter(), stackButtons(3, 5), buttonWidht, buttonHeight, 'settings', 'down',()=>{console.log('SFX DOWN');});
    MenuButton.produce(canvasCenter(), stackButtons(4, 5), buttonWidth, buttonHeight, 'settings', 'Back to Main Menu', () => { console.log('mainmenu'); switchTo('main'); });

    MenuButton.produce(canvasCenter(), stackButtons(0, 3), buttonWidth, buttonHeight, 'legal', 'legal notice');
    MenuButton.produce(canvasCenter(), stackButtons(1, 3), buttonWidth, buttonHeight, 'legal', 'privat polecey');
    // den back t mainmenu kopieren

    MenuButton.produce(canvasCenter(), stackButtons(0,5), buttonWidth, buttonHeight, 'skill', 'strenght',()=>{console.log('increse power');});
}

function canvasCenter() {
    return (canvas.width / 2) - (buttonWidth / 2);
}

function switchTo(menu) {
    system.show = menu;
}

function stackButtons(index, amount) {
    let center = canvas.height / 2;
    if (amount == 1) {
        return center - buttonHeight / 2;
    } else {
        let startStack = center - (((buttonHeight * amount) + (spaceBetweenVertical * (amount - 1))) / 2);
        let position = startStack + (index * (buttonHeight + spaceBetweenVertical));
        return position;
    }
}