class Player {
    saveName;
    coins = 100;
    maxStage = 0;
    stage = 0;
    maxDiffilculty = 0;
    difficulty = 0;
    attack = 0;
    health = 1;
    armor = 2;
    magic = 3;


    increase(stat) {
        let cost = this.getCoinCostOf(stat);
        if (this.coins >= cost) {
            this[stat]++;
            this.coins -= cost;
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