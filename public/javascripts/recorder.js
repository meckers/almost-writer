Recorder = Class.extend({

    strokes: [],
    strokeIndex: 0,

    init: function() {
        this.listen();
    },

    listen: function() {
        Events.register("RECORDABLE_KEYSTROKE", this, this.recordStroke);
    },

    recordStroke: function(stroke) {
        var me = this;
        this.strokes.push(stroke);
        console.log(this.strokes);
    },

    startPlayback: function() {
        this.strokeIndex = 0;
        this.playback(this.strokes[this.strokeIndex]);
    },

    playback: function(stroke) {
        var me = this;
        window.setTimeout(function() {
            Events.trigger("INCOMING_KEYSTROKE", stroke);
            if (me.strokeIndex !== me.strokes.length) {
                me.playback(me.strokes[me.strokeIndex++]);
            }
        }, 40);
    }

});