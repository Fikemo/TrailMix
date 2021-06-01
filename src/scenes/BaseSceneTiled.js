import Player from "../prefabs/Player.js";
import RedEnemy from "../prefabs/RedEnemy.js";
import Saw from "../prefabs/Saw.js";
import BaseScene from "./BaseScene.js";

// TODO: Import enemies

//**This class works under the assumption that there is only one map and one tileset */
export default class BaseSceneTiled extends BaseScene{
    constructor(key, gameManager){
        super(key, gameManager);

        this.setIcon();
    }

    init(data){
        this.data.lastScene = data;
    }

    create(data){
        super.create();

        this.keyS = this.gameManager.keyS;
        console.log(this.keyS);

        this.keyS.on("down", () => {this.turnOffPlatformColliders()});
    }

    update(time, delta){
        if (this.player){
            this.player.update();
            this.checkPlayerExit();
        }

        this.setDoors();
    }

    createStandardLevel(config){
        if (!config.mapJSON) return console.log("NO MAP JSON GIVEN IN CONFIG!");

        let bgc = 0xf0e17;
        if (config.backgroundColor) bgc = config.backgroundColor;
        this.cameras.main.setBackgroundColor(bgc);

        // define the tilemap
        this.map = this.createMap(config.mapJSON);
        if (!this.map) return console.error("MAP FAILED TO BE CREATED");

        // define the map's tileset
        this.tileset = this.createTileset();
        if (!this.tileset) return console.error("TILESET FAILED TO BE ADDED");

        // create layer objects
        this.layers = this.createLayers();

        // set the platform's collisions from the platforms layer
        this.setPlatformCollisions();

        // create the door objects from the door layers
        this.doors = this.createDoors();

        if (config.player){
            // create the player spawn point objects from the playerSpawns object layer
            this.playerSpawns = this.createPlayerSpawnPoints();
            this.createPlayer();
        }

        // spawn the enemies from the enemySpawns object layers
        this.spawnEnemies();

        // set the hazard layer to use overlaps instead of collisions
        if (this.layers.hazards){
            this.setHazards();
        }

        if (this.player && this.enemyGroup){
            this.physics.add.overlap(this.player,this.enemyGroup, (player, enemy) => {
                this.playerEnemyOverlap(player, enemy);
            })

            this.physics.add.overlap(this.player.bulletGroup, this.enemyGroup, (bullet, enemy) => {
                this.bulletEnemyOverlap(bullet, enemy);
            })
        }
    }

    createMap(mapJSON){
        if(!mapJSON) return console.error("NO MAPJSON SPECIFIED!");
        return this.add.tilemap(mapJSON);
    }
    /**
     * Add a tileset to a given map. Uses this.map by default
     * @param {*} tilesetName Name of the tileset in the map's json file. Defaults to the name of the first tileset in map.tilesets
     * @param {*} tilesetImage Key of the image in the Phaser.Cache. Defaults to tilesetName if not defined
     * @param {Phaser.Tilemaps.Tilemap} map A tilemap. Defaults to this.map if not defined
     * @returns {Phaser.Tilemaps.Tileset} The added tileset
     */
    createTileset(tilesetName, tilesetImage, map){
        // check if a tilemap is given
        if (!map){
            // default to using this.map
            if (!this.map) return console.error("NO MAP DEFINED YET");
            map = this.map;
        }
        // default to the map's first tileset if not given
        if (!tilesetName) tilesetName = map.tilesets[0].name;
        // default to using an image with a key that matches the tilesetName if not given
        if (!tilesetImage) return map.addTilesetImage(tilesetName);

        // add tileset with given name and image to the map
        return map.addTilesetImage(tilesetName, tilesetImage);
    }
    /**
     * 
     * @param {Phaser.Tilemaps.Tilemap} map The map to get the layers from. Defaults to this.map
     * @param {Phaser.Tilemaps.Tileset} tileset The tileset to use when drawing the layers. Defaults to this.tileset
     * @param {*} layersObj A layers object like this.layers. Defaults to {}
     * @param  {...string} layers Names of the layers to add. Defaults to all visible layers if not defined
     */
    createLayers(map, tileset, layersObj, ...layers){
        // this.layers = {
        //     <layer>: {
        //         name: <string>,
        //         LayerData: <LayerData>,
        //         TilemapLayer: <TielmapLayer>
        //         colliders: {
        //             <colliderName>: <collider>
        //         }
        //     }
        //     set doors to their appropriate layer object in layers eg. this.upDoor = this.layers.upDoor
        // }

        // default to this.map if needed
        if (!map){
            if (!this.map) return console.error("NO MAP DEFINED");
            map = this.map;
        }

        // default to this.tileset if needed
        if (!tileset){
            if (!this.tileset) return console.error("NO TILESET DEFINED");
            tileset = this.tileset;
        }

        // The object to return. Outlined at the top of the method definition
        if (!layersObj) layersObj = {};

        // if any layers listed in ...layers
        if (layers.length != 0){ // layers isn't empty
            layers.forEach(layerName => {
                console.log(newLayer);
                let newLayer = map.createLayer(layerName,tileset);
                newLayer.setCollisionByProperty({collides: true});
                layersObj[layerName] = {
                    name: layerName,
                    layerData: newLayer.layer,
                    tilemapLayer: newLayer,
                    colliders: {},
                }
            })
        } else { // else create all the visible ones
            map.layers.forEach(layer => {
                if (layer.visible){ // if layer is visible in Tiled
                    let newLayer = map.createLayer(layer.name, tileset);
                    newLayer.setCollisionByProperty({collides: true});
                    layersObj[layer.name] = {
                        name: layer.name,
                        layerData: newLayer.layer,
                        tilemapLayer: newLayer,
                        colliders: {},
                    }
                }
            })
        }

        return layersObj;
    }
    /**
     * Sets the collision for all the tiles in the platforms layer to only collide on the top side
     * @param {Object} layersObj A layers object. Defaults to this.layers
     */
    setPlatformCollisions(layersObj){
        if (!layersObj) {
            if (!this.layers) return console.error("NO LAYERS DEFINED");
            layersObj = this.layers;
        }

        if (!layersObj.platforms) return console.error("NO PLATFORMS LAYER DEFINED");

        layersObj.platforms.layerData.data.forEach(tileArray => {
            tileArray.forEach(tile => {
                // if tile is not empty, set the collision to only the top side
                if (tile.index != -1) tile.setCollision(false, false, true, false);
            })
        })
    }

    /**Turn off the platform colliders for the given time. This allows for the player to fall through them */
    turnOffPlatformColliders(time = 150, layersObj){
        if (!layersObj){
            if (!this.layers) return console.error("NO LAYERS DEFINED");
            layersObj = this.layers;
        }
        if (!layersObj.platforms) return console.error("NO PLATFORMS LAYER IN LAYERS OBJECT");

        // Object.values(layersObj.platforms.colliders).forEach(collider => {
        //     if (collider.turnOffable){
        //         collider.active = false;
        //         this.time.delayedCall(time, () => {collider.active = true});
        //     }
        // })

        if (layersObj.platforms.colliders.player){
            layersObj.platforms.colliders.player.active = false;
            this.time.delayedCall(time, () => {layersObj.platforms.colliders.player.active = true});
        }
    }

    createDoors(layersObj){
        if (!layersObj){
            if (!this.layers) return console.error("NO LAYERS TO CREATE DOORS FROM!");
            layersObj = this.layers;
        }

        let doorsObj = {};
        Object.values(layersObj).forEach(layer => {
            if (layer.name.includes("Door")){
                this[layer.name] = layer;
                this[layer.name].lockName = layer.name.replace("Door", "") + "Locked";
                doorsObj[layer.name] = this[layer.name];
            }
        })

        return doorsObj;
    }

    setDoors(){
        if (!this.doors) return console.error("NO DOORS DEFINED");
        // console.log(this.doors);

        // console.log(this.gameManager.getSceneAtLocal(this, -1, 0));

        for(let xOffset = -1; xOffset <= 1; xOffset++){
            for(let yOffset = -1; yOffset <= 1; yOffset++){
                if (Math.abs(xOffset) != Math.abs(yOffset)){
                    let adjacentScene = this.gameManager.getSceneAtLocal(this, xOffset, yOffset);
                    // console.log(adjacentScene);
                    if (adjacentScene){
                        if (this.up && yOffset == -1){
                            // console.log(this.doors.upDoor);
                            if (adjacentScene.down){
                                this.doors.upDoor.colliders.player.active = false;
                                this.doors.upDoor.tilemapLayer.alpha = 0;
                            } else {
                                this.doors.upDoor.colliders.player.active = true;
                                this.doors.upDoor.tilemapLayer.alpha = 1;
                            }
                        }


                        if (this.right && xOffset == 1){
                            // console.log(this.doors.rightDoor);
                            if (adjacentScene.left){
                                this.doors.rightDoor.colliders.player.active = false;
                                this.doors.rightDoor.tilemapLayer.alpha = 0;
                            } else {
                                this.doors.rightDoor.colliders.player.active = true;
                                this.doors.rightDoor.tilemapLayer.alpha = 1;
                            }
                        }

                        if (this.down && yOffset == 1){
                            // console.log(this.doors.downDoor);
                            if (adjacentScene.up){
                                this.doors.downDoor.colliders.player.active = false;
                                this.doors.downDoor.tilemapLayer.alpha = 0;
                            } else {
                                this.doors.downDoor.colliders.player.active = true;
                                this.doors.downDoor.tilemapLayer.alpha = 1;
                            }
                        }

                        if (this.left && xOffset == -1){
                            // console.log(this.doors.leftDoor);
                            if (adjacentScene.right){
                                this.doors.leftDoor.colliders.player.active = false;
                                this.doors.leftDoor.tilemapLayer.alpha = 0;
                            } else {
                                this.doors.leftDoor.colliders.player.active = true;
                                this.doors.leftDoor.tilemapLayer.alpha = 1;
                            }
                        }
                    }
                }
            }
        }

        // Object.values(this.values).forEach(door => {
        //     door.tilemapLayer.alpha = this[door.lockName] ? 1 : 0;
        //     Object.values(door.colliders).forEach(collider => {
        //         collider.active = this[door.lockName];
        //     })
        // })
    }

    // TODO: Currently only works with this.layers
    setHazards(){
        if (!this.layers) return console.error("this.layers NOT DEFINED");
        if (!this.layers.hazards) return console.error("NO HAZARDS LAYER DEFINED");

        Object.values(this.layers.hazards.colliders).forEach(collider => {
            collider.overlapOnly = true;
        });
    }

    // create player
    createPlayer(){
        let ps = this.calculatePlayerSpawnPoint();
        this.player = new Player(this, ps.x, ps.y, "blushie");
        this.setPlayerSpawnState();
        this.createPlayerColliders();
    }

    createPlayerSpawnPoints(){
        let ps = {};

        let playerSpawnsObjectLayer = this.map.getObjectLayer("playerSpawns");
        if (!playerSpawnsObjectLayer) return console.error("NO PLAYER SPAWNS OBJECT LAYER IN MAP");

        playerSpawnsObjectLayer.objects.forEach(object => {
            ps[object.name] = object;
        })

        return ps;
    }



    calculatePlayerSpawnPoint(){
        let pso;
        let ps = {x: undefined, y: undefined};

        let lspp = this.data.lastScene.playerPosition;

        switch(this.data.lastScene.cameFrom){
            case "up":
                pso = this.playerSpawns.playerSpawnDown;
                if (lspp){
                    ps.x = pso.x - lspp.upOffsetX;
                } else {
                    ps.x = pso.x;
                }
                ps.y = pso.y;
            break;
            case "right":
                pso = this.playerSpawns.playerSpawnLeft;
                ps.x = pso.x;
                if (lspp){
                    ps.y = pso.y - lspp.rightOffsetY;
                } else {
                    ps.y = pso.y;
                }
            break;
            case "down":
                pso = this.playerSpawns.playerSpawnUp;
                if (lspp){
                    ps.x = pso.x - lspp.downOffsetX;
                } else {
                    ps.x = pso.x;
                }
                ps.y = pso.y;
            break;
            case "left":
                pso = this.playerSpawns.playerSpawnRight;
                ps.x = pso.x;
                if (lspp){
                    ps.y = pso.y - lspp.leftOffsetY;
                } else {
                    ps.y = pso.y;
                }
            break;
            default:
                pso = this.playerSpawns.playerSpawn;
                ps.x = pso.x;
                ps.y = pso.y;
        }

        return ps;
    }

    setPlayerSpawnState(){
        if (!this.player) return console.error("NO PLAYER DEFINED");
        if (this.data.lastScene.velocity){
            this.player.setVelocity(this.data.lastScene.velocity.x, this.data.lastScene.velocity.y);
        }
        if (this.data.lastScene.flip){
            this.player.setFlipX(this.data.lastScene.flip);
        }
    }

    createPlayerColliders(){
        if (!this.player) return console.error("NO PLAYER DEFINED");
        this.createColliders("player", this.player);
    }

    createColliders(colliderName, object){
        if (!colliderName) console.error("NO COLLIDER NAME DEFINED");
        if (!object) return console.error("NO OBJECT DEFINED");
        if (!this.layers) return console.error("NO LAYERS DEFINED");

        Object.values(this.layers).forEach(layer => {
            if (layer.layerData.properties[0] && layer.layerData.properties[0].name == "collides" && layer.layerData.properties[0].value == true){
                layer.colliders[colliderName] = this.physics.add.collider(object, layer.tilemapLayer);
            }
        });

        console.log(this.layers);
    }

    checkPlayerExit(){
        if (!this.player) return console.error("NO PLAYER DEFINED");

        let playerState = {
            playerPosition: {
                x: this.player.x,
                y: this.player.y,
                upOffsetX: this.playerSpawns.playerSpawnUp        ?  this.playerSpawns.playerSpawnUp.x    - this.player.x : undefined,
                rightOffsetY: this.playerSpawns.playerSpawnRight  ?  this.playerSpawns.playerSpawnRight.y - this.player.y : undefined,
                downOffsetX: this.playerSpawns.playerSpawnDown    ?  this.playerSpawns.playerSpawnDown.x  - this.player.x : undefined,
                leftOffsetY: this.playerSpawns.playerSpawnLeft    ?  this.playerSpawns.playerSpawnLeft.y  - this.player.y : undefined,
            },
            velocity: {
                x: this.player.body.velocity.x,
                y: this.player.body.velocity.y,
            },
            flip: this.player.flipX
        }
        // exit up
        if (this.up && this.player.y <= 0 - this.player.height / 2){
            this.gameManager.goUp(playerState);
        }

        // exit right
        if (this.right && this.player.x >= this.scale.width - this.player.width / 2){
            this.gameManager.goRight(playerState);
        }

        // exit down
        if (this.down && this.player.y >= this.scale.height * 0.75 - this.player.height / 2){
            this.gameManager.goDown(playerState);
        }

        // exit left
        if (this.left && this.player.x <= 0 - this.player.width / 2){
            this.gameManager.goLeft(playerState);
        }
    }

    spawnEnemies(){
        let enemySpawnsObjectLayer = this.map.getObjectLayer("enemySpawns");
        if (!enemySpawnsObjectLayer) return console.error("NO ENEMY SPAWNS OBJECT LAYER DEFINED");

        this.enemyGroup = this.add.group({runChildUpdate: true});
        this.createColliders("enemies", this.enemyGroup);

        enemySpawnsObjectLayer.objects.forEach(object => {
            this.spawnEnemy(object);
        })
    }

    spawnEnemy(spawnObject){
        console.log(spawnObject);

        let newEnemy = new RedEnemy(this, spawnObject.x, spawnObject.y, spawnObject);
        // switch(spawnObject.name){
        //     case "red":

        //     break;
        //     case "green":

        //     break;
        //     case "pink":

        //     break;
        //     case "yellow":

        //     break;
        //     case "saw":
        //         newEnemy = new Saw(this, spawnObject.x, spawnObject.y, spawnObject);
        //     break;
        // }

        this.enemyGroup.add(newEnemy);
    }

    playerEnemyOverlap(player, enemy){
        player.takeDamage(enemy.damage);
    }

    bulletEnemyOverlap(bullet, enemy){
        enemy.takeDamage(bullet.damage);
        bullet.destroy();
    }
}