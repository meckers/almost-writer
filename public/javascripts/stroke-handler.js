StrokeHandler = Class.extend({

    drawingAgent: null,
    rules: [],

    init: function() {
        this.setupRules();
        this.listen();
    },

    setupRules: function() {
        this.rules = [
            new AlphaNumericRule(),
            new UnmodifiedRule(),
            new ShiftedRule(),
            new CtrldRule(),
            new SpecialKeyRule()
        ];
    },

    listen: function() {
        var me = this;

        Events.register("INCOMING_KEYSTROKE", this, this.handleStroke);

        $(document).keypress(function(e) {
            //console.log("code", e.keyCode);
            //console.group("KEYPRESS");
            //e.stopPropagation();
            return me.dispatchStroke(e);
        });
        $(document).keydown(function(e) {
            //console.group("KEYDOWN");
            //e.stopPropagation();
            return me.dispatchStroke(e);
        });
    },


    dispatchStroke: function(keyEvent) {
        //console.log(keyEvent.type, "stroke", keyEvent.keyCode, keyEvent);
        var stroke = new Stroke({
            keyCode: keyEvent.keyCode,
            shifted: keyEvent.shiftKey,
            ctrld: keyEvent.ctrlKey,
            alted: keyEvent.altKey,
            eventType: keyEvent.type,
            time: keyEvent.timeStamp
        });
        Events.trigger("INCOMING_KEYSTROKE", stroke);
        Events.trigger("RECORDABLE_KEYSTROKE", stroke);
        /*return this.handleStroke(stroke);*/
        if (keyEvent.keyCode === 8) {
            return false;
        }
    },

    handleStroke: function(stroke) {
        this.applyRules(stroke);
        console.groupEnd();
    },

    applyRules: function(stroke) {
        for (k=0; k<this.rules.length; k++) {
            var r = this.rules[k];
            //console.log("checking rule", r.name, "for", stroke.event.type);
            if (r.eventType === stroke.eventType) {
                var result = r.checkAndResolve(stroke);
                if (result !== null) {
                    Events.trigger("CHARACTER_RESOLVED", result);
                    //console.log("resolved!");
                    return;
                }
            }
        }
    }

    /*
    applyRules_: function(stroke) {
        for (k=0; k<this.rules.length; k++) {
            var r = this.rules[k];
            if (r.eventType === stroke.event.type) {
                var result = r.checkAndResolve(stroke);
                if (result !== null) {
                    return result;
                }
            }
        }
    },

    applyRules__: function(stroke) {
        for (k=0; k<this.rules.length; k++) {
            var r = this.rules[k];
            if (r.eventType === stroke.event.type && r.check(stroke)) {
                return r.resolve(stroke);
            }
        }
    }*/

});
