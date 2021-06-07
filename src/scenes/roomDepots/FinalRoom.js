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

        this.gameOver = false;

        this.createStandardLevel({
            mapJSON: "FinalRoomJSON",
            // backgroundImage: <background image key>
            player: true,
        });

        this.goldenOnion = this.physics.add.sprite(this.scale.width/2, 128, "goldenOnion").setOrigin(0.5, 0);
        this.goldenOnion.body.setAllowGravity(false).setImmovable(true);

        this.physics.add.overlap(this.player, this.goldenOnion, (player, goldenOnion) => {
            if (!this.gameOver){

                this.gameOverText = this.add.bitmapText(this.scale.width/2, 300, "upheaval", "CONGLATURATIONS\nA WINNER IS YOU!", -60, 1).setOrigin(0.5, 0);

                this.restartButton = this.add.image(this.scale.width/2, 480, "restartButton").setInteractive();

                this.restartButton.on("pointerdown", () => {
                    location.reload();
                })
                this.gameOver = true;
            }
        })
    }
}