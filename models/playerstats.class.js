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
            // console.log(this.getValueOf(stat));

            // console.log(this.getValueOf('coins'));

        } else {
            console.log('nicht genug Coins');
        }
    }

    getValueOf(name) {
        return this[name];
    }

    getCoinCostOf(name) {
        let cost = this[name] + 1;
        return cost;
    }

    test(name) {
        let classRef = window[name];
        console.log(globalThis);
        if (classRef) {
            if (classRef.storage) {
                console.log(classRef.storage);
            } else {
                console.log(classRef);
            }
        } else {
            console.log('klasse nich vorhanden.');
        }
    }

}