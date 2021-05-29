export default class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        let loadingBar = this.add.graphics();
        this.load.on("progress", (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);
            loadingBar.fillRect(0,this.scale.height / 2, this.scale.width * value, 5);
        })
        this.load.on("complete", () => {
            loadingBar.destroy();
        })

        // load images, spritesheets, tilemaps, and atlases
        this.load.path = "./assets/images/";

        this.load.image("gameManagerBackground", "gameManagerBackground.png");

        this.load.atlas("mapIcons", "mapIcons.png", "mapIcons.json");
        this.load.atlas("inventoryIcons", "inventoryIcons.png", "inventoryIcons.json");
        this.load.image("selectedInventoryIconFrame", "inventoryIconFrame.png");

        this.load.image("blushie", "blushie.png");
        this.load.image("gun", "gun.png");
        this.load.image("saw", "circularSaw.png");

        this.load.spritesheet("bullet", "bullet_spritesheet.png", {
            frameWidth: 14,
            frameHeight: 14,
            startFrame: 0,
            endFrame: 5
        });

        this.load.spritesheet("mouth", "mouth_spritesheet.png", {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 6,
        })

        this.load.image("basicTileSet", "basicTileSet.png");
        this.load.tilemapTiledJSON("basicRightLeftJSON", "basicRightLeft.json");
        this.load.tilemapTiledJSON("basicUpRightDownLeftJSON", "basicUpRightDownLeft.json");
        this.load.tilemapTiledJSON("basicDownLeftJSON", "basicDownLeft.json");
        this.load.tilemapTiledJSON("enemyHazardTestJSON", "enemyHazardTest.json");

        this.load.bitmapFont("upheaval", "upheaval_0.png", "upheaval.xml");

        // load sounds
        this.load.path = "./assets/sounds/"
        this.load.audio('startMenu_bgm', 'texture03.wav');
        this.load.audio('sfx_jump', 'JumpSound.wav');
        //this.jfx = this.sound.add('sfx_jump', {volume: 0.2});
    }

    create(){

        this.anims.create({
            key: "bullet",
            frames: this.anims.generateFrameNumbers("bullet", {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: "mouth",
            frames: this.anims.generateFrameNumbers("mouth", {
                start: 1,
                end: 6,
                first: 0,
            }),
            frameRate: 30,
            repeat: 0,
        })

        this.scene.start("menuScene");
    }
}