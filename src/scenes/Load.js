export default class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        let loadingBar = this.add.graphics();
        this.load.on("progress", (value) => {
            console.log(value);
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
        this.load.spritesheet('player_move', 'moving_blush.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('player_jump', 'jump_blush.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('player_idle', 'idle_blush.png', { frameWidth: 32, frameHeight: 32 });

        // UI
        this.load.image("gameManagerBackground", "gameManagerBackground.png");
        this.load.image("selectedInventoryIconFrame", "inventoryIconFrame.png");
        this.load.image("mapIconFrame", "mapIconFrame.png");
        this.load.atlas("mapIcons", "mapIcons.png", "mapIcons.json");
        this.load.atlas("inventoryIcons", "inventoryIcons.png", "inventoryIcons.json");
        this.load.image("terminalOnScreen", "terminalOn.png");
        this.load.image("locationIndicator", "locationIndicator.png");
        this.load.image("healthbar", "bar.png");
        this.load.image("eraserButton", "eraserButton.png");
        this.load.spritesheet("locationIndicator_spritesheet", "locationIndicator_spritesheet.png", {
            frameWidth: 24,
            frameHeight: 24,
            startFrame: 0,
            endFrame: 1,
        });

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
        this.load.image("commonTileset", "commonTileset.png");
        this.load.image("NeonTileSet", "NeonTileSet.png");
        this.load.image("waterTileset","waterTileset.png");
        this.load.image("forestTileset", "forestTileset.png");
        this.load.image("LavaLeftRight", "lavalevels.png");
        this.load.image("candyTileset", "candyTileset.png");

        // tilemaps
        this.load.tilemapTiledJSON("basicRightLeftJSON", "basicRightLeft.json");
        this.load.tilemapTiledJSON("basicUpRightDownLeftJSON", "basicUpRightDownLeft.json");
        this.load.tilemapTiledJSON("basicDownLeftJSON", "basicDownLeft.json");
        this.load.tilemapTiledJSON("enemyHazardTestJSON", "enemyHazardTest.json");
        this.load.tilemapTiledJSON("testJSON", "test.json");
        this.load.tilemapTiledJSON("NeonUpRightDownLeftJSON", "NeonUpRightDownLeft.json");
        this.load.tilemapTiledJSON("waterDownLeftJSON", "waterDownLeft.json");
        this.load.tilemapTiledJSON("forestRightLeftJSON", "forestRightLeft.json");
        this.load.tilemapTiledJSON("hubJSON", "hubRoom.json");
        this.load.tilemapTiledJSON("CandyUpDownJSON", "CandyUpDown.json");
        this.load.tilemapTiledJSON("LavaLeftRightJSON", "LavaLeftRight.json");

        this.load.tilemapTiledJSON("upRoomDepotJSON", "upRoomDepot.json");
        this.load.tilemapTiledJSON("rightRoomDepotJSON", "downRoomDepot.json");
        this.load.tilemapTiledJSON("downRoomDepot", "downRoomDepot.json");
        this.load.tilemapTiledJSON("leftRoomDepotJSON", "leftRoomDepot.json");

        // fonts
        this.load.bitmapFont("upheaval", "upheaval_0.png", "upheaval.xml");

        //Menus
        this.load.image("title", "titleArt.png");
        this.load.image("logo","grouplogo.png")

        // load sounds
        this.load.path = "./assets/sounds/";

        // bgm
        this.load.audio('startMenu_bgm', 'texture03.wav');
        this.load.audio('neon_bgm', 'texture11.wav');
        this.load.audio('water_bgm', 'WaterLevel.wav');
        //this.load.audio('candy_bgm', 'texture11.wav');
        this.load.audio('lava_bgm', 'Vibe28.wav');
        this.load.audio('forest_bgm', 'CHILL4_2.wav');
        this.load.audio('candy_bgm', 'texture08.wav');
        this.load.audio('basic_bgm', 'chill12_1.2.wav');


        // sfx
        this.load.audio('sfx_jump', 'JumpSound.wav');
        this.load.audio('sfx_bullet', 'gunShot3.wav');
        this.load.audio('sfx_enemy', 'enemyOof.wav');
    }

    create(){
        //create moving animation
        // this.anims.create({
        //     key: 'moving_blush',
        //     frames: this.anims.generateFrameNumbers('blush', {
        //         start: 0,
        //         end: 6,
        //         first: 0
        //     }),
        //     frameRate: 10,
        //     repeat: 0,
        // })
        // //create jump animation
        // this.anims.create({
        //     key: 'jumping_blush',
        //     frames: this.anims.generateFrameNumbers('jump', {
        //         //custom frames for smooth transition
        //         frames: [0,1,2,3,4,5,6,0],
        //     }),
        //     frameRate: 7,
        //     repeat: 0,
        // })
        // //create idle animation
        // this.anims.create({
        //     key: 'idle_blush',
        //     frames: this.anims.generateFrameNumbers('sleep', {
        //         start:0,
        //         end:10,
        //         first: 0,
        //     }),
        //     frameRate: 1,
        //     repeat: -1,
        // })

        // create player animations
        this.anims.create({
            key: "player_idle",
            frames: this.anims.generateFrameNumbers( "player_idle", {
                start:0,
                end: 3,
                first: 0,
            }),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "player_move",
            frames: this.anims.generateFrameNumbers("player_move", {
                start: 0,
                end: 8,
                first: 0,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "player_jump",
            frames: this.anims.generateFrameNumbers( "player_jump", {
                start: 0,
                end: 4,
                first: 0,
            }),
            frameRate: 12,
            repeat: 0,
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

        this.anims.create({
            key: "locationIndicator",
            frames: this.anims.generateFrameNumbers("locationIndicator_spritesheet", {
                start: 0,
                end: 1,
                first: 0,
            }),
            frameRate: 2,
            repeat: -1,
        })

      //  this.scene.start("creditScene");
        this.scene.start("openingScene");
    }
}