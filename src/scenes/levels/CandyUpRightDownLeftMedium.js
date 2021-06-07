import BaseSceneTiled from "../BaseSceneTiled.js";

export default class CandyUpRightDownLeftMedium extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;
        this.right = true;
        this.down = true;
        this.left = true;

        this.musicKey = "candy";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "candyUpRightDownLeftJSON",
            backgroundColor: "#131e28",
            player: true,
        })
        
    }

}