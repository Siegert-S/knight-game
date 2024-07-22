function initButton() {
    MenuButton.produce(10, 10, 100, 25, 'mainMenu', 'Play', () => { console.log('Play is pressed'); });
    MenuButton.produce(10, 55, 100, 25, 'mainMenu', 'Settings', () => { console.log('Settings is pressed'); });
    MenuButton.produce(10, 100, 100, 25, 'mainMenu', 'Controlls', () => { console.log('Controlls is pressed'); });

    MenuButton.produce(10, 430, 40, 40, 'controlls', 'left', () => { console.log('left'); });
    MenuButton.produce(60, 430, 40, 40, 'controlls', 'reight', () => { console.log('reight'); });

}