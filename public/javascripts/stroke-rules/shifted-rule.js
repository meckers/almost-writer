ShiftedRule = StrokeRule.extend({

    name: 'shifted',
    shifted: true,
    alted: false,
    eventType: 'keypress',

    checkAndResolve: function(stroke) {
        if (stroke.shifted && KeyMapper.shifted[stroke.keyCode] !== null) {
            return KeyMapper.shifted[stroke.keyCode];
        }
        return null;
    }
});