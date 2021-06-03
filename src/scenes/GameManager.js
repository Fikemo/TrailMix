import createEvent from "../../lib/events.js";
import Hub from "./levels/Hub.js";
import LavaLeftRight from "./LavaLeftRight.js";
import CandyUpDown from "./CandyUpDown.js";
import BasicUpRightDownLeft from "./levels/BasicUpRightDownLeft.js";
import BasicRightLeft from "./levels/BasicRightLeft.js";
import BasicDownLeft from "./levels/BasicDownLeft.js";
import EnemyHazardTest from "./levels/EnemyHazardTest.js";
import NeonUpRightDownLeft from "./NeonUpRightDownLeft.js";
import WaterDownLeft from "./WaterDownLeft.js";
import ForestRightLeft from "./levels/ForestRightLeft.js";

import TestScene from "./levels/Test.js";

// TODO: Add player health
// TODO: Add player temporary inventory

export default class GameManager extends Phaser.Scene{
    constructor(){
        console.log("gameManagerScene");
        super("gameManagerScene");

        // first initialized will be set to true after init() is called for the first time
        // this is to avoid overwriting stuff if the game manager is ever shut down and re activated
        // I honestly don't know if this works the way I think it does - Finn
        this.firstInitialized = false;

        // TODO: This is meant to be like a list of C# style events
        this.eventCalls = {
            updateUIEvent: createEvent(),
        }
    }

    init(data){
        // console.log(this.events);
        if (!!!this.firstInitialized){
            // assign this to be the game's gameManager reference
            // make sure that the reference isn't already set
            if (this.game.gameManager && this.game.gameManager != this){
                console.error("Another instance of GameManager has been created! There should only ever be one!");
                // this.scene.start("gameManagerScene");
            } else {
                this.game.gameManager = this;
            }

            // active controls when the menus can be manipuleted. When active, the level should be paused and the game manager should be brought to the front
            this.active = false;

            //**The type of scene that the player will start in */
            this.startingSceneType = Hub;
            // optionally, you can set the starting scene to be the scene you want to test
            // eg. this.startingSceneType = BasicRightLeft
            // MAKE SURE YOU CHANGE IT BACK TO THE ORIGINAL STARTING SCENE
            //**An array of levels that COULD be in the player's inventory */
            this.availableSceneTypes = [
                BasicUpRightDownLeft,
                WaterDownLeft,
                LavaLeftRight,
                CandyUpDown,
                // NeonUpRightDownLeft
                ForestRightLeft,
            ];
            //**A list of all level types in the game */
            // Add scenes that are not in the array of available scenes
            this.allSceneTypes = [
                ...this.availableSceneTypes,
            ];

            //**A 2D array that holds all the scenes in their respective coordinates on the map */
            this.map = this.createMap(20, 6);

            //**An array of scenes that are available in the inventory menu */
            this.sceneInventory = this.createInventory(25);

            //**A unique ID for every new scene that is created. Used as part of the scene's key. Incremented by 1 with every new scene */
            this.sceneID = 0;

            //**The scene that is currently selected in the inventory */
            this.selectedScene = null;

            //**The scene that the player is currently in */
            this.activeScene = null;

            //**A bool that is set to true any time something that affects the UI has changed (eg. a new level is placed on the map) */
            this.uiNeedsUpdate = true;

            // Add the updateUI() method to the updateUIEvent TODO: There's not much point to using an event if there is only one thing subscribed
            this.eventCalls.updateUIEvent.add(() => {this.updateUI()});

            this.firstInitialized = true
        }
    }

    onWKeyDown(){
        console.log("w");
    }

    create(data){

        // this.music = this.sound.add('neon_bgm', {volume: 0.1});
        this.music = {
            basic: this.sound.add('basic_bgm', {volume: 0.01}),
            neon: this.sound.add('neon_bgm', {volume: 0.01}),
            water: this.sound.add('water_bgm', {volume: 0.01}),
            lava: this.sound.add('lava_bgm', {volume: 0.01}),
            candy: this.sound.add('candy_bgm', {volume: 0.01}),
            forest: this.sound.add('forest_bgm', {volume: 0.01}),
        }


        // inputs
        // create the input keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // add the background
        this.add.sprite(0, 0, "gameManagerBackground").setOrigin(0);

        // create the UI
        this.createHealthUI();

        //**A 2D array of UI icons to represent the map */
        this.mapUI = this.createMapUI();
        this.map.mapUI = this.mapUI;
        this.mapUI.map = this.map;

        // Create the inventory UI
        this.sceneInventoryUI = this.createSceneInventoryUI();
        this.selectedSceneIcon = this.sceneInventoryUI[0];
        this.selectedSceneIconFrame = this.add.sprite(
            this.sceneInventoryUI.position.x - 4,
            this.sceneInventoryUI.position.y - 4,
            "selectedInventoryIconFrame"
        ).setOrigin(0);

        // FIXME: Randomly fill the inventory with available scenes. This should be replaced with something that isn't so random
        this.randomlyFillSceneInventory();

        // Initialize the game for start
        this.initializeMapForGameStart();

        this.uiNeedsUpdate = true;
        this.eventCalls.updateUIEvent();
    }

    update(time, delta){
        //FIXME: Use ESC to access the inventory from any level
        if (Phaser.Input.Keyboard.JustDown(this.keyEscape)){
            this.setActive(this.active);
        } else if (Phaser.Input.Keyboard.JustDown(this.keyW) && this.active){
            this.setActive(this.active);
        }

        // FIXME: Find a better way to hide the map icon highlight
        if (this.mapIconFrame) this.mapIconFrame.alpha = this.active ? 1 : 0;
        
        // Update the UI if need be
        if (this.uiNeedsUpdate){
            this.updateUI();
        }
    }

    setActive(active){
        if (active){
            this.active = false;
            this.scene.resume(this.activeScene);
            this.scene.sendToBack(this);
        } else {
            this.active = true;
            this.scene.pause(this.activeScene);
            this.scene.bringToTop(this);
        }
    }

    initializeMapForGameStart(){
        // Set the starting scene
        // create a scene of the starting scene type
        this.startingScene = this.createSceneOfClass(this.startingSceneType);
        // create more rooms to place in the beginning of the game
        this.destinationRoom1 = this.createSceneOfClass(BasicUpRightDownLeft);
        this.destinationRoom2 = this.createSceneOfClass(BasicUpRightDownLeft);
        this.destinationRoom3 = this.createSceneOfClass(BasicUpRightDownLeft);
        this.destinationRoom4 = this.createSceneOfClass(BasicUpRightDownLeft);

        // set that scene to the active scene
        this.activeScene = this.startingScene;

        // let's put some scenes on the map
        this.setSceneOnMap(this.destinationRoom1, 0, 0);
        this.setSceneOnMap(this.destinationRoom2, 19, 0);
        this.setSceneOnMap(this.destinationRoom3, 3, 3);
        this.setSceneOnMap(this.destinationRoom4, 13, 1);
        this.setSceneOnMap(this.startingScene, 9, 2);

        // launch the scenes
        this.launchSceneAt(0,0);
        this.launchSceneAt(19,0);
        this.launchSceneAt(3,3);
        this.launchSceneAt(13,1);
        // launch the starting scene scene
        this.launchSceneAt(9,2);

        // update the UI
        this.uiNeedsUpdate = true;
    }
    
        //update player health
/*
        if (this.player.uiNeedsUpdate){
            console.log('updating ui');
            for (let i = 0; i < this.backgroundHealth.length; i++){
                if (i > this.player.maxHealth - 1){
                    this.backgroundHealth[i].alpha = 0;
                    this.emptyHealth[i].alpha = 0;
                } else {
                    this.backgroundHealth[i].alpha = 1;
                    this.emptyHealth[i].alpha = 1;
                }

                if (i > this.player.currentHealth - 1){
                    this.filledHealth[i].alpha = 0;
                } else {
                    this.filledHealth[i].alpha = 1;
                }
            }
        }
        */
      
    updateUI(inventory = true, map = true, health = true){
        // console.log("updating UI");

        // update the inventory
        if (inventory){
            this.sceneInventoryUI.forEach((item, index) => {
                let frameName = "icon_void";
                let currentScene = this.sceneInventory[index];
                if (currentScene) frameName = currentScene.iconName;
                item.setFrame(frameName);
            })
        }

        // update the map
        if (map){
            this.map.forEach( (column, x) => {
                column.forEach( (cell, y) => {
                    let frameName = "icon_void";
                    if (cell) frameName = cell.iconName;
                    this.mapUI[x][y].setFrame(frameName);
                })
            })
        }

        // TODO: update the player's health
    }


    // Scene Inventory
    createInventory(max){
        let inventory = [];
        inventory.max = max;
        return inventory;
    }

    createSceneInventoryUI(width = 5, x = 34, y = 72, iconSize = 48, paddingX = 48, paddingY = 48){
        if (!this.sceneInventory) return console.error("NO SCENE INVENTORY DEFINED!");

        let inventoryUI = [];
        inventoryUI.width = width;
        inventoryUI.position = new Phaser.Math.Vector2(x, y);
        inventoryUI.iconSize = iconSize;
        inventoryUI.padding = {width: paddingX, height: paddingY};

        let row = 0;
        let column = 0;
        // TODO: turn the icons into prefabs instead of just sprites
        for (let i = 0; i < this.sceneInventory.max; i++){
            let iconX = inventoryUI.position.x + ((inventoryUI.iconSize + inventoryUI.padding.width) * column);
            let iconY = inventoryUI.position.y + ((inventoryUI.iconSize + inventoryUI.padding.height) * row);

            let icon = this.add.sprite(iconX, iconY, "inventoryIcons", "icon_void").setInteractive().setOrigin(0);

            icon.on("pointerdown", (pointer, localX, localY, event) => {
                if (this.active){
                    this.setSelectedSceneIcon(icon);
                }
            }, this);

            icon.index = i;

            inventoryUI[i] = icon;

            column++;
            if (column >= inventoryUI.width){
                column = 0;
                row++;
            }
        }

        return inventoryUI;
    }

    //**Set the selected scene based on the clicked icon */
    setSelectedSceneIcon(icon){
        this.selectedSceneIcon = icon;
        this.setSelectedScene();
        this.setSelectedSceneIconFramePosition();
    }

    //**Set the selected scene in the inventory */
    setSelectedScene(){
        this.selectedScene = this.sceneInventory[this.selectedSceneIcon.index];
        console.log(this.selectedScene);
    }

    //**Sets the highlight's position around the selected scene in the inventory */
    setSelectedSceneIconFramePosition(){
        this.selectedSceneIconFrame.setPosition(
            this.selectedSceneIcon.x - 4,
            this.selectedSceneIcon.y - 4
        );
    }

    //Create health bar
    createHealthUI(){
        let healthbarPos = new Phaser.Math.Vector2(32, 32);
        let healthBarSegmentWidth = 40;
        this.backgroundHealth = [];
        for (let i = 0; i < this.DEBUG_MAX_PLAYER_HEALTH; i++) {
            this.backgroundHealth.push(this.add.sprite(healthbarPos.x + healthBarSegmentWidth * i, healthbarPos.y, 'bar').setOrigin(0));
        }
        this.emptyHealth = [];
        for (let i = 0; i < this.DEBUG_MAX_PLAYER_HEALTH; i++) {
            this.emptyHealth.push(this.add.sprite(healthbarPos.x + healthBarSegmentWidth * i + 8, healthbarPos.y + 4, 'bar').setOrigin(0));
        }
        this.filledHealth = [];
        for (let i = 0; i < this.DEBUG_MAX_PLAYER_HEALTH; i++) {
            this.filledHealth.push(this.add.sprite(healthbarPos.x + healthBarSegmentWidth * i + 8, healthbarPos.y + 4, 'bar').setOrigin(0));
        }
    }

    // Mini Map
    createMap(width, height){
        let map = [];
        map.width = width;
        map.height = height;

        for (let x = 0; x < width; x++){
            map.push([]);
            for(let y = 0; y < height; y++){
                map[x].push(null);
            }
        }
        
        return map;
    }

    createMapUI(){
        if (!this.map) return console.log("NO MAP DEFINED!");

        let mapUI = [];
        mapUI.width = this.map.width;
        mapUI.height = this.map.height;
        mapUI.position = new Phaser.Math.Vector2(202, 586);
        mapUI.iconSize = 24;
        mapUI.padding = 4;

        this.map.forEach((column, x) => {
            mapUI.push([]);
            column.forEach((cell, y) => {
                let iconX = mapUI.position.x + (mapUI.iconSize + mapUI.padding) * x;
                let iconY = mapUI.position.y + (mapUI.iconSize + mapUI.padding) * y;

                let icon = this.add.sprite(iconX, iconY, "mapIcons", "icon_void").setInteractive().setOrigin(0);
                icon.coordinate = new Phaser.Math.Vector2(x, y);
                icon.on("pointerdown", (pointer, localX, localY, event) => {
                    if (this.active){
                        this.putSelectedSceneOnMap(icon);
                    }
                }, this);
                icon.on("pointerover", () => {
                    if (this.active){
                        this.setMapIconFrame(icon);
                    }
                })
                mapUI[x].push(icon);
            })
        })

        // the frame hightlights the map cell taht the pointer is hovering over
        this.mapIconFrame = this.add.sprite(mapUI.position.x - 4, mapUI.position.y - 4, "mapIconFrame").setOrigin(0);

        //
        this.locationIndicator = this.add.sprite(mapUI.position.x, mapUI.position.y, "locationIndicator").setOrigin(0);
        this.locationIndicator.anims.play("locationIndicator");

        return mapUI;
    }

    setMapIconFrame(icon){
        if (!this.mapIconFrame) return console.error("NO MAP ICON FRAME");
        this.mapIconFrame.setPosition(icon.x - 4, icon.y - 4);
    }

    putSelectedSceneOnMap(icon, overwrite = false, returnToInventory = false){
        let x = icon.coordinate.x;
        let y = icon.coordinate.y;

        let cell = this.map[x][y];
        let sceneToAdd = this.sceneInventory[this.selectedSceneIcon.index];
        if (cell == null && sceneToAdd){
            this.removeSceneFromInventory(sceneToAdd);
            this.setSceneOnMap(sceneToAdd, x, y);
        }
        this.uiNeedsUpdate = true;
    }

    //**Inserts the scene in the map's corresponding x,y coordinate */
    setSceneOnMap(scene, x, y){
        console.log(scene);
        if (!scene) return console.error("NO SCENE DEFINED TO PLACE ON MAP");
        this.map[x][y] = scene;
        scene.coordinate.x = x;
        scene.coordinate.y = y;
        // console.log(scene);
        this.setSurroundingScenes(scene);
        this.uiNeedsUpdate = true;
        return scene;
    }

    //**Check the surrounding scene's available doorways */
    setSurroundingScenes(scene){

        // TODO: More checks. Reset to locked
        // let adjacentScene = null;

        // // up
        // adjacentScene = this.getSceneAtLocal(scene, 0, -1);
        // if (adjacentScene){
        //     if (scene.up && adjacentScene.down){
        //         scene.upLocked = false;
        //         adjacentScene.downLocked = false;
        //     }
        // }

        // // right
        // adjacentScene = this.getSceneAtLocal(scene, 1, 0);
        // if (adjacentScene){
        //     if (scene.right && adjacentScene.left){
        //         scene.rightLocked = false;
        //         adjacentScene.leftLocked = false;
        //     }
        // }

        // // down
        // adjacentScene = this.getSceneAtLocal(scene, 0, 1);
        // if (adjacentScene){
        //     if (scene.down && adjacentScene.up){
        //         scene.downLocked = false;
        //         adjacentScene.upLocked = false;
        //     }
        // }

        // // left
        // adjacentScene = this.getSceneAtLocal(scene, -1, 0);
        // if (adjacentScene){
        //     if (scene.left && adjacentScene.right){
        //         scene.leftLocked = false;
        //         adjacentScene.rightLocked = false;
        //     }
        // }
    }

    //**Get the cell information from the given scene's coordinate */
    getSceneAtLocal(scene, localX, localY){
        if (scene.coordinate.x + localX < 0 || scene.coordinate.x + localX >= this.map.width || scene.coordinate.y + localY < 0 || scene.coordinate.y + localY >= this.map.height) return null;

        return this.map[scene.coordinate.x + localX][scene.coordinate.y + localY];
    }

    //**Creates a new scene of the given class */
    createSceneOfClass(sceneClass){
        this.sceneID++;
        let key = sceneClass.name + "_" + this.sceneID;
        let newScene = new sceneClass(key, this);
        this.game.scene.add(key, newScene);
        return newScene;
    }

    //**Re-construct the given scene */
    resetScene(scene){
        let key = scene.key;
        let sceneClass = scene.constructor;
        this.game.scene.remove(scene);
        let newScene = new sceneClass(key, this);
        this.game.scene.add(key, newScene);
        return newScene;
    }

    //**Add the given scene to the inventory */
    addSceneToInventory(scene){
        this.sceneInventory.push(scene);
        this.uiNeedsUpdate = true;
        return scene;
    }

    //**Randomly fill the inventory with available scenes */
    randomlyFillSceneInventory(){
        for(let i = 0; i < this.sceneInventory.max - 15; i++){
            if (!this.sceneInventory[i]){
                let sceneToAdd = this.createSceneOfClass(this.availableSceneTypes[Phaser.Math.Between(0, this.availableSceneTypes.length - 1)]);
                this.addSceneToInventory(sceneToAdd);
            }
        }
        this.uiNeedsUpdate = true;
    }

    //**Remove the given scene from the inventory */
    removeSceneFromInventory(scene){
        let sceneIndex = this.sceneInventory.indexOf(scene);
        if (sceneIndex == - 1) return null;
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

    //**Launch the scene at the given coordinate */
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

            this.locationIndicator.setPosition(this.mapUI.position.x + 28 * this.activeScene.coordinate.x, this.mapUI.position.y + 28 * this.activeScene.coordinate.y);
        }

        //this.music = this.sound.add('neon_bgm', {volume: 0.1});
        // if (this.activeScene && !this.music.isPlaying) {
        //     console.log('aboiiii!!!');
        //     this.music.play();
        // }

        let musicCanPlay = true;
        Object.values(this.music).forEach(track => { 
            if (track.isPlaying){
                musicCanPlay = false;
            }
        })
        if (musicCanPlay && sceneToLaunch.musicKey) {
            this.music[sceneToLaunch.musicKey].play();
        }
    }

    //**Destroy the given scene */
    destroyScene(scene){
        this.game.scene.remove(scene.key);
    }

    //**Launch the scene immediately above the current scene */
    goUp(data = {}){
        data.cameFrom = "up";
        this.launchSceneAt(
            this.activeScene.coordinate.x,
            this.activeScene.coordinate.y - 1,
            data
        );
    }

    //**Launch the scene immediately to the right the current scene */
    goRight(data = {}){
        data.cameFrom = "right";
        this.launchSceneAt(
            this.activeScene.coordinate.x + 1,
            this.activeScene.coordinate.y,
            data
        );
        console.log(this.activeScene);
        // this.music = this.sound.add('neon_bgm', {volume: 0.1});
        // if (this.activeScene && !this.music.isPlaying) {
        //     console.log('aboiiii!!!');
        //     this.music.play();
        // }
    }

    //**Launch the scene immediately below the current scene */
    goDown(data = {}){
        data.cameFrom = "down";
        this.launchSceneAt(
            this.activeScene.coordinate.x, 
            this.activeScene.coordinate.y + 1,
            data
        );
    }

    //**Launch the scene immediately to the left the current scene */
    goLeft(data = {}){
        data.cameFrom = "left";
        this.launchSceneAt(
            this.activeScene.coordinate.x - 1, 
            this.activeScene.coordinate.y,
            data
        );
    }
}