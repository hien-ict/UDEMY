var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
    preload: function () {
        this.load.image('background', 'Images/background.png');
        this.load.image('chicken', 'Images/chicken.png');
        this.load.image('horse', 'Images/horse.png');
        this.load.image('pig', 'Images/pig.png');
        this.load.image('sheep', 'Images/sheep.png');
        this.load.image('arrow', 'Images/arrow.png');
    },
    create: function () {
        //scale display
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.background = this.game.add.sprite(0, 0, 'background');
        
        //group for animals
        var animalData = [
            {key: 'chicken', text: 'CHICKEN'},
            {key: 'horse', text: 'HORSE'},
            {key: 'pig', text: 'PIG'},
            {key: 'sheep', text: 'SHEEP'}
        ]
        this.animals = this.game.add.group();
        
        var self = this, animal;
        animalData.forEach(function(element){
            animal = self.animals.create(-1000, self.game.world.centerY,element.key);
            
            animal.customParams = {text: element.text};
            animal.anchor.setTo(0.5);
            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self)
        });
        
        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX,this.game.world.centerY);
        
        //left arrow
        this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.setTo(-1);
        this.leftArrow.customParams = {direction: -1};

        //left arrow allow user input
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);


        //right arrow
        this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.customParams = {direction: 1};

        //right arrow allow user input
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
    },
    update: function () {

    },
    switchAnimal: function (sprite, event) {
        console.log('Move animal');
        
        var newAnimal, endX;
        
        //1. get the direction of arrow
        if (sprite.customParams.direction > 0){
            newAnimal = this.animals.next();//2. get then next animal
            endX = 640 + this.currentAnimal.width/2;//3. get the final destination of current animal
        }
        else{
            newAnimal = this.animals.previous();
            endX = -this.currentAnimal.width/2;
        }
        this.currentAnimal.x= endX;//4. move current animal to final destination
        newAnimal.x = this.game.world.centerX;
        this.currentAnimal = newAnimal;//5. set the next animal as the new current animal
        
        
    },
    animateAnimal: function(sprite, event){
        console.log('Animal ...');
    }

};

game.state.add('GameState', GameState);
game.state.start('GameState');
