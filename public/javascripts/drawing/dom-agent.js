DomAgent = DrawingAgent.extend({

    element: null,
    matrix: null,

    init: function(element) {
        this.element = element;
        this.matrix = new DomMatrix(element);
        this.listen();
        this.prepare();
    },

    //todo: denna passar nog bättre i DrawingAgent.
    listen: function() {
        var me = this;
        Events.register("CHARACTER_RESOLVED", this, this.draw);
        Events.register("SPECIAL_KEY_BACKSPACE", this, this.backspace);
        Events.register("SPECIAL_KEY_ENTER", this, this.enter);
        Events.register("SPECIAL_KEY_LEFT", this, this.goLeft);
        Events.register("SPECIAL_KEY_UP", this, this.goUp);
        Events.register("SPECIAL_KEY_RIGHT", this, this.goRight);
        Events.register("SPECIAL_KEY_DOWN", this, this.goDown);
        Events.register("SPECIAL_KEY_COLOR-LIGHTBROWN", this, function() { me.setColor('lightbrown'); } );
        Events.register("SPECIAL_KEY_COLOR-DARKBROWN", this, function() { me.setColor('darkbrown'); } );
        Events.register("SPECIAL_KEY_COLOR-PINK", this, function() { me.setColor('pink'); } );
        Events.register("SPECIAL_KEY_COLOR-DARKGREY", this, function() { me.setColor('darkgrey'); } );
        Events.register("SPECIAL_KEY_COLOR-MEDIUMGREY", this, function() { me.setColor('mediumgrey'); } );
    },

    prepare: function() {

    },

    reset: function() {
        this.matrix.reset();
    },

    draw: function(chr) {
        this.matrix.putChar(chr);
    },

    backspace: function() {
        this.matrix.backspace();
    },

    enter: function() {
        this.matrix.enter();
    },

    arrowKey: function(keyCode) {
        this.matrix.arrowKey(keyCode);
    },

    goLeft: function() {
        this.matrix.goLeft();
    },

    goUp: function() {
        this.matrix.goUp();
    },

    goRight: function() {
        this.matrix.goRight();
    },

    goDown: function() {
        this.matrix.goDown();
    },

    setColor: function(color) {
        this.matrix.setColor(color);
    }
});