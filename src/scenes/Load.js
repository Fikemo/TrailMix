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
        // load in sound assets
        this.load.path = "./assets/";
        this.load.audio('startMenu_bgm', 'texture03.wav');
        this.load.audio('sfx_jump', 'JumpSound.wav');
        //this.jfx = this.sound.add('sfx_jump', {volume: 0.2});

        // load images, spritesheets, and atlases
        this.load.path = "./assets/images/";
        
        this.load.atlas("mapNodes", "mapNodes.png", "mapNodes.json");
        this.load.atlas("mapNodes_enlarged", "mapNodes_enlarged.png", "mapNodes_enlarged.json");
        this.load.image("selectedNode_enlarged", "selectedNode_enlarged.png");
        this.load.image("inventoryBackground", "inventoryBackground.png");
        this.load.image("emptyMapNode", "emptyMapNode.png");
        this.load.image("confirmButton", "confirmButton.png");

        //this.load.image('blushie','blushie.png');
        this.load.spritesheet('blush', 'moving_blush.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('jump', 'jump_blush.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('sleep', 'idle_blush.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemy', 'enemy_walk.png', { frameWidth: 32, frameHeight: 32 });

        this.load.bitmapFont("upheaval", "upheaval_0.png", "upheaval.xml");

        // load sounds
        this.load.path = "./assets/sounds/"
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
            frameRate: 6,
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
            frameRate: 10,
            repeat: -1,
        })

        this.scene.start("creditScene");
    }
}