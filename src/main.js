import LevelTemplate from './scenes/LevelTemplate.js';
import Menu from './scenes/Menu.js';

let config = {
    width: 640,
    height: 640,
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
game.mapDimensions = new Phaser.Math.Vector2(2,2);

game.map = [];

for (let i = 0; i < game.mapDimensions.x; i++){
    game.map.push([]);
    for (let j = 0; j < game.mapDimensions.y; j++){
        game.map[i].push(null);
    }
}

window.game = game;

console.log(game);

export default game;