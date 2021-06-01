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

        // load images, spritesheets, tilesets, tilemaps, and atlases
        this.load.path = "./assets/images/";

        //this.load.image('blushie','blushie.png');
        this.load.spritesheet('blush', 'moving_blush.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('jump', 'jump_blush.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('sleep', 'idle_blush.png', { frameWidth: 32, frameHeight: 32 });
        // UI
        this.load.image("gameManagerBackground", "gameManagerBackground.png");
        this.load.image("selectedInventoryIconFrame", "inventoryIconFrame.png");
        this.load.image("mapIconFrame", "mapIconFrame.png");
        this.load.atlas("mapIcons", "mapIcons.png", "mapIcons.json");
        this.load.atlas("inventoryIcons", "inventoryIcons.png", "inventoryIcons.json");

        //this.load.image("blushie", "blush.png");
        //this.load.image("bar", "bar.png");
        
        // player
        this.load.image("blushie", "blushie.png");
        this.load.spritesheet("mouth", "mouth_spritesheet.png", {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 6,
        });

        // items
        this.load.spritesheet("bullet", "bullet_spritesheet.png", {
            frameWidth: 14,
            frameHeight: 14,
            startFrame: 0,
            endFrame: 5
        });

        // enemies and hazards
        this.load.image("saw", "circularSaw.png");
        this.load.spritesheet("redEnemy", "redEnemy_spritesheet.png", {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 2,
        });

        // tilesets
        this.load.image("basicTileSet", "basicTileSet.png");
        this.load.image("NeonTileSet", "NeonTileSet.png");
        this.load.image("waterTileset","waterTileset.png");

        // tile maps
        this.load.tilemapTiledJSON("basicRightLeftJSON", "basicRightLeft.json");
        this.load.tilemapTiledJSON("basicUpRightDownLeftJSON", "basicUpRightDownLeft.json");
        this.load.tilemapTiledJSON("basicDownLeftJSON", "basicDownLeft.json");
        this.load.tilemapTiledJSON("enemyHazardTestJSON", "enemyHazardTest.json");
        this.load.tilemapTiledJSON("testJSON", "test.json");
        this.load.tilemapTiledJSON("NeonUpRightDownLeftJSON", "NeonUpRightDownLeft.json");
        this.load.tilemapTiledJSON("waterDownLeftJSON", "waterDownLeft.json");

        // fonts
        this.load.bitmapFont("upheaval", "upheaval_0.png", "upheaval.xml");

        //LavaLeftRight
        this.load.image("LavaLeftRight", "lavalevels.png");
        this.load.tilemapTiledJSON("LavaLeftRightJSON", "LavaLeftRight.json");

        //candyUpDown
        this.load.image("candyTileset", "candyTileset.png");
        this.load.tilemapTiledJSON("CandyUpDownJSON", "CandyUpDown.json");

        // load sounds
        this.load.path = "./assets/sounds/";

        // bgm
        this.load.audio('startMenu_bgm', 'texture03.wav');

        // sfx
        this.load.audio('sfx_jump', 'JumpSound.wav');
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

        // create animations
        this.anims.create({
            key: "bullet",
            frames: this.anims.generateFrameNumbers("bullet", {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "mouth",
            frames: this.anims.generateFrameNumbers("mouth", {
                start: 1,
                end: 6,
                first: 0,
            }),
            frameRate: 30,
            repeat: 0,
        });

        this.anims.create({
            key: "redEnemy",
            frames: this.anims.generateFrameNumbers("redEnemy", {
                start: 0,
                end: 2,
                first: 0
            }),
            frameRate: 6,
            repeat: -1,
        })

      //  this.scene.start("creditScene");
        this.scene.start("menuScene");
    }
}