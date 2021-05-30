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

        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.sfx_jump = this.scene.sound.add('sfx_jump', {volume: 0.15});
    }

        //this.load.audio('sfx_jump', 'JumpSound.wav');
        //this.jfx = this.sound.add('startMenu_bgm', {volume: 0.2, loop: true});
        //console.log('hi');

    update(time, delta){
        
        this.body.setAccelerationX(0);
        this.body.setDragX(this.DRAG);
        if (this.keyA.isDown){
            this.setFlip(true, false);
            this.anims.play('moving_blush', true);
            //this.body.acceleration -= this.ACCELERATION;
            this.body.setAccelerationX(this.body.acceleration.x - this.ACCELERATION);
        }

        if (this.keyD.isDown){
            this.anims.play('moving_blush', true);
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
       ////////////////Aubrey
        //this.grounded = this.body.touching.down;

        this.grounded = this.body.touching.down || this.body.blocked.down;

        // if (this.grounded) this.canJump = true;

        // FIXME: Implement a state machine for the player

        ///////////////////Aubrey
        //if (this.canJump && Phaser.Input.Keyboard.DownDuration(this.keySpace, 250)){
           // console.log("jumping");
            //this.anims.play('jumping_blush', true);

        if ((this.grounded || this.jumping) && Phaser.Input.Keyboard.DownDuration(this.keySpace, 300)){
            // console.log("jumping");
            this.body.setVelocityY(this.JUMP_VEL);
            this.jumping = true;
            //this.sfx_jump = this.scene.sound.add('sfx_jump', {volume: 0.1});
            //this.sfx_jump.play();
            //this.jfx = this.sound.add('sfx_jump', {volume: 0.2});
            //this.jfx.play();
        } else {
            this.jumping = false;
        }
        ////////////////Aubrey
        //if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
           // this.anims.play('jumping_blush', true);
           // this.sfx_jump = this.scene.sound.add('sfx_jump', {volume: 0.15});
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
    }
}