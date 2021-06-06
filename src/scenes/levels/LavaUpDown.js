import BaseSceneTiled from "../BaseSceneTiled.js";
 
export default class LavaUpDown extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);
 
        this.up = true;
        this.down = true;
 
        this.musicKey = "lava";

        this.setIcon();
    }

    create(data){
        super.create();
        
        this.createStandardLevel({
            mapJSON: "lavaUpDownJSON",
            backgroundColor: 0xf0e17,
            player: true,
        })
    }
}