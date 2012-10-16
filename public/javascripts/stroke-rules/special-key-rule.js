SpecialKeyRule = StrokeRule.extend({

    name: 'special',
    shifted: false,
    alted: false,
    eventType: 'keydown',

    checkAndResolve: function(stroke) {
        var result = null;
        for (var p in KeyMapper.special) {
            //console.log(p);
            if (stroke.keyCode === KeyMapper.special[p]) {
                console.log("triggering", p);
                Events.trigger("SPECIAL_KEY_" + p.toUpperCase(), stroke);
                //return false;
            }
        }
        return null;
    }
});