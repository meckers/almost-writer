Stroke = Class.extend({

    keyCode: null,
    shifted: false,
    alted: false,
    ctrld: false,
    eventType: null,
    //appliedRules: [],

    init: function(options) {

        this.keyCode = options.keyCode;
        this.shifted = options.shifted;
        this.ctrld = options.ctrld;
        this.alted = options.alted;
        this.eventType = options.eventType;
        this.time = options.time;

        /*
        this.keyCode = event.keyCode;
        this.shifted = event.shiftKey;
        this.ctrld = event.ctrlKey;
        this.alted = event.altKey;
        this.eventType = event.type;
        this.time = event.timeStamp;
        */
        //this.appliedRules = [];
        //console.log("event", event);
    },

    isModified: function() {
        return (this.shifted || this.alted || this.ctrld);
    }
});