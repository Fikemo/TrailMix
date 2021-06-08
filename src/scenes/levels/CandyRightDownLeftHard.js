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
            backgroundColor: "#B7F6F6",
            player: true,
        })
    }
}