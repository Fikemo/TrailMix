import BaseSceneTiled from "../BaseSceneTiled.js"

export default class CandyUpRightLeftEasy extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;
        this.right = true;
        // this.down = false;
        this.left = true;

        this.musicKey = "candy";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "candyUpRightLeftJSON",
            // backgroundImage: <background image key>
            backgroundColor: 0x243f72,
            player: true,
        })
    }
}