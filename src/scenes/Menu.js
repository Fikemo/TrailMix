export default class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){

    }

    create(){

        this.scene.start("gameManagerScene");
    }

    update(time, delta){
        
    }
}