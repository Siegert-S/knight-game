class Character extends FightingObject {

    mana = 0;
    maxmana = 5;
    cash = 0;


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

        // this.loadImages(this.IDLE);
        // this.loadImages(this.WALK);
        // this.loadImages(this.JUMP);
        // this.loadImages(this.DEFEND);
        // this.loadImages(this.ATTACK);
        // this.loadImages(this.HURT);
        // this.loadImages(this.DEAD);

        this.health = 100;
        this.maxhealth = 100;
        this.power = 15;
        this.speedX = 4;

        this.positionX = 50;
        this.width = 220;
        this.height = 150;
        // this.groundlevel = 460;
        this.setHitboxOffset(55, 20, 85, 130)
        this.setAttackboxOffset(140, 10, 80, 130, 35);
        this.setPositionYRelativ(0);
        // this.applyGravity();
        // this.animate();

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
        // console.log(system.Menu);

        system.world.cameraX = -(this.positionX - 50);
    }

    animate() {
        this.setAndSaveIntervall(() => {
            // if (!keyboard.DOWN) {
            //     this.setHitboxOffset(55, 20, 85, 130, 5)
            // }
            // if (keyboard.DOWN) {
            //     if (this.faceingLeft) {
            //         this.setHitboxOffset(70, 20, 85, 130, 5);

            //     } else {
            //         this.setHitboxOffset(40, 20, 85, 130, 5);
            //     }
            //     this.setDefend();

            // } else {
            //     if (keyboard.UP && !this.isAboveGround()) {
            //         this.jump();
            //     }
            //     if (keyboard.RIGHT) {
            //         this.moveRight();

            //     }
            //     if (keyboard.LEFT && this.positionX > 50) {
            //         this.moveLeft();
            //     }
            // }
            this.inputCheck();
            // console.log(this.statuss);
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


            world.cameraX = -(this.positionX - 50);
        }, 1000 / 60);

        // this.setAndSaveIntervall(() => {
        //     if (this.health < 1) {
        //         this.animateImage(this.DEAD)
        //     } else if (keyboard.DOWN) {
        //         this.animateImage(this.DEFEND)
        //     } else if (this.isHurt()) {
        //         this.animateImage(this.HURT)
        //     } else if (this.isAboveGround()) {
        //         this.animateImage(this.JUMP)
        //     } else if (keyboard.RIGHT || keyboard.LEFT) {
        //         this.animateImage(this.WALK)
        //     } else {
        //         this.animateImage(this.IDLE)
        //     }

        // }, 1000 / 10);
        // war 1000 / 6 
    }

    inputCheck() {
        if (this.status == 'idle' || this.status == 'walk') {
            if (keyboard.DOWN) {
                this.setDefend();
                this.status = 'defend';
            } else if (keyboard.SPACE) {
                this.tryAttack();
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

    tryAttack() {
        Enemy.storage.forEach(enemy => {
            if (this.isHiting(enemy)) {
                // console.log('is hiting ');
                this.strike(enemy);
            }
        });
    }
}