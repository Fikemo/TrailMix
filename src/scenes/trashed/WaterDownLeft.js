import BaseSceneTiled from "../BaseSceneTiled.js";
<<<<<<< HEAD:src/scenes/levels/WaterDownLeft.js
=======
import Player from"../../prefabs/Player.js";
>>>>>>> main:src/scenes/trashed/WaterDownLeft.js

export default class WaterDownLeft extends BaseSceneTiled{
    constructor(key, gameManager){
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
            backgroundColor: "#131e28",
            player: true,
        })
        
    }

}