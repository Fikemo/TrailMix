export default class Inventory extends Phaser.Scene{
    constructor(){
        super("inventoryScene");
    }

    create(){
        this.add.image(0,0,'inventoryBackground').setOrigin(0);
        this.scene.launch('level_0_0');

        this.mapPos = new Phaser.Math.Vector2(164,488);

        this.mapGroup = this.add.group();
        for (let i = 0; i < this.game.mapDimensions.y; i++){
            let nodeY = this.mapPos.y + (16 * i);
            for (let j = 0; j < this.game.mapDimensions.x; j++){
                let nodeX = this.mapPos.x + (16 * j);
                let emptyNode = this.add.sprite(nodeX, nodeY, 'emptyMapNode').setOrigin(0).setInteractive({useHandCursor: true});
                this.mapGroup.add(emptyNode)
            }
        }

        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            console.log(pointer);
            console.log(gameObject);
            console.log(event);
        })
    }

    update(time, delta){

    }
}