import GameManager from './scenes/GameManager.js';
import Menu from './scenes/Menu.js';
import Tutorial from './scenes/Tutorial.js';
import Load from './scenes/Load.js';
import Credits from './scenes/Credits.js';
import End from './scenes/End.js';
//import TestRight from './scenes/TestRight.js';
//import TestDownLeft from './scenes/TestDownLeft.js';
//import TestUpDown from './scenes/TestUpDown.js';
//import LevelTemplate from './scenes/LevelTemplate.js';
// import fonts from "../assets/images/webfontkit-20210512-142138/stylesheet.css";

let config = {
    width: 768,
    height: 768,
    scene: [Load, Credits, Menu, Tutorial, GameManager, End],
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