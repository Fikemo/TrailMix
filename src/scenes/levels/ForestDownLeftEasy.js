import BaseSceneTiled from "../BaseSceneTiled.js"
 
export default class ForestDownLeftEasy extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);
 
        this.down = true;
        this.left = true;
 
        this.musicKey = "forest";
 
        this.setIcon();
    }
 
    create(data){
        super.create();
 
        this.createStandardLevel({
            mapJSON: "forestDownLeftEasyJSON",
            // backgroundImage: <background image key>
            backgroundColor: "#D0F0C0",
            player: true,
        })
    }
}
