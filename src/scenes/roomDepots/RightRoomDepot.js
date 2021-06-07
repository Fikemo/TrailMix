import BaseSceneTiled from "../BaseSceneTiled.js";

export default class RightRoomDepot extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        this.right = true;

        this.static = true;

        this.musicKey = "basic";

        this.sfxLvl;
        this.soundPlayed = false;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "rightRoomDepotJSON",
            player: true,
        });

        this.terminalScreenPointObj = this.map.objects.find(obj => obj.name === "terminalObject").objects.find(obj => obj.name === "terminalScreen");
        this.terminalScreenObj = this.map.objects.find(obj => obj.name === "terminalObject").objects.find(obj => obj.name === "terminal");

        this.terminalOnScreen = this.add.image(this.terminalScreenPointObj.x, this.terminalScreenPointObj.y, "terminalOnScreenSmall");
        this.terminalOnScreen.setOrigin(0);

        this.terminalHitbox = this.physics.add.sprite(this.terminalScreenObj.x, this.terminalScreenObj.y);
        this.terminalHitbox.setSize(this.terminalScreenObj.width, this.terminalScreenObj.height);
        this.terminalHitbox.setOrigin(0);
        this.terminalHitbox.body.setOffset(0);
        this.terminalHitbox.body.setAllowGravity(false);
        this.terminalHitbox.body.setImmovable(true);
        console.log(this.terminalHitbox);

        this.terminalOverlap = this.physics.add.overlap(this.player, this.terminalHitbox, (player, terminal) => {this.terminalOn = true});
        this.terminalOn = false;

        this.gameManager.adjustPlayerHealth(this.gameManager.playerHealthMax, true);

        this.keyW = this.gameManager.keyW;

    }

    update(time, delta){
        super.update(time, delta);

        this.terminalOnScreen.alpha = this.terminalOn ? 1 : 0;

        if (Phaser.Input.Keyboard.JustDown(this.keyW)){
            if (this.terminalOn){
                // this.gameManager.setActive(false);
                this.giveScenes();
            }
        }

        this.terminalOn = false;
    }

    giveScenes(){
        if (this.player && this.heldRooms){
            if (this.soundPlayed == false) {
                this.sfxLvl = this.sound.add('sfx_levelsAcquired', {volume: 0.1});
                this.sfxLvl.play();
                this.soundPlayed = true;
            }
            while(this.heldRooms.length != 0){
                let sceneType = this.heldRooms.pop();
                let objectToAddToPlayerBlushieInventory = {
                    scene: this,
                    sceneType: sceneType,
                }

                this.gameManager.playerBlushieInventory.push(objectToAddToPlayerBlushieInventory);
            }
            // console.log(this.heldRooms);
        }
    }
}