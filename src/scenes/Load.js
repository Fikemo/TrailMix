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

        //this.load.image('blushie','blushie.png');
        this.load.spritesheet('blush', 'moving_blush.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('jump', 'jump_blush.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('sleep', 'idle_blush.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemy', 'enemy_walk.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image("gameManagerBackground", "gameManagerBackground.png");

        this.load.atlas("mapIcons", "mapIcons.png", "mapIcons.json");
        this.load.atlas("inventoryIcons", "inventoryIcons.png", "inventoryIcons.json");
        this.load.image("selectedInventoryIconFrame", "inventoryIconFrame.png");

        this.load.image("blushie", "blush.png");
        this.load.image("bar", "bar.png");

        this.load.image("basicTileSet", "basicTileSet.png");
        this.load.tilemapTiledJSON("basicRightLeftJSON", "basicRightLeft.json");
        this.load.tilemapTiledJSON("basicUpRightDownLeftJSON", "basicUpRightDownLeft.json");

        this.load.bitmapFont("upheaval", "upheaval_0.png", "upheaval.xml");

        //LavaLeftRight
        this.load.image("LavaLeftRight", "lavalevels.png");
        this.load.tilemapTiledJSON("LavaLeftRightJSON", "LavaLeftRight.json");

        //candyUpDown
        this.load.image("candyTileset", "candyTileset.png");
        this.load.tilemapTiledJSON("CandyUpDownJSON", "CandyUpDown.json");

        // load sounds
        this.load.path = "./assets/sounds/"
        this.load.audio('startMenu_bgm', 'texture03.wav');
        this.load.audio('sfx_jump', 'JumpSound.wav');
        //this.jfx = this.sound.add('sfx_jump', {volume: 0.2});
    }

    create(){
        //create moving animation
        this.anims.create({
            key: 'moving_blush',
            frames: this.anims.generateFrameNumbers('blush', {
                start: 0,
                end: 6,
                first: 0
            }),
            frameRate: 10,
            repeat: 0,
        })
        //create jump animation
        this.anims.create({
            key: 'jumping_blush',
            frames: this.anims.generateFrameNumbers('jump', {
                //custom frames for smooth transition
                frames: [0,1,2,3,4,5,6,0],
            }),
            frameRate: 7,
            repeat: 0,
        })
        //create idle animation
        this.anims.create({
            key: 'idle_blush',
            frames: this.anims.generateFrameNumbers('sleep', {
                start:0,
                end:10,
                first: 0,
            }),
            frameRate: 1,
            repeat: -1,
        })

        this.anims.create({
            key: 'enemy_move',
            frames: this.anims.generateFrameNumbers('enemy', {
                start:0,
                end:3,
                first: 0,
            }),
            frameRate: 6,
            repeat: -1,
        })

        this.scene.start("creditScene");
    }
}