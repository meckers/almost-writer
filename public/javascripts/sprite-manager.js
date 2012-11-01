SpriteMap = {
    '@': [0,0],
    'A': [0,1], 'B': [0,2], 'C': [0,3],
    'D': [0,4], 'E': [0,5], 'F': [0,6],
    'G': [0,7], 'H': [0,8], 'I': [0,9],
    'J': [0,10], 'K': [0,11], 'L': [0,12],
    'M': [0,13], 'N': [0,14], 'O': [0,15],
    'P': [0,16], 'Q': [0,17], 'R': [0,18],
    'S': [0,19], 'T': [0,20], 'U': [0,21],
    'V': [0,22], 'W': [0,23], 'X': [0,24],
    'Y': [0,25], 'Z': [0,26], '[': [0,27],
    '€': [0,28], ']': [0,29], // pil upp (30), pil vänster (31) här
    ' ': [1,0], '!': [1,1], '"': [1,2],
    '#': [1,3], '$': [1,4], '%': [1,5],
    '&': [1,6], '\'': [1,7], '(': [1,8],
    ')': [1,9], '*': [1,10], '+': [1,11],
    ',': [1,12], '-': [1,13], '.': [1,14],
    '/': [1,15], '0': [1,16], '1': [1,17],
    '2': [1,18], '3': [1,19], '4': [1,20],
    '5': [1,21], '6': [1,22], '7': [1,23],
    '8': [1,24], '9': [1,25], ':': [1,26],
    ';': [1,27], '<': [1,28], '=': [1,29],
    '>': [1,30], '?': [1,31], '≈': [7,0],        // ≈ = alt+x
    '~': [7,2], '™': [7,4]                       // ™ = alt+'

};

SpriteManager = Class.extend({

    charSize: {
        width: 16,
        height: 16
    },

    init: function() {

    },

    getBlank: function() {
        return this.getForChar(' ');
    },

    getForPosition: function(top, left) {
        return {
            top: top * this.charSize.height,
            left: left * this.charSize.width
        };
    },

    getForChar: function(char) {

        var charIndex = SpriteMap[char];

        //console.log(charIndex);

        return {
            top: charIndex[0],
            left: charIndex[1] * this.charSize.width
        };
    }


});