import BaseScene from "./BaseScene.js";
import TestRight from "./TestRight.js";
import TestUpDown from "./TestUpDown.js";
import TestDownLeft from "./TestDownLeft.js";

export default class GameManager extends Phaser.Scene{
    constructor(){
        super("gameManagerScene");
        this.firstInitialized = false;
    }

    init(data){
        if (!!!this.firstInitialized){
            if (this.game.gameManager && this.game.gameManager != this){
                console.error("Another instance of GameManager has been started! There should only ever bee one!");
            } else {
                this.game.gameManager = this;
            }

            this.active = false;

            //**An array of scenes that are available in the inventory menu */
            this.sceneInventory = [];
            this.sceneInventory.max = 15;
            
            this.sceneInventoryUI = [];
            this.sceneInventoryUI.width = 5;
            this.sceneInventoryUI.position = new Phaser.Math.Vector2(40, 40);
    
            this.miniMapUI = [];
            this.miniMapUI.width = this.game.mapDimensions.x;
            this.miniMapUI.position = new Phaser.Math.Vector2(164, 488);
    
            this.sceneID = 0;
            this.selectedScene = null;
            this.activeScene = null;

            this.uiNeedsUpdate = true;

            this.firstInitialized = true;
        }
    }

    create(data){
        // inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // add background
        this.add.sprite(0,0, "inventoryBackground").setOrigin(0);

        // create the UI
        this.createSceneInventoryUI();
        this.createMiniMapUI();

        this.randomlyFillSceneInventory();

        this.initializeMapForGameStart();

        console.log("GameManager Initialized");
    }

    update(time, delta){
        if (this.uiNeedsUpdate){
            this.updateUI();
        }

        // input
        if (Phaser.Input.Keyboard.JustDown(this.keyEscape)){
            if (this.active){
                this.scene.resume(this.activeScene);
                this.scene.sendToBack(this);
                this.active = false;
            } else {
                this.scene.pause(this.activeScene);
                this.scene.bringToTop(this);
                this.active = true;
            }
        }
    }

    initializeMapForGameStart(){
        this.startingScene = this.createSceneOfClass(TestRight);
        this.activeScene = this.startingScene;
        this.setSceneOnMap(this.startingScene, 0, 0);

        this.launchSceneAt(0,0);

        this.uiNeedsUpdate = true;
    }

    updateUI(){
        // update the scene inventory
        for (let i = 0; i < this.sceneInventoryUI.length; i++){
            let frameName = "node_void";
            let currentScene = this.sceneInventory[i];
            if (currentScene) frameName = currentScene.iconName;
            this.sceneInventoryUI[i].setFrame(frameName);
        }

        // update the minimap
        for (let i = 0; i < this.game.map.length; i++){
            for (let j = 0; j < this.game.map[i].length; j++){
                let frameName = "node_void";
                let currentScene = this.game.map[i][j];
                if (currentScene) frameName = currentScene.iconName;
                this.miniMapUI[i][j].setFrame(frameName);
            }
        }
    }

    // Scene Inventory
    createSceneInventoryUI(){
        let row = 0;
        let column = 0;

        // TODO: turn the icons into prefabs instead of just sprites
        for (let i = 0; i < this.sceneInventory.max; i++){

            let iconX = this.sceneInventoryUI.position.x + (36 * column);
            let iconY = this.sceneInventoryUI.position.y + (36 * row);

            let icon = this.add.sprite(iconX, iconY, "mapNodes_enlarged", "node_void").setInteractive().setOrigin(0);

            icon.on("pointerdown", (pointer, localX, localY, event) => {
                if (this.active){
                    this.setSelectedSceneIcon(icon);
                }
            }, this)
            icon.index = i;
            this.sceneInventoryUI[i] = icon;

            column++;
            if (column >= this.sceneInventoryUI.width){
                column = 0;
                row ++;
            }
        }
        
        this.selectedSceneIcon = this.sceneInventoryUI[0];
        this.selectedSceneIconFrame = this.add.sprite(this.sceneInventoryUI.position.x - 4, this.sceneInventoryUI.position.y - 4, "selectedNode_enlarged").setOrigin(0);
    }

    setSelectedSceneIcon(icon){
        this.selectedSceneIcon = icon;
        this.setSelectedScene();
        this.setSelectedSceneIconFramePosition();
    }

    setSelectedScene(){
        this.selectedScene = this.sceneInventory[this.selectedSceneIcon.index];
        console.log(this.selectedScene);
    }

    setSelectedSceneIconFramePosition(){
        this.selectedSceneIconFrame.setPosition(
            this.selectedSceneIcon.x - 4,
            this.selectedSceneIcon.y - 4
        );
    }

    // Mini Map
    createMiniMapUI(){
        for (let i = 0; i < this.game.mapDimensions.x; i++){
            this.miniMapUI.push([]);
        }

        // TODO: Make the map icons prefabs instead of just sprites
        for (let i = 0; i < this.game.mapDimensions.y; i++){
            for (let j = 0; j < this.game.mapDimensions.x; j++){
                let iconX = this.miniMapUI.position.x + (20 * j);
                let iconY = this.miniMapUI.position.y + (20 * i);

                let icon = this.add.sprite(iconX, iconY, "mapNodes", "node_void").setInteractive().setOrigin(0);
                icon.coordinate = new Phaser.Math.Vector2(j, i);
                icon.on("pointerdown", (pointer, localX, localY, event) => {
                    if (this.active){
                        this.putSelectedSceneOnMap(icon);
                    }
                }, this);
                this.miniMapUI[j].push(icon);
            }
        }
    }

    putSelectedSceneOnMap(icon, overwrite = false, returnToInventory = false){
        let x = icon.coordinate.x;
        let y = icon.coordinate.y;

        let spaceToPlaceIn = this.game.map[x][y];
        let sceneToPlace = this.sceneInventory[this.selectedSceneIcon.index];
        if (spaceToPlaceIn == null && sceneToPlace){
            this.removeSceneFromInventory(sceneToPlace);
            this.setSceneOnMap(sceneToPlace, x, y);
        }
        this.uiNeedsUpdate = true;
    }

    setSceneOnMap(scene, x, y){
        this.game.map[x][y] = scene;
        scene.coordinate.x = x;
        scene.coordinate.y = y;
        console.log(scene);
        return scene;
    }

    createSceneOfClass(sceneClass){
        this.sceneID++;
        let key = sceneClass.name + "_" + this.sceneID;
        let newScene = new sceneClass(key, this);
        this.game.scene.add(key, newScene);
        return newScene;
    }

    resetScene(scene){
        let key = scene.key;
        let sceneClass = scene.constructor;
        this.game.scene.remove(scene);
        let newScene = new sceneClass(key, this);
        this.game.scene.add(key, newScene);
        return newScene;
    }

    addSceneToInventory(scene){
        this.sceneInventory.push(scene);
        this.uiNeedsUpdate = true;
        return scene;
    }

    randomlyFillSceneInventory(){
        for (let i = 0; i < this.sceneInventory.max; i++){
            if (this.sceneInventory[i] == undefined){
                let sceneToAdd = this.createSceneOfClass(this.game.allSceneTypes[Phaser.Math.Between(0,this.game.allSceneTypes.length - 1)]);
                this.addSceneToInventory(sceneToAdd);
            }
        }
        this.uiNeedsUpdate = true;
    }

    removeSceneFromInventory(scene){
        let sceneIndex = this.sceneInventory.indexOf(scene);
        if(sceneIndex == -1) return null;
        let sceneRemoved = this.sceneInventory.splice(sceneIndex, 1)[0];
        this.uiNeedsUpdate = true;
        return sceneRemoved;
    }

    clearMap(returnToInventory = true){
        // for (let i = 0; i < this.game.mapDimensions.x; i ++){
        //     for (let j = 0; j < this.game.mapDimensions.y; j++){
        //         let foundScene = this.game.map[i][j];
        //         if (foundScene != null){
        //             if (returnToInventory) {
        //                 foundScene = this.resetScene(foundScene);
        //                 this.addSceneToInventory(foundScene);
        //             }
        //             this.game.map[i][j] = null;
        //         }
        //     }
        // }
        // this.uiNeedsUpdate = true;
    }

    launchSceneAt(x, y){
        if (x < 0 || x >= this.game.mapDimensions.x || y < 0 || y >= this.game.mapDimensions.y) return null;

        console.log(x + " " + y);
        let sceneToLaunch = this.game.map[x][y];
        if (sceneToLaunch){
            this.scene.stop(this.activeScene);
            this.scene.launch(sceneToLaunch);
            this.activeScene = sceneToLaunch;
            this.active = false;
        }
    }

    destroyScene(scene){
        this.game.scene.remove(scene.key);
    }

    goUp(){
        this.launchSceneAt(
            this.activeScene.coordinate.x,
            this.activeScene.coordinate.y - 1
        );
    }

    goRight(){
        this.launchSceneAt(
            this.activeScene.coordinate.x + 1,
            this.activeScene.coordinate.y
        );
    }

    goDown(){
        this.launchSceneAt(
            this.activeScene.coordinate.x, 
            this.activeScene.coordinate.y + 1
        );
    }

    goLeft(){
        this.launchSceneAt(
            this.activeScene.coordinate.x - 1, 
            this.activeScene.coordinate.y
        );
    }
}