import BaseSceneTiled from "../BaseSceneTiled.js"

export default class FinalRoom extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        // this.up = true;
        // this.right = true;
        this.down = true;
        // this.left = true;

        this.musicKey = "basic";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "FinalRoomJSON",
            // backgroundImage: <background image key>
            backgroundColor: 0x000000,
            player: true,
        })
    }
}