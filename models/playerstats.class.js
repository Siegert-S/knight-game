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


    increase(stat) {
        let cost = this.getCoinCostOf(stat);
        if (this.coins >= cost) {
            this[stat]++;
            this.coins -= cost;
        }
    }

    changeStage(levelUp) {
        if (this.stage > 0 && !levelUp) {
            this.stage--;
        }
        if (this.stage < this.maxStage && levelUp) {
            this.stage++;
        }
    }

    increaseDiffilculty(levelUp) {
        if (this.difficulty > 0 && !levelUp) {
            this.difficulty--;
        }
        if (this.difficulty < this.maxDifficulty && levelUp) {
            this.difficulty++;
        }
    }

    getValueOf(name) {
        return this[name];
    }

    getCoinCostOf(name) {
        let cost = this[name] + 1;
        return cost;
    }

}