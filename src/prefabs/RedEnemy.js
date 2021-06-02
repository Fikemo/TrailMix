export default class RedEnemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, spawnObj){
        super(scene, x, y, "redEnemy");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0);
        this.body.setSize(24, 24, false);
        this.body.setOffset(4, 8);
        this.anims.play("redEnemy");
        this.sfx_enemy = this.scene.sound.add('sfx_enemy', {volume: 0.1});

        this.damage = 5;

        this.speed = 0.05;

        this.hp = 1;

        //Set the object(enemy) point to path created in Tiled:
        //check for point path
        if (spawnObj.point){

        //check for polyline path
        } else if (spawnObj.polyline){
            //remove enemy movement/gravity constraints
            this.body.setImmovable(true);
            this.body.setAllowGravity(false);
            //convert object points into scene coordinates
            spawnObj.polyline.forEach(point => {
                point.x += spawnObj.x;
                point.y += spawnObj.y;
            });
            //set path to array
            this.path = new Phaser.Curves.Path(spawnObj.x, spawnObj.y);
            spawnObj.polyline.forEach((point, i) => {
                if (i == 0) return;
                this.path.lineTo(point.x, point.y);
            })
            //calculate time/speed/distance to maintain consistent speed
            let pathLength = this.path.getLength();
            let pathDuration = pathLength / this.speed;
            //set follower to track/draw tween
            this.follower = {t: 0, vec: new Phaser.Math.Vector2() };
            this.tween = scene.tweens.add({
                targets: this.follower,
                t: 1,
                ease: "Linear",
                duration: pathDuration,
                yoyo: true,
                repeat: -1,
            });
            //draw scene 
            this.graphics = scene.add.graphics();
            this.graphics.lineStyle(1, 0xffffff, 1);
            this.path.draw(this.graphics);
        //check for polygon path
        } else if (spawnObj.polygon){
            this.body.setImmovable(true);
            this.body.setAllowGravity(false);

            
            spawnObj.polygon.forEach(point => {
                point.x += spawnObj.x;
                point.y += spawnObj.y;
            });

            this.path = new Phaser.Curves.Path(spawnObj.x, spawnObj.y);
            spawnObj.polygon.forEach((point, i) => {
                if (i == 0) return;
                this.path.lineTo(point.x, point.y);
            });
            this.path.lineTo(spawnObj.x, spawnObj.y);

            let pathLength = this.path.getLength();
            let pathDuration = pathLength / this.speed;

            this.follower = {t: 0, vec: new Phaser.Math.Vector2() };
            this.tween = scene.tweens.add({
                targets: this.follower,
                t: 1,
                ease: "Linear",
                duration: pathDuration,
                repeat: -1,
            })
            
            this.graphics = scene.add.graphics();
            this.graphics.lineStyle(1, 0xffffff, 1);
            this.path.draw(this.graphics);



        //check for ellipse path
        } else if (spawnObj.ellipse){
            //remove enemy movement/gravity constraints
            this.body.setImmovable(true);
            this.body.setAllowGravity(false);


            this.path = new Phaser.Curves.Path();

            this.path.add(new Phaser.Curves.Ellipse(spawnObj.x + (spawnObj.width)/2, 
                spawnObj.y + (spawnObj.width)/2, (spawnObj.width)/2));

            let pathLength = this.path.getLength();
            let pathDuration = pathLength / this.speed;

            this.follower = {t: 0, vec: new Phaser.Math.Vector2() };

            this.tween = scene.tweens.add({
                targets: this.follower,
                t: 1,
                ease: "Linear",
                duration: pathDuration,
                repeat: -1,
            });

            this.graphics = scene.add.graphics();
            this.graphics.lineStyle(1, 0xffffff, 1);
            this.path.draw(this.graphics);

        }
    }

    update(time, delta){
        if (this.path){
            this.path.getPoint(this.follower.t, this.follower.vec);
            this.setPosition(this.follower.vec.x, this.follower.vec.y);
        }
    }

    takeDamage(damage){
        console.log(damage);
        this.hp -= damage;
        this.sfx_enemy.play();

        if (this.hp <= 0){
            this.destroy();
        }
    }
}