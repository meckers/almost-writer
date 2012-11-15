RecordMode = Mode.extend({

    init: function(options) {
        this.strokeHandler = new StrokeHandler();
    },

    activate: function() {
        _writer.clearDisplay();
    }

});