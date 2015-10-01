"use strict";
var Main={
    stage:null,
    loader:null,
    letters:[],
    blueBox:null,
    redBox:null,
    score:0,
    wrongAnswers:0,
    init:function(){
        console.log("Main initialized");
        this.stage = new createjs.Stage("canvas");
        createjs.Touch.enable(this.stage);
        this.height=this.stage.canvas.height;
        this.width=this.stage.canvas.width;
        Preloader.init();

    },
    setup:function(){
        Preloader.cleanup();

        createjs.Ticker.setFPS(30);
        createjs.Ticker.on('tick', Tick.tock);

        this.redBox=new createjs.Shape();
        this.redBox.graphics.beginFill('#F00').drawRect(0,0, 200, 200);
        this.stage.addChild(this.redBox);
        this.redBox.y=this.stage.canvas.height-200;

        this.blueBox=new createjs.Shape();
        this.blueBox.graphics.beginFill('#00F').drawRect(0,0, 200, 200);
        this.stage.addChild(this.blueBox);
        this.blueBox.y=this.stage.canvas.height-200;
        this.blueBox.x=this.stage.canvas.width-200;

        var letters = [];
        var temp;
        for(var i = 65; i<91; i++){
            letters.push(String.fromCharCode(i))
        }
        letters.push('Æ');
        letters.push('Ø');
        letters.push('Å');


        console.log(letters)
        for(i=0; i<letters.length; i++){
            temp = new Letter(letters[i]);
            temp.on("pressmove", Main.letterDragged, this);
            temp.on("pressup", Main.drop, this)
            this.stage.addChild(temp)

            this.letters.push(temp);
            temp.y = -200;
            temp.rotation=Utils.getRandomInt(1,359);
            temp.letterType='k';
        }
        this.letters[0].letterType='v';
        this.letters[4].letterType='v';
        this.letters[8].letterType='v';
        this.letters[14].letterType='v';
        this.letters[20].letterType='v';
        this.letters[24].letterType='v';
        this.letters[26].letterType='v';
        this.letters[27].letterType='v';
        this.letters[28].letterType='v';

        this.letters = Utils.shuffleArray(this.letters)
        var tempLetter;
        for(i=0; i<3; i++){
            tempLetter=this.letters.pop();
            tempLetter.origX=300+i*200;
            tempLetter.origY=300;
            createjs.Tween.get(tempLetter).wait(1000*i).to({x:300+i*200, y:300, rotation:0}, 1000)
        }

    },
    letterDragged:function(e){
        e.currentTarget.x= e.stageX;
        e.currentTarget.y= e.stageY;

    },

    correct:function(e){
        this.score++;
        if(this.letters.length>0){
            var tempLetter=this.letters.pop();
            tempLetter.origX=e.currentTarget.origX;
            tempLetter.origY=e.currentTarget.origY;

            createjs.Tween.get(tempLetter).to({x:tempLetter.origX, y:tempLetter.origY, rotation:0}, 1000)
        }
        this.stage.removeChild(e.currentTarget)
        if(this.score>28){
            this.victory();
        }
    },
    victory:function(){
        this.stage.removeAllChildren();
        var data = {
            images: ["star_sprite.png"],
            frames: {
                width: 100,
                height: 100,
                regX: 50,
                regY: 50
            },
            animations: {
                gold: [0],
                gray:[1]
            }
        }
        var spriteSheet = new createjs.SpriteSheet(data);
        var goldStars=28-this.wrongAnswers;
        var grayStars=this.wrongAnswers;
        if(grayStars>28){
            grayStars=28;
        }
        var t, c=0;
        var xPos=100;
        var yPos=60;
        for(var i =0; i<goldStars; i++){
            t = new createjs.Sprite(spriteSheet, 'gold');
            this.stage.addChild(t);
            t.y=-180;
            t.x=this.stage.canvas.width/2;
            t.rotation=Utils.getRandomInt(300, 900);
            createjs.Tween.get(t).wait(c*300).to({x:xPos, y:yPos, rotation:0},1000)
            xPos+=150;

            c++;
            if(c%6==0){
                yPos+=130;
                xPos=100;
            }
        }
        for(i=0; i<grayStars; i++){
            t = new createjs.Sprite(spriteSheet, 'gray');
            this.stage.addChild(t);
            t.y=-180;
            t.x=this.stage.canvas.width/2;
            t.rotation=Utils.getRandomInt(300, 900);
            createjs.Tween.get(t).wait(c*300).to({x:xPos, y:yPos, rotation:0},1000)
            xPos+=150;
            c++;
            if(c%5==0){
                yPos+=160;
                xPos=100;
            }
        }
    },
    putBack:function(e){
        createjs.Tween.get(e.currentTarget).to({x:e.currentTarget.origX, y:e.currentTarget.origY, rotation:0}, 1000)
    },
    wrong:function(e){
        this.wrongAnswers++;
        this.putBack(e);
    },
    drop:function(e){
        var handled=false;
        if(e.stageY>this.stage.canvas.height-200){
            if(e.stageX<200){//red drop
                handled=true;
                if(e.currentTarget.letterType=='v') {
                    this.correct(e);
                } else {
                    this.wrong(e);
                }
            }

            if(e.stageX>Main.stage.canvas.width-200){//blue drop
                handled=true;
                if(e.currentTarget.letterType=='k'){
                    this.correct(e);
                } else {
                    this.wrong(e);
                }
            }
        }
        if(!handled){
            this.putBack(e);
        }


    }


};
Main.init();