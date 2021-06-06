import BaseSceneTiled from "../BaseSceneTiled.js";

export default class ForestUpDown extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;
        this.down = true;

        this.musicKey = "forest";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "forestUpDownJSON",
            backgroundColor: "#D0F0C0",
            player: true,
        })
        
    }

}