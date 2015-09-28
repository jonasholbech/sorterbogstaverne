"use strict";
var Main={
    stage:null,
    loader:null,
    debugText:null,
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
        this.debugText=new createjs.Text('TEXT', '20px Verdana', '#000');
        var x = new Letter("A");
        x.on("click", Main.clicked, this);
        this.stage.addChild(x)
        x.x=100;
        x.y=100;
    },
    clicked:function(e){
        var l = e.currentTarget;
        Controls.enable();

    },
    move:function(x,y){
        console.log(x,y)
        this.debugText.text=x+ " "+y;
    }


};
Main.init();