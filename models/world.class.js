class World {

    // canvas;
    // ctx;
    cameraX;

    entity = [];
    hud = [];



    statusbar = [
        new Statusbar(5, 5),
        new Statusbar(5, 35, 'mana'),
        new CoinCounter(5, 65),
    ];
    character = new Character();

    constructor(stage = 0, difficulty = 0) {
        // console.log('world constructor start');
        // this.canvas = canvas;
        // this.ctx = canvas.getContext("2d");

        this.loadLevel(player.stage, player.difficulty);

        // this.draw();
        // this.checkCollisions();
        // console.log('world constructor finish');

    }

    upDate() {
        this.callUpDate();
        this.character.upDate();
        this.collisionCheck();
    }

    draw() {
        // console.log(this.cameraX);
        // console.log(Enemy.storage.length);

        if (this.cameraX <= -6450 && Enemy.storage.length == 0) {
            console.log('sieg');
            this.endWorld(true);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.translateFrame(true);
        this.addContentToMap(this.entity);
        // this.addArrayToMap(this.background);
        // this.addArrayToMap(this.coins);
        // this.addArrayToMap(this.enemies);
        this.addToMap(this.character);
        this.translateFrame(false);
        // this.addArrayToMap(this.statusbar);
        this.addContentToMap(this.hud);

        // let self = this;
        // requestAnimationFrame(() => { self.draw(); });
    }

    addContentToMap(contentArray) {
        contentArray.forEach(array => { this.addArrayToMap(array); });
    }

    addArrayToMap(arrayToDraw) {
        arrayToDraw.forEach(object => { this.addToMap(object); });
    }

    addToMap(objectToDraw) {
        objectToDraw.draw();

        // if (objectToDraw instanceof DrawableObject) { objectToDraw.drawRect(); }
        if (objectToDraw instanceof CollidableObject) { objectToDraw.drawHitbox(); }
        if (objectToDraw instanceof FightingObject) { objectToDraw.drawAttackbox(); }
    }

    translateFrame(lookAtStart) {
        if (lookAtStart) {
            ctx.translate(this.cameraX, 0);
        } else {
            ctx.translate(-this.cameraX, 0);
        }
    }

    checkCollisions() {
        setInterval(() => {
            this.entity.forEach((entry) => {
                entry.forEach((o) => {
                    if (o instanceof Coin || o instanceof Enemy) {
                        if (this.character.isColliding(o)) {
                            o.onCollision();
                        }
                    }
                })
            })
        }, 1000 / 60);
    }

    collisionCheck() {
        this.entity.forEach((entry) => {
            entry.forEach((o) => {
                if (o instanceof Coin || o instanceof Enemy) {
                    if (this.character.isColliding(o)) {
                        o.onCollision();
                    }
                }
            })
        });
    }

    callUpDate() {
        this.entity.forEach((entry) => {
            entry.forEach((o) => {
                if (typeof o.upDate === 'function') {
                    // if (o instanceof Coin || o instanceof Enemy) {
                    o.upDate();
                }
            })
        });
    }

    loadLevel(level, difficulty) {
        Szene.produce(level, difficulty);
        this.collectObjects();
        this.collectHudObjects();
    }

    collectObjects() {
        this.entity.push(Background.storage);
        this.entity.push(Coin.storage);
        this.entity.push(Enemy.storage);
    }

    collectHudObjects() {
        this.hud.push(Statusbar.storage);
        this.hud.push(CoinCounter.storage);
    }

    endWorld(victory) {
        let target;
        if (victory) {
            if (player.maxStage < 7) {
                player.maxStage++;
            }
            if (player.maxDiffilculty == player.difficulty) {
                player.maxDiffilculty++;
            }
            player.coins += Character.storage[0].cash;
            target = 'victoryPage';
        } else {
            target = 'losePage';
        }
        // löschen aller objekte und speichern von fortschrit bei sieg rückker zum play menu
        this.deleteObjectsOf(Coin);
        this.deleteObjectsOf(Enemy);
        this.deleteObjectsOf(Background);

        switchTo(target);
    }

    deleteObjectsOf(classRef) {
        classRef.storage.forEach(object => { object.deleteSelf });
    }

}