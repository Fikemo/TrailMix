import LevelTemplate from "./LevelTemplate.js";

export default class Menu extends Phaser.Scene {
    constructor(){
        super('menuScene');
    }

    create(){

        this.cursors = this.input.keyboard.createCursorKeys();

        for (let i = 0; i < this.game.mapDimensions.x; i++){
            for(let j = 0; j < this.game.mapDimensions.y; j++){
                let sceneToAdd = new LevelTemplate(`level_${i}_${j}`, new Phaser.Math.Vector2(i, j));
                this.game.scene.add(`level_${i}_${j}`, sceneToAdd);
                this.game.map[i][j] = sceneToAdd;
                // console.log(this.scene.get(`level_${i}_${j}`));
                // console.log(this.scene.get(this.game.map[i][j].scene.key));
            }
        }
        console.warn("Use Arrow Keys To Change Scene");
        console.table(this.game.map);
        this.scene.start('level_0_0');
    }

    update(time, delta){
        
    }
}