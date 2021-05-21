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

        this.load.image("basicTileSet", "basicTileSet.png");
        this.load.tilemapTiledJSON("basicUpRightDownLeftJSON", "basicUpRightDownLeft.json");

        this.load.bitmapFont("upheaval", "upheaval_0.png", "upheaval.xml");

        // load sounds
        this.load.path = "./assets/sounds/"
        this.load.audio('startMenu_bgm', 'texture03.wav');
        this.load.audio('sfx_jump', 'JumpSound.wav');
        //this.jfx = this.sound.add('sfx_jump', {volume: 0.2});
    }

    create(){
        this.scene.start("menuScene");
    }
}