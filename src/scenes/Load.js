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
        
        this.load.atlas("mapNodes", "mapNodes.png", "mapNodes.json");
        this.load.atlas("mapNodes_enlarged", "mapNodes_enlarged.png", "mapNodes_enlarged.json");
        this.load.image("selectedNode_enlarged", "selectedNode_enlarged.png");
        this.load.image("inventoryBackground", "inventoryBackground.png");
        this.load.image("emptyMapNode", "emptyMapNode.png");
        this.load.image("confirmButton", "confirmButton.png");

        this.load.atlas("mapIcons", "mapIcons.png", "mapIcons.json");
        this.load.atlas("mapIcons_enlarged", "mapIcons_enlarged.png", "mapIcons_enlarged.json");
        this.load.image("selectedMapIconFrame", "selectedMapIconFrame.png");

        this.load.image('blushie','blushie.png');

        this.load.bitmapFont("upheaval", "upheaval_0.png", "upheaval.xml");

        this.load.image("tileset", "basic_tileset.png");
        this.load.tilemapTiledJSON("tilemapJSON", "testTileMap.json");

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