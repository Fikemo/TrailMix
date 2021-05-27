import BaseSceneTiled from "./BaseSceneTiled.js";
import Player from "../prefabs/Player.js"

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
        this.tweens.add({
            targets: this.follower,
            t: 1,
            ease: "Linear",
            duration: this.enemyPathObj.properties[0].value,
            yoyo: true,
            repeat: -1,
        })
    }

    update(time, delta){
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
    }
}