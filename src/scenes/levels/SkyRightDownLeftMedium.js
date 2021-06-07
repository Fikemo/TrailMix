import BaseSceneTiled from "../BaseSceneTiled.js"
 
export default class SkyDownLeftRightMedium extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);
 
        this.down = true;
        this.right = true;
        this.left = true;
 
        this.musicKey = "sky";
 
        this.setIcon();
    }
 
    create(data){
        super.create();
 
        this.createStandardLevel({
            mapJSON: "skyDownLeftRightMediumJSON",
            // backgroundImage: <background image key>
            backgroundColor:  "#a7f2fd",
            player: true,
        })
    }
}
