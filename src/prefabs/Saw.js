export default class Saw extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "saw");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5);
        this.body.setCircle(12, 4, 4);

        this.rotationSpeed = -500;
        this.setAngularVelocity(this.rotationSpeed);
        this.body.setAllowGravity(false);
        this.body.setAllowDrag(false);
        this.body.setImmovable(true);
    }

    update(time, delta){
        
    }
}