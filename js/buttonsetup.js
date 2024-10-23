let buWi = 180; // buttonWidth
let buHi = 50; // buttonHeight
let spaceBetweenVertical = 20;
let spaceBetweenHorizontel = 20;

let defaultImg = 'assets/img/brett/brett_2.png';
let hoverImg = 'assets/img/brett/brett.png';
let imageText = 'assets/img/Schrieftrolle.png';
let noImg = 'assets/img/emptyImage.png'

let condition = {
    "volLessThenMax": () => { return appState.audio.volume < 100; },
    "volMoreThenMin": () => { return appState.audio.volume > 0; },
    "SFXLessThenMax": () => { return appState.audio.SFX < 100; },
    "SFXMoreThenMin": () => { return appState.audio.SFX > 0; },
    "levelLessThenMax": () => { return appState.player.stage < appState.player.maxStage; },
    "levelMoreThenMin": () => { return appState.player.stage > 0; },
    "difficultyLessThenMax": () => { return appState.player.difficulty < appState.player.maxDifficulty; },
    "difficultyMoreThenMin": () => { return appState.player.difficulty > 0; },
    "canBuyAttackUp": () => { return appState.player.coins >= appState.player.getCoinCostOf('attack'); },
    "canBuyHealthUp": () => { return appState.player.coins >= appState.player.getCoinCostOf('health'); },
    "canBuyArmorUp": () => { return appState.player.coins >= appState.player.getCoinCostOf('armor'); },
    "unlockNewLevel": () => { return appState.result.increaseStage; },
    "unlockNewDifficulty": () => { return appState.result.increaseDif; },
    "save1Exist": () => { return checkSave('save1') },
    "save2Exist": () => { return checkSave('save2') },
    "save3Exist": () => { return checkSave('save3') },
};

function initButton() {
    createMenuMain();
    createMenuSettings();
    createMenuLegal();
    createMenuControlls();
    createMenuGame();
    createMenuLoadGame();
    createMenuSaveGame();
    createMenuGameControlls();
    createMenuSkills();
    createlosePage();
    createvictoryPage();
}

function createMenuMain() {
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(0, 4), buWi, buHi, defaultImg, hoverImg, 'main', 'text.mainMenuButton1', () => { switchTo('game'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(1, 4), buWi, buHi, defaultImg, hoverImg, 'main', 'text.mainMenuButton2', () => { switchTo('settings'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(2, 4), buWi, buHi, defaultImg, hoverImg, 'main', 'text.mainMenuButton3', () => { switchTo('controlls'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(3, 4), buWi, buHi, defaultImg, hoverImg, 'main', 'text.mainMenuButton4', () => { switchTo('legal'); });
}

function createMenuControlls() {

    Panel.produce(canvasCenter(0, 1, 700), 0, 700, 400, defaultImg, 'controlls', 'white', 'text.empty');

    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(0, 5) - 120, buWi, buWi, noImg, 'controlls', 'white', 'text.controllsMenuPanel1');
    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(1, 5) - 120, buWi, buWi, noImg, 'controlls', 'white', 'text.controllsMenuPanel2');
    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(2, 5) - 120, buWi, buWi, noImg, 'controlls', 'white', 'text.controllsMenuPanel3');
    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(3, 5) - 120, buWi, buWi, noImg, 'controlls', 'white', 'text.controllsMenuPanel4');
    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(4, 5) - 120, buWi, buWi, noImg, 'controlls', 'white', 'text.controllsMenuPanel5');


    Button.produce(canvasCenter(0, 1, buWi), 410, buWi, buHi, defaultImg, hoverImg, 'controlls', 'text.gameMenuButton4', () => { switchTo('main'); });

    // MenuButton.produce(10, 430, 60, 40, 'controlls', 'left', () => { console.log('left'); });
    // MenuButton.produce(90, 430, 60, 40, 'controlls', 'reight', () => { console.log('reight'); });
    // MenuButton.produce(510, 430, 60, 40, 'controlls', 'jump', () => { console.log('jump'); });
    // MenuButton.produce(580, 430, 60, 40, 'controlls', 'attack', () => { console.log('attack'); });
    // MenuButton.produce(650, 430, 60, 40, 'controlls', 'defend', () => { console.log('defend'); });
}

function createMenuSettings() {
    Panel.produce(canvasCenter(0, 1, 280), stackButtons(0, 5), 280, buHi, defaultImg, 'settings', 'white', 'text.settingsMenuPanel1');
    Panel.produce(canvasCenter(1, 3, 80), stackButtons(1, 5), 80, buHi, defaultImg, 'settings', 'white', 'audio.volume');
    Panel.produce(canvasCenter(0, 1, 280), stackButtons(2, 5), 280, buHi, defaultImg, 'settings', 'white', 'text.settingsMenuPanel2');
    Panel.produce(canvasCenter(1, 3, 80), stackButtons(3, 5), 80, buHi, defaultImg, 'settings', 'white', 'audio.SFX');

    Button.produce(canvasCenter(0, 3, 80), stackButtons(1, 5), 80, buHi, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton1', increaseVolume, condition['volLessThenMax']);
    Button.produce(canvasCenter(2, 3, 80), stackButtons(1, 5), 80, buHi, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton2', decreaseVolume, condition['volMoreThenMin']);
    Button.produce(canvasCenter(0, 3, 80), stackButtons(3, 5), 80, buHi, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton1', increaseSfx, condition['SFXLessThenMax']);
    Button.produce(canvasCenter(2, 3, 80), stackButtons(3, 5), 80, buHi, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton2', decreaseSfx, condition['SFXMoreThenMin']);
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(4, 5), buWi, buHi, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton3', () => { switchTo('main'); });
}

function createMenuLegal() {
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(0, 3), buWi, buHi, defaultImg, hoverImg, 'legal', 'text.legalMenuButton1', () => { openNewPage('https://sascha-siegert.developerakademie.net/rechtliches/impressum.html'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(1, 3), buWi, buHi, defaultImg, hoverImg, 'legal', 'text.legalMenuButton2', () => { openNewPage('https://sascha-siegert.developerakademie.net/rechtliches/datenschutz.html'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(2, 3), buWi, buHi, defaultImg, hoverImg, 'legal', 'text.legalMenuButton3', () => { switchTo('main'); });
}

function createMenuShowControlls() {
    // https://sascha-siegert.developerakademie.net/rechtliches/impressum.html
}

function createMenuGame() {
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(0, 4), buWi, buHi, defaultImg, hoverImg, 'game', 'text.gameMenuButton1', () => { switchTo('gamecontroll'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(1, 4), buWi, buHi, defaultImg, hoverImg, 'game', 'text.gameMenuButton2', () => { switchTo('loadgame') });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(2, 4), buWi, buHi, defaultImg, hoverImg, 'game', 'text.gameMenuButton3', () => { switchTo('savegame') });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(3, 4), buWi, buHi, defaultImg, hoverImg, 'game', 'text.gameMenuButton4', () => { switchTo('main'); });

}

function createMenuGameControlls() {
    Panel.produce(canvasCenter(0, 4, 100), stackButtons(2, 5), 100, buHi, defaultImg, 'gamecontroll', 'white', 'text.gamecontrollMenuPanel1');
    Panel.produce(canvasCenter(2, 4, 100), stackButtons(2, 5), 100, buHi, defaultImg, 'gamecontroll', 'white', 'player.stage');
    Panel.produce(canvasCenter(0, 4, 100), stackButtons(3, 5), 100, buHi, defaultImg, 'gamecontroll', 'white', 'text.gamecontrollMenuPanel2');
    Panel.produce(canvasCenter(2, 4, 100), stackButtons(3, 5), 100, buHi, defaultImg, 'gamecontroll', 'white', 'player.difficulty');

    Button.produce(canvasCenter(0, 1, buWi), stackButtons(0, 5), buWi, buHi, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton1', () => { switchTo('play'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(1, 5), buWi, buHi, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton2', () => { switchTo('skills'); });
    Button.produce(canvasCenter(1, 4, 100), stackButtons(2, 5), 100, buHi, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton3', increaseStage, condition['levelLessThenMax']);
    Button.produce(canvasCenter(3, 4, 100), stackButtons(2, 5), 100, buHi, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton4', decreaseStage, condition['levelMoreThenMin']);
    Button.produce(canvasCenter(1, 4, 100), stackButtons(3, 5), 100, buHi, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton3', increaseDifficulty, condition['difficultyLessThenMax']);
    Button.produce(canvasCenter(3, 4, 100), stackButtons(3, 5), 100, buHi, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton4', decreaseDifficulty, condition['difficultyMoreThenMin']);
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(4, 5), buWi, buHi, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton5', () => { switchTo('game'); });
}

function createMenuLoadGame() {
    Panel.produce(canvasCenter(0, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'loadgame', 'black', 'save1.totalCoins');
    Panel.produce(canvasCenter(1, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'loadgame', 'black', 'save2.totalCoins');
    Panel.produce(canvasCenter(2, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'loadgame', 'black', 'save3.totalCoins');

    Button.produce(canvasCenter(0, 3, buWi), stackButtons(1, 3), buWi, buHi, defaultImg, hoverImg, 'loadgame', 'text.loadgameMenuButton1', () => { loadGame('save1'); }, condition['save1Exist']);
    Button.produce(canvasCenter(1, 3, buWi), stackButtons(1, 3), buWi, buHi, defaultImg, hoverImg, 'loadgame', 'text.loadgameMenuButton1', () => { loadGame('save2'); }, condition['save2Exist']);
    Button.produce(canvasCenter(2, 3, buWi), stackButtons(1, 3), buWi, buHi, defaultImg, hoverImg, 'loadgame', 'text.loadgameMenuButton1', () => { loadGame('save3'); }, condition['save3Exist']);
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(2, 3), buWi, buHi, defaultImg, hoverImg, 'loadgame', 'text.loadgameMenuButton2', () => { switchTo('game'); });

}

function createMenuSaveGame() {
    Panel.produce(canvasCenter(0, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'savegame', 'black', 'save1.totalCoins');
    Panel.produce(canvasCenter(1, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'savegame', 'black', 'save2.totalCoins');
    Panel.produce(canvasCenter(2, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'savegame', 'black', 'save3.totalCoins');

    Button.produce(canvasCenter(0, 3, buWi), stackButtons(1, 3), buWi, buHi, defaultImg, hoverImg, 'savegame', 'text.savegameMenuButton1', () => { saveGame('save1'); });
    Button.produce(canvasCenter(1, 3, buWi), stackButtons(1, 3), buWi, buHi, defaultImg, hoverImg, 'savegame', 'text.savegameMenuButton1', () => { saveGame('save2'); });
    Button.produce(canvasCenter(2, 3, buWi), stackButtons(1, 3), buWi, buHi, defaultImg, hoverImg, 'savegame', 'text.savegameMenuButton1', () => { saveGame('save3'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(2, 3), buWi, buHi, defaultImg, hoverImg, 'savegame', 'text.savegameMenuButton2', () => { switchTo('game'); });
}

function createMenuSkills() {

    Panel.produce(canvasCenter(0, 2, buWi), 50, buWi, buHi, defaultImg, 'skills', 'white', 'text.skillsMenuPanael1');
    Panel.produce(canvasCenter(1, 2, buWi), 50, buWi, buHi, defaultImg, 'skills', 'white', 'player.coins');

    Panel.produce(317.5 - 100, 125, 85, 85, defaultImg, 'skills', 'white', 'text.empty');
    Panel.produce(322.5 - 100, 130, 75, 75, 'assets/img/skills/active1.png', 'skills', 'white', 'text.empty');
    Panel.produce(317.5 - 100, 215, 85, 85, defaultImg, 'skills', 'white', 'text.empty');
    Panel.produce(322.5 - 100, 220, 75, 75, 'assets/img/skills/active6.png', 'skills', 'white', 'text.empty');
    Panel.produce(317.5 - 100, 305, 85, 85, defaultImg, 'skills', 'white', 'text.empty');
    Panel.produce(322.5 - 100, 310, 75, 75, 'assets/img/skills/active8.png', 'skills', 'white', 'text.empty');

    Button.produce(canvasCenter(1, 2, buWi), 145, buWi, buHi, defaultImg, hoverImg, 'skills', 'player.attack', () => { player.increase('attack'); }, condition['canBuyAttackUp'], condition['canBuyAttackUp']);
    Button.produce(canvasCenter(1, 2, buWi), 235, buWi, buHi, defaultImg, hoverImg, 'skills', 'player.armor', () => { player.increase('armor'); }, condition['canBuyArmorUp'], condition['canBuyArmorUp']);
    Button.produce(canvasCenter(1, 2, buWi), 325, buWi, buHi, defaultImg, hoverImg, 'skills', 'player.health', () => { player.increase('health'); }, condition['canBuyHealthUp'], condition['canBuyHealthUp']);
    Button.produce(canvasCenter(0, 1, buWi), 400, buWi, buHi, defaultImg, hoverImg, 'skills', 'text.skillsMenuButton1', () => { switchTo('gamecontroll'); });
}

function createlosePage() {
    Panel.produce(canvasCenter(0, 1, 650), (canvas.height / 2 - 415 / 2), 650, 415, imageText, 'losePage', 'white', 'text.empty');
    Panel.produce(canvasCenter(0, 1, 100), 180, 100, 100, noImg, 'losePage', 'black', 'text.losePageMenuPanel1');

    Button.produce(canvasCenter(0, 1, buWi), 400, buWi, buHi, defaultImg, hoverImg, 'losePage', 'text.losePageMenuButton1', () => { switchTo('gamecontroll'); });
}

function createvictoryPage() {
    Panel.produce(canvasCenter(0, 1, 650), (canvas.height / 2 - 415 / 2), 650, 415, imageText, 'victoryPage', 'white', 'text.empty');
    Panel.produce(canvasCenter(0, 1, 100), 120, 100, 100, noImg, 'victoryPage', 'black', 'text.victoryPageMenuPanel1');
    Panel.produce(canvasCenter(0, 1, 100), 160, 100, 100, noImg, 'victoryPage', 'black', 'result.earnedCash');
    Panel.produce(canvasCenter(0, 1, 100), 200, 100, 100, noImg, 'victoryPage', 'black', 'text.victoryPageMenuPanel2', condition['unlockNewLevel']);
    Panel.produce(canvasCenter(0, 1, 100), 240, 100, 100, noImg, 'victoryPage', 'black', 'text.victoryPageMenuPanel3', condition['unlockNewDifficulty']);

    Button.produce(canvasCenter(0, 1, buWi), 400, buWi, buHi, defaultImg, hoverImg, 'victoryPage', 'text.victoryPageButton1', () => { switchTo('gamecontroll'); });
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
    system.switchingTo(menu);
}

function increaseVolume() {
    if (audio.volume < 100) {
        audio.volume++;
    }
    saveAudio();
    system.refreshAudioVolume();
}

function decreaseVolume() {
    if (audio.volume > 0) {
        audio.volume--;
    }
    saveAudio();
    system.refreshAudioVolume();
}

function increaseSfx() {
    if (audio.SFX < 100) {
        audio.SFX++;
    }
    saveAudio();
}

function decreaseSfx() {
    if (audio.SFX > 0) {
        audio.SFX--;
    }
    saveAudio();
}

function decreaseStage() {
    if (condition.levelMoreThenMin()) {
        player.stage--;
    }
}

function increaseStage() {
    if (condition.levelLessThenMax()) {
        player.stage++;
    }
}

function decreaseDifficulty() {
    if (condition.difficultyMoreThenMin()) {
        player.difficulty--;
    }
}

function increaseDifficulty() {
    if (condition.difficultyLessThenMax()) {
        player.difficulty++;
    }
}

function saveGame(slot) {
    system.saveGame(slot);
    appState[slot] = player;
}

function loadGame(slot) {
    if (checkSave(slot)) {
        player.load(appState[slot]);
    }
}

function checkSave(slot) {
    let keyset1 = Object.keys(player);
    let keyset2 = Object.keys(appState[slot]);

    if (keyset1.length !== keyset2.length) {
        return false
    }

    return keyset1.every(key => keyset2.includes(key));
}