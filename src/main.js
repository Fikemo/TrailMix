import Menu from './scenes/Menu.js';

let config = {
    width: 960,
    height: 480,
    scene: [Menu],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1500,
            },
            debug: true,
        }
    }
}

let game = new Phaser.Game(config);

export default game;