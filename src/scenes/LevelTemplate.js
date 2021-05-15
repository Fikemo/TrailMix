//import LevelTemplate2 from './scenes/level_0_0.js'
//import game from "../main.js";
import Player from "../prefabs/Player.js";

export default class LevelTemplate extends Phaser.Scene{
    /**@type {boolean} First false and then set to true when scene is entered for the first time*/
    firstInitialized = false;

    /**@type {string} A string of a random hex value used to set the background color*/
    backgroundColor;

    /**@type {Phaser.Math.Vector2} The coordinate of the scene on the map*/
    coordinate;
    
    constructor(name, coordinate){
        super(name);
        this.coordinate = coordinate;
    }

    preload() {
        
        // set load path
        //this.load.path = './assets/';

        this.load.image('blushie','./assets/blooshie.png');
        //this.load.image('bloosh','./assets/bloosh.png');
        //this.load.spritesheet('bloosh', 'assets/moving_blush.png', { frameWidth: 224, frameHeight: 32, endFrame: 7 });
        
    }

    create(){
        // anything in here will only be called when the scene is first entered
        if (!this.firstInitialized){

             //temporary floor
            //this.add.rectangle(0, 550, 700, 100, 0xFFF555).setOrigin(0,0);
            //temporary player
            //this.add.image(32,500,'blushie').setOrigin(0,0);

            // get a random
            this.cursors = this.input.keyboard.createCursorKeys();
            this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            this.moveSpeed = 400;
            this.backgroundColor = this.getRandomHexColor();
            this.PLAYER_SPAWN_POS = new Phaser.Math.Vector2(60, 120);
           
            this.player = new Player(this, this.PLAYER_SPAWN_POS.x, this.PLAYER_SPAWN_POS.y, 'blushie');
            this.physics.add.collider(this.player, this.groundHitbox);
            
            this.groundHitbox = this.physics.add.sprite(0,0);
            this.groundHitbox.body.setImmovable(true);
            this.groundHitbox.body.setAllowGravity(false);
            this.groundHitbox.body.setSize(600, 100, false);
            this.groundHitbox.setOrigin(0,-15);
            //this.physics.add.collider(this.player, this.groundHitbox);
            this.player.setCollideWorldBounds(true);
            this.physics.add.collider(this.player, this.groundHitbox);
    
        //this.groundTiles = this.add.sprite(600, 600, this.scale.width, 32).setOrigin(0);
            this.firstInitialized = true;
        }

      /*  this.anims.create({ 
            key: 'move', 
            frames: this.anims.generateFrameNumbers('bloosh', {      
                start: 0,
                end: 7,
               
            }), 
            frameRate: 15,
            repeat: -1 
        });
 */
        // set the background color to the randomly generated hex value
        this.cameras.main.setBackgroundColor(this.backgroundColor);
        this.cameras.main.setSize(this.scale.width, 480);

        // get the cursor buttons ready
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update(){

        //player movement
        if (this.cursors) {
            if (Phaser.Input.Keyboard.JustDown(this.keyA)){
                //this.player.setVelocityX -= this.moveSpeed;
                this.player.setVelocityX(-this.moveSpeed);
                console.log('left');
                //this.player.anims.play('move');
                this.player.setFlip(true, false);
            }
                else if (Phaser.Input.Keyboard.JustDown(this.keyD)){
                this.player.setVelocityX(this.moveSpeed);
                //this.player.setVelocityX += this.moveSpeed;
                this.player.setFlip();
                //this.player.anims.play('move');
                console.log('right');
                }
            else if (Phaser.Input.Keyboard.JustUp(this.keyA)){
                this.player.setVelocityX(0);
            }
            else if (Phaser.Input.Keyboard.JustUp(this.keyD)){
                this.player.setVelocityX(0);
            }
            else if (Phaser.Input.Keyboard.JustDown(this.keySpace)){
                this.player.setVelocityY(this.moveSpeed);
                console.log('jump');
            }
            else if (Phaser.Input.Keyboard.JustUp(this.keySpace)){
                this.player.setVelocityY(-this.moveSpeed);
            }
        }
        
        // switch to the scene that is above, below, to the right, or to the left of the current scene
        // with the arrow keys
        if (this.cursors){
            if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
                // console.log(this.coordinate);
                
                if (this.coordinate && this.coordinate.y > 0){
                    this.scene.start(`level_${this.coordinate.x}_${this.coordinate.y - 1}`)
                    console.log('(0,-1)');
                    
                    // this uses the game map array to load the next scene. This is prefferable
                    this.scene.start(this.game.map[this.coordinate.x][this.coordinate.y - 1].scene.key);
                }
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)){
                // console.log(this.coordinate);
                if (this.coordinate && this.coordinate.y < this.game.mapDimensions.y - 1){
                    //this.scene.start(`level_${this.coordinate.x}_${this.coordinate.y + 1}`);
                    //console.log('(0,1)');
                    // alternatively this uses the appropriate scene name to load the next scene.
                    // This is unprefferable because there may be a change or a mistake that makes it so the scene name doesn't match up with where it is on the map
                    this.scene.start(`level_${this.coordinate.x}_${this.coordinate.y + 1}`)
                }
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)){
                // console.log(this.coordinate);
                if (this.coordinate && this.coordinate.x < this.game.mapDimensions.x - 1){
                    //this.scene.start(`level_${this.coordinate.x + 1}_${this.coordinate.y}`);
                    //console.log('(1,1)');
                    this.scene.start(this.game.map[this.coordinate.x + 1][this.coordinate.y].scene.key);
                }
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)){
                // console.log(this.coordinate);
                if (this.coordinate && this.coordinate.x > 0){
                    //this.scene.start(`level_${this.coordinate.x - 1}_${this.coordinate.y}`);
                    //console.log('(-1,0)');
                    this.scene.start(this.game.map[this.coordinate.x - 1][this.coordinate.y].scene.key);
                }
            }

       
            
            /*else
                    this.player.body.velocity.x = 0;
                    //this.player.anims.play('idle');
                    console.log('stopped');
             }*/
        }

        }
    

   
   
    /**Get a string of a random hex value*/
    getRandomHexColor() {
        let letters = '0123456789ABCDEF';
        let hexColor = '#';
        for(let i = 0; i < 6; i++) {
            hexColor += letters[Math.floor(Math.random() * 16)];
        }
        return hexColor;
    }
}