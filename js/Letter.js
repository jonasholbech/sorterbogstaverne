(function(){
    function Letter(text, defaults){
        defaults = defaults || {};
        var color = defaults.color || "#000";
        var font = defaults.font || "Comic Sans";
        var size = defaults.size || "40px";
        var x = defaults.x || 30;
        var y = defaults.x || 30;
        var textAlign = defaults.textAlign || "center";
        var textBaseline = defaults.textBaseline || "middle";
        var c = new createjs.Container();
        var s = new createjs.Shape();
        s.graphics.beginFill('#FFF').drawRect(0,0, 60, 60);
        c.addChild(s);
        var my = new createjs.Text(text, size+" "+font, color);
        c.addChild(my);
        my.x=x;
        my.y=y;
        my.textAlign=textAlign;
        my.textBaseline=textBaseline;
        return c;
    }
    window.Letter = Letter;
}());