import LevelTemplate from "./LevelTemplate.js";

export default class Menu extends Phaser.Scene {
    constructor(){
        super('menuScene');
    }

    preload(){
        this.load.image('inventoryBackground', './assets/images/inventoryBackground.png');
        this.load.image('emptyMapNode', './assets/images/emptyMapNode.png');
    }

    create(){

        this.cursors = this.input.keyboard.createCursorKeys();

        // create new scenes with level templates
        // TODO: The level template is just meant to be a template, not an actual scene we can enter.
        // Later we'll have scenes defined with 'class <level name> extends LevelTemplate'
        for (let i = 0; i < this.game.mapDimensions.x; i++){
            for(let j = 0; j < this.game.mapDimensions.y; j++){
                // create the new LevelTemplate scene
                let sceneToAdd = new LevelTemplate(`level_${i}_${j}`, new Phaser.Math.Vector2(i, j));

                // add the scene to the game's list of scenes
                this.game.scene.add(`level_${i}_${j}`, sceneToAdd);

                // add the scene to the game's 2d array that is the map
                this.game.map[i][j] = sceneToAdd;

                // console.log(this.scene.get(`level_${i}_${j}`));
                // console.log(this.scene.get(this.game.map[i][j].scene.key));
            }
        }

        // instructions
        console.warn("Use Arrow Keys To Change Scene");

        //console.table prints out the 2d array in a nice looking format (I don't know how big it can get)
        console.table(this.game.map);

        //start the scene at (0,0) if it exists, which it should if the loop above ran correctly
        //if (this.scene.get('level_0_0')){
       //     this.scene.start('level_0_0');
       //     console.log('(0,0)');
       // }
        // if (this.scene.get('level_0_0')){
        //     this.scene.start('level_0_0');
        // }

        this.scene.start('inventoryScene');
    }

    update(time, delta){
        
    }
}