import { State, StateMachine } from "../../lib/StateMachine.js";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0);

        this.ACCELERATION = 1000;
        this.MAX_X_VEL = 300;
        this.MAX_Y_VEL = 1000;
        this.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);

        this.JUMP_VEL = -500
        this.jumping = false;

        this.DRAG = 1500;

        this.grounded = false;
        this.invincible = false;

        this.sfx_jump = this.scene.sound.add('sfx_jump', {volume: 0.15});

        this.debugTimerSet = false;

        this.keyA = scene.gameManager.keyA;
        this.keyD = scene.gameManager.keyD;
        this.keySpace = scene.gameManager.cursors.space;

        this.mouth = scene.add.sprite(x, y, "mouth").setOrigin(0);
        this.target = 0;
        this.canShoot = true;

        this.bulletGroup = scene.add.group();

        scene.input.on("pointerdown", (pointer) => {
            this.shoot(pointer);
        });
    }

    update(time, delta){
        
        this.body.setAccelerationX(0);
        this.body.setDragX(this.DRAG);

        if (!this.debugTimerSet){
            this.debugTimerSet = true;
            this.scene.time.delayedCall(1000, () => {this.debugTimerSet = false});
        }

        if (this.keyA.isDown){
            this.setFlip(true, false);
            this.anims.play('moving_blush', true);
            //this.body.acceleration -= this.ACCELERATION;
            this.body.setAccelerationX(this.body.acceleration.x - this.ACCELERATION);
        }

        if (this.keyD.isDown){
            this.anims.play('moving_blush', true);
            // TODO: play moving animation
            // console.log("moving right");
            this.resetFlip();
            //this.body.acceleration -= this.ACCELERATION;
            this.body.setAccelerationX(this.body.acceleration.x + this.ACCELERATION);
        }
        /*
          //set for idle
          if (this.keyA.isUp){
            this.anims.play('idle_blush',true);
        }
           //set for idle
           //(isUp) causes moving and jump anims to stop
           if (this.keyD.isUp){
            this.anims.play('idle_blush',true);
        }
     */
    

        this.grounded = this.body.touching.down || this.body.blocked.down;

        // if (this.grounded) this.canJump = true;

        // FIXME: Implement a state machine for the player


        if ((this.grounded || this.jumping) && Phaser.Input.Keyboard.DownDuration(this.keySpace, 300)){
            // console.log("jumping");
            this.body.setVelocityY(this.JUMP_VEL);
            this.jumping = true;
            // this.sfx_jump = this.scene.sound.add('sfx_jump', {volume: 0.1});
            // this.sfx_jump.play();
            // this.jfx = this.sound.add('sfx_jump', {volume: 0.2});
            // this.jfx.play();
        } else {
            this.jumping = false;
        }
      
        if (Phaser.Input.Keyboard.JustDown(this.keySpace) && this.canJump) {
            this.anims.play('jumping_blush', true);
            this.sfx_jump.play();
        }

        if (Phaser.Input.Keyboard.JustUp(this.keySpace)){
            this.anims.play('jumping_blush', false);
            //causes jump anims to stop but moving continues
           // this.anims.play('idle_blush', true);
            // console.log("space released");
            this.canJump = false;
        }

      /*  if (!this.keyA.isDown){
            this.anims.play('idle_blush', true);
        }
        if (!this.keyD.isDown){
            this.anims.play('idle_blush', true);
        } */
        this.mouth.setPosition(this.x, this.y).setFlip(this.flipX);
    }

    shoot(pointer){
        if (this.canShoot){
            this.mouth.anims.play("mouth");
    
            let shootingFrom = {x: this.mouth.x + 16, y: this.mouth.y + 24};
            let bullet = this.scene.physics.add.sprite(shootingFrom.x, shootingFrom.y, "bullet").setImmovable(true);
            bullet.damage = 1;
            bullet.body.setAllowGravity(false);
            bullet.anims.play("bullet");
            // this.sfx_bullet = this.scene.sound.add('sfx_bullet', {volume: 0.1});
            // this.sfx_bullet.play();
            bullet.sfx = bullet.scene.sound.add('sfx_bullet', {volume: 0.1});
            bullet.sfx.play();
            this.scene.physics.velocityFromAngle(Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(shootingFrom, pointer)), 500, bullet.body.velocity);
            bullet.body.setAngularVelocity(400);

            this.bulletGroup.add(bullet);

            this.scene.time.delayedCall(4000, () => {
                // this.bulletGroup.remove(bullet);
                bullet.destroy();
            });

            this.canShoot = false;
            this.scene.time.delayedCall(250, () => {
                this.canShoot = true;
            })
        }
    }

    takeDamage(damage){
        if (!this.invincible){
            console.log(damage);
            this.invincible = true;
            this.scene.time.delayedCall(1000, () => {this.invincible = false});
        }
    }
}