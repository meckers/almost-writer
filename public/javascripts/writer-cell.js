WriterCell = Class.extend({
    col: null,
    row: null,
    width: null,
    height: null,
    char: null,

    init: function(row,col,width, height) {
        this.row = row;
        this.col = col;
        this.width = width;
        this.height = height;
    },

    getPixelPosition: function() {
        var top = this.row * this.height + this.height;
        var left = this.col * this.width;
        return new Position(top, left);
    }
});
