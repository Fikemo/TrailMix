import BaseSceneTiled from "../BaseSceneTiled.js"

export default class CandyRightDownLeftHard extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.right = true;
        this.down = true;
        this.left = true;

        this.musicKey = "candy";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "candyRightDownLeftHardJSON",
            backgroundColor: 0x243f72,
            player: true,
        })
    }
}