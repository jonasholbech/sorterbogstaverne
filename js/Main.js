"use strict";
var Main={
    stage:null,
    loader:null,
    letters:[],
    blueBox:null,
    redBox:null,
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
        Controls.initialize();

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
    //nok ikke aktiv
    move:function(x,y){
        this.activeLetter.x=x;
        this.activeLetter.y=y;
    },
    drop:function(e){
        console.log("drop");
        if(e.stageY>this.stage.canvas.height-200){
            if(e.stageX<200){
                //red drop
                if(e.currentTarget.letterType=='v'){
                    var tempLetter=this.letters.pop();
                    tempLetter.origX=e.currentTarget.origX;
                    tempLetter.origY=e.currentTarget.origY;

                    createjs.Tween.get(tempLetter).to({x:tempLetter.origX, y:tempLetter.origY, rotation:0}, 1000)

                    this.stage.removeChild(e.currentTarget)
                } else {
                    createjs.Tween.get(e.currentTarget).to({x:e.currentTarget.origX, y:e.currentTarget.origY, rotation:0}, 1000)

                }
            } else if(e.stageX>Main.stage.canvas.width-200){
                //blue drop
                if(e.currentTarget.letterType=='k'){
                    var tempLetter=this.letters.pop();
                    tempLetter.origX=e.currentTarget.origX;
                    tempLetter.origY=e.currentTarget.origY;

                    createjs.Tween.get(tempLetter).to({x:tempLetter.origX, y:tempLetter.origY, rotation:0}, 1000)

                    this.stage.removeChild(e.currentTarget)
                } else {
                    createjs.Tween.get(e.currentTarget).to({x:e.currentTarget.origX, y:e.currentTarget.origY, rotation:0}, 1000)
                }

            }

        } else {
            createjs.Tween.get(e.currentTarget).to({x:e.currentTarget.origX, y:e.currentTarget.origY, rotation:0}, 1000)
        }
    }


};
Main.init();