import BaseScene from "./BaseScene.js";
import Player from "../prefabs/Player.js";
import PlatformCollider from "../prefabs/PlatformCollider.js";

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
        this.map = this.createMap(config.mapJSON);
        this.tileset = this.createTileset();
        this.layers = this.createLayers();
        this.setPlatformCollisions();
        this.setDoors();

    }

    createMap(mapJSON){
        if (!mapJSON){
            console.error("NO MAP JSON SPECIFIED!");
            return;
        }

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
            if (!this.map){
                console.error("NO MAP DEFINED");
                return;
            }
            map = this.map;
        }
        if (!tilesetName) tilesetName = map.tilesets[0].name;
        if (!tilesetImage) tilesetImage = tilesetName;

        return map.addTilesetImage(tilesetName, tilesetImage);
    }

    createLayers(map, tileset, ...layers){
        if (!map){
            if (!this.map){
                console.error("NO MAP DEFINED");
                return;
            }
            map = this.map;
        }
        if (!tileset) tileset = this.tileset;

        let layersArray = [];
        if (layers.length != 0){
            layers.forEach(layer => {
                this[layer] = map.createLayer(layer, tileset);
                this[layer].setCollisionByProperty({collides: true});
                layersArray.push(this[layer]);
            })
        } else {
            map.layers.forEach(layer => {
                console.log(layer);
                this[layer.name] = map.createLayer(layer.name, tileset);
                this[layer.name].setCollisionByProperty({collides: true});
                layersArray.push(this[layer.name]);
            })
        }

        return layersArray;
    }

    createPlayerColliders(map){
        if (!map){
            if (!this.map){
                console.error("NO MAP DEFINED");
                return;
            }
            map = this.map;
        }
        if (!this.player) {
            console.error("NO PLAYER DEFINED");
            return;
        }

        this.layers.forEach(layer => {
            // console.log(layer);
            this[layer.layer.name + "Collider"] = this.physics.add.collider(this.player, layer);
        })
    }

    setPlatformCollisions(){
        // console.log(this.blocks);
        console.log(this.platforms);
        this.platforms.layer.data.forEach(tileArray => {
            tileArray.forEach(tile => {
                if (tile.index != -1){
                    tile.setCollision(false, false, true, false);
                }
            })
        })
    }

    setDoors(){
        this.layers.forEach(layer => {
            switch(layer.layer.name){
                case "upDoor":
                    if (!this.upLocked){
                        this.upDoor.alpha = 0;
                        this.upDoorCollider.active = false;
                    }
                break;
            }
        })
    }

    // createLayers(map, tileSet, layerNames, collision = false, x = 0, y = 0){
    //     if (Array.isArray(layerNames)){
    //         let layers = {};
    //         layerNames.forEach(layerName => {
    //             layers[layerName] = map.createLayer(layerName, tileSet, x, y);
    //             if (collision) layers[layerName].setCollisionByProperty({collides: true});
    //         })
    //         return layers;
    //     } else {
    //         let layer = map.createLayer(layerNames, tileSet, x, y);
    //         if (collision) layer.setCollisionByProperty({collides: true});
    //         return layer;
    //     }
    // }
}