import BaseSceneTiled from "./BaseSceneTiled.js";
import Player from"../prefabs/Player.js";

export default class WaterDownLeft extends BaseSceneTiled{
    constructor (key,gameManager){
        super(key, gameManager);

        this.left = true;
        this.down = true;

        this.musicKey = "water";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "waterDownLeftJSON",
            backgroundColor: 0xf0e17,
            player: true,
        })

        
    }

}