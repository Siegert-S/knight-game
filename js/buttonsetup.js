let buWi = 180; // buttonWidth
let buHi = 50; // buttonHeight
let spaceBetweenVertical = 20;
let spaceBetweenHorizontel = 20;

function initButton() {
    createMenuMain();
    createMenuSettings();
    createMenuLegal();
    createMenuControlls();
    createMenuGame();
    createMenuGameControlls();
    createMenuSkills();

    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(4, 5), buWi, buHi, 'controlls', 'Back to Main Menu', () => { console.log('mainmenu'); switchTo('main'); });


    MenuButton.produce(canvasCenter(), stackButtons(0, 5), buWi, buHi, 'skill', 'strenght', () => { console.log('increse power'); });
}

function createMenuMain() {
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(0, 4), buWi, buHi, 'main', 'Game', () => { switchTo('game'); });
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(1, 4), buWi, buHi, 'main', 'Settings', () => { switchTo('settings'); });
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(2, 4), buWi, buHi, 'main', 'Controlls', () => { switchTo('controlls'); });
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(3, 4), buWi, buHi, 'main', 'Legal', () => { switchTo('legal'); });
}

function createMenuControlls() {
    MenuButton.produce(10, 430, 60, 40, 'controlls', 'left', () => { console.log('left'); });
    MenuButton.produce(90, 430, 60, 40, 'controlls', 'reight', () => { console.log('reight'); });
    MenuButton.produce(510, 430, 60, 40, 'controlls', 'jump', () => { console.log('jump'); });
    MenuButton.produce(580, 430, 60, 40, 'controlls', 'attack', () => { console.log('attack'); });
    MenuButton.produce(650, 430, 60, 40, 'controlls', 'defend', () => { console.log('defend'); });
}

function createMenuSettings() {
    Panel.produce(canvasCenter(0, 1, 280), stackButtons(0, 5), 280, buHi, 'settings', 'volume', 'Volume');
    MenuButton.produce(canvasCenter(0, 3, 80), stackButtons(1, 5), 80, buHi, 'settings', '<--', increaseVolume);
    Panel.produce(canvasCenter(1, 3, 80), stackButtons(1, 5), 80, buHi, 'settings', 'volumevalue', 'volumevalue');
    MenuButton.produce(canvasCenter(2, 3, 80), stackButtons(1, 5), 80, buHi, 'settings', '-->', decreaseVolume);

    Panel.produce(canvasCenter(0, 1, 280), stackButtons(2, 5), 280, buHi, 'settings', 'sfx', 'SFX');
    MenuButton.produce(canvasCenter(0, 3, 80), stackButtons(3, 5), 80, buHi, 'settings', '<--', increaseSfx);
    Panel.produce(canvasCenter(1, 3, 80), stackButtons(3, 5), 80, buHi, 'settings', 'sfxvalue', 'sfxvalue');
    MenuButton.produce(canvasCenter(2, 3, 80), stackButtons(3, 5), 80, buHi, 'settings', '-->', decreaseSfx);

    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(4, 5), buWi, buHi, 'settings', 'Back to Main Menu', () => { switchTo('main'); });
}

function createMenuLegal() {
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(0, 3), buWi, buHi, 'legal', 'legal notice', () => { console.log('legal notice'); });
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(1, 3), buWi, buHi, 'legal', 'privat polecey', () => { console.log('privat polecey'); });
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(2, 3), buWi, buHi, 'legal', 'Back to Main Menu', () => { console.log('mainmenu'); switchTo('main'); });
}

function createMenuShowControlls() {

}

function createMenuGame() {
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(0, 3), buWi, buHi, 'game', 'Start Game', () => { switchTo('gamecontroll'); });
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(1, 3), buWi, buHi, 'game', 'Load Game');
    // MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(2, 6), buWi, buHi, 'game', 'Skills');
    // MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(3, 6), buWi, buHi, 'game', 'Level');
    // MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(4, 6), buWi, buHi, 'game', 'Difilculty');
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(2, 3), buWi, buHi, 'game', 'Back to Main Menu', () => { console.log('mainmenu'); switchTo('main'); });

}

function createMenuGameControlls() {

    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(0, 5), buWi, buHi, 'gamecontroll', 'Play');
    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(1, 5), buWi, buHi, 'gamecontroll', 'Skills', () => { switchTo('skills'); });

    Panel.produce(canvasCenter(0, 4, 100), stackButtons(2, 5), 100, buHi, 'gamecontroll', 'Level', 'Level');
    MenuButton.produce(canvasCenter(1, 4, 100), stackButtons(2, 5), 100, buHi, 'gamecontroll', '<--');
    Panel.produce(canvasCenter(2, 4, 100), stackButtons(2, 5), 100, buHi, 'gamecontroll', 'Levelvalue', 'Levelvalue');
    MenuButton.produce(canvasCenter(3, 4, 100), stackButtons(2, 5), 100, buHi, 'gamecontroll', '-->');


    Panel.produce(canvasCenter(0, 4, 100), stackButtons(3, 5), 100, buHi, 'gamecontroll', 'difficulty', 'Difficulty');
    MenuButton.produce(canvasCenter(1, 4, 100), stackButtons(3, 5), 100, buHi, 'gamecontroll', '<--');
    Panel.produce(canvasCenter(2, 4, 100), stackButtons(3, 5), 100, buHi, 'gamecontroll', 'difficultyvalue', 'difficultyvalue');
    MenuButton.produce(canvasCenter(3, 4, 100), stackButtons(3, 5), 100, buHi, 'gamecontroll', '-->');

    // MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(4, 6), buWi, buHi, 'gamecontroll', 'Difilculty');

    MenuButton.produce(canvasCenter(0, 1, buWi), stackButtons(4, 5), buWi, buHi, 'gamecontroll', 'Back to Game Menu', () => { switchTo('game'); });
}

function createMenuPlay() {
    Panel.produce();// starte spiel
    Panel.produce();// schwierigkeit 
    Panel.produce();// level
    Panel.produce();// skills
}

function createMenuSkills() {

    // console.log(stackButtons(2, 3));
    // console.log(canvasCenter(0, 1, 75));
    Panel.produce(317.5, 125, 85, 85, 'skills', 'power', '');
    Panel.produce(322.5, 130, 75, 75, 'skills', 'power', '', 'assets/img/skills/active1.png');
    
    MenuButton.produce(422.5, 145, buWi, buHi, 'skills', '', () => { switchTo('gamecontroll'); });


    Panel.produce(317.5, 215, 85, 85, 'skills', 'armor', '',);
    Panel.produce(322.5, 220, 75, 75, 'skills', 'armor', '', 'assets/img/skills/active6.png');

    MenuButton.produce(422.5, 235, buWi, buHi, 'skills', '', () => { switchTo('gamecontroll'); });


    Panel.produce(317.5, 305, 85, 85, 'skills', 'health', '');
    Panel.produce(322.5, 310, 75, 75, 'skills', 'health', '', 'assets/img/skills/active8.png');

    MenuButton.produce(422.5, 325, buWi, buHi, 'skills', '', () => { switchTo('gamecontroll'); });

    MenuButton.produce(canvasCenter(0, 1, buWi), 400, buWi, buHi, 'skills', 'Back to Game Menu', () => { switchTo('gamecontroll'); });


    // Panel.produce(canvasCenter(0, 1, 85), stackButtons(0, 3), 85, 85, 'skills', 'power', '');
    // Panel.produce(canvasCenter(0, 1, 75), stackButtons(0, 3), 75, 75, 'skills', 'power', '', 'assets/img/skills/active1.png');


    // Panel.produce(canvasCenter(0, 1, 85), stackButtons(1, 3), 85, 85, 'skills', 'armor', '',);
    // Panel.produce(canvasCenter(0, 1, 75), stackButtons(1, 3), 75, 75, 'skills', 'armor', '', 'assets/img/skills/active6.png');


    // Panel.produce(canvasCenter(0, 1, 85), stackButtons(2, 3), 85, 85, 'skills', 'health', '');
    // Panel.produce(canvasCenter(0, 1, 75), stackButtons(2, 3), 75, 75, 'skills', 'health', '', 'assets/img/skills/active8.png');


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
}

function decreaseVolume() {
    if (volume > 0) {
        volume--;
    }
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