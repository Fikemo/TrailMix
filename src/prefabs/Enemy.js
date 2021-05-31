export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor( hp, damage, scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        this.hp = hp;
        this.damage = damage;
    }
}