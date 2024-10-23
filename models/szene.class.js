class Szene extends ManageableObject {
    length;
    level;
    difficulty;
    background;
    keywords = ['statue', 'dragon', 'tree_face', 'crypt'];

    /**
       * Initializes the level with a specific length, level number, and difficulty.
       * @param {number} [level=0] - The level number (default is 0).
       * @param {number} [difficulty=1] - The difficulty of the level (default is 1).
       */
    constructor(level = 0, difficulty = 1) {
        super();
        this.length = 10;
        this.level = level;
        this.difficulty = difficulty + 1
        this.selectBackground(level);
        this.buildLevel();
        this.fillLevel();
    }

    /**
     * Selects the background for the level based on the given index.
     * @param {number} [index=0] - The index for the background selection.
     */
    selectBackground(index = 0) {
        let buffer = [];

        for (const key in BACKGROUND[`bg${index}`]) {
            buffer.push(BACKGROUND[`bg${index}`][key]);
        }
        this.background = buffer;
    }

    /**
      * Constructs the level by producing background elements.
      */
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

    /**
     * Fills the level with coins and enemies.
     */
    fillLevel() {
        this.placeCoins();
        this.placeEnemies();
    }

    /**
     * Places health coins in the level.
     */
    placeCoins() {
        this.healthCoins();
    }

    /**
     * Generates health coins based on the level's difficulty.
     */
    healthCoins() {
        let coins = 15 / this.difficulty;
        let distance = (720 * (this.length - 2) / coins);
        for (let i = 0; i < coins; i++) {
            let fixX = (distance * (i + 1));
            let variX = this.intervalVariation(300, false);
            Coin.produce(fixX + variX, 'health');
        }
    }

    /**
     * Generates mana coins in the level. (no longer used)
     */
    manaCoins() {
        let coins = 5;
        let distance = (720 * (this.length - 4) / coins);
        for (let i = 0; i < coins; i++) {
            let fixX = (distance * (i + 1));
            let variX = this.intervalVariation(300, false);
            Coin.produce(fixX + variX, 'mana');
        }
    }

    /**
     * Returns a random variation based on the provided value and direction.
     * @param {number} value - The maximum variation value.
     * @param {boolean} positiveDirection - If true, the variation is positive; otherwise, it is positive or negative.
     * @returns {number} A random variation value.
     */
    intervalVariation(value, positiveDirection) {
        if (positiveDirection) {
            return Math.random() * value;
        } else {
            return (Math.random() - 0.5) * value;
        }
    }

    /**
     * Places enemies in the level based on the difficulty.
     */
    placeEnemies() {
        let enemies = 5 * this.difficulty;
        let distance = (720 * (this.length - 4) / enemies);
        for (let i = 0; i < enemies; i++) {
            let fixX = (distance * (i + 1));
            let variX = this.intervalVariation(300, true);
            Enemy.produce(fixX + variX, this.difficulty);
        }
        Projectile.produce(-10);
        Boss.produce(this.difficulty);
    }
}