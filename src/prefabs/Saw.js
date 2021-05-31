export default class Saw extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, object){
        super(scene, x, y, "saw");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5);
        this.body.setCircle(12, 4, 4);

        this.speed = 0.05;
        this.rotationSpeed = -500;
        this.setAngularVelocity(this.rotationSpeed);
        this.body.setAllowGravity(false);
        this.body.setAllowDrag(false);
        this.body.setImmovable(true);

        if (object){
            console.log(object);

            object.polyline.forEach(point => {
                point.x += object.x;
                point.y += object.y;
                console.log(point);
            })

            this.path = new Phaser.Curves.Path(x, y);
            object.polyline.forEach((point, i) => {
                if (i == 0) return;
                this.path.lineTo(point.x, point.y);
            })
            console.log(this.path);

            let pathLength = this.path.getLength();
            let pathDuration = pathLength / this.speed;

            this.follower = {t: 0, vec: new Phaser.Math.Vector2() };
            this.tween = scene.tweens.add({
                targets: this.follower,
                t: 1,
                ease: "Linear",
                duration: pathDuration,
                yoyo: true,
                repeat: -1,
            })

            // FIXME: For debug purposes only
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
}