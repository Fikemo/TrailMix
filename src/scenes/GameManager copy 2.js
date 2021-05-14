import BaseScene from "./BaseScene.js";
import TestRight from "./TestRight.js";

export default class GameManager extends Phaser.Scene{
    firstInitialized = false;

    constructor(){
        super("gameManagerScene");
    }

    init(){
        if (!this.firstInitialized){
            if (this.game.gameManager){
                console.error("More than one instance of GameManager has been createed")
            }else {
                this.game.gameManager = this;
            }

            this.sceneInventory = [];
            this.sceneInventoryMax = 6;

            this.sceneInventoryUI = [];

            this.sceneID = 0;
            this.currentscene = null;

            this.firstInitialized = true;
        }
    }

    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.active = true;

        this.add.sprite(0,0,"inventoryBackground").setOrigin(0);

        //
        this.clearSceneInventory();

        this.sceneInventoryUIGroup = this.add.group();
        let row = 0;
        let column = 0;
        for (let i = 0; i < this.sceneInventoryMax; i++){
            let iconX = 40 + (36 * column);
            let iconY = 40 + (36 * row);

            let icon = this.add.sprite(iconX, iconY, "mapNodes_enlarged", "node_void").setInteractive().setOrigin(0);

            this.sceneInventoryUI[i] = icon;
            this.sceneInventoryUIGroup.add(icon);

            column++;
            if (column > 2){
                column = 0;
                row++;
            }
        }

        this.selectedScene = this.sceneInventory[0];
        this.selectedIconFrame = this.add.sprite(36,36,"selectedNode_enlarged").setOrigin(0);
        this.selectedIcon = this.sceneInventoryUI[0];

        this.miniMapUIGroup = this.add.group();
        this.miniMapPos = new Phaser.Math.Vector2(164, 488);
        for (let i = 0; i < this.game.mapDimensions.y; i++){
            let iconY = this.miniMapPos.y + (16 * i);
            for (let j = 0; j < this.game.mapDimensions.x; j++){
                let iconX = this.miniMapPos.x + (16 * j);
                let icon = this.add.sprite(iconX, iconY, "mapNodes", "node_void").setInteractive().setOrigin(0);
                icon.coordinate = new Phaser.Math.Vector2(j, i);
                this.miniMapUIGroup.add(icon);
            }
        }


        this.updateUI();
        this.input.on("gameobjectdown", (pointer, gameObject, event) =>{
            if (this.sceneInventoryUIGroup.contains(gameObject) && this.active){
                this.onSceneInventoryIconClicked(pointer, gameObject, event);
            }

            if (this.miniMapUIGroup.contains(gameObject) && this.active){
                this.onMiniMapIconClicked(pointer, gameObject, event);
            }
        })
    }

    updateUI(){
        for (let i = 0; i < this.sceneInventoryMax; i++){
            let frameName;
            let currentScene = this.sceneInventory[i];
            if (currentScene) frameName = currentScene.iconName;
            else frameName = "node_void"; 
            this.sceneInventoryUI[i].setFrame(frameName);
            this.sceneInventoryUI[i].index = i;
        }
    }

    removeFromSceneInventory(scene){
        let sceneIndex = this.sceneInventory.indexOf(scene);
        if (sceneIndex == -1) return null;
        return this.sceneInventory.splice(sceneIndex,1);
    }

    /**
     * Add a scene with the given type (eg. the scene's class)
     * @param {BaseScene} sceneType the class of the scene to add
     * @returns {BaseScene} a reference to the scene that was added
     */
    addSceneOfType(sceneType) {
        this.sceneID++;
        let key = sceneType.name + "_" + this.sceneID;
        let sceneToAdd = new sceneType(key, this);
        this.game.scene.add(key, sceneToAdd);
        return sceneToAdd;
    }

    /**
     * Reset a scene by destroying it and creating a new one in its place
     * @param {BaseScene} scene The scene to reset
     * @returns a reference to the scene that was reset
     */
    resetScene(scene){
        let tempKey = scene.key;
        let tempSceneType = scene.constructor;
        this.destroyScene(scene);
        let sceneToAdd = new tempSceneType(tempKey, this)
        this.game.scene.add(tempKey, sceneToAdd);
        return sceneToAdd;
    }

    destroyScene(scene){
        this.game.scene.remove(scene.key);
    }

    clearSceneInventory(){
        for(let i = 0; i < this.sceneInventory.length; i++){
            this.destroyScene(this.sceneInventory[i]);
        }
        this.sceneInventory = [];
    }

    setsceneCoordinate(scene, x, y){

    }

    setSelectedIconFramePosition(){ this.selectedIconFrame.setPosition(this.selectedIcon.x - 4, this.selectedIcon.y - 4) }

    onSceneInventoryIconClicked(pointer, icon, event){
        console.log(icon);
        this.selectedIcon = icon;
        
        this.setSelectedIconFramePosition();
    }

    onMiniMapIconClicked(pointer, icon, event){
        console.log(icon);
        this.placeSceneOnMap(icon.coordinate);
    }

    placeSceneOnMap(coordinate, overwrite = false){
        let spaceFree = this.getSceneAt(coordinate) == null;

        if (spaceFree){
            
        }
    }

    getSceneAt(coordinate){
        return this.game.map[coordinate.x][coordinate.y];
    }

    setMapNodeSceneConfig(mapNode, coordinate = null, locked = false){
        
    }

    onConfirmClicked(){
        
    }
    
    goNorth(scene){
        
    }
    
    /**
     * Go to the scene that is to the east of the current scene, if possible
     * @param {BaseScene} scene 
     */
    goEast(scene){
        // load the scene thats at the coordinate (scene.coordinate.x + 1, scene.coordinate.y)
    }
    
    goSouth(scene){
        
    }
    
    goWest(scene){
        
    }
}