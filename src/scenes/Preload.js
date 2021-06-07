export default class Preload extends Phaser.Scene {
    constructor(){
        super("preLoadScene");
    }

    preload(){
        this.load.path = "./assets/images/";
        this.load.image("logo", "grouplogo.png");

        // fonts
        this.load.bitmapFont("upheaval", "upheaval_0.png", "upheaval.xml");
    }

    create(){
        this.scene.start("loadScene");
    }
}