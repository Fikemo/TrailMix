import { State, StateMachine } from "../../lib/StateMachine.js";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene,x,y, "player_idle");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0);

        this.ACCELERATION = 1000;
        this.MAX_X_VEL = 300;
        this.MAX_Y_VEL = 1000;
        this.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);

        this.JUMP_VEL = -400

        this.DRAG = 1500;

        this.keyA = scene.gameManager.keyA;
        this.keyD = scene.gameManager.keyD;
        this.keySpace = scene.gameManager.keySpace;

        this.FSM = new StateMachine("idle", {
            idle: new IdleState(),
            jumping: new JumpingState(),
            falling: new FallingState(),
            walking: new WalkingState(),
        }, [scene, this]);
        
    }

    update(time, delta){
        // this.FSM.step();

        // if player is not moving (velocity == 0) and they are on the ground (body.touching.down or body.blocked.down)
        // be idle (idle animation)

        // if player is moving (velocity != 0) and they are on the ground (body.touching.down or body.blocked.down)
        // be walking (moving animation)

        // if player is not on the ground
        // be falling

        // if player is on ground and input

        this.body.setAccelerationX(0);
        this.body.setDragX(this.DRAG);

        if (this.keyA.isDown){
            this.body.setAccelerationX(this.body.acceleration.x - this.ACCELERATION);
        }

        if (this.keyD.isDown){
            this.body.setAccelerationX(this.body.acceleration.x + this.ACCELERATION);
        }

        // FIXME: If holding jump while falling, player will jump when hitting the ground
        this.grounded = this.body.touching.down || this.body.blocked.down;

        if (this.grounded && Phaser.Input.Keyboard.JustDown(this.keySpace)){
            console.log("initiate jump");
            this.jumping = true;
            this.scene.time.delayedCall(200, () => {this.jumping = false});
        }

        if (this.jumping) this.body.setVelocityY(this.JUMP_VEL);

        if (Phaser.Input.Keyboard.JustUp(this.keySpace)){
            this.jumping = false
        }

        // if (this.grounded) this.canJump = true;
        // else if (!this.jumping) this.canJump = false;

        // if (this.canJump && Phaser.Input.Keyboard.DownDuration(this.keySpace, 200)){
        //     this.body.setVelocityY(this.JUMP_VEL);
        //     this.jumping = true;
        // }

        // if (Phaser.Input.Keyboard.JustUp(this.keySpace)){
        //     this.canJump = false;
        //     this.jumping = false;
        // }

        // velocity checks
        if (this.body.velocity.x > 0){
            this.setFlipX(false);
        } else if (this.body.velocity.x < 0){
            this.setFlipX(true);
        }

        if (this.body.velocity.x == 0 && this.body.velocity.y == 0 && this.grounded){
            this.anims.play("player_idle", true);
        }

        if (this.body.velocity.x != 0 && this.grounded){
            this.anims.play("player_move", true);
        }

        if (this.body.velocity.y != 0 && !this.grounded){
            this.anims.play("player_jump", true);

            if (Math.abs(this.body.velocity.y) > 0){
                this.anims.setCurrentFrame(this.anims.currentAnim.frames[0]);
            }

            if (Math.abs(this.body.velocity.y) > 150){
                this.anims.setCurrentFrame(this.anims.currentAnim.frames[1]);
            }

            if (Math.abs(this.body.velocity.y) > 300){
                this.anims.setCurrentFrame(this.anims.currentAnim.frames[2]);
            }

            
        }
    }

    handleMovement(){
        
    }

    shoot(pointer){
        
    }

    takeDamage(damage){
        
    }
}

class IdleState extends State {
    enter(scene, player){
        console.log(player);
        player.anims.play("player_idle");
    }
    
    execute(scene, player){
        if (player.keyA.isDown || player.keyD.isDown){
            player.FSM.transition("walking")
        }
    }

    exit(scene, player){

    }
}

class JumpingState extends State {
    enter(scene, player){

    }
    
    execute(scene, player){

    }

    exit(scene, player){

    }
}

class FallingState extends State {
    enter(scene, player){

    }
    
    execute(scene, player){

    }

    exit(scene, player){

    }
}

class WalkingState extends State {
    enter(scene, player){
        console.log("entered walking state");
        player.anims.play("player_move");
    }
    
    execute(scene, player){
        if (player.body.touching.down || player.body.blocked.down){
            player.FSM.transition("idle");
        }
    }

    exit(scene, player){

    }
}