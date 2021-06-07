import BaseSceneTiled from "../BaseSceneTiled.js"

export default class FinalRoom extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        // this.up = true;
        // this.right = true;
        this.down = true;
        // this.left = true;

        this.musicKey = "basic";

        this.static = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "FinalRoomJSON",
            // backgroundImage: <background image key>
            player: true,
        })

        this.restartButton = this.add.image(this.scale.width/2, 480, "restartButton").setInteractive();

        this.restartButton.on("pointerdown", () => {
            location.reload();
        })
    }
}