import BaseScene from "./BaseScene.js";

export default class TestUpDown extends BaseScene{
    constructor(key, gameManager){
        super(key, gameManager);
        this.up = true;
        this.down = true;
        
        this.setIcon();
    }

    create(){
        console.log(this);
    }
}