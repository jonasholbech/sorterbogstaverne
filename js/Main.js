"use strict";
var Main={
    stage:null,
    loader:null,
    debugText:null,
    letters:[],
    activeLetter:null,
    blueBox:null,
    redBox:null,
    init:function(){
        console.log("Main initialized");
        this.stage = new createjs.Stage("canvas");
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

        this.debugText=new createjs.Text('TEXT', '20px Verdana', '#000');
        this.stage.addChild(this.debugText);
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
            temp.on("click", Main.clicked, this);
            this.stage.addChild(temp)

            this.letters.push(temp);
            temp.y = -200;
            temp.rotation=Utils.getRandomInt(1,359);
            temp.lettertype='k';
        }
        this.letters[0].letterType='v';
        this.letters[4].letterType='v';
        this.letters[8].letterType='v';
        this.letters[14].letterType='v';
        this.letters[20].letterType='v';
        this.letters[23].letterType='v';
        this.letters[26].letterType='v';
        this.letters[27].letterType='v';
        this.letters[28].letterType='v';

        this.letters = Utils.shuffleArray(this.letters)
        for(i=0; i<3; i++){
            createjs.Tween.get(this.letters.pop()).wait(1000*i).to({x:300+i*200, y:300, rotation:0}, 1000)
        }

    },
    clicked:function(e){
        this.activeLetter = e.currentTarget;
        this.activeLetter.orgiX=this.activeLetter.x;
        this.activeLetter.orgiY=this.activeLetter.y;
        Controls.enable();

    },
    move:function(x,y){
        this.debugText.text=x+ " "+y;
        this.activeLetter.x=x;
        this.activeLetter.y=y;
    },
    drop:function(x,y){
        if(y>Main.stage.canvas,height-200){
            if(x<200){
                //red drop
                if(this.activeLetter.letterType=='v'){
                    createjs.Tween.get(this.letters.pop()).wait(1000*i).to({x:this.activeLetter.origX, y:300, rotation:0}, 1000)
                    this.stage.removeChild(this.activeLetter)
                } else {
                    createjs.Tween.get(this.activeLetter).to({x:this.activeLetter.origX, y:300, rotation:0}, 1000)

                }
            } else if(x>Main.stage.canvas.width-200){
                //blue drop
                if(this.activeLetter.letterType=='k'){
                    createjs.Tween.get(this.letters.pop()).wait(1000*i).to({x:this.activeLetter.origX, y:300, rotation:0}, 1000)
                    this.stage.removeChild(this.activeLetter)
                } else {
                    createjs.Tween.get(this.activeLetter).to({x:this.activeLetter.origX, y:300, rotation:0}, 1000)
                }

            }

        }
    }


};
Main.init();