import GameManager from './scenes/GameManager.js';
import Menu from './scenes/Menu.js';
import Tutorial from './scenes/Tutorial.js';
import Load from './scenes/Load.js';

let config = {
    width: 768,
    height: 768,
    scene: [Load, Menu, GameManager],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1500,
            },
            debug: true,
        }
    },
    //antiAlias: false,
    pixelArt: true,
    // zoom: 0.75,
    roundPixels: true,
}

/**@type {Phaser.Game} */
let game = new Phaser.Game(config);
game.upscale = 2;
game.roomHeight = 288 * game.upscale;
game.tileSize = 16 * game.upscale;

// add the game to the window
// this will make the game instance available in the console in the inspector
// so you can type things like 'game'
window.game = game;

export default game;