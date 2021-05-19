import GameManager from './scenes/GameManager.js';
import Menu from './scenes/Menu.js';
import Tutorial from './scenes/Tutorial.js';
import Load from './scenes/Load.js';
import BasicUpRightDownLeft from './scenes/BasicUpRightDownLeft.js';

let config = {
    width: 1024,
    height: 1024,
    scene: [Load, Menu, Tutorial, GameManager],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1500,
            },
            // debug: true,
        }
    },
    //antiAlias: false,
    pixelArt: true,
    zoom: 0.75,
}

/**@type {Phaser.Game} */
let game = new Phaser.Game(config);

game.mapDimensions = new Phaser.Math.Vector2(23,6);
game.map = [];
game.allSceneTypes = [BasicUpRightDownLeft]
game.startingSceneType = BasicUpRightDownLeft;

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