"use strict";

var Preloader={
    queue:null,
    preloadText: new createjs.Text("LOADING...", "30px 'Comic Sans'", "#000"),
    init:function(){
        Preloader.queue = new createjs.LoadQueue();
        Preloader.queue.on('complete', Main.setup, Main);
        Preloader.queue.on('progress',Preloader.loadProgress);
        Preloader.queue.installPlugin(createjs.Sound);
        Preloader.queue.loadManifest([
            {src:"js/Utils.js"},
            {src:"js/Tick.js"},
            {src:"js/Letter.js"},
            {src:"stars.png"}
        ]);


        Preloader.preloadText.baseLine="middle";
        Preloader.preloadText.textAlign="center";
        Preloader.preloadText.x=Main.width / 2;
        Preloader.preloadText.y=Main.height / 2;
        Main.stage.addChild(Preloader.preloadText);

    },
    loadProgress:function(e){
        var percent = Math.round(e.progress*100);
        Preloader.preloadText.text="LOADING... "+percent+"%";
        Main.stage.update();
    },
    cleanup:function(){
        Main.stage.removeChild(Preloader.preloadText);
    }
};


