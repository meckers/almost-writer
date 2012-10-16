UnmodifiedRule = StrokeRule.extend({

    name: 'unmodified',
    shifted: false,
    alted: false,
    eventType: 'keypress',

    checkAndResolve: function(stroke) {
        if (!stroke.shifted && !stroke.alted && KeyMapper.unmodified[stroke.keyCode] !== undefined) {
            console.log("c&r unmodified", stroke.keyCode);
            return KeyMapper.unmodified[stroke.keyCode];
        }
        return null;
    }
});