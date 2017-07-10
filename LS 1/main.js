var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
    preload: function () {
        this.load.image('background', 'Images/background.png');
        this.load.image('arrow', 'Images/arrow.png');
//        this.load.image('chicken', 'Images/chicken.png');
//        this.load.image('horse', 'Images/horse.png');
//        this.load.image('pig', 'Images/pig.png');
//        this.load.image('sheep', 'Images/sheep.png');
        this.load.spritesheet('chicken', 'Images/chicken_spritesheet.png', 131, 200, 3);
        this.load.spritesheet('horse', 'Images/horse_spritesheet.png', 212, 200, 3);
        this.load.spritesheet('pig', 'Images/pig_spritesheet.png', 297, 200, 3);
        this.load.spritesheet('sheep', 'Images/sheep_spritesheet.png', 244, 200, 3);
        
        this.load.audio('chickenSound',['Audio/chicken.ogg','Audio/chicken.mp3']);
        this.load.audio('horseSound',['Audio/horse.ogg','Audio/horse.mp3']);
        this.load.audio('pigSound',['Audio/pig.ogg','Audio/pig.mp3']);
        this.load.audio('sheepSound',['Audio/sheep.ogg','Audio/sheep.mp3']);
    },
    create: function () {
        //scale display
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.background = this.game.add.sprite(0, 0, 'background');
        
        //group for animals
        var animalData = [
            {key: 'chicken', text: 'CHICKEN', audio: 'chickenSound'},
            {key: 'horse', text: 'HORSE', audio: 'horseSound'},
            {key: 'pig', text: 'PIG', audio: 'pigSound'},
            {key: 'sheep', text: 'SHEEP', audio: 'sheepSound'}
        ]
        this.animals = this.game.add.group();
        
        var self = this, animal;
        animalData.forEach(function(element){
            animal = self.animals.create(-1000, self.game.world.centerY,element.key, 0);
            
            animal.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};
            animal.anchor.setTo(0.5);
            
            //create animal animation
            animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);
            
            
            //enable input so we can touch it
            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self)
        });
        
        //place first animal in middle
        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX,this.game.world.centerY);
        
        //show animal text
        this.showText(this.currentAnimal);
        
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
        
        if (this.isMoving){
            return false;
            
        }
        this.isMoving = true;
        
        //hide text
        this.animalText.visible =false;
        
        var newAnimal, endX;
        
        //1. get the direction of arrow
        if (sprite.customParams.direction > 0){
            newAnimal = this.animals.next();//2. get then next animal
            newAnimal.x = -newAnimal.width/2;
            endX = 640 + this.currentAnimal.width/2;//3. get the final destination of current animal
        }
        else{
            newAnimal = this.animals.previous();
            newAnimal.x = 640 + newAnimal.width/2;
            endX = -this.currentAnimal.width/2;
        }
        
        var newAnimalMovement = this.game.add.tween(newAnimal);
        newAnimalMovement.to({x:this.game.world.centerX}, 1000);
        newAnimalMovement.onComplete.add(function(){
            this.isMoving = false;
            this.showText(newAnimal);
        }, this)
        newAnimalMovement.start();
        
        var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({x: endX},1000);
        currentAnimalMovement.start();
        
        this.currentAnimal = newAnimal;//5. set the next animal as the new current animal
        
        
        
    },
    
    showText: function(animal){
        if (!this.animalText)  {
            var style = {
                font : 'bold 30pt Arial',
                fill: '#D0171B',
                align: 'center'
            };
            this.animalText = this.game.add.text(this.game.width/2, this.game.height*0.85,'',style);
            this.animalText.anchor.setTo(0.5);
        }
        this.animalText.setText(animal.customParams.text);
        this.animalText.visible = true;
    },
    animateAnimal: function(sprite, event){
        console.log('Animal ...');
        sprite.play('animate');
        sprite.customParams.sound.play();
    }

};

game.state.add('GameState', GameState);
game.state.start('GameState');
