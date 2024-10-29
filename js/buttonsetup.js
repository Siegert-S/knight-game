let buWi = 180; // buttonWidth
let buHi = 50; // buttonHeight
let spaceBetweenVertical = 20;
let spaceBetweenHorizontel = 20;

let defaultImg = 'assets/img/brett/brett_2.png';
let hoverImg = 'assets/img/brett/brett.png';
let imageText = 'assets/img/Schrieftrolle.png';
let noImg = 'assets/img/emptyImage.png'
let testImg = 'assets/img/box.svg'
let leftImg = 'assets/img/box-left.svg';
let rightImg = 'assets/img/box-right.svg';
let upImg = 'assets/img/box-up.svg';
let defendImg = 'assets/img/box-shield.svg';
let attackImg = 'assets/img/box-sword.svg';
let fullScreenonImg = 'assets/img/fullscreen-on.svg';
let fullScreenonImgHover = 'assets/img/fullscreen-on-hover.svg';
let fullScreenoffImg = 'assets/img/fullscreen-off.svg';
let fullScreenoffImgHover = 'assets/img/fullscreen-off-hover.svg';
let fullscreenOnButton;
let fullScreenOffButton;
let fullScreenOnFlag = false;

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
    "save1Exist": () => { return checkSave('save1'); },
    "save2Exist": () => { return checkSave('save2'); },
    "save3Exist": () => { return checkSave('save3'); },
    "save1Loaded": () => { return appState.loaded == 'save1'; },
    "save2Loaded": () => { return appState.loaded == 'save2'; },
    "save3Loaded": () => { return appState.loaded == 'save3'; },
    "isMobileView": () => { return window.innerWidth < 1024; },
    "isPortraitFormat": () => { return window.innerWidth < window.innerHeight },
    "isLandscapeFormat": () => { return window.innerWidth > window.innerHeight },
};

/**
 * Initializes the main menu buttons and pages.
 */
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

    if (isMobileDevice()) {
        createTouchButton();
    }
    createWideScreenNotification();
    fullscreenButton();
}

/**
 * Creates the main menu buttons.
 */
function createMenuMain() {
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(0, 4), buWi, buHi, false, defaultImg, hoverImg, 'main', 'text.mainMenuButton1', () => { switchTo('game'); }, condition['isLandscapeFormat']);
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(1, 4), buWi, buHi, false, defaultImg, hoverImg, 'main', 'text.mainMenuButton2', () => { switchTo('settings'); }, condition['isLandscapeFormat']);
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(2, 4), buWi, buHi, false, defaultImg, hoverImg, 'main', 'text.mainMenuButton3', () => { switchTo('controlls'); }, condition['isLandscapeFormat']);
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(3, 4), buWi, buHi, false, defaultImg, hoverImg, 'main', 'text.mainMenuButton4', () => { switchTo('legal'); }, condition['isLandscapeFormat']);
}

/**
 * Creates the controls menu and its buttons.
 */
function createMenuControlls() {
    Panel.produce(canvasCenter(0, 1, 700), 0, 700, 400, defaultImg, 'controlls', 'white', 'text.empty');

    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(0, 5) - 120, buWi, buWi, noImg, 'controlls', 'white', 'text.controllsMenuPanel1');
    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(1, 5) - 120, buWi, buWi, noImg, 'controlls', 'white', 'text.controllsMenuPanel2');
    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(2, 5) - 120, buWi, buWi, noImg, 'controlls', 'white', 'text.controllsMenuPanel3');
    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(3, 5) - 120, buWi, buWi, noImg, 'controlls', 'white', 'text.controllsMenuPanel4');
    Panel.produce(canvasCenter(0, 1, buWi), stackButtons(4, 5) - 120, buWi, buWi, noImg, 'controlls', 'white', 'text.controllsMenuPanel5');

    Button.produce(canvasCenter(0, 1, buWi), 410, buWi, buHi, false, defaultImg, hoverImg, 'controlls', 'text.gameMenuButton4', () => { switchTo('main'); });
}

/**
 * Creates the settings menu and its buttons.
 */
function createMenuSettings() {
    Panel.produce(canvasCenter(0, 1, 280), stackButtons(0, 7), 280, buHi, defaultImg, 'settings', 'white', 'text.settingsMenuPanel1');
    Panel.produce(canvasCenter(1, 3, 80), stackButtons(1, 7), 80, buHi, defaultImg, 'settings', 'white', 'audio.volume');
    Panel.produce(canvasCenter(0, 1, 280), stackButtons(2, 7), 280, buHi, defaultImg, 'settings', 'white', 'text.settingsMenuPanel2');
    Panel.produce(canvasCenter(1, 3, 80), stackButtons(3, 7), 80, buHi, defaultImg, 'settings', 'white', 'audio.SFX');

    Button.produce(canvasCenter(0, 3, 80), stackButtons(1, 7), 80, buHi, false, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton1', increaseVolume, condition['volLessThenMax']);
    Button.produce(canvasCenter(2, 3, 80), stackButtons(1, 7), 80, buHi, false, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton2', decreaseVolume, condition['volMoreThenMin']);
    Button.produce(canvasCenter(0, 3, 80), stackButtons(3, 7), 80, buHi, false, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton1', increaseSfx, condition['SFXLessThenMax']);
    Button.produce(canvasCenter(2, 3, 80), stackButtons(3, 7), 80, buHi, false, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton2', decreaseSfx, condition['SFXMoreThenMin']);

    Button.produce(canvasCenter(0, 1, 280), stackButtons(4, 7), 280, buHi, true, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton4', (value) => { muteSound(value); });
    Button.produce(canvasCenter(0, 1, 280), stackButtons(5, 7), 280, buHi, true, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton5', (value) => { changeLanguage(value); });

    Button.produce(canvasCenter(0, 1, buWi), stackButtons(6, 7), buWi, buHi, false, defaultImg, hoverImg, 'settings', 'text.settingsMenuButton3', () => { switchTo('main'); });
}

/**
 * Creates the legal menu and its buttons.
 */
function createMenuLegal() {
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(0, 3), buWi, buHi, false, defaultImg, hoverImg, 'legal', 'text.legalMenuButton1', () => { openNewPage('https://sascha-siegert.developerakademie.net/rechtliches/impressum.html'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(1, 3), buWi, buHi, false, defaultImg, hoverImg, 'legal', 'text.legalMenuButton2', () => { openNewPage('https://sascha-siegert.developerakademie.net/rechtliches/datenschutz.html'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(2, 3), buWi, buHi, false, defaultImg, hoverImg, 'legal', 'text.legalMenuButton3', () => { switchTo('main'); });
}

/**
 * Creates the game menu and its buttons.
 */
function createMenuGame() {
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(0, 4), buWi, buHi, false, defaultImg, hoverImg, 'game', 'text.gameMenuButton1', () => { switchTo('gamecontroll'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(1, 4), buWi, buHi, false, defaultImg, hoverImg, 'game', 'text.gameMenuButton2', () => { switchTo('loadgame') });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(2, 4), buWi, buHi, false, defaultImg, hoverImg, 'game', 'text.gameMenuButton3', () => { switchTo('savegame') });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(3, 4), buWi, buHi, false, defaultImg, hoverImg, 'game', 'text.gameMenuButton4', () => { switchTo('main'); });

}

/**
 * Creates the game controls menu and its buttons.
 */
function createMenuGameControlls() {
    Panel.produce(canvasCenter(0, 4, 110), stackButtons(2, 5), 110, buHi, defaultImg, 'gamecontroll', 'white', 'text.gamecontrollMenuPanel1');
    Panel.produce(canvasCenter(2, 4, 110), stackButtons(2, 5), 110, buHi, defaultImg, 'gamecontroll', 'white', 'player.stage');
    Panel.produce(canvasCenter(0, 4, 110), stackButtons(3, 5), 110, buHi, defaultImg, 'gamecontroll', 'white', 'text.gamecontrollMenuPanel2');
    Panel.produce(canvasCenter(2, 4, 110), stackButtons(3, 5), 110, buHi, defaultImg, 'gamecontroll', 'white', 'player.difficulty');

    Button.produce(canvasCenter(0, 1, buWi), stackButtons(0, 5), buWi, buHi, false, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton1', () => { switchTo('play'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(1, 5), buWi, buHi, false, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton2', () => { switchTo('skills'); });
    Button.produce(canvasCenter(1, 4, 110), stackButtons(2, 5), 110, buHi, false, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton3', increaseStage, condition['levelLessThenMax']);
    Button.produce(canvasCenter(3, 4, 110), stackButtons(2, 5), 110, buHi, false, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton4', decreaseStage, condition['levelMoreThenMin']);
    Button.produce(canvasCenter(1, 4, 110), stackButtons(3, 5), 110, buHi, false, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton3', increaseDifficulty, condition['difficultyLessThenMax']);
    Button.produce(canvasCenter(3, 4, 110), stackButtons(3, 5), 110, buHi, false, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton4', decreaseDifficulty, condition['difficultyMoreThenMin']);
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(4, 5), buWi, buHi, false, defaultImg, hoverImg, 'gamecontroll', 'text.gamecontrollMenuButton5', () => { switchTo('game'); });
}

/**
 * Creates the load game menu and its buttons.
 */
function createMenuLoadGame() {
    Panel.produce(canvasCenter(0, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'loadgame', 'black', 'save1.totalCoins');
    Panel.produce(canvasCenter(1, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'loadgame', 'black', 'save2.totalCoins');
    Panel.produce(canvasCenter(2, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'loadgame', 'black', 'save3.totalCoins');

    Panel.produce(canvasCenter(0, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'loadgame', 'black', 'text.loadgameMenuPanel1', condition['save1Loaded']);
    Panel.produce(canvasCenter(1, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'loadgame', 'black', 'text.loadgameMenuPanel1', condition['save2Loaded']);
    Panel.produce(canvasCenter(2, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'loadgame', 'black', 'text.loadgameMenuPanel1', condition['save3Loaded']);

    Button.produce(canvasCenter(0, 3, buWi), stackButtons(1, 3), buWi, buHi, false, defaultImg, hoverImg, 'loadgame', 'text.loadgameMenuButton1', () => { loadGame('save1'); }, condition['save1Exist']);
    Button.produce(canvasCenter(1, 3, buWi), stackButtons(1, 3), buWi, buHi, false, defaultImg, hoverImg, 'loadgame', 'text.loadgameMenuButton1', () => { loadGame('save2'); }, condition['save2Exist']);
    Button.produce(canvasCenter(2, 3, buWi), stackButtons(1, 3), buWi, buHi, false, defaultImg, hoverImg, 'loadgame', 'text.loadgameMenuButton1', () => { loadGame('save3'); }, condition['save3Exist']);
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(2, 3), buWi, buHi, false, defaultImg, hoverImg, 'loadgame', 'text.loadgameMenuButton2', () => { switchTo('game'); });

}

/**
 * Creates the save game menu and its buttons.
 */
function createMenuSaveGame() {
    Panel.produce(canvasCenter(0, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'savegame', 'black', 'save1.totalCoins');
    Panel.produce(canvasCenter(1, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'savegame', 'black', 'save2.totalCoins');
    Panel.produce(canvasCenter(2, 3, buWi), stackButtons(0, 3) - 75, buWi + 35, buHi + 75, imageText, 'savegame', 'black', 'save3.totalCoins');

    Button.produce(canvasCenter(0, 3, buWi), stackButtons(1, 3), buWi, buHi, false, defaultImg, hoverImg, 'savegame', 'text.savegameMenuButton1', () => { saveGame('save1'); });
    Button.produce(canvasCenter(1, 3, buWi), stackButtons(1, 3), buWi, buHi, false, defaultImg, hoverImg, 'savegame', 'text.savegameMenuButton1', () => { saveGame('save2'); });
    Button.produce(canvasCenter(2, 3, buWi), stackButtons(1, 3), buWi, buHi, false, defaultImg, hoverImg, 'savegame', 'text.savegameMenuButton1', () => { saveGame('save3'); });
    Button.produce(canvasCenter(0, 1, buWi), stackButtons(2, 3), buWi, buHi, false, defaultImg, hoverImg, 'savegame', 'text.savegameMenuButton2', () => { switchTo('game'); });
}

/**
 * Creates the skills menu and its buttons.
 */
function createMenuSkills() {

    Panel.produce(canvasCenter(0, 2, buWi), 50, buWi, buHi, defaultImg, 'skills', 'white', 'text.skillsMenuPanael1');
    Panel.produce(canvasCenter(1, 2, buWi), 50, buWi, buHi, defaultImg, 'skills', 'white', 'player.coins');

    Panel.produce(317.5 - 100, 125, 85, 85, defaultImg, 'skills', 'white', 'text.empty');
    Panel.produce(322.5 - 100, 130, 75, 75, 'assets/img/skills/active1.png', 'skills', 'white', 'text.empty');
    Panel.produce(317.5 - 100, 215, 85, 85, defaultImg, 'skills', 'white', 'text.empty');
    Panel.produce(322.5 - 100, 220, 75, 75, 'assets/img/skills/active6.png', 'skills', 'white', 'text.empty');
    Panel.produce(317.5 - 100, 305, 85, 85, defaultImg, 'skills', 'white', 'text.empty');
    Panel.produce(322.5 - 100, 310, 75, 75, 'assets/img/skills/active8.png', 'skills', 'white', 'text.empty');

    Button.produce(canvasCenter(1, 2, buWi), 145, buWi, buHi, false, defaultImg, hoverImg, 'skills', 'player.attack', () => { player.increase('attack'); }, condition['canBuyAttackUp'], condition['canBuyAttackUp']);
    Button.produce(canvasCenter(1, 2, buWi), 235, buWi, buHi, false, defaultImg, hoverImg, 'skills', 'player.armor', () => { player.increase('armor'); }, condition['canBuyArmorUp'], condition['canBuyArmorUp']);
    Button.produce(canvasCenter(1, 2, buWi), 325, buWi, buHi, false, defaultImg, hoverImg, 'skills', 'player.health', () => { player.increase('health'); }, condition['canBuyHealthUp'], condition['canBuyHealthUp']);
    Button.produce(canvasCenter(0, 1, buWi), 400, buWi, buHi, false, defaultImg, hoverImg, 'skills', 'text.skillsMenuButton1', () => { switchTo('gamecontroll'); });
}

/**
 * Creates the loss page that displays when the player loses.
 */
function createlosePage() {
    Panel.produce(canvasCenter(0, 1, 650), (canvas.height / 2 - 415 / 2), 650, 415, imageText, 'losePage', 'white', 'text.empty');
    Panel.produce(canvasCenter(0, 1, 100), 180, 100, 100, noImg, 'losePage', 'black', 'text.losePageMenuPanel1');

    Button.produce(canvasCenter(0, 1, buWi), 400, buWi, buHi, false, defaultImg, hoverImg, 'losePage', 'text.losePageMenuButton1', () => { switchTo('gamecontroll'); });
}

/**
 * Creates the victory page that displays when the player wins.
 */
function createvictoryPage() {
    Panel.produce(canvasCenter(0, 1, 650), (canvas.height / 2 - 415 / 2), 650, 415, imageText, 'victoryPage', 'white', 'text.empty');
    Panel.produce(canvasCenter(0, 1, 100), 120, 100, 100, noImg, 'victoryPage', 'black', 'text.victoryPageMenuPanel1');
    Panel.produce(canvasCenter(0, 1, 100), 160, 100, 100, noImg, 'victoryPage', 'black', 'result.earnedCash');
    Panel.produce(canvasCenter(0, 1, 100), 200, 100, 100, noImg, 'victoryPage', 'black', 'text.victoryPageMenuPanel2', condition['unlockNewLevel']);
    Panel.produce(canvasCenter(0, 1, 100), 240, 100, 100, noImg, 'victoryPage', 'black', 'text.victoryPageMenuPanel3', condition['unlockNewDifficulty']);

    Button.produce(canvasCenter(0, 1, buWi), 400, buWi, buHi, false, defaultImg, hoverImg, 'victoryPage', 'text.victoryPageButton1', () => { switchTo('gamecontroll'); });
}

/**
 * Creates touch buttons for mobile devices.
 */
function createTouchButton() {
    Button.produce(5, 425, 50, 50, true, leftImg, leftImg, 'play', 'text.empty', (value) => { setInput('LEFT', value); });
    Button.produce(75, 425, 50, 50, true, rightImg, rightImg, 'play', 'text.empty', (value) => { setInput('RIGHT', value); });
    Button.produce(520, 425, 50, 50, true, upImg, upImg, 'play', 'text.empty', (value) => { setInput('UP', value); });
    Button.produce(590, 425, 50, 50, true, defendImg, defendImg, 'play', 'text.empty', (value) => { setInput('DOWN', value); });
    Button.produce(660, 425, 50, 50, true, attackImg, attackImg, 'play', 'text.empty', (value) => { setInput('SPACE', value); });
}

/**
 * Creates a widescreen notification panel on the canvas when the device is in portrait mode.
 * This panel displays a message advising the user to rotate their device to landscape mode.
 *
 * @function createWideScreenNotification
 * @returns {void} No return value.
 */
function createWideScreenNotification() {
    Panel.produce(0, 0, 720, 480, defaultImg, 'main', 'white', 'text.wideScreenNotification', condition['isPortraitFormat']);
}

/**
 * Initializes two buttons for toggling fullscreen mode, positioned at the top-right corner of the canvas.
 * The buttons alternate between enabling and disabling fullscreen mode, depending on the current state.
 *
 * @function fullscreenButton
 * @returns {void} No return value.
 */
function fullscreenButton() {
    let width = 30;

    fullscreenOnButton = new Button(720 - width, 0, width, width, true, fullScreenoffImg, fullScreenoffImgHover, 'screen', 'text.empty', (value) => { system.enterFullscreen(value); });
    fullScreenOffButton = new Button(720 - width, 0, width, width, true, fullScreenonImg, fullScreenonImgHover, 'screen', 'text.empty', (value) => { system.exitFullscreen(value); });

}