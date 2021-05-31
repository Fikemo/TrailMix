import BaseSceneTiled from "../BaseSceneTiled.js";
import Player from "../../prefabs/Player.js";

export default class Test extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        // this.up
        this.right = true;
        // this.down
        this.left = true;

        this.setIcon();
    }

    create(data){
        console.log(this);
        super.create();

        this.createStandardLevel({
            mapJSON: "testJSON",
            backgroundColor: 0xf0e17,
            player: true,
        })
    }

    update(time, delta){
        super.update(time, delta);
        this.setDoors();
    }
}