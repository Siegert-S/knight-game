
let audio = {
    'volume': 50,
    'SFX': 50,
    'mute': false,
    'backUpVol': 50,
    'backUpSFX': 50,
}


let result = {
    increaseDif: false,
    increaseStage: false,
    earnedCash: 0
}


let player = new Player();


let appState = {
    result: result,
    audio: audio,
    text: language['english'],
    player: player,
    loaded:'none',
    save1: '',
    save2: '',
    save3: '',
}