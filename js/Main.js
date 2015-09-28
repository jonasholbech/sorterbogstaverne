"use strict";
var Main={
    stage:null,
    loader:null,
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

    }

};
Main.init();