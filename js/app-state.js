
let audio = {
    'volume': 50,
    'SFX': 50
}

let text = {
    'empty': '',
    'mainMenuButton1': 'Game',
    'mainMenuButton2': 'Setting',
    'mainMenuButton3': 'How to Play',
    'mainMenuButton4': 'Legal',
    'settingsMenuPanel1': 'Volume',
    'settingsMenuPanel1': 'SFX',
    'settingsMenuButton1': '+',
    'settingsMenuButton2': '-',
    'settingsMenuButton3': 'Back',
    'legalMenuButton1': 'legal notice',
    'legalMenuButton2': 'privat polecey',
    'legalMenuButton3': 'Back',
    'gameMenuButton1': 'Start Game',
    'gameMenuButton2': 'Load Game',
    'gameMenuButton3': 'Save Game',
    'gameMenuButton4': 'Back',
    'loadgameMenuButton1': 'Load',
    'loadgameMenuButton2': 'Back',
    'savegameMenuButton1': 'Save',
    'savegameMenuButton2': 'Back',
    'gamecontrollMenuPanel1': 'Level',
    'gamecontrollMenuPanel2': 'Difficulty',
    'gamecontrollMenuButton1': 'Play',
    'gamecontrollMenuButton2': 'Skills',
    'gamecontrollMenuButton3': '+',
    'gamecontrollMenuButton4': '-',
    'gamecontrollMenuButton5': 'Back',
    'skillsMenuPanael1': 'available coins',
    'skillsMenuButton1': 'Back',
    'victoryPageMenuPanel1': 'Coins earnd',
    'victoryPageMenuPanel2': 'Unlock new Stage',
    'victoryPageMenuPanel3': 'Unlock new Difficulty',
    'victoryPageButton1': 'Victroy',
    'losePageMenuPanel1': 'you were defeated',
    'losePageMenuButton1': 'Try again',
    'controllsMenuPanel1': 'W  =  Jump',
    'controllsMenuPanel2': 'D  =  Move right',
    'controllsMenuPanel3': 'A  =  Move Left',
    'controllsMenuPanel4': 'S  =  Raise Shield',
    'controllsMenuPanel5': 'Space  =  Attack',
};

let result = {
    increaseDif: false,
    increaseStage: false,
    earnedCash: 0
}

let player = new Player();

let appState = {
    result: result,
    audio: audio,
    text: text,
    player: player,
    save1: '',
    save2: '',
    save3: '',
}