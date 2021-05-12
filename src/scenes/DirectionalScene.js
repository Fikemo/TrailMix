export default class DirectionalScene extends Phaser.Scene{
    firstInitialized = false;

    constructor(sceneConfig, gameManager){
        super(`level_${sceneConfig.coordinate.x}_${sceneConfig.coordinate.y}`);

        this.sceneConfig = sceneConfig;
        this.gameManager = gameManager;
    }

    init(data){

    }

    create(data){
        if (!!!this.firstInitialized){

        }
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBackgroundColor("#FFFFFF");

        // create walls
        this.northWall = this.add.graphics();
        if (!this.sceneConfig.north){
            this.northWall.clear();
            this.northWall.fillStyle(0x000000, 1);
            this.northWall.fillRect(0,0,this.scale.width, 64);
        }

        this.eastWall = this.add.graphics();
        if (!this.sceneConfig.east){
            this.eastWall.clear();
            this.eastWall.fillStyle(0x000000, 1);
            this.eastWall.fillRect(0,0,this.scale.width, 64);
        }

        this.southWall = this.add.graphics();
        if (!this.sceneConfig.south){
            this.southWall.clear();
            this.southWall.fillStyle(0x000000, 1);
            this.southWall.fillRect(0,0,this.scale.width, 64);
        }

        this.westWall = this.add.graphics();
        if (!this.sceneConfig.west){
            this.westWall.clear();
            this.westWall.fillStyle(0x000000, 1);
            this.westWall.fillRect(0,0,this.scale.width, 64);
        }

    }

    update(time, delta){
        if (this.cursors){
            if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
                this.gameManager.goUp(this);
            }
        }
    }
}