
Writer = Class.extend({

    recorder: null,
    drawingAgent: null,
    modeAgent: null,

    init: function() {
        console.log("init writer");
        this.drawingAgent = new DomAgent("#char-matrix");
        this.modeAgent = new ModeAgent();
        //this.strokeHandler = new StrokeHandler();
        this.recorder = new Recorder();
        this.animation = new Animation();
        this.scroller = new Scrolling("#scroller");
        this.setUpModes();
    },

    // Allokerar stroke handlers för alla modes, kanske inte bra.
    setUpModes: function() {
        this.modes = {
            RECORD_MODE: new RecordMode(),
            MENU_MODE: new MenuMode()
        }
    },

    // Called from default.js
    start: function() {
        this.startScroller();
        if (typeof(_strokes) !== 'undefined') {
            this.playbackSaved();
        }
        else {
            this.modeAgent.setMode(this.modes.RECORD_MODE);
        }
        this.listen();
    },

    clearDisplay: function() {
        this.drawingAgent.reset();
    },

    getRecorder: function() {
        return this.recorder;
    },

    startScroller: function() {
        this.scroller.setText("HEJ, DETTA AR EN SCROLLTEXT FOR ATT TESTA HUR DET FUNKAR MED SCROLLTEXTER PA ETT UNGEFAR");
        this.scroller.start();
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
            //console.log("done", message);
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


