let buttonWidth = 100;
let buttonHeight=25;
let spaceBetweenVertical=10;

function initButton() {
    MenuButton.produce(canvasCenter(), stackButtons(0,3), buttonWidth, buttonHeight, 'main', 'Play',        () => { console.log('Play is pressed'); });
    MenuButton.produce(canvasCenter(), stackButtons(1,3), buttonWidth, buttonHeight, 'main', 'Settings',    () => { console.log('Settings is pressed'); });
    MenuButton.produce(canvasCenter(), stackButtons(2,3), buttonWidth, buttonHeight, 'main', 'Controlls',   () => { console.log('Controlls is pressed'); });

    MenuButton.produce(10, 430, 40, 40, 'controlls', 'left', () => { console.log('left'); });
    MenuButton.produce(60, 430, 40, 40, 'controlls', 'reight', () => { console.log('reight'); });

    MenuButton.produce(canvasCenter(),stackButtons(0,3), buttonWidth,buttonHeight,'settings','Volume,'()=>{console.log('Volume on/off');});
    MenuButton.produce(canvasCenter(),stackButtons(1,3), buttonWidth, buttonHeight,'settings','SFX',()=>{console.log('SFX sound on/off');});
    MenuButton.produce(canvasCenter(),stackButtons(2,3), buttonWidth,buttonHeight,'settings', 'Back to Main Menu',()=>{console.log('mainmenu');});
    
    MenuButton.produce(canvasCenter(),stackButtons(0,3), buttonWidth,buttonHeight,'legal','legal notice');
    MenuButton.produce(canvasCenter(),stackButtons(1,3), buttonWidth,buttonHeight,'legal','privat polecey');
    // den back t mainmenu kopieren
}

function canvasCenter() {
    return (canvas.width / 2) - (buttonWidth / 2);
}

function stackButtons(index, amount) {
    let center = canvas.height/2;
if (amount==1) {
    return center- buttonHeight/2;
} else {
    let startStack = center - ( (buttonHeight * amount) + (spaceBetweenVertical * (amount-1)) );
    let position = startStack + (index * (buttonHeight + spaceBetweenVertical));
    return position;
}
}