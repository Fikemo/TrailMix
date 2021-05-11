export default class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        
        // set load path
        this.load.path = './assets/';

        this.load.image('blushie','blushie.png');
        
        this.scene.start('menuscene');
    }
}