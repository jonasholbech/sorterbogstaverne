var Controls ={

    _enabled:false,
    startTouchY:null,
    startTouchX:null,
    endTouchX:null,
    endTouchY:null,
    initialize:function(){
        document.addEventListener('touchstart', Controls.tStart, true);
        document.addEventListener('touchmove', Controls.tMove, true);
        document.addEventListener('touchend', Controls.tEnd, true);
    },
    enable:function(){
        Controls._enabled=true;
    },
    disable:function(){
        Controls._enabled=false;
    },
    tStart:function(e){
        var touch = e.touches[0];
        Controls.startTouchX=touch.pageX;
        Controls.startTouchY=touch.pageY;
    },
    tMove:function(e){
        e.preventDefault();
        var touch = e.touches[0];
        Controls.endTouchX=touch.pageX;
        Controls.endTouchY=touch.pageY;
        Main.move(Controls.endTouchX, Controls.endTouchY);
    },
    tEnd:function(e){
        /*var dx = Controls.endTouchX - Controls.startTouchX,
            dy = Controls.endTouchY - Controls.startTouchY;
        if(Math.abs(dx) > Math.abs(dy)){
            //horizontal
        }*/
        Main.drop(Controls.endTouchX, Controls.endTouchY)
    }
}