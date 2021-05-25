import BaseScene from "./BaseScene.js";

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
    }

    createStandardLevel(config){
        // create the map

        this.cameras.main.setBackgroundColor(0x666666);

        this.map = this.createMap(config.mapJSON);
        if (!this.map) return;
        // create the tileset
        this.tileset = this.createTileset();
        if (!this.tileset) return;

        // create the layers
        this.layers = this.createLayers();
        if (!this.layers) return;
        // set the tiles in the platforms layer to collide correctly (e.g. only check for 'up' collisions)
        this.setPlatformCollisions();

        // create the door variables
        this.doors = this.createDoors();

        // create player spawn objects
        this.playerSpawns = this.createPlayerSpawns();

        // and set any other things from object layers
    }

    createMap(mapJSON){
        if(!mapJSON) return console.error("NO MAP SPECIFIED!");

        return this.add.tilemap(mapJSON);
    }

    /**
     * Create a tileset with given name specified in the map's json, an image key, and the map itself.
     * @param {string} tilesetName The name of the tileset in the map's json. Defaults to map.tilesets[0].name
     * @param {string} tilesetImage The key of the image in the Phaser.Cache. Defaults to tilesetName (so make sure the image key matches the tileset key)
     * @param {Phaser.Tilemaps.Tilemap} map The tilemap to add the tileset to. Defaults to "this.map"
     * @returns {Phaser.Tilemaps.Tileset}
     */
    createTileset(tilesetName, tilesetImage, map){
        if (!map){
            if (!this.map) return console.error("NO MAP DEFINED!");
                
            map = this.map;
        }
        if (!tilesetName) tilesetName = map.tilesets[0].name;
        if (!tilesetImage) return map.addTilesetImage(tilesetName);

        return map.addTilesetImage(tilesetName, tilesetImage);
    }

    createLayers(map, tileset, ...layers){
        /*
        this.layers = {
            <layer>: {
                name: <string>,
                LayerData: <LayerData>,
                TilemapLayer: <TielmapLayer>
                colliders: {
                    <colliderName>: <collider>
                }
            }
            set doors to their appropriate layer object in layers eg. this.upDoor = this.layers.upDoor
        }
        */
        if (!map){
            if (!this.map) return console.error("NO MAP DEFINED");
            map = this.map;
        }

        if (!tileset){
            if (!this.tileset) return console.error("NO TILESET DEFINED");
            tileset = this.tileset;
        }

        let layersObj = {};

        if (layers.length != 0){
            layers.forEach(layer => {
                if (layer.visible){
                    let newLayer = map.createLayer(layer, tileset);
                    newLayer.setCollisionByProperty({collides: true});
                    layersObj[layer] = {
                        name: layer,
                        layerData: newLayer.layer,
                        tilemapLayer: newLayer,
                        colliders: {}
                    }
                }
            })
        } else {
            map.layers.forEach(layer => {
                if (layer.visible){
                    let newLayer = map.createLayer(layer.name, tileset);
                    newLayer.setCollisionByProperty({collides: true});
                    layersObj[layer.name] = {
                        name: layer.name,
                        layerData: newLayer.layer,
                        tilemapLayer: newLayer,
                        colliders: {}
                    }
                }
            })
        }

        return layersObj;
    }

    createDoors(){
        if (!this.layers) return console.error("NO LAYERS TO CREATE DOORS FROM");

        let doorsObj = {};
        Object.values(this.layers).forEach(layer => {
            if (layer.name.includes("Door")) {
                this[layer.name] = layer;
                this[layer.name].lockName = layer.name.replace("Door","") + "Locked";
                doorsObj[layer.name] = this[layer.name];
            }
        })
        return doorsObj;
    }

    setPlatformCollisions(){
        Object.values(this.layers).forEach(layer => {
            if (layer.name == "platforms"){
                layer.layerData.data.forEach(array => {
                    array.forEach(tile => {
                        if (tile.index != -1) tile.setCollision(false, false, true, false);
                    })
                })
            }
        })
    }

    turnOffPlatformCollisions(time = 150){
        if (this.layers && this.layers.platforms && this.layers.platforms.colliders.player){
            this.layers.platforms.colliders.player.active = false;
            this.time.delayedCall(time, () => {this.layers.platforms.colliders.player.active = true});
        }
    }

    setDoors(){
        if (!this.doors) return console.error("NO DOORS DEFINED!");

        Object.values(this.doors).forEach(door => {
            door.tilemapLayer.alpha = this[door.lockName] ? 1 : 0;
            Object.values(door.colliders).forEach(collider => {
                if (!collider.static) collider.active = this[door.lockedName];
            })
        })
    }

    createPlayerColliders(){
        Object.values(this.layers).forEach(layer => {
            layer.colliders.player = this.physics.add.collider(this.player, layer.tilemapLayer);
        })
    }

    createPlayerSpawns(){
        let ps = {};

        let playerSpawnsObjectLayer = this.map.getObjectLayer("playerSpawns");

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

    checkPlayerExit(){
        if (!this.player) return console.error("NO PLAYER DEFINED!");

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
}