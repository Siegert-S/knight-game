class Coin extends MoveableObject {
    cointype;

    constructor(x, cointype = 'health', drop = false) {
        super(x, 0, false);
        this.cointype = cointype;
        this.choseCoin();
        // this.loadImages(this.IDLE);
        this.loadImage(this.IDLE[0]);


        this.randomY();
        this.width = 25;
        this.height = 25;
        // this.startAnimation();
        this.changeHitbox(25, 25);
        this.dropCoin(drop);
    }

    randomY() {
        let y = Math.random() * 170;
        this.positionY = 145 + y;
    }

    choseCoin() {
        switch (this.cointype) {
            case 'health':
                this.setCoinfaces('b_one', 'b_heart');
                break;
            case 'mana':
                this.setCoinfaces('s_one', 's_star');
                break;
            case 'cash':
                this.setCoinfaces('g_one', 'g_one');
                break;
        }
    }

    setCoinfaces(heads, tails) {
        let haed = this.setFace(heads);
        let tail = this.setFace(tails);
        this.IDLE = [...haed, ...tail];
        this.setImages('idle', this.IDLE);
    }

    setFace(face) {
        switch (face) {
            case 'b_one':
                return COIN_BRONZE_ONE;
            case 'b_heart':
                return COIN_BRONZE_HEART;
            case 'b_star':
                return COIN_BRONZE_STAR;
            case 's_one':
                return COIN_SILVER_ONE;
            case 's_heart':
                return COIN_SILVER_HEART;
            case 's_star':
                return COIN_SILVER_STAR;
            case 'g_one':
                return COIN_GOLD_ONE;
            case 'g_heart':
                return COIN_GOLD_HEART;
            case 'g_star':
                return COIN_GOLD_STAR;
            default:
                return COIN_BRONZE_ONE;
        }
    }

    onCollision() {
        switch (this.cointype) {
            case 'health':
                this.healthCoin();
                this.deleteSelf();
                break;
            case 'mana':
                this.manaCoin();
                this.deleteSelf();
                break;
            case 'cash':
                this.cashCoin();
                this.deleteSelf();
                break;

        }
    }

    healthCoin() {
        if (Character.storage[0].health <= Character.storage[0].maxhealth - 20) {
            Character.storage[0].health = Character.storage[0].health + 20;
        } else {
            Character.storage[0].health = Character.storage[0].maxhealth;
        }
    }

    manaCoin() {
        if (Character.storage[0].mana <= Character.storage[0].maxmana - 1) {
            Character.storage[0].mana = Character.storage[0].mana + 1;
        } else {
            Character.storage[0].mana = Character.storage[0].maxmana;
        }
    }

    cashCoin() {
        Character.storage[0].cash = Character.storage[0].cash + 1;
    }

    dropCoin(isDrop) {
        if (isDrop) {
            this.positionY = this.groundlevel;
            this.gravityIsOn = true;
            let speed = (Math.random() - 0.5) * 13;
            let height = 3 + (Math.random() * 3);
            this.throw(height, speed);
        }
    }
}