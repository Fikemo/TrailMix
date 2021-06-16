import BaseSceneTiled from "../BaseSceneTiled.js";

export default class Hub extends BaseSceneTiled{
    
    constructor(key, gameManager){
        super(key, gameManager);

        this.static = true;

        this.up = true;
        this.right = true;
        this.down = true;
        this.left = true;

        this.musicKey = "basic";

        this.showInsctructions = true;

        this.setIcon();
    }

    create(data){
        super.create(data);

        this.createStandardLevel({
            mapJSON: "hubJSON",
            // backgroundImage: <background image key>
            player: true,
        });

        if (this.showInsctructions) this.controlsText = this.add.bitmapText(64, 280,"upheaval", "ASD TO MOVE\nW TO INTERACT\nSPACE TO JUMP\nCLICK TO SHOOT", -24, "center");

        this.terminalOnScreen = this.add.image(384, 240, "terminalOnScreen");

        this.terminalObj = this.map.objects.find(obj => obj.name === "terminalObject").objects.find(obj => obj.name === "terminal");
        // console.log(this.terminalObj);

        this.terminalHitbox = this.physics.add.sprite(this.terminalObj.x, this.terminalObj.y);
        this.terminalHitbox.setSize(this.terminalObj.width, this.terminalObj.height);
        this.terminalHitbox.setOrigin(0);
        this.terminalHitbox.body.setOffset(0);
        this.terminalHitbox.body.setAllowGravity(false);
        this.terminalHitbox.body.setImmovable(true);
        // console.log(this.terminalHitbox);

        this.terminalOverlap = this.physics.add.overlap(this.player, this.terminalHitbox, (player, terminal) => {this.terminalOn = true});
        this.terminalOn = false;

        this.gameManager.adjustPlayerHealth(this.gameManager.playerHealthMax, true);

        this.keyW = this.gameManager.keyW;
        // this.keyW.on("down", (x, y) => {
        //     console.log(x)
        //     console.log(y)
        //     if (this.terminalOn) this.gameManager.setActive(true)
        // });

        this.showInsctructions = false;
    }

    update(time, delta){
        super.update(time, delta);

        this.terminalOnScreen.alpha = this.terminalOn ? 1 : 0;

        if (Phaser.Input.Keyboard.JustDown(this.keyW)){
            if (this.terminalOn){
                this.gameManager.setActive(false);
            }
        }

        this.terminalOn = false;
    }
}