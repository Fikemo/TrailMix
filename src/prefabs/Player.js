import { State, StateMachine } from "../../lib/StateMachine.js";

constructor(scene, x, y, texture)
{
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // this.anims.play('ninja', true);
    this.isGrounded = false;
    this.health = 5;
    this.invicible = false;
    this.jumpsRemaining = 0;
    this.fsm = scene.playerFSM;
}


class RunningState extends State {
enter(scene, player){
    player.anims.play('blushie', true);
    // console.log(player.invicible);
    if (player.invicible){
        // TODO: No magic numbers
        this.invicibleTimer = scene.time.delayedCall(1000, () => {player.invicible = false;});
    }
}

execute(scene, player){
    const { left, right, up, down, space, shift } = scene.cursors;

    // trasition to jump
    if (Phaser.Input.Keyboard.JustDown(space)){
        // console.log('jump initiated');
        // TODO: No magic numbers
        player.jumpsRemaining = 1;
        this.stateMachine.transition('jumping');
        return;
    }
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
export { RunningState, JumpingState }