import LevelTemplate from "./LevelTemplate.js";
import PrototypeLevel from "./PrototypeLevel.js";

export default class GameManager extends Phaser.Scene{
    firstInitialized = false;

    constructor(){
        super("gamManagerScene");
    }

    init(){
        
    }

    create(){
        this.add.image(0,0,'inventoryBackground').setOrigin(0);
        // this.scene.launch('level_0_0');
        
        this.cursors = this.input.keyboard.createCursorKeys();

        if (!this.firstInitialized){

        }

        // create new scenes with level templates
        // TODO: The level template is just meant to be a template, not an actual scene we can enter.
        // Later we'll have scenes defined with 'class <level name> extends LevelTemplate'
        // for (let i = 0; i < this.game.mapDimensions.x; i++){
        //     for(let j = 0; j < this.game.mapDimensions.y; j++){
        //         // create the new LevelTemplate scene
        //         let sceneToAdd = new PrototypeLevel(`level_${i}_${j}`, new Phaser.Math.Vector2(i, j));

        //         // add the scene to the game's list of scenes
        //         this.game.scene.add(`level_${i}_${j}`, sceneToAdd);

        //         // add the scene to the game's 2d array that is the map
        //         this.game.map[i][j] = sceneToAdd;

        //         // console.log(this.scene.get(`level_${i}_${j}`));
        //         // console.log(this.scene.get(this.game.map[i][j].scene.key));
        //     }
        // }

        this.menuItems = this.add.group();
        let k = 0;
        let frameNames = this.textures.get("mapNodes_enlarged").getFrameNames();
        for (let i = 0; i < 4; i++){
            let itemX = 40 + (36 * i);
            for (let j = 0; j < 4; j++){
                let itemY = 40 + (36 * j);
                let menuItem = this.add.sprite(itemX, itemY, "mapNodes_enlarged", frameNames[k]).setInteractive().setOrigin(0);
                menuItem.name = frameNames[k];
                this.menuItems.add(menuItem);
                k++;
            }
        }

        let selectedItemFrame = this.add.sprite(38, 38, "selectedNode_enlarged").setOrigin(0);
        let selectedItem = this.menuItems.getChildren()[0];
        console.log(selectedItem);

        // instructions
        console.warn("Use Arrow Keys To Change Scene");

        //console.table prints out the 2d array in a nice looking format (I don't know how big it can get)
        console.table(this.game.map);

        //start the scene at (0,0) if it exists, which it should if the loop above ran correctly
        // if (this.scene.get('level_0_0')){
        //     this.scene.start('level_0_0');
        // }

        this.mapPos = new Phaser.Math.Vector2(164,488);

        this.mapGroup = this.add.group();
        for (let i = 0; i < this.game.mapDimensions.y; i++){
            let nodeY = this.mapPos.y + (16 * i);
            for (let j = 0; j < this.game.mapDimensions.x; j++){
                let nodeX = this.mapPos.x + (16 * j);
                // let emptyNode = this.add.sprite(nodeX, nodeY, 'emptyMapNode').setOrigin(0).setInteractive({useHandCursor: true});
                let mapNode = this.add.sprite(nodeX, nodeY, "mapNodes", "node_void").setOrigin(0).setInteractive().on('pointerover', (pointer, localX, localY, event) => {
                    console.log(pointer);
                    console.log(localX);
                    console.log(localY);
                    console.log(event);
                }, this);
                switch(this.game.map[i][j]){
                    default:
                        mapNode 
                    break;
                }
                this.mapGroup.add(mapNode)
            }
        }

        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            // console.log(pointer);
            // console.log(gameObject);
            // console.log(event);

            if (this.menuItems.contains(gameObject)){
                // console.log(gameObject.name);
                selectedItemFrame.setPosition(gameObject.x - 2, gameObject.y - 2);
                selectedItem = gameObject;
                // console.log(selectedItem);
            }

            if (this.mapGroup.contains(gameObject)){
                gameObject.setFrame(selectedItem.name);
            }
        })
    }

    update(time, delta){

    }
}