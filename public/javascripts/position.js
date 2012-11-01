Position = Class.extend({
    init: function(row, col) {
        this.row = row;
        this.col = col;
    },

    isFirst: function() {
        return this.row === 0 && this.col === 0;
    }
});