
Writer = Class.extend({

    recorder: null,
    drawingAgent: null,

    init: function() {

        this.drawingAgent = new DomAgent("#char-matrix");
        this.strokeHandler = new StrokeHandler();
        this.recorder = new Recorder();

        if (typeof(_strokes) !== 'undefined') {
            this.playbackSaved();
        }
        this.listen();
    },

    playbackSaved: function() {
        for (i=0; i<_strokes.length; i++) {
            var stroke = _strokes[i];
            this.recorder.strokes.push(new Stroke({
                keyCode: stroke.keyCode,
                shifted: stroke.shifted,
                ctrld: stroke.ctrld,
                alted: stroke.alted,
                eventType: stroke.eventType,
                time: stroke.time
            }));
        }
        this.recorder.startPlayback();
    },

    saveDocument: function() {
        var strokeString = JSON.stringify(this.recorder.strokes);
        //document.location = "/save/" + strokeString;
        var me = this;

        $.ajax({
            type: 'POST',
            url: '/save',
            data: { strokes: strokeString }
        }).done(function(message) {
            console.log("done", message);
            document.location = "/load/" + message;
        });
    },

    listen: function() {
        var me = this;
        $("#playback").click(function() {
            me.drawingAgent.reset();
            me.recorder.startPlayback();
        });
        $("#dump").click(function() {
            me.drawingAgent.matrix.dump();
        });
        $("#undump").click(function() {
            me.drawingAgent.matrix.unDump(staticLetters.test);
        });
        $("#save").click(function() {
            me.saveDocument();
        });
    }
});


