class Szene extends ManageableObject {
    length;
    level;
    difficulty;
    background;
    keywords = ['statue', 'dragon', 'tree_face', 'crypt'];

    constructor(level = 0, difficulty = 1) {
        console.log('szene constructor start');
        super();
        this.length = 10;
        this.level = level;
        this.difficulty = difficulty + 1
        this.selectBackground(level);
        this.buildLevel();
        this.fillLevel();


        console.log('szene constructor finish');
    }

    selectBackground(index = 0) {
        let buffer = [];
        // Object.values(BACKGROUND[`bg${index}`]).forEach(element => {buffer.push(element);});

        for (const key in BACKGROUND[`bg${index}`]) {
            buffer.push(BACKGROUND[`bg${index}`][key]);
        }
        this.background = buffer;
    }

    buildLevel() {
        for (let i = 0; i < this.length; i++) {
            if (i == this.length - 2) {
                this.background.forEach(element => { Background.produce(element, i); });
            } else {
                this.background.forEach(element => {
                    let check = true;
                    this.keywords.forEach(word => { check = check & !element.includes(word); });
                    if (check) { Background.produce(element, i); }
                });
            }
        }
    }

    fillLevel() {
        this.placeCoins();
        this.placeEnemies();
    }

    placeCoins() {
        this.healthCoins();
        this.manaCoins();
    }

    healthCoins() {
        let coins = 15 / this.difficulty;
        let distance = (720 * (this.length - 2) / coins);
        for (let i = 0; i < coins; i++) {
            let fixX = (distance * (i + 1));
            let variX = this.intervalVariation(300, false);
            // console.log('fix ' + fixX + ' vari ' + variX);
            Coin.produce(fixX + variX, 'health');
        }
    }

    manaCoins() {
        let coins = 5;
        let distance = (720 * (this.length - 4) / coins);
        for (let i = 0; i < coins; i++) {
            let fixX = (distance * (i + 1));
            let variX = this.intervalVariation(300, false);
            // console.log('fix ' + fixX + ' vari ' + variX);
            Coin.produce(fixX + variX, 'mana');
        }
    }

    intervalVariation(value, positiveDirection) {
        if (positiveDirection) {
            return Math.random() * value;
        } else {
            return (Math.random() - 0.5) * value;
        }
    }

    placeEnemies() {
        // console.log('load enemies');
        let enemies = 5 * this.difficulty;
        let distance = (720 * (this.length - 4) / enemies);
        for (let i = 0; i < enemies; i++) {
            // console.log('load enemy ' + i);
            let fixX = (distance * (i + 1));
            let variX = this.intervalVariation(300, true);
            // console.log('fix ' + fixX + ' vari ' + variX + ' total ' + (fixX + variX));
            Enemy.produce(fixX + variX, this.difficulty);
        }
    }
}