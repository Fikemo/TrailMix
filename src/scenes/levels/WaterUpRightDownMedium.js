import BaseSceneTiled from "../BaseSceneTiled.js"
 
export default class WaterUpRightDownMedium extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);
 
        this.up = true;
        this.down = true;
        this.right = true;
 
        this.musicKey = "water";
 
        this.setIcon();
    }
 
    create(data){
        super.create();
 
        this.createStandardLevel({
            mapJSON: "waterUpRightDownMediumJSON",
            // backgroundImage: <background image key>
            backgroundColor: "#131e28",
            player: true,
        })
    }
}
