import { State, StateMachine } from "../../lib/StateMachine.js";
export default class Player extends Phaser.Physics.Arcade.Sprite{
    
    // Special getting and setting functions for current health and max health
    // #cH and #mH are private vairables to the Player class
    // use player.currentHealth and player.maxHealth outside of this class to get and set the values
    // For example, simply use player.maxHealth = 2 or player.currentHealth--
    // whenever you get currentHealth, it will return #cH, same with maxHealth and #mH
    // whenever you set currentHealth, it will set #cH to the new value and set UINeedsUpdate to true since the UI will need to be updated due to this change
    /**@type {number} */
    #cH;
    get currentHealth() {return this.#cH};
    set currentHealth(value) {
        this.#cH = value;
        this.UINeedsUpdate = true;
    }
    /**@type {number} */
    #mH;
    get maxHealth() {return this.#mH};
    set maxHealth(value) {
        this.#mH = value;
        this.UINeedsUpdate = true;
    }

    #s;
    get score() {return this.#s};
    set score(value) {
        this.#s = value;
        this.UINeedsUpdate = true;
    }
    

    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.currentHealth = 3;
        this.maxHealth = 3;
        this.UINeedsUpdate = true;
        this.moveSpeed = 2;
        

       /* this.FSM = new StateMachine('running', {
            running: new RunningState(),
            jumping: new JumpingState(),
           // attacking: new AttackingState(),
            //attackingInAir: new AttackingInAirState(),
           // hurt: new HurtState(),
           // dead: new DeadState(),
        },[scene, this]);

        

        // this.attackHitbox = new PlayerAttackHitbox(scene, x + this.width, y + this.height);
        /*this.attackHitbox = new PlayerSecondaryHitbox(scene, this, x + this.width, y + this.height, 40, 84, this.body.width,this.body.height - (this.body.halfHeight + 84 / 2), undefined, 'slash');
        this.attackHitbox.attacking = false;
        this.attackHitbox.successfulHit = false;
        this.attackHitbox.alpha = 0;
        this.damageHitbox = new PlayerSecondaryHitbox(scene, this, x, y, 40, 60, this.body.halfWidth - 8, this.body.halfHeight - 30, 0x0000FF);
        */
        this.grounded = false;
        //this.invincible = false;
        this.maxJumps = 1;
        this.jumpsRemaining = this.maxJumps;
        this.score = 0;
        this.setOrigin(0,0);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.moveSpeed = 400;
    }

    update(){
    //player movement
    if (this.cursors) {

        if (this.keyA.isDown){
            //this.player.setVelocityX -= this.moveSpeed;
            this.setVelocityX(-this.moveSpeed);
            // console.log('left');
            //this.player.anims.play('move');
            this.setFlip(true, false);
        }
        else if (this.keyD.isDown){
            this.setVelocityX(this.moveSpeed);
            //this.player.setVelocityX += this.moveSpeed;
            this.setFlip();
            //this.player.anims.play('move');
            // console.log('right');
        }
        else if (Phaser.Input.Keyboard.JustUp(this.keyA)){
            this.setVelocityX(0);
        }
        else if (Phaser.Input.Keyboard.JustUp(this.keyD)){
            this.setVelocityX(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keySpace) && this.body.touching.down){
            this.setVelocityY(-this.moveSpeed);
            // console.log('jump');
        }
    }
    }
}
//attempt of state machine
      /*  this.FSM.step();

        // update the attack hitbox
        this.attackHitbox.update();

        // update damage hitbox
        this.damageHitbox.update();
    }

    takeDamage(damage){
        if (!this.invincible && !this.attackHitbox.attacking){
            this.currentHealth -= damage;
            this.FSM.transition('hurt');
        }
    }
}

class RunningState extends State {
enter(scene, player){
    player.load.image('blushie', true);
    // console.log(player.invicible);
    }


execute(scene, player){
    const { keyA, keyD } = scene.cursors;

    if(keyA.isDown) {
        this.x -= this.moveSpeed;
    } else if (keyD.isDown) {
        this.x += this.moveSpeed;
    }
    // trasition to jump
    //if (Phaser.Input.Keyboard.JustDown(left,right)){
        // console.log('jump initiated');
        // TODO: No magic numbers
       // player.jumpsRemaining = 1;
        //this.stateMachine.transition('jumping');
        return;
    }
}

class JumpingState extends State {
enter(scene, player){
    player.anims.stop();
}

execute(scene, player){
    const { left, right, up, down, space, shift } = scene.cursors;

    let jumping = true;

    // TODO: No magic numbers
    if (player.jumpsRemaining > 0 && Phaser.Input.Keyboard.DownDuration(space, 200)){
        player.body.velocity.y = -600;
    }

    if (Phaser.Input.Keyboard.UpDuration(space)){
        player.jumpsRemaining--;
    }

    if (player.body.velocity.y < 0){
        jumping = true;
    } else {
        jumping = false;
    }

    if (player.body.touching.down && jumping == false) {
        // console.log("landed");
        this.stateMachine.transition('running');
    }
}
}
export { RunningState, JumpingState }*/