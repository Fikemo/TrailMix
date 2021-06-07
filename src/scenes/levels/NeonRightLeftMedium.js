import BaseSceneTiled from "../BaseSceneTiled.js"
 
export default class NeonLeftRightMedium extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);
 
        this.right = true;
        this.left = true;
 
        this.musicKey = "neon";
 
        this.setIcon();
    }
 
    create(data){
        super.create();
 
        this.createStandardLevel({
            mapJSON: "neonRightLeftMediumJSON",
            // backgroundImage: <background image key>
            backgroundColor: 0xf0e17,
            player: true,
        })
    }
}
