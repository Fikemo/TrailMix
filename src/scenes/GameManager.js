import createEvent from "../../lib/events.js";
import BasicUpRightDownLeft from "./BasicUpRightDownLeft.js";
import BasicRightLeft from "./BasicRightLeft.js";
import Lava1 from "./Lava1.js";
import candylevel from "./candylevel.js";

export default class GameManager extends Phaser.Scene{
    constructor(){
        super("gameManagerScene");
        this.firstInitialized = false;

        this.events = {
            inventoryUpdate: createEvent()
        }
    }

    init(data){
        if (!!!this.firstInitialized){
            if (this.game.gameManager && this.gameManager != this){
                console.error("Another instance of GameManager has bee started! There hsould only ever be one!");
            } else {
                this.game.gameManager = this;
            }

            this.active = false;

            //**An array of scenes that are available in the inventory menu */
            this.sceneInventory = [];
            this.sceneInventory.max = 25;

            //**An array of the UI icons to represent the scene inventory */
            this.sceneInventoryUI = [];
            this.sceneInventoryUI.width = 5;
            this.sceneInventoryUI.position = new Phaser.Math.Vector2(34, 72);
            this.sceneInventoryUI.iconSize = 48;
            this.sceneInventoryUI.padding = {width: 48, height: 48};

            //** */
            this.map = [];
            this.map.width = 20;
            this.map.height = 6;
            // initialize an empty map
            for (let x = 0; x < this.map.width; x++){
                this.map.push([]);
                for (let y = 0; y < this.map.height; y++){
                    this.map[x].push(null);
                }
            }

            //** */
            this.mapUI = [];
            this.mapUI.width = this.map.width;
            this.mapUI.position = new Phaser.Math.Vector2(202, 586);
            this.mapUI.iconSize = 24;
            this.mapUI.padding = 4;

            //** */
            this.sceneID = 0;
            this.selectedScene = null;
            this.activeScene = null;
            //this.startingSceneType = BasicUpRightDownLeft;
            this.startingSceneType = BasicRightLeft;
            // optionally, you can set the starting scene to be the scene you want to test to speed things up
            // eg. this.startingSceneType = BasicRightLeft
            // MAKE SURE YOU CHANGE IT BACK TO THE ORIGINAL STARTING SCENE THOUGH
            this.availableSceneTypes = [BasicUpRightDownLeft, Lava1, candylevel, BasicRightLeft];

            this.uiNeedsUpdate = true;

            this.firstInitialized = true;
        }
    }

    create(data){
        // inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // add background
        this.add.sprite(0,0,"gameManagerBackground").setOrigin(0,0);

        // create the UI
        this.createSceneInventoryUI();
        this.createMapUI();

        // FIXME: Randomly fill the scene inventory. This should be replaced with something that isn't so random
        this.randomlyFillSceneInventory();
        
        this.initializeMapForGameStart();
    }

    update(time, delta){

        if (Phaser.Input.Keyboard.JustDown(this.keyEscape)){
            // console.log(this.active);
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

        if (this.uiNeedsUpdate){
            this.updateUI();
        }
    }

    initializeMapForGameStart(){
        this.startingScene = this.createSceneOfClass(this.startingSceneType);
        this.activeScene = this.startingScene;
        this.setSceneOnMap(this.startingScene, 0, 0);

        this.launchSceneAt(0,0);

        this.uiNeedsUpdate = true;
    }

    updateUI(){
        // update the scene inventory
        for (let i = 0; i < this.sceneInventoryUI.length; i++){
            let frameName = "icon_void";
            let currentScene = this.sceneInventory[i];
            if (currentScene) frameName = currentScene.iconName;
            this.sceneInventoryUI[i].setFrame(frameName);
        }

        // update the map
        for (let i = 0; i < this.map.width; i++){
            for (let j = 0; j < this.map.height; j++){
                let frameName = "icon_void";
                let currentScene = this.map[i][j];
                if (currentScene) frameName = currentScene.iconName;
                this.mapUI[i][j].setFrame(frameName);
            }
        }
    }

    // Scene Inventory
    createSceneInventoryUI(){
        let row = 0;
        let column = 0;

        // TODO: turn the icons into prefabs instead of just sprites
        for (let i = 0; i < this.sceneInventory.max; i++){
            let iconX = this.sceneInventoryUI.position.x + ((this.sceneInventoryUI.iconSize + this.sceneInventoryUI.padding.width) * column);
            let iconY = this.sceneInventoryUI.position.y + ((this.sceneInventoryUI.iconSize + this.sceneInventoryUI.padding.height) * row);

            let icon = this.add.sprite(iconX, iconY, "inventoryIcons", "icon_void").setInteractive().setOrigin(0);

            icon.on("pointerdown", (pointer, localX, localY, event) => {
                if (this.active){
                    // console.log(icon);
                    this.setSelectedSceneIcon(icon);
                }
            }, this);
            icon.index = i;
            this.sceneInventoryUI[i] = icon;

            column++;
            if (column >= this.sceneInventoryUI.width){
                column = 0;
                row++;
            }
        }

        // set default selection at scene start
        this.selectedSceneIcon = this.sceneInventoryUI[0];
        this.selectedSceneIconFrame = this.add.sprite(this.sceneInventoryUI.position.x - 4, this.sceneInventoryUI.position.y - 4, "selectedInventoryIconFrame").setOrigin(0);
    }

    setSelectedSceneIcon(icon){
        this.selectedSceneIcon = icon;
        this.setSelectedScene();
        this.setSelectedSceneIconFramePosition();
    }

    setSelectedScene(){
        this.selectedScene = this.sceneInventory[this.selectedSceneIcon.index];
    }

    setSelectedSceneIconFramePosition(){
        this.selectedSceneIconFrame.setPosition(
            this.selectedSceneIcon.x - 4,
            this.selectedSceneIcon.y - 4
        );
    }

    // Mini Map
    createMapUI(){
        // initialize x axis in the mapUI array
        for (let i = 0; i < this.map.width; i++){
            this.mapUI.push([]);
        }

        for (let i = 0; i < this.map.height; i++){
            for (let j = 0; j < this.map.width; j++){
                let iconX = this.mapUI.position.x + (this.mapUI.iconSize + this.mapUI.padding) * j;
                let iconY = this.mapUI.position.y + (this.mapUI.iconSize + this.mapUI.padding) * i;

                let icon = this.add.sprite(iconX, iconY, "mapIcons", "icon_void").setInteractive().setOrigin(0);
                icon.coordinate = new Phaser.Math.Vector2(j, i);
                icon.on("pointerdown", (pointer, localX, localY, event) => {
                    if(this.active){
                        // console.log(icon);
                        this.putSelectedSceneOnMap(icon);
                    }
                }, this);
                this.mapUI[j].push(icon);
            }
        }
    }

    putSelectedSceneOnMap(icon, overwrite = false, returnToInventory = false){
        let x = icon.coordinate.x;
        let y = icon.coordinate.y;

        let spaceToPlaceIn = this.map[x][y];
        let sceneToPlace = this.sceneInventory[this.selectedSceneIcon.index];
        if (spaceToPlaceIn == null && sceneToPlace){
            this.removeSceneFromInventory(sceneToPlace);
            this.setSceneOnMap(sceneToPlace, x, y);
        }
        this.uiNeedsUpdate = true;
    }

    setSceneOnMap(scene, x, y){
        this.map[x][y] = scene;
        scene.coordinate.x = x;
        scene.coordinate.y = y;
        // console.log(scene);
        this.setSurroundingScenes(scene);
        return scene;
    }

    setSurroundingScenes(scene){

        // TODO: More checks. Reset to locked
        let adjacentScene = null;

        // up
        adjacentScene = this.getSceneAtLocal(scene, 0, -1);
        if (adjacentScene){
            if (scene.up && adjacentScene.down){
                scene.upLocked = false;
                adjacentScene.downLocked = false;
            }
        }

        // right
        adjacentScene = this.getSceneAtLocal(scene, 1, 0);
        if (adjacentScene){
            if (scene.right && adjacentScene.left){
                scene.rightLocked = false;
                adjacentScene.leftLocked = false;
            }
        }

        // down
        adjacentScene = this.getSceneAtLocal(scene, 0, 1);
        if (adjacentScene){
            if (scene.down && adjacentScene.up){
                scene.downLocked = false;
                adjacentScene.upLocked = false;
            }
        }

        // left
        adjacentScene = this.getSceneAtLocal(scene, -1, 0);
        if (adjacentScene){
            if (scene.left && adjacentScene.right){
                scene.leftLocked = false;
                adjacentScene.rightLocked = false;
            }
        }
    }

    getSceneAtLocal(scene, localX, localY){
        if (scene.coordinate.x + localX < 0 || scene.coordinate.x + localX >= this.map.width || scene.coordinate.y + localY < 0 || scene.coordinate.y + localY >= this.map.height) return null;

        return this.map[scene.coordinate.x + localX][scene.coordinate.y + localY];
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
        for(let i = 0; i < this.sceneInventory.max; i++){
            if (!this.sceneInventory[i]){
                let sceneToAdd = this.createSceneOfClass(this.availableSceneTypes[Phaser.Math.Between(0, this.availableSceneTypes.length - 1)]);
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
        // for (let i = 0; i < this.map.width; i ++){
        //     for (let j = 0; j < this.map.height; j++){
        //         let foundScene = this.map[i][j];
        //         if (foundScene != null){
        //             if (returnToInventory) {
        //                 foundScene = this.resetScene(foundScene);
        //                 this.addSceneToInventory(foundScene);
        //             }
        //             this.map[i][j] = null;
        //         }
        //     }
        // }
        // this.uiNeedsUpdate = true;
    }

    launchSceneAt(x, y, data = {}){
        // make sure that the coordinate is on the map
        if (x < 0 || x >= this.map.width || y < 0 || y >= this.map.height) return null;

        // get the value on the map at (x,y) (could be null, or a scene)
        let sceneToLaunch = this.map[x][y];
        // check that the scene exists
        if (sceneToLaunch){
            this.scene.stop(this.activeScene);
            this.scene.launch(sceneToLaunch, data);
            this.activeScene = sceneToLaunch;
            this.active = false;
        }
    }

    destroyScene(scene){
        this.game.scene.remove(scene.key);
    }

    goUp(data = {}){
        data.cameFrom = "up";
        this.launchSceneAt(
            this.activeScene.coordinate.x,
            this.activeScene.coordinate.y - 1,
            data
        );
    }

    goRight(data = {}){
        data.cameFrom = "right";
        this.launchSceneAt(
            this.activeScene.coordinate.x + 1,
            this.activeScene.coordinate.y,
            data
        );
    }

    goDown(data = {}){
        data.cameFrom = "down";
        this.launchSceneAt(
            this.activeScene.coordinate.x, 
            this.activeScene.coordinate.y + 1,
            data
        );
    }

    goLeft(data = {}){
        data.cameFrom = "left";
        this.launchSceneAt(
            this.activeScene.coordinate.x - 1, 
            this.activeScene.coordinate.y,
            data
        );
    }
}