import BaseSceneTiled from "../BaseSceneTiled.js";
import Player from "../../prefabs/Player.js";
import Saw from "../../prefabs/Saw.js";

export default class BasicDownLeft extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        // this.up
        // this.right
        this.down = true;
        this.left = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({mapJSON: "basicDownLeftJSON"});
        console.log(this.map);

        let ps = this.calculatePlayerSpawnPoint();

        this.player = new Player(this, ps.x, ps.y, "blushie");

        this.setPlayerSpawnState();

        this.createPlayerColliders();

        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.graphics = this.add.graphics();
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.enemyPathObj = this.map.objects[1].objects[0];
        console.log(this.enemyPathObj);
        this.enemyPathObj.polyline.forEach(pos => {
            pos.x += this.enemyPathObj.x;
            pos.y += this.enemyPathObj.y;
        })
        this.enemyPath = new Phaser.Curves.Path(this.enemyPathObj.x, this.enemyPathObj.y);
        this.enemyPathObj.polyline.forEach((pos, index) => {
            if (index == 0) return;
            this.enemyPath.lineTo(pos.x, pos.y);
        })
        console.log(this.enemyPathObj.properties);

        this.saw = new Saw(this, this.enemyPathObj.polyline[0].x, this.enemyPathObj.polyline[0].y);

        this.tweens.add({
            targets: this.follower,
            t: 1,
            ease: "Linear",
            duration: this.enemyPathObj.properties[0].value,
            yoyo: true,
            repeat: -1,
        })

        this.gun = this.add.sprite(this.player.x, this.player.y, "mouth").setOrigin(0);
        console.log(this.gun);
        this.target = 0;
        this.canShoot = true;
        this.input.on("pointerdown", (pointer) => {
            if (this.canShoot){
                this.shoot(pointer);
                this.canShoot = false;
                this.time.delayedCall(250, () => {this.canShoot = true;})
            }
        })
        this.input.on("pointermove", (pointer) => {
            this.target = Phaser.Math.Angle.BetweenPoints(this.gun, pointer);
        })
    }

    update(time, delta){
        super.update(time, delta);
        this.player.update();

        if (Phaser.Input.Keyboard.JustDown(this.keyS)){
            this.turnOffPlatformCollisions();
        }

        this.setDoors();

        this.checkPlayerExit();

        this.graphics.clear();
        this.graphics.lineStyle(1, 0xffffff, 1);

        this.enemyPath.draw(this.graphics);

        this.enemyPath.getPoint(this.follower.t, this.follower.vec);

        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillCircle(this.follower.vec.x, this.follower.vec.y, 12);
        this.saw.setPosition(this.follower.vec.x, this.follower.vec.y);

        this.gun.setPosition(this.player.x, this.player.y);
        // this.gun.setRotation(this.target);
        // this.gun.setFlipY(Math.abs(this.gun.rotation) > Math.PI / 2);
        this.gun.setFlipX(this.player.flipX);

        // if (this.input.activePointer.isDown){
        //     if (this.canShoot){
        //         this.shoot(this.input.activePointer);
        //         this.canShoot = false;
        //         this.time.delayedCall(75, () => {this.canShoot = true})
        //     }
        // }
    }

    shoot(pointer){
        this.gun.anims.play("mouth");
        let shootingFrom = {x: this.gun.x + 16, y: this.gun.y + 24};
        let bullet = this.physics.add.sprite(shootingFrom.x, shootingFrom.y, "bullet").setImmovable(true);
        bullet.damage = 1;
        bullet.body.setAllowGravity(false);
        bullet.anims.play("bullet");
        // console.log(Phaser.Math.Angle.BetweenPoints(this.gun, pointer));
        this.physics.velocityFromAngle(Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(shootingFrom, pointer)), 500, bullet.body.velocity);
        bullet.body.setAngularVelocity(400);
        this.time.delayedCall(4000, () => {
            bullet.destroy();
        })
    }
}