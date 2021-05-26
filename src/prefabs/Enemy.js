export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0);

        this.ACCELERATION = 1000;
        this.MAX_X_VEL = 300;
        this.MAX_Y_VEL = 1000;
        this.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        //this.velocity.x = 10
        this.grounded = false;
        this.body.velocity = 10;
        this.acceleration = -3000;
        this.maxSpeed = 700;
        this.body.setVelocityX(600);
        //this.anims.play('enemy_move', true);
        //enemy = this.add.sprite(100, 120, 'enemy');
    }
    
    update(time, delta){
       /* this.body.setVelocityX(600);

        this.x += 2;

      if (this.x >= 950)
      {
        this.x = -150;
        this.anims.play('enemy_move', true);
      }

      this.enemy.update();
        */
      this.enemy.update();
    }
}