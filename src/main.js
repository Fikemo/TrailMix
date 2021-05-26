import GameManager from './scenes/GameManager.js';
import Menu from './scenes/Menu.js';
import Tutorial from './scenes/Tutorial.js';
import Load from './scenes/Load.js';
import Credits from './scenes/Credits.js';
import End from './scenes/End.js';
import TestRight from './scenes/TestRight.js';
import TestDownLeft from './scenes/TestDownLeft.js';
import TestUpDown from './scenes/TestUpDown.js';
import LevelTemplate from './scenes/LevelTemplate.js';
// import fonts from "../assets/images/webfontkit-20210512-142138/stylesheet.css";

let config = {
    width: 640,
    height: 640,
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
    antiAlias: false,
    pixelArt: true,
}

/**@type {Phaser.Game} */
let game = new Phaser.Game(config);

game.mapDimensions = new Phaser.Math.Vector2(10,5);
game.map = [];
game.allSceneTypes = [
    TestRight,
    TestDownLeft,
    TestUpDown,
]

// creat an empty 2d array with the dimensions of game.mapDimensions
for (let i = 0; i < game.mapDimensions.x; i++){
    game.map.push([]);
    for (let j = 0; j < game.mapDimensions.y; j++){
        game.map[i].push(null);
    }
}

// add the game to the window
// this will make the game instance available in the console in the inspector
// so you can type things like 'game' or 'console.table(game.map)' whenever you want
window.game = game;

export default game;