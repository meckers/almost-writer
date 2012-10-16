StrokeRule = Class.extend({
    name: 'default',
    shifted: false,
    alted: false,
    ranges: [],
    individuals: [],

    init: function() {

    },

    success: function(reason, stroke) {
        //console.log('rule', this.name, "matched for keyCode", stroke.keyCode, "because", reason, "and returning true");
        //stroke.appliedRules.push(this.name + " (success)");
        return true;
    },

    fail: function(stroke) {
        //stroke.appliedRules.push(this.name + " (fail)");
    }
});