import DirectionalScene from "./DirectionalScene.js";

export default class GameManager extends Phaser.Scene{
    firstInitialized = false;
    active = true;

    constructor(){
        super("gameManagerScene");
    }

    init(){
        if (!this.firstInitialized){
            this.firstInitialized = true;
        }

        this.active = true;
    }

    create(){
        // add the background
        this.add.image(0,0,"inventoryBackground").setOrigin(0);

        // add cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // initialize room menu
        this.menuGroup = this.add.group();
        let nameIndex = 0;
        let menuFrameNames = this.textures.get("mapNodes_enlarged").getFrameNames();
        for (let i = 0; i < 4; i++){
            let iconX = 40 + (36 * i);
            for (let j = 0; j < 4; j++){
                let iconY = 40 + (36 * j);
                let currentIcon = this.add.sprite(iconX, iconY, "mapNodes_enlarged",menuFrameNames[nameIndex]).setInteractive().setOrigin(0);

                currentIcon.sceneConfig = {};
                currentIcon.sceneConfig.north = menuFrameNames[nameIndex].includes("_n");
                currentIcon.sceneConfig.east = menuFrameNames[nameIndex].includes("_e");
                currentIcon.sceneConfig.south = menuFrameNames[nameIndex].includes("_s");
                currentIcon.sceneConfig.west = menuFrameNames[nameIndex].includes("_w");

                currentIcon.name = menuFrameNames[nameIndex];

                this.menuGroup.add(currentIcon);
                nameIndex++;
            }
        }

        // console.log(this.menuGroup.getChildren());

        // selected icon frame and selected icon
        this.selectedIconFrame = this.add.sprite(0,0,"selectedNode_enlarged").setOrigin(0);
        this.selectedIcon = this.menuGroup.getChildren()[0];
        this.setSelectedIconFramePosition();

        // create confirm button
        this.confirmButton = this.add.sprite(500,400,"confirmButton").setOrigin(0).setInteractive();

        // create mini map
        this.mapPos = new Phaser.Math.Vector2(164, 488);
        this.mapGroup = this.add.group();
        for (let i = 0; i < this.game.mapDimensions.y; i++){
            let nodeY = this.mapPos.y + (16 * i);
            for (let j = 0; j < this.game.mapDimensions.x; j++){
                let nodeX = this.mapPos.x + (16 * j);
                let mapNode = this.add.sprite(nodeX, nodeY, "mapNodes", "node_void").setInteractive().setOrigin(0);
                mapNode.sceneConfig = {};
                this.setMapNodeSceneConfig(mapNode, new Phaser.Math.Vector2(j,i));
                this.mapGroup.add(mapNode);
            }
        }

        // set the first level to a locked default level
        let firstNode =  this.mapGroup.getChildren()[0];
        firstNode.setFrame("node_e");
        this.setMapNodeSceneConfig(firstNode, undefined, true);

        // clicking on things functionality
        this.input.on("gameobjectdown", (pointer, gameObject, event) => {

            // selection menu
            if (this.menuGroup.contains(gameObject) && this.active){
                this.onMenuItemClicked(pointer, gameObject, event);
            }

            // map
            if (this.mapGroup.contains(gameObject) && this.active){
                this.onMapNodeClicked(pointer, gameObject, event);
            }

            // confirm button
            if (gameObject == this.confirmButton){
                this.onConfirmClicked();
            }

        }, this);
    }

    update(time, delta){

    }

    setSelectedIconFramePosition(){
        if (this.selectedIconFrame && this.selectedIcon){
            this.selectedIconFrame.setPosition(this.selectedIcon.x - 4, this.selectedIcon.y - 4);
        }
    }

    onMenuItemClicked(pointer, menuItem, event){
        this.selectedIcon = menuItem;
        this.setSelectedIconFramePosition();
    }

    onMapNodeClicked(pointer, mapNode, event){
        if (!mapNode.sceneConfig || mapNode.sceneConfig.locked) return;
        mapNode.setFrame(this.selectedIcon.name);
        mapNode.sceneConfig.north = this.selectedIcon.sceneConfig.north;
        mapNode.sceneConfig.east = this.selectedIcon.sceneConfig.east;
        mapNode.sceneConfig.south = this.selectedIcon.sceneConfig.south;
        mapNode.sceneConfig.west = this.selectedIcon.sceneConfig.west;
        console.log(mapNode.sceneConfig);
    }

    setMapNodeSceneConfig(mapNode, coordinate = null, locked = false){
        if (!mapNode.sceneConfig) return;
        mapNode.sceneConfig.north = mapNode.frame.name.includes("_n");
        mapNode.sceneConfig.east = mapNode.frame.name.includes("_e");
        mapNode.sceneConfig.south = mapNode.frame.name.includes("_s");
        mapNode.sceneConfig.west = mapNode.frame.name.includes("_w");
        mapNode.sceneConfig.coordinate = coordinate == null ? mapNode.sceneConfig.coordinate : coordinate;
        mapNode.sceneConfig.locked = locked;
    }

    onConfirmClicked(){
        console.log("confirm");
        this.active = false;

        this.mapGroup.getChildren().forEach(node => {
            if (!node.frame.name.includes("_void")){
                let sceneToAdd = new DirectionalScene(node.sceneConfig, this);

                this.game.scene.add(`level_${node.sceneConfig.coordinate.x}_${node.sceneConfig.coordinate.y}`, sceneToAdd, false);

                this.game.map[node.sceneConfig.coordinate.x][node.sceneConfig.coordinate.y] = sceneToAdd;
            } else {
                this.game.map[node.sceneConfig.coordinate.x][node.sceneConfig.coordinate.y] = null;
            }
            
        })
    }

    goUp(scene){
        console.log(scene);
        // check that the scene exists and that it has a sceneConfig
        if (!scene || !scene.sceneConfig) return;

        // check that the scene isn't at the top of the map
        if (scene.sceneConfig.y - 1 <= 0) return;

        // check that the scene's north is open
        if (!!!scene.sceneConfig.north) return;

        // get the scene that is above (to the north) of this one
        let aboveScene = this.game.map[scene.sceneConfig.coordinate.x][scene.sceneConfig.coordinate.y - 1];

        // chagne scenes
        if (aboveScene != null && aboveScene.sceneConfig != null && aboveScene.sceneConfig.south){
            // TODO:
            // swap out the scenes

            // shutdown the current scene

            // launch the above scene

            // set above scene to the current scene
        };
    }
}