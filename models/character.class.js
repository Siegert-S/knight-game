class Character extends FightingObject {

    mana = 0;
    maxmana = 5;
    cash = 0;
    gameOver = false;

    IDLE = [
        'assets/img/knight/Knight_1/single_images/Idle_1.png',
        'assets/img/knight/Knight_1/single_images/Idle_2.png',
        'assets/img/knight/Knight_1/single_images/Idle_3.png',
        'assets/img/knight/Knight_1/single_images/Idle_4.png',
    ];

    WALK = [
        'assets/img/knight/Knight_1/single_images/Walk_1.png',
        'assets/img/knight/Knight_1/single_images/Walk_2.png',
        'assets/img/knight/Knight_1/single_images/Walk_3.png',
        'assets/img/knight/Knight_1/single_images/Walk_4.png',
        'assets/img/knight/Knight_1/single_images/Walk_5.png',
        'assets/img/knight/Knight_1/single_images/Walk_6.png',
        'assets/img/knight/Knight_1/single_images/Walk_7.png',
        'assets/img/knight/Knight_1/single_images/Walk_8.png',
    ];

    JUMP = [
        'assets/img/knight/Knight_1/single_images/Jump_1.png',
        'assets/img/knight/Knight_1/single_images/Jump_2.png',
        'assets/img/knight/Knight_1/single_images/Jump_2.png',
        'assets/img/knight/Knight_1/single_images/Jump_3.png',
        'assets/img/knight/Knight_1/single_images/Jump_3.png',
        'assets/img/knight/Knight_1/single_images/Jump_4.png',
        'assets/img/knight/Knight_1/single_images/Jump_4.png',
        'assets/img/knight/Knight_1/single_images/Jump_5.png',
        'assets/img/knight/Knight_1/single_images/Jump_5.png',
        'assets/img/knight/Knight_1/single_images/Jump_6.png',
    ];

    DEFEND = [
        'assets/img/knight/Knight_1/single_images/Defend_1.png',
        'assets/img/knight/Knight_1/single_images/Defend_2.png',
        'assets/img/knight/Knight_1/single_images/Defend_3.png',
        'assets/img/knight/Knight_1/single_images/Defend_4.png',
        'assets/img/knight/Knight_1/single_images/Defend_5.png',
    ];

    ATTACK = [
        'assets/img/knight/Knight_1/single_images/Attack_1.png',
        'assets/img/knight/Knight_1/single_images/Attack_2.png',
        'assets/img/knight/Knight_1/single_images/Attack_3.png',
        'assets/img/knight/Knight_1/single_images/Attack_4.png',
        'assets/img/knight/Knight_1/single_images/Attack_5.png',
        'assets/img/knight/Knight_1/single_images/Attack_6.png',
        'assets/img/knight/Knight_1/single_images/Attack_7.png',
        'assets/img/knight/Knight_1/single_images/Attack_8.png',
        'assets/img/knight/Knight_1/single_images/Attack_9.png',
        'assets/img/knight/Knight_1/single_images/Attack_10.png',
        'assets/img/knight/Knight_1/single_images/Attack_11.png',
        'assets/img/knight/Knight_1/single_images/Attack_12.png',
        'assets/img/knight/Knight_1/single_images/Attack_13.png',
    ];

    HURT = [
        'assets/img/knight/Knight_1/single_images/Hurt_1.png',
        'assets/img/knight/Knight_1/single_images/Hurt_2.png',
    ];

    DEAD = [
        'assets/img/knight/Knight_1/single_images/Dead_1.png',
        'assets/img/knight/Knight_1/single_images/Dead_2.png',
        'assets/img/knight/Knight_1/single_images/Dead_3.png',
        'assets/img/knight/Knight_1/single_images/Dead_4.png',
        'assets/img/knight/Knight_1/single_images/Dead_5.png',
        'assets/img/knight/Knight_1/single_images/Dead_6.png',
    ];


    constructor() {
        super();
        this.loadImage(this.IDLE[0]);

        this.setImages('idle', this.IDLE);
        this.setImages('walk', this.WALK);
        this.setImages('attack', this.ATTACK);
        this.setImages('dead', this.DEAD);
        this.setImages('hurt', this.HURT);
        this.setImages('jump', this.JUMP);
        this.setImages('defend', this.DEFEND);

        this.health = 100;
        this.maxhealth = 100;
        this.power = 15 * (player.attack + 1);
        this.armor = 5 * (player.armor + 1);
        this.speedX = 4;

        this.positionX = 50;
        this.width = 220;
        this.height = 150;
        // this.groundlevel = 460;
        this.setHitboxOffset(55, 20, 85, 130)
        this.setAttackboxOffset(140, 10, 80, 130, 35);
        this.setPositionYRelativ(0);

        // this.startAnimation();
        // this.setImages('idle', this.IDLE);
    }

    upDate() {
        super.upDate();
        this.inputCheck();

        if (this.status == 'defend') {
            if (this.faceingLeft) {
                this.setHitboxOffset(70, 20, 85, 130, 5);
            } else {
                this.setHitboxOffset(40, 20, 85, 130, 5);
            }
        }
        if (!(this.status == 'defend')) {
            this.setHitboxOffset(55, 20, 85, 130, 5)
        }
        system.world.cameraX = -(this.positionX - 50);
    }



    inputCheck() {
        if (this.status == 'idle' || this.status == 'walk') {
            if (this.health < 1) {
                this.status = 'dead';
            } else {
                if (keyboard.DOWN) {
                    this.setDefend();
                    this.status = 'defend';
                } else if (keyboard.SPACE) {
                    this.doAttack();
                    this.status = 'attack';
                } else {
                    if (keyboard.UP && !this.isAboveGround()) {

                        this.jump();
                        this.status = 'jump';
                    }
                    if (keyboard.RIGHT && this.positionX < 6500) {

                        this.moveRight();
                        this.status = 'walk';
                    }
                    if (keyboard.LEFT && this.positionX > 50) {

                        this.moveLeft();
                        this.status = 'walk';
                    }
                    if (!keyboard.RIGHT && !keyboard.LEFT && !keyboard.UP) {

                        if (this.status == 'walk') {
                            this.status = 'idle';
                        }
                    }
                }
            }
        }
    }

    // tryAttack() {
    //     Enemy.storage.forEach(enemy => {
    //         if (this.isHiting(enemy)) {
    //             this.strike(enemy);
    //         } else {
    //             this.weaponSound(false);
    //         }
    //     });

    //     Boss.storage.forEach(enemy => {
    //         if (this.isHiting(enemy)) {
    //             this.strike(enemy);
    //         } else {
    //             this.weaponSound(false);
    //         }
    //     });
    // }

    doAttack() {
        let hitEnemy;

        hitEnemy = this.checkHit(Enemy);
        if (hitEnemy == null) {
            hitEnemy = this.checkHit(Projectile);
        }
        if (hitEnemy == null) {
            hitEnemy = this.checkHit(Boss);
        }

        if (hitEnemy != null) {
            this.strike(hitEnemy);
        } else {
            this.weaponSound(false);
        }
    }

    checkHit(classRef) {
        for (let i = 0; i < classRef.storage.length; i++) {
            let enemy = classRef.storage[i];
            if (this.isHiting(enemy)) {
                return enemy;
            }
        }

        return null;
    }

}