class World {
    cameraX;

    entity = [];
    hud = [];

    worldIsRuning = true;

    statusbar = [
        new Statusbar(5, 5),
        new CoinCounter(5, 35),
    ];

    character = new Character();

    /**
     * Initializes the World object and loads the level.
     */
    constructor() {
        this.loadLevel(player.stage, player.difficulty);
    }


    /**
     * Updates the world state. Checks if the world is running, updates characters, checks for collisions, and updates entities.
     */
    upDate() {
        if (this.worldIsRuning) {
            this.callUpDate();
            this.character.upDate();
            this.collisionCheck();
        }
    }

    /**
     * Draws the world and its contents. Clears the canvas, translates the camera, and renders all entities and HUD objects.
     */
    draw() {
        if (this.worldIsRuning) {
            if ((this.cameraX <= -6450 && Enemy.storage.length == 0) || Character.storage[0].gameOver) {
                this.worldIsRuning = false;
                this.endWorld(!this.character.gameOver);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.translateFrame(true);
                this.addContentToMap(this.entity);
                this.addToMap(this.character);
                this.translateFrame(false);
                this.addContentToMap(this.hud);
            }
        }
    }

    /**
     * Adds a list of content arrays to the map for rendering.
     * @param {Array[]} contentArray - Array of content arrays to be rendered.
     */
    addContentToMap(contentArray) {
        contentArray.forEach(array => { this.addArrayToMap(array); });
    }

    /**
     * Adds an array of objects to the map.
     * @param {Object[]} arrayToDraw - The array of objects to be drawn.
     */
    addArrayToMap(arrayToDraw) {
        if (arrayToDraw) {
            arrayToDraw.forEach(object => { this.addToMap(object); });
        }
    }

    /**
     * Draws an object on the map.
     * @param {Object} objectToDraw - The object to be drawn.
     */
    addToMap(objectToDraw) {
        objectToDraw.draw();

        // if (objectToDraw instanceof DrawableObject) { objectToDraw.drawRect(); }
        // if (objectToDraw instanceof CollidableObject) { objectToDraw.drawHitbox(); }
        // if (objectToDraw instanceof FightingObject) { objectToDraw.drawAttackbox(); }
    }

    /**
     * Translates the camera frame for rendering based on its position.
     * @param {boolean} lookAtStart - If true, translates the camera to the start position.
     */
    translateFrame(lookAtStart) {
        if (lookAtStart) {
            ctx.translate(this.cameraX, 0);
        } else {
            ctx.translate(-this.cameraX, 0);
        }
    }

    /**
     * Checks for collisions between the character and enemies or coins.
     */
    collisionCheck() {
        this.entity.forEach((entry) => {
            this.procesEach(entry, 'onCollision', (o) =>
                (o instanceof Coin || o instanceof Enemy) && this.character.isColliding(o)
            );
        });
    }

    /**
     * Calls the update function for each entity in the world.
     */
    callUpDate() {
        this.entity.forEach((entry) => {
            this.procesEach(entry, 'upDate');
        });
    }

    /**
     * Processes each object in an array, performing an action based on the provided method and optional condition.
     * @param {Object[]} array - Array of objects to process.
     * @param {string} perform - The method name to be invoked on each object.
     * @param {function} [condition] - Optional condition to check before invoking the method.
     */
    procesEach(array, perform, condition) {
        if (array) {
            array.forEach((o) => {
                if (typeof o[perform] === 'function') {
                    if (!condition || condition(o)) {
                        o[perform]();
                    }
                }
            })
        }
    }

    /**
     * Loads the level and difficulty settings, initializing the game entities.
     * @param {number} level - The level to load.
     * @param {number} difficulty - The difficulty setting of the level.
     */
    loadLevel(level, difficulty) {
        Szene.produce(level, difficulty);
        this.collectObjects();
        this.collectHudObjects();
    }

    /**
     * Collects all game entities into the world, including background, coins, enemies, projectiles, and bosses.
     */
    collectObjects() {
        this.entity.push(Background.storage);
        this.entity.push(Coin.storage);
        this.entity.push(Enemy.storage);
        this.entity.push(Projectile.storage);
        this.entity.push(Boss.storage);
    }

    /**
     * Collects HUD (Heads Up Display) objects such as status bars and coin counters.
     */
    collectHudObjects() {
        this.hud.push(Statusbar.storage);
        this.hud.push(CoinCounter.storage);
    }

    /**
     * Ends the world, deconstructs entities, and switches to a victory or loss screen.
     * @param {boolean} victory - Whether the player won the level.
     */
    endWorld(victory) {
        let target;
        if (victory) {
            this.stageUp();
            this.difficultyUp();
            player.totalCoins += Character.storage[0].cash;
            player.coins += Character.storage[0].cash;
            result.earnedCash = Character.storage[0].cash;
            target = 'victoryPage';
        } else {
            target = 'losePage';
        }
        switchTo(target);
        this.deconstructWorld();
    }

    /**
     * Increases the player's stage if applicable.
     */
    stageUp() {
        if (player.maxStage < 7 && player.stage == player.maxStage) {
            player.maxStage++;
            player.stage++;
            result.increaseStage = true;
        } else if (player.stage != player.maxStage) {
            player.stage++;
            result.increaseStage = false;
        } else {
            result.increaseStage = false;
        }
    }

    /**
     * Increases the player's difficulty level if they are at the maximum difficulty.
     */
    difficultyUp() {
        if (player.maxDifficulty == player.difficulty) {
            player.maxDifficulty++;
            result.increaseDif = true;
        } else {
            result.increaseDif = false;
        }
    }

    /**
     * Deletes all objects of a given class from the game.
     * @param {class} classRef - The class reference of the objects to delete.
     */
    deleteObjectsOf(classRef) {
        classRef.storage.forEach(object => { object.deleteSelf() });
    }

    /**
     * Deconstructs the world by deleting all entities, characters, and HUD objects, and resets the game world.
     */
    deconstructWorld() {
        this.deleteObjectsOf(Coin);
        this.deleteObjectsOf(Enemy);
        this.deleteObjectsOf(Boss);
        this.deleteObjectsOf(Background);
        this.deleteObjectsOf(Character);
        this.deleteObjectsOf(Statusbar);
        this.deleteObjectsOf(CoinCounter);
        system.world = null;
    }

}