export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0);
        this.body.setSize(24, 24, false);
        this.body.setOffset(4, 8);
    }
}