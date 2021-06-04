import BaseSceneTiled from "../BaseSceneTiled.js";

export default class WaterDownLeft extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.left = true;
        this.right = true;

        this.musicKey = "water";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "waterLeftRightJSON",
            backgroundColor: "#131e28",
            player: true,
        })
        
    }

}