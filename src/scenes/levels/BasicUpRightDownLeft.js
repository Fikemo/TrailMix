import Player from "../../prefabs/Player.js";
import Blushie from "../../prefabs/Blushie.js";
import BaseSceneTiled from "../BaseSceneTiled.js";

export default class BasicUpRightDownLeft extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;
        this.right = true;
        this.down = true;
        this.left = true;

        this.musicKey = "basic";

        this.setIcon();
    }

    create(data){
        super.create();

        if (this.coordinate.x == 0 && this.coordinate.y == 0){
            this.add.text(90,150, "A, S, and D to move\n\nSpace to jump\n\nESC to open and close the Inventory Menu\n\nClick an icon in the Inventory Menu and then click on the map in the bottom right to place a room").setAlign('center').setColor("white").setWordWrapWidth(200).setFontSize(20).setFontStyle("bold");
        }

        this.createStandardLevel({
            mapJSON: "basicUpRightDownLeftJSON",
            player: true,
        });

        // this.blushie_1 = new Blushie(this, 50, 70, "blushie");
    }
}