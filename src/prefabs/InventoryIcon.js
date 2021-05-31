export default class InventoryIcon extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, coordX, coordY, onClick){
        super(scene, x, y, texture, frame);
        this.setOrigin(0);
        this.setInteractive();

        this.coordinate + new Phaser.Math.Vector2(x, y);

        this.on("pointerdown", (pointer, localX, localY, event) => {
            
        })
    }
}