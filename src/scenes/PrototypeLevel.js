import LevelTemplate from "./LevelTemplate.js";

export default class PrototypeLevel extends LevelTemplate{
    constructor(name, coordinate){
        super(name, coordinate)
    }

    create(){
        super.create();

        this.add.text(0,0,this.scene.key).setOrigin(0);
    }

    update(){
        super.update();
    }
}