class Player {
    totalCoins = 0;
    coins = 0;
    maxStage = 0;
    stage = 0;
    maxDifficulty = 0;
    difficulty = 0;
    attack = 0;
    health = 0;
    armor = 0;

    /**
     * Loads game data and initializes player stats from the provided data object.
     * @param {Object} data - The data object containing player stats.
     * @param {number} data.maxDifficulty - The maximum difficulty level.
     * @param {number} data.difficulty - The current difficulty level.
     * @param {number} data.totalCoins - The total amount of coins collected.
     * @param {number} data.maxStage - The maximum stage level reached.
     * @param {number} data.attack - The player's attack power.
     * @param {number} data.health - The player's health points.
     * @param {number} data.armor - The player's armor points.
     * @param {number} data.stage - The current stage level.
     * @param {number} data.coins - The current amount of coins.
     */
    load(data) {
        this.maxDifficulty = data.maxDifficulty;
        this.difficulty = data.difficulty;
        this.totalCoins = data.totalCoins;
        this.maxStage = data.maxStage;
        this.attack = data.attack;
        this.health = data.health;
        this.armor = data.armor;
        this.stage = data.stage;
        this.coins = data.coins;
    }

    /**
     * Increases a specified stat (e.g., attack, health, armor) if the player has enough coins to cover the cost.
     * @param {string} stat - The stat to increase (e.g., "attack", "health", "armor").
     */
    increase(stat) {
        let cost = this.getCoinCostOf(stat);
        if (this.coins >= cost) {
            this[stat]++;
            this.coins -= cost;
        }
    }

    /**
     * Changes the stage level, either moving up or down based on the levelUp flag.
     * @param {boolean} levelUp - If true, the stage is increased; otherwise, it is decreased.
     */
    changeStage(levelUp) {
        if (this.stage > 0 && !levelUp) {
            this.stage--;
        }
        if (this.stage < this.maxStage && levelUp) {
            this.stage++;
        }
    }

    /**
     * Changes the difficulty level, either increasing or decreasing based on the levelUp flag.
     * @param {boolean} levelUp - If true, the difficulty is increased; otherwise, it is decreased.
     */
    increaseDiffilculty(levelUp) {
        if (this.difficulty > 0 && !levelUp) {
            this.difficulty--;
        }
        if (this.difficulty < this.maxDifficulty && levelUp) {
            this.difficulty++;
        }
    }

    /**
     * Retrieves the value of a specified property or stat.
     * @param {string} name - The name of the property or stat to retrieve.
     * @returns {*} The value of the specified property or stat.
     */
    getValueOf(name) {
        return this[name];
    }

    /**
     * Calculates the coin cost required to increase a specified stat.
     * @param {string} name - The name of the stat to calculate the cost for.
     * @returns {number} The cost in coins required to increase the stat.
     */
    getCoinCostOf(name) {
        let cost = this[name] + 1;
        return cost;
    }

}