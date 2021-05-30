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

        this.JUMP_VEL = -500
        this.jumping = false;

        this.DRAG = 1500;

        this.grounded = false;
        this.invincible = false;
        //this.anims.play('enemy_move', true);
        //enemy = this.add.sprite(100, 120, 'enemy');
    }
    
    update(time, delta){
      this.body.x += 2;
      this.anims.play('enemy_move', true);
      if (this.body.x >= 500) {
           this.body.x += 2;
      }
      else if(50 <= this.body.x <= 200){
          this.body.x -= 2;
      }


 //update enemy movement tests
       // this.enemy.x += 2;

     /* if (this.enemy.x >= 500)
      {
        //this.enemy.x += 2;
        //this.enemy.x = -100;
        //this.enemy.anims.play('enemy_move', true);

      }*/
      /*
      var bop = false;
      if (bop == false) {
          if (this.enemy.x > 500) {
              bop = true;
              //this.enemy.x = 0;
              //continue;
              //break;
          }
          this.enemy.x += 2;
      }
       if(bop == true) {
           if(this.enemy.x < 200) {
               bop = false;
               //this.enemy.x = 0
               //continue;
               //break;
               //this.enemy.x -= 2;
           }
           this.enemy.x -= 2;
       }
        */

       ///////////////
       /*
        this.enemy.x += 2;
       if (this.enemy.x >= 500) {
            this.enemy.x += 2;
       }
       else if(50 <= this.enemy.x <= 200){
           this.enemy.x -= 2;
       }
*/
       
      //  else if(this.enemy.x <= 90) {
        //    this.enemy.x += 2;
        //}
        //this.enemy.x = -100;
      
    //this.enemy.update();
    }
}