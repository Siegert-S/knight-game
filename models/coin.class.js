class Coin extends MoveableObject {
    cointype;

    faces = {
        'b_one': COIN_BRONZE_ONE,
        'b_heart': COIN_BRONZE_HEART,
        'b_star': COIN_BRONZE_STAR,
        's_one': COIN_SILVER_ONE,
        's_heart': COIN_SILVER_HEART,
        's_star': COIN_SILVER_STAR,
        'g_one': COIN_GOLD_ONE,
        'g_heart': COIN_GOLD_HEART,
        'g_star': COIN_GOLD_STAR
    };

    /**
   * Creates a new Coin instance.
   * @param {number} x - The x-coordinate of the coin.
   * @param {string} [cointype='health'] - The type of the coin ('health', 'mana', or 'cash').
   * @param {boolean} [drop=false] - Whether the coin is dropped with gravity.
   */
    constructor(x, cointype = 'health', drop = false) {
        super(x, 0, false);
        this.cointype = cointype;
        this.choseCoin();
        this.loadImage(this.IDLE[0]);
        this.randomY();
        this.width = 25;
        this.height = 25;
        this.changeHitbox(25, 25);
        this.dropCoin(drop);
    }

    /**
     * Randomly sets the y-position of the coin within a range.
     */
    randomY() {
        let y = Math.random() * 170;
        this.positionY = 145 + y;
    }

    /**
     * Chooses the coin's face and tail images based on the coin type.
     */
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

    /**
     * Sets the coin's face and tail images.
     * @param {string} heads - The key for the head side image.
     * @param {string} tails - The key for the tail side image.
     */
    setCoinfaces(heads, tails) {
        let haed = this.setFace(heads);
        let tail = this.setFace(tails);
        this.IDLE = [...haed, ...tail];
        this.setImages('idle', this.IDLE);
    }

    /**
     * Returns the coin face image based on the given face identifier.
     * @param {string} face - The identifier for the face image.
     * @returns {Array} The corresponding face images array.
     */
    setFace(face) {
        return this.faces[face] || COIN_BRONZE_ONE;
    }

    /**
     * Handles collision behavior based on the coin type and then deletes the coin.
     */
    onCollision() {
        switch (this.cointype) {
            case 'health':
                this.healthCoin();
                break;
            case 'mana':
                this.manaCoin();
                break;
            case 'cash':
                this.cashCoin();
                break;
        }
        this.deleteSelf();
    }

    /**
     * Increases the character's health if applicable.
     */
    healthCoin() {
        if (Character.storage[0].health <= Character.storage[0].maxhealth - 20) {
            Character.storage[0].health = Character.storage[0].health + 20;
        } else {
            Character.storage[0].health = Character.storage[0].maxhealth;
        }
    }

    /**
     * Increases the character's mana if applicable.
     */
    manaCoin() {
        if (Character.storage[0].mana <= Character.storage[0].maxmana - 1) {
            Character.storage[0].mana = Character.storage[0].mana + 1;
        } else {
            Character.storage[0].mana = Character.storage[0].maxmana;
        }
    }

    /**
     * Increases the character's cash by 1.
     */
    cashCoin() {
        Character.storage[0].cash = Character.storage[0].cash + 1;
    }

    /**
     * If the coin is dropped, applies gravity and sets the speed and height for throwing the coin.
     * @param {boolean} isDrop - Whether the coin is dropped with gravity.
     */
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