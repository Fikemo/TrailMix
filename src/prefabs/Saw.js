export default class Saw extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, spawnObj){
        super(scene, x, y, "saw");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5);
        this.body.setCircle(12, 4, 4);

        this.speed = 0.075;
        this.damage = 5;
        this.rotationSpeed = -500;
        this.setAngularVelocity(this.rotationSpeed);
        this.body.setAllowGravity(false);
        this.body.setAllowDrag(false);
        this.body.setImmovable(true);
        
        if (spawnObj){
            if (spawnObj.point){

            } else if (spawnObj.polyline){
                spawnObj.polyline.forEach(point => {
                    point.x += spawnObj.x;
                    point.y += spawnObj.y;
                })

                this.path = new Phaser.Curves.Path(spawnObj.x, spawnObj.y);
                spawnObj.polyline.forEach((point, i) => {
                    if (i == 0) return;
                    this.path.lineTo(point.x, point.y);
                });
                let pathLength = this.path.getLength();
                let pathDuration = pathLength / this.speed;

                this.follower = {t: 0, vec: new Phaser.Math.Vector2() };
                this.tween = scene.tweens.add({
                    targets: this.follower,
                    t: 1,
                    ease: "Linear",
                    duration: pathDuration,
                    yoyo: true,
                    repeat: -1
                })
                this.graphics = scene.add.graphics();
                this.graphics.lineStyle(1, 0xffffff, 1);
                this.path.draw(this.graphics);
            } else if (spawnObj.polygon){
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
                });
                this.graphics = scene.add.graphics();
                this.graphics.lineStyle(1, 0xffffff, 1);
                this.path.draw(this.graphics);
            } else if (spawnObj.ellipse){
                this.path = new Phaser.Curves.Path();

                this.path.add(new Phaser.Curves.Ellipse(spawnObj.x + (spawnObj.width) / 2, spawnObj.y + (spawnObj.width)/2, (spawnObj.width)/2));

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

    }

    update(time, delta){
        if (this.path){
            this.path.getPoint(this.follower.t, this.follower.vec);
            this.setPosition(this.follower.vec.x, this.follower.vec.y);
        }
    }

    takeDamage(damage){
        // the saw does not take damage
    }
}