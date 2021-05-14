import BaseScene from "./BaseScene.js";
import TestRight from "./TestRight.js";
import TestUpDown from "./TestUpDown.js";
import TestDownLeft from "./TestDownLeft.js";

export default class GameManager extends Phaser.Scene{
    firstInitialized = false;

    constructor(){
        super("gameManagerScene");

        this.sceneInventory = [];
        this.sceneInventoryMax = 6;
        this.sceneInventoryUI = [];
        this.sceneInventoryUIPos = new Phaser.Math.Vector2(40,40);

        this.miniMapUIPos = new Phaser.Math.Vector2(164, 488);

        this.sceneID = 0;
        this.currentScene = null;

        this.firstInitialized = false;
    }

    init(data){
        if (!!!this.firstInitialized){
            if (this.game.gameManager){
                console.error("More that one instance of GameManager has been created");
            } else {
                this.game.gameManager = this;
            }

            this.sceneInventory = [];
            this.sceneInventoryMax = 6;
            this.sceneInventoryUI = [];

            this.miniMapUI = [];

            this.sceneID = 0;
            this.currentScene = null;

            this.firstInitialized = true;
        }
    }

    create(data){
        this.active = true;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.add.sprite(0,0,"inventoryBackground").setOrigin(0);

        this.createSceneInventoryUI();
        this.createMiniMapUI();
        console.log(this.miniMapUI);

        this.addSceneToInventory(this.createSceneOfClass(TestRight));
        this.addSceneToInventory(this.createSceneOfClass(TestDownLeft));
        this.addSceneToInventory(this.createSceneOfClass(TestUpDown));

        this.initializeForGameStart();
        
        this.uiNeedsUpdate = true;
    }

    update(time, delta){
        if (this.uiNeedsUpdate){
            this.updateUI();
            this.uiNeedsUpdate = false;
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyEscape)){
            if (this.active){

                this.scene.resume(this.currentScene);
                this.scene.sendToBack(this);

                this.active = false;
            } else {

                this.scene.pause(this.currentScene);
                this.scene.bringToTop(this);

                this.active = true;
            }
        }
    }

    createSceneInventoryUI(){
        this.sceneInventoryUIGroup = this.add.group();
        let row = 0;
        let column = 0;

        // TODO: turn the icons into prefabs instead of just sprites
        for (let i = 0; i < this.sceneInventoryMax; i++){
            let iconX = this.sceneInventoryUIPos.x + (36 * column);
            let iconY = this.sceneInventoryUIPos.y + (36 * row);

            let icon = this.add.sprite(iconX, iconY, "mapNodes_enlarged", "node_void").setInteractive().setOrigin(0);

            icon.on("pointerdown", (pointer, localX, localY, event) => {
                if (this.active){
                    this.setSelectedSceneIcon(icon);
                }
            },this)

            icon.index = i;
            this.sceneInventoryUI[i] = icon;
            this.sceneInventoryUIGroup.add(icon);

            column++;
            if (column > 2){
                column = 0;
                row++;
            }
        }

        this.selectedSceneIcon = this.sceneInventoryUI[0];
        this.selectedSceneIconFrame = this.add.sprite(this.sceneInventoryUIPos.x - 4, this.sceneInventoryUIPos.y - 4, "selectedNode_enlarged").setOrigin(0);
    }

    setSelectedSceneIcon(icon){
        // console.log(icon);
        this.selectedSceneIcon = icon;
        this.setSelectedSceneIconFramePosition();
    }

    setSelectedSceneIconFramePosition(){
        this.selectedSceneIconFrame.setPosition(
            this.selectedSceneIcon.x - 4,
            this.selectedSceneIcon.y - 4
        );
    }

    createMiniMapUI(){
        this.miniMapUIGroup = this.add.group();
        for (let i = 0; i < this.game.mapDimensions.x; i++){
            this.miniMapUI.push([]);
        }

        // TODO: Make the map icons prefabs
        for (let i = 0; i < this.game.mapDimensions.y; i++){
            let iconY = this.miniMapUIPos.y + (16 * i);
            for (let j = 0; j < this.game.mapDimensions.x; j++){
                let iconX = this.miniMapUIPos.x + (16 * j);
                let icon = this.add.sprite(iconX, iconY, "mapNodes", "node_void").setInteractive().setOrigin(0);
                icon.coordinate = new Phaser.Math.Vector2(j, i);
                icon.on("pointerdown",(pointer, localX, localY, event) => {
                    if (this.active) this.putSelectedSceneOnMap(icon);
                },this);
                this.miniMapUI[j].push(icon);
                this.miniMapUIGroup.add(icon);
            }
        }
    }

    putSelectedSceneOnMap(icon, overwrite = false){
        let coordinate = new Phaser.Math.Vector2(icon.coordinate.x, icon.coordinate.y);
        let spaceFree = this.game.map[coordinate.x][coordinate.y] == null;

        let sceneToPlace = this.sceneInventory[this.selectedSceneIcon.index];
        if (spaceFree && sceneToPlace){
            this.removeSceneFromInventory(sceneToPlace);
            // this.game.map[coordinate.x][coordinate.y] = sceneToPlace;
            this.setSceneOnMap(sceneToPlace, coordinate.x, coordinate.y);
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

    removeSceneFromInventory(scene){
        let sceneIndex = this.sceneInventory.indexOf(scene);
        if(sceneIndex == -1) return null;
        let sceneRemoved = this.sceneInventory.splice(sceneIndex, 1)[0]
        this.uiNeedsUpdate = true;
        return sceneRemoved;
    }

    clearMap(returnToInventory = true){
        for (let i = 0; i < this.game.mapDimensions.x; i ++){
            for (let j = 0; j < this.game.mapDimensions.y; j++){
                let foundScene = this.game.map[i][j];
                if (foundScene != null){
                    if (returnToInventory) {
                        foundScene = this.resetScene(foundScene);
                        this.addSceneToInventory(foundScene);
                    }
                    this.game.map[i][j] = null;
                }
            }
        }
        this.uiNeedsUpdate = true;
    }

    initializeForGameStart(){
        this.startingScene = this.createSceneOfClass(TestRight);
        this.currentScene = this.startingScene;
        this.setSceneOnMap(this.startingScene, 0, 0);

        this.launchSceneAt(0,0);

        this.uiNeedsUpdate = true;
    }

    launchSceneAt(x, y){
        if (x < 0 || x >= this.game.mapDimensions.x || y < 0 || y >= this.game.mapDimensions.y) return null;
        let sceneToLaunch = this.game.map[x][y];
        if (sceneToLaunch){
            this.scene.stop(this.currentScene);
            this.scene.launch(sceneToLaunch);
            this.currentScene = sceneToLaunch;
            this.active = false;
        }
        return sceneToLaunch;
    }

    destroyScene(scene){
        this.game.scene.remove(scene.key);
    }

    goUp(){
        this.launchSceneAt(this.currentScene.coordinate.x, this.currentScene.coordinate.y - 1);
    }

    goRight(){
        this.launchSceneAt(this.currentScene.coordinate.x + 1, this.currentScene.coordinate.y);
    }

    goDown(){
        this.launchSceneAt(this.currentScene.coordinate.x, this.currentScene.coordinate.y + 1);
    }

    goLeft(){
        this.launchSceneAt(this.currentScene.coordinate.x - 1, this.currentScene.coordinate.y);
    }
}