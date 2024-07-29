let buWi = 180; // buttonWidth
let buHi = 50; // buttonHeight
let spaceBetweenVertical = 20;
let spaceBetweenHorizontel = 20;

function initButton() {
    createMenuMain();
    createMenuSettings();
    createMenuLegal();


    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(4, 5), buWi, buHi, 'controlls', 'Back to Main Menu', () => { console.log('mainmenu'); switchTo('main'); });


    MenuButton.produce(canvasCenter(), stackButtons(0, 5), buWi, buHi, 'skill', 'strenght', () => { console.log('increse power'); });
}

function createMenuMain() {
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(0, 4), buWi, buHi, 'main', 'Play', () => { console.log('Play is pressed'); });
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(1, 4), buWi, buHi, 'main', 'Settings', () => { switchTo('settings'); });
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(2, 4), buWi, buHi, 'main', 'Controlls', () => { switchTo('controlls'); });
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(3, 4), buWi, buHi, 'main', 'Legal', () => { switchTo('legal'); });
}

function createMenuControlls() {
    MenuButton.produce(10, 430, 40, 40, 'controlls', 'left', () => { console.log('left'); });
    MenuButton.produce(60, 430, 40, 40, 'controlls', 'reight', () => { console.log('reight'); });
    MenuButton.produce(110, 430, 40, 40, 'controlls', 'jump', () => { console.log('jump'); });
    MenuButton.produce(160, 430, 40, 40, 'controlls', 'attack', () => { console.log('attack'); });
    MenuButton.produce(210, 430, 40, 40, 'controlls', 'defend', () => { console.log('defend'); });
}

function createMenuSettings() {
    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(0, 5), buWi, buHi, 'settings', 'volume', 'Volume');
    MenuButton.produce(canvasCenter(0, 3, 80), stackButtons(1, 5), 80, buHi, 'settings', 'up', increaseVolume);
    Panel.produce(canvasCenter(1, 3, 80), stackButtons(1, 5), 80, buHi, 'settings', 'volumevalue', 'volumevalue');
    MenuButton.produce(canvasCenter(2, 3, 80), stackButtons(1, 5), 80, buHi, 'settings', 'down', decreaseVolume);

    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(2, 5), buWi, buHi, 'settings', 'sfx', 'SFX');
    MenuButton.produce(canvasCenter(0, 3, 80), stackButtons(3, 5), 80, buHi, 'settings', 'up', increaseSfx);
    Panel.produce(canvasCenter(1, 3, 80), stackButtons(3, 5), 80, buHi, 'settings', 'sfxvalue', 'sfxvalue');
    MenuButton.produce(canvasCenter(2, 3, 80), stackButtons(3, 5), 80, buHi, 'settings', 'down', decreaseSfx);

    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(4, 5), buWi, buHi, 'settings', 'Back to Main Menu', () => { console.log('mainmenu'); switchTo('main'); });
}

function createMenuLegal() {
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(0, 3), buWi, buHi, 'legal', 'legal notice', () => { console.log('legal notice'); });
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(1, 3), buWi, buHi, 'legal', 'privat polecey', () => { console.log('privat polecey'); });
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(2, 3), buWi, buHi, 'legal', 'Back to Main Menu', () => { console.log('mainmenu'); switchTo('main'); });
}

function createMenuShowControlls() {

}

function createMenu() {

}




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

function switchTo(menu) {
    system.show = menu;
}

function increaseVolume() {
    if (volume < 100) {
        volume++;
    }
    console.log(volume);
}

function decreaseVolume() {
    if (volume > 0) {
        volume--;
    }
    console.log(volume);
}

function increaseSfx() {
    if (SFX < 100) {
        SFX++;
    }
}

function decreaseSfx() {
    if (SFX > 0) {
        SFX--;
    }
}