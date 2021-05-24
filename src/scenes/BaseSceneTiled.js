import BaseScene from "./BaseScene.js";
import Player from "../prefabs/Player.js";
import PlatformCollider from "../prefabs/PlatformCollider.js";

export default class BaseSceneTiled extends BaseScene{
    constructor(key, gameManager, config){
        super(key, gameManager);

        this.up = config.up ? config.up : false;
        this.right = config.right ? config.right : false;
        this.down = config.down ? config.down : false;
        this.left = config.left ? config.left : false;

        this.setIcon();
    }

    init(data){
        this.data.lastScene = data;
    }

    create(data){
        super.create();
    }

    createLayers(map, tileSet, layerNames, collision = false, x = 0, y = 0){
        if (Array.isArray(layerNames)){
            let layers = {};
            layerNames.forEach(layerName => {
                layers[layerName] = map.createLayer(layerName, tileSet, x, y);
                if (collision) layers[layerName].setCollisionByProperty({collides: true});
            })
            return layers;
        } else {
            let layer = map.createLayer(layerNames, tileSet, x, y);
            if (collision) layer.setCollisionByProperty({collides: true});
            return layer;
        }
    }
}