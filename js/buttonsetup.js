function initButton() {
    MenuButton.produce(100, 10, 100, 25, 'main', 'Play', () => { console.log('Play is pressed'); });
    MenuButton.produce(100, 55, 100, 25, 'main', 'Settings', () => { console.log('Settings is pressed'); });
    MenuButton.produce(100, 100, 100, 25, 'main', 'Controlls', () => { console.log('Controlls is pressed'); });

    MenuButton.produce(10, 430, 40, 40, 'controlls', 'left', () => { console.log('left'); });
    MenuButton.produce(60, 430, 40, 40, 'controlls', 'reight', () => { console.log('reight'); });

}