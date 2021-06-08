/***************************************** */
// Team Members:
// Finn Morrison
// Marla De Leon
// Aubrey Schelbauer
// Emersen Lorenz
/***************************************** */

import Preload from "./scenes/Preload.js";
import Load from './scenes/Load.js';
import Credits from './scenes/Credits.js';
import End from './scenes/End.js';
import Menu from './scenes/Menu.js';
import GameManager from './scenes/GameManager.js';
import Opening from './scenes/Opening.js';

let config = {
    type: Phaser.AUTO,
    parent: "phaser-game",
    width: 768,
    height: 768,
    scene: [Preload, Load, Credits, Menu, GameManager, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1500,
            },
            // debug: true,
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    roundPixels: true,
    antialias: false,
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