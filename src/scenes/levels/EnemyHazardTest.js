import BaseSceneTiled from "../BaseSceneTiled.js";
import Player from "../../prefabs/Player.js";
import Saw from "../../prefabs/Saw.js";

export default class EnemyHazardTest extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);
        this.left = true;
        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({mapJSON: "enemyHazardTestJSON"});

        console.log(this);
    }
}