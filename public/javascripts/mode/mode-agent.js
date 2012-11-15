ModeAgent = Class.extend({
    mode: null,

    init: function() {

    },

    setMode: function(mode) {
        this.mode = mode;
        this.mode.activate();
    }
});