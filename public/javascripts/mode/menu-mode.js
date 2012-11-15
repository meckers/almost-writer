MenuMode = Mode.extend({

    init: function() {

    },

    activate: function() {
        _writer.clearDisplay();
        _writer.loadStaticText(_staticTexts.menu);
    }
});