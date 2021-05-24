export default class PlatformCollider extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, w, h){
        super(scene, x, y - h);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0);
        this.body.setSize(w, h, false);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        this.body.checkCollision.down = false;
        this.body.checkCollision.left = false;
        this.body.checkCollision.right = false;
    }
}