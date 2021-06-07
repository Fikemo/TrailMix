import BaseSceneTiled from "../BaseSceneTiled.js"

export default class SkyRightLeftEasy extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        // this.up = true;
        this.right = true;
        // this.down = true;
        this.left = true;

        this.musicKey = "sky";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "skyRightLeftJSON",
            // backgroundImage: <background image key>
            backgroundColor: 0xa7f2fd,
            player: true,
        })
    }
}