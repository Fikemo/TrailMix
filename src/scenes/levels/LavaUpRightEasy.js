import BaseSceneTiled from "../BaseSceneTiled.js"
 
export default class LavaUpRightEasy extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);
 
        this.up = true;
        this.right = true;
 
        this.musicKey = "lava";
 
        this.setIcon();
    }
 
    create(data){
        super.create();
 
        this.createStandardLevel({
            mapJSON: "lavaUpRightEasyJSON",
            // backgroundImage: <background image key>
            backgroundColor:  0xf0e17,
            player: true,
        })
    }
}
