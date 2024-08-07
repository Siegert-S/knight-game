class Player {
    saveName;
    coins = 100;
    maxStage = 0;
    stage = 0;
    maxDiffilculty = 0;
    difficulty = 0;
    attack = 0;
    health = 0;
    armor = 0;
    magic = 0;


    increase(stat) {
        let cost = this.getCoinCostOf(stat);
        if (this.coins >= cost) {
            this[stat]++;
            this.coins -= cost;
        }
    }

    changeStage(levelUp) {
        // let change = (levelUp) ? 1 : -1;
        if (this.stage > 0 && !levelUp) {
            this.stage--;
        }
        if (this.stage < this.maxStage && levelUp) {
            this.stage++;
        }
    }

    increaseDiffilculty(levelUp) {
        // let change = (levelUp) ? 1 : -1;
        if (this.difficulty > 0 && !levelUp) {
            this.difficulty--;
        }
        if (this.difficulty < this.maxDiffilculty && levelUp) {
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