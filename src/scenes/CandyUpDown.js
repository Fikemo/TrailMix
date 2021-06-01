import BaseSceneTiled from "./BaseSceneTiled.js";
import Player from "../prefabs/Player.js";
 
export default class CandyUpDown extends BaseSceneTiled{
    //candyUpDown
    constructor(key, gameManager){
        super(key, gameManager);
 
        this.up = true;
        //this.right = true;
        this.down = true;
        //this.left = true;
 
        this.setIcon();
    }
    create(data){
        super.create();
        this.createStandardLevel({mapJSON: "CandyUpDownJSON",
        backgroundColor: 0xf0e17,
        player: true,
    });
       
    }
}
