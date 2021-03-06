import createEvent from "../../lib/events.js";

// import ForestUpDownLeft from "./levels/ForestUpDownLeft.js";
// import SkyRightLeft from "./levels/SkyRIghtLeft.js";

//start
import WaterUpRightDownLeftEasy from "./levels/WaterUpRightDownLeftEasy.js";
import CandyLeftRightEasy from "./levels/CandyLeftRightEasy.js";

// orange
import LavaUpDownEasy from "./levels/LavaUpDownEasy.js";
import WaterLeftUpEasy from "./levels/WaterLeftUpEasy.js";
import ForestDownRightEasy from "./levels/ForestDownRightEasy.js";

// chartreuse
import CandyUpRightLeftEasy from "./levels/CandyUpRightLeftEasy.js";
import ForestUpDownLeftEasy from "./levels/ForestUpDownLeftEasy.js";
import SkyRightLeftEasy from "./levels/SkyRightLeftEasy.js";

// maroon
import CandyUpDownEasy from "./levels/CandyUpDownEasy.js";
import ForestDownLeftEasy from "./levels/ForestDownLeftEasy.js";
import LavaUpRightEasy from "./levels/LavaUpRightEasy.js";
// blue
import WaterUpRightDownMedium from "./levels/WaterUpRightDownMedium.js";
import NeonRightLeftMedium from "./levels/NeonRightLeftMedium.js";
import SkyRightDownLeftMedium from "./levels/SkyRightDownLeftMedium.js";
// purple
import SkyUpDownMedium from "./levels/SkyUpDownMedium.js";
import ForestUpDownMedium from "./levels/ForestUpDownMedium.js";
import CandyUpRightDownLeftMedium from "./levels/CandyUpRightDownLeftMedium.js";

// yellow
import LavaUpDownLeftMedium from "./levels/LavaUpDownLeftMedium.js";
import WaterRightLeftMedium from "./levels/WaterRightLeftMedium.js";

// aqua
import CommonUpLeftHard from "./levels/CommonUpLeftHard.js";
import ForestRightDownHard from "./levels/ForestRightDownHard.js";
import WaterUpRightLeftHard from "./levels/WaterUpRightLeftHard.js";

// teal
import LavaUpRightDownLeftHard from "./levels/LavaUpRightDownLeftHard.js";
import CandyRightDownLeftHard from "./levels/CandyRightDownLeftHard.js";
import SkyUpRightHard from "./levels/SkyUpRightHard.js";

// room depots
import Hub from "./roomDepots/Hub.js";
import UpRoomDepot from "./roomDepots/UpRoomDepot.js";
import RightRoomDepot from "./roomDepots/RightRoomDepot.js";
import DownRoomDepot from "./roomDepots/DownRoomDepot.js";
import LeftRoomDepot from "./roomDepots/LeftRoomDepot.js";
import FinalRoom from "./roomDepots/FinalRoom.js"

// test rooms
import TestScene from "./levels/Test.js";
import TestUpRightDownLeft from "./testLevels/TestUpRightDownLeft.js";
import TestDownLeft from "./testLevels/TestDownLeft.js";
import TestRightDown from "./testLevels/TestRightDown.js";
import TestRightDownLeft from "./testLevels/TestRightDownLeft.js";
import TestRightLeft from "./testLevels/TestRightLeft.js";
import TestUpDown from "./testLevels/TestUpDown.js";
import TestUpDownLeft from "./testLevels/TestUpDownLeft.js";
import TestUpLeft from "./testLevels/TestUpLeft.js";
import TestUpRight from "./testLevels/TestUpRight.js";
import TestUpRightDown from "./testLevels/TestUpRightDown.js";
import TestUpRightLeft from "./testLevels/TestUpRightLeft.js";

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

        // used for pointer click sound
        this.cursorClick;
        this.cursorErase;
        this.cursorRoomPlaced;

        // TODO: This is meant to be like a list of C# style events
        this.eventCalls = {
            updateUIEvent: createEvent(),
        }
    }

    init(data){
        // console.log(this.events);
        // if (!!!this.firstInitialized){
            // assign this to be the game's gameManager reference
            // make sure that the reference isn't already set
            // if (this.game.gameManager && this.game.gameManager != this){
            //     console.error("Another instance of GameManager has been created! There should only ever be one!");
            //     // this.scene.start("gameManagerScene");
            // } else {
            //     this.game.gameManager = this;
            // }

            this.game.gameManager = this;

            // active controls when the menus can be manipuleted. When active, the level should be paused and the game manager should be brought to the front
            this.active = false;

            //**The type of scene that the player will start in */
            this.startingSceneType = Hub;
            // optionally, you can set the starting scene to be the scene you want to test
            // eg. this.startingSceneType = BasicRightLeft
            // MAKE SURE YOU CHANGE IT BACK TO THE ORIGINAL STARTING SCENE
            //**An array of levels that COULD be in the player's inventory */
            // this.availableSceneTypes = [
            //     ForestUpDownLeft,
            //     SkyRightLeft,
            // ];
            //**A list of all level types in the game */
            // Add scenes that are not in the array of available scenes
            // this.allSceneTypes = [
            //     ...this.availableSceneTypes,
            // ];

            this.allInventoryRoomTypes = {
                start: [
                    WaterUpRightDownLeftEasy,
                    CandyLeftRightEasy, 
                ],

                orange: [
                    LavaUpDownEasy,
                    WaterLeftUpEasy,
                    ForestDownRightEasy,
                ],

                chartreuse: [
                    CandyUpRightLeftEasy,
                    ForestUpDownLeftEasy,
                    SkyRightLeftEasy,
                ],

                maroon: [
                    LavaUpRightEasy,
                    CandyUpDownEasy,
                    ForestDownLeftEasy,
                ],

                blue: [
                    NeonRightLeftMedium,
                    WaterUpRightDownMedium,
                    SkyRightDownLeftMedium,
                ],

                purple: [
                    SkyUpDownMedium,
                    ForestUpDownMedium,
                    CandyUpRightDownLeftMedium,
                ],

                yellow: [
                    LavaUpDownLeftMedium,
                    WaterRightLeftMedium,
                ],

                aqua: [
                    CommonUpLeftHard,
                    ForestRightDownHard,
                    WaterUpRightLeftHard
                ],
                
                teal: [
                    LavaUpRightDownLeftHard,
                    CandyRightDownLeftHard,
                    SkyUpRightHard
                ]
            }

            this.startingTestScenes = [
                TestRightLeft,
                TestUpRightDownLeft,

                TestRightDown,
                TestUpDown,
                TestUpLeft,

                TestUpRightLeft,
                TestUpDownLeft,
                TestRightLeft,

                TestUpRight,
                TestUpDown,
                TestDownLeft,

                TestRightLeft,
                TestUpRightDown,
                TestRightDownLeft,

                TestUpDown,
                TestUpRightDownLeft,
                TestUpDown,

                TestUpDownLeft,
                TestRightLeft,

                TestUpLeft,
                TestRightDown,
                TestUpRightLeft,
                
                TestUpRightDownLeft,
                TestRightDownLeft,
                TestUpRight,
            ];

            //**A 2D array that holds all the scenes in their respective coordinates on the map */
            this.map = this.createMap(20, 6);

            //**An array of scenes that are available in the inventory menu */
            this.sceneInventory = this.createInventory(25);

            //**An array of objects for the blushies that the player is currently holding */
            this.playerBlushieInventory = [];

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
        // }
    }

    onWKeyDown(){
        console.log("w");
    }

    downloadScreenshot(){
        this.game.renderer.snapshot((image) => {
            this.exportCanvasAsPNG("phaser-game", "snapshot", image.src);
        })
    }

    exportCanvasAsPNG(id, fileName, dataUrl) {
        let canvasElement = document.getElementById(id);
        let MIME_TYPE = "image/png";
        let imgURL = dataUrl;
        let dlLink = document.createElement('a');
        dlLink.download = fileName;
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }

    create(data){

        // this.music = this.sound.add('neon_bgm', {volume: 0.1});
        this.music = {
            basic: this.sound.add('basic_bgm', {volume: 0.03}),
            neon: this.sound.add('neon_bgm', {volume: 0.03}),
            water: this.sound.add('water_bgm', {volume: 0.03}),
            lava: this.sound.add('lava_bgm', {volume: 0.03}),
            candy: this.sound.add('candy_bgm', {volume: 0.03}),
            forest: this.sound.add('forest_bgm', {volume: 0.03}),
            sky: this.sound.add('sky_bgm', {volume: 0.03}),
        };

        Object.values(this.music).forEach(track => {
            track.played = false;
        });
        this.cursorClick = this.sound.add('sfx_cursorClick', {volume: 0.1});
        this.cursorErase = this.sound.add('sfx_eraseClick', {volume: 0.1});
        this.cursorRoomPlaced = this.sound.add('sfx_roomPlaced', {volume: 0.1});

        // inputs
        // create the input keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
        // this.randomlyFillSceneInventory();

        // Initialize the game for start
        this.initializeMapForGameStart();

        this.playerHealth = 50;
        this.playerHealthMax = 50;

        this.uiNeedsUpdate = true;
        this.eventCalls.updateUIEvent();
    }

    adjustPlayerHealth(value, set = false){

        if (set){
            this.playerHealth = value;
        } else {
            this.playerHealth += value;
        }

        if (this.playerHealth <= 0){

            this.playerBlushieInventory.forEach(blushieObj => {
                blushieObj.scene.heldRooms.push(blushieObj.sceneType);
            });

            this.playerBlushieInventory = [];

            this.launchSceneAt(6, 2);
        }

        this.uiNeedsUpdate = true;
    }

    update(time, delta){
        //FIXME: Use ESC to access the inventory from any level
        // if (Phaser.Input.Keyboard.JustDown(this.keyEscape)){
        //     this.setActive(this.active);
        // } else
        if (Phaser.Input.Keyboard.JustDown(this.keyW) && this.active){
            this.setActive(this.active);
        }

        // FIXME: Find a better way to hide the map icon highlight
        if (this.mapIconFrame) this.mapIconFrame.alpha = this.active ? 1 : 0;
        
        // Update the UI if need be
        if (this.uiNeedsUpdate){
            this.updateUI();
        }

        if (this.playerBlushieInventoryText){
            this.playerBlushieInventoryText.setText("NEW ROOMS: " + this.playerBlushieInventory.length);
        }
    }

    setActive(active){
        if (active){
            this.active = false;
            this.scene.resume(this.activeScene);
            this.scene.sendToBack(this);
        } else {
            this.setSelectedSceneIcon(this.sceneInventoryUI[0]);
            this.turnBlushieInventoryIntoScenes();
            this.active = true;
            this.scene.pause(this.activeScene);
            this.scene.bringToTop(this);
        }
    }

    turnBlushieInventoryIntoScenes(){
        Object.values(this.playerBlushieInventory).forEach(obj => {
            let sceneToAdd = this.createSceneOfClass(obj.sceneType);
            this.addSceneToInventory(sceneToAdd);
        });

        this.playerBlushieInventory = [];
    }

    initializeMapForGameStart(){
        this.roomDepots = {};
        // create the room depots and put them on the map
        // orange
        this.roomDepots.orange = this.createSceneOfClass(UpRoomDepot);
        this.roomDepots.orange.heldRooms = this.allInventoryRoomTypes.orange;
        this.setSceneOnMap(this.roomDepots.orange, 4, 3);

        // chartreuse
        this.roomDepots.chartreuse = this.createSceneOfClass(RightRoomDepot);
        this.roomDepots.chartreuse.heldRooms = this.allInventoryRoomTypes.chartreuse;
        this.setSceneOnMap(this.roomDepots.chartreuse, 2, 4);

        // maroon
        this.roomDepots.maroon = this.createSceneOfClass(DownRoomDepot);
        this.roomDepots.maroon.heldRooms = this.allInventoryRoomTypes.maroon;
        this.setSceneOnMap(this.roomDepots.maroon, 9, 4);

        // blue
        this.roomDepots.blue = this.createSceneOfClass(DownRoomDepot);
        this.roomDepots.blue.heldRooms = this.allInventoryRoomTypes.blue;
        this.setSceneOnMap(this.roomDepots.blue, 0, 0);

        // purple
        this.roomDepots.purple = this.createSceneOfClass(LeftRoomDepot);
        this.roomDepots.purple.heldRooms = this.allInventoryRoomTypes.purple;
        this.setSceneOnMap(this.roomDepots.purple, 12, 2);

        // yellow
        this.roomDepots.yellow = this.createSceneOfClass(RightRoomDepot);
        this.roomDepots.yellow.heldRooms = this.allInventoryRoomTypes.yellow;
        this.setSceneOnMap(this.roomDepots.yellow, 13, 3);

        // aqua
        this.roomDepots.aqua = this.createSceneOfClass(UpRoomDepot);
        this.roomDepots.aqua.heldRooms = this.allInventoryRoomTypes.aqua;
        this.setSceneOnMap(this.roomDepots.aqua, 15, 5);

        // teal
        this.roomDepots.teal = this.createSceneOfClass(LeftRoomDepot);
        this.roomDepots.teal.heldRooms = this.allInventoryRoomTypes.teal;
        this.setSceneOnMap(this.roomDepots.teal, 17, 1);

        // end room
        let endRoom = this.createSceneOfClass(FinalRoom);
        this.setSceneOnMap(endRoom, 19, 4);

        // Set the starting scene
        // create a scene of the starting scene type
        this.startingScene = this.createSceneOfClass(this.startingSceneType);

        // set that scene to the active scene
        this.activeScene = this.startingScene;

        // put the starting scene on the map
        this.setSceneOnMap(this.startingScene, 6, 2);

        // this.startingTestScenes.forEach(sceneType => {
        //     let sceneToGive = this.createSceneOfClass(sceneType);
        //     this.addSceneToInventory(sceneToGive);
        // })

        // Object.values(this.allInventoryRoomTypes).forEach(value => {
        //     value.forEach(sceneType => {
        //         let sceneToStartWith = this.createSceneOfClass(sceneType);
        //         this.addSceneToInventory(sceneToStartWith);
        //     })
        // })

        this.allInventoryRoomTypes.start.forEach(sceneType => {
            let sceneToStartWith = this.createSceneOfClass(sceneType);
            this.addSceneToInventory(sceneToStartWith);
        })

        // launch the starting scene scene
        this.launchSceneAt(6,2);

        // update the UI
        this.uiNeedsUpdate = true;
    }

    giveAllRooms(){
        this.sceneInventory = [];
        Object.values(this.allInventoryRoomTypes).forEach(roomArray => {
            roomArray.forEach(roomType => {
                let sceneToAdd = this.createSceneOfClass(roomType);
                this.addSceneToInventory(sceneToAdd);
            })
        })

        this.uiNeedsUpdate = true;
    }
      
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
                    if (cell) {
                        frameName = cell.iconName;
                        if (cell.static){
                            this.mapUI[x][y].setTexture("mapIcons_depot");
                        }

                        if (cell.key.includes("Hub")){
                            this.mapUI[x][y].setTexture("mapIcons_start");
                        }

                        if (x == 19 && y == 4){
                            this.mapUI[x][y].setTexture("mapIcons_end");
                        }
                    }
                    this.mapUI[x][y].setFrame(frameName);
                })
            })
        }

        // held rooms indicators
        if (this.roomDepots){
            Object.values(this.roomDepots).forEach(room => {
                // console.log(room);
                if (room.heldRoomsIndicator){
                    room.heldRoomsIndicator.setPosition(
                        this.mapUI.position.x + (24 + 4) * room.coordinate.x,
                        this.mapUI.position.y + (24 + 4) * room.coordinate.y,
                    )

                    room.heldRoomsIndicator.alpha = room.heldRooms.length > 0 ? 1 : 0;
                }
            })
        }

        // TODO: update the player's health

        if (health){
            if (this.healthBar){
                this.healthBar.setScale(this.playerHealth / this.playerHealthMax, 1);
            }
        }
    }


    // Scene Inventory
    createInventory(max){
        let inventory = [];
        inventory.max = max;
        return inventory;
    }

    createSceneInventoryUI(width = 5, x = 34, y = 72, iconSize = 48, paddingX = 48, paddingY = 48){
        if (!this.sceneInventory) return console.error("NO SCENE INVENTORY DEFINED!");

        // add instruction text
        // this.add.bitmapText(640, 60, "upheaval", "Click on a ROOM to the left to select it. Click on the MAP below to place the ROOM", )
        this.add.image(0,0, "mapInstructions").setOrigin(0);

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
                    this.cursorClick.play();
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

        this.eraserIcon = this.add.sprite(694, 502, "eraserButton").setOrigin(0).setInteractive();
        this.eraserIcon.on("pointerdown", () => {
            if (this.active){
                this.activateEraser();
                this.cursorClick.play();
            }
        }, this);

        this.clearIcon = this.add.sprite(632, 502, "clearButton").setOrigin(0).setInteractive();
        this.clearIcon.on("pointerdown", () => {
            if (this.active){
                this.clearMap();
                this.cursorClick.play();
            }
        }, this);

        return inventoryUI;
    }

    activateEraser(){
        this.eraserActive = true;
        this.selectedSceneIcon = null;
        this.selectedSceneIconFrame.setPosition(this.eraserIcon.x, this.eraserIcon.y);
    }

    //**Set the selected scene based on the clicked icon */
    setSelectedSceneIcon(icon){
        this.eraserActive = false;
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
        // let healthbarPos = new Phaser.Math.Vector2(32, 32);
        // let healthBarSegmentWidth = 40;
        // this.backgroundHealth = [];
        // for (let i = 0; i < this.DEBUG_MAX_PLAYER_HEALTH; i++) {
        //     this.backgroundHealth.push(this.add.sprite(healthbarPos.x + healthBarSegmentWidth * i, healthbarPos.y, 'bar').setOrigin(0));
        // }
        // this.emptyHealth = [];
        // for (let i = 0; i < this.DEBUG_MAX_PLAYER_HEALTH; i++) {
        //     this.emptyHealth.push(this.add.sprite(healthbarPos.x + healthBarSegmentWidth * i + 8, healthbarPos.y + 4, 'bar').setOrigin(0));
        // }
        // this.filledHealth = [];
        // for (let i = 0; i < this.DEBUG_MAX_PLAYER_HEALTH; i++) {
        //     this.filledHealth.push(this.add.sprite(healthbarPos.x + healthBarSegmentWidth * i + 8, healthbarPos.y + 4, 'bar').setOrigin(0));
        // }

        this.healthBar = this.add.sprite(6, 586, "healthbar").setOrigin(0);
        // this.playerBlushieInventoryText = this.add.text(6, 624, "NEW ROOMS: " + this.playerBlushieInventory.length);
        this.playerBlushieInventoryText = this.add.bitmapText(6, 624, "upheaval", "NEW ROOMS: " + this.playerBlushieInventory.length, -24);
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
                        if (!this.eraserActive) {
                            this.putSelectedSceneOnMap(icon);
                            this.cursorRoomPlaced.play();
                        }
                        else {
                            this.putSceneFromMapInInventory(icon);
                            this.cursorErase.play();
                        }
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

    createHeldRoomsIndicatorUI(scene){
        console.log(scene);

        scene.heldRoomsIndicator = this.add.image(-20,-20, "heldRoomsIndicator").setOrigin(0);
    }

    setMapIconFrame(icon){
        if (!this.mapIconFrame) return console.error("NO MAP ICON FRAME");
        this.mapIconFrame.setPosition(icon.x - 4, icon.y - 4);
    }

    putSelectedSceneOnMap(icon, overwrite = false, returnToInventory = false){
        if (!icon || !this.selectedSceneIcon) return;
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

    putSceneFromMapInInventory(icon){
        let x = icon.coordinate.x;
        let y = icon.coordinate.y;

        let selectedScene = this.map[x][y];
        console.log(this.selectedScene);
        if (selectedScene != null && !selectedScene.static && selectedScene != this.activeScene){
            console.log(selectedScene);
            this.addSceneToInventory(selectedScene);
            this.map[x][y] = null;
            this.uiNeedsUpdate = true;
        }
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

    // add 1 new room to the inventory
    add1RoomToInventory(){
        let sceneToAdd = this.createSceneOfClass(this.availableSceneTypes[Phaser.Math.Between(0, this.availableSceneTypes.length - 1)]);
        this.addSceneToInventory(sceneToAdd);
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

        if (this.map){
            this.map.forEach((column, x) => {
                column.forEach((cell, y) => {
                    if (cell && !cell.static){
                        this.addSceneToInventory(cell);
                        this.map[x][y] = null;
                        this.uiNeedsUpdate = true;
                    }
                })
            })
        }
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
        let resetMusic = true;
        Object.values(this.music).forEach(track => { 
            if (track.isPlaying){
                musicCanPlay = false;
            }

            if (!track.played){
                resetMusic = false;
            }
        });

        if (resetMusic){
            Object.values(this.music).forEach(track => {
                track.played = false;
            })
        }

        if (musicCanPlay && sceneToLaunch.musicKey && !this.music[sceneToLaunch.musicKey].played) {
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