var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
    preload: function () {
        this.load.image('background', 'Images/background.png');
        this.load.image('chicken', 'Images/chicken.png');
        this.load.image('horse', 'Images/horse.png');
        this.load.image('pig', 'Images/pig.png');
        this.load.image('sheep', 'Images/sheep.png');
    },
    create: function () {
        //scale display
        this.scale.scaleMode= Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally=true;
        this.scale.pageAlignVertically=true;
        
        this.background = this.game.add.sprite(0, 0, 'background');
        this.chicken =  this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        this.chicken.anchor.setTo(0.5);
        this.chicken.scale.setTo(-0.5,0.5);
        this.chicken.angle = 0;
    },
    update: function () {
        
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
