CanvasAgent = DrawingAgent.extend({

    canvasElement: null,
    canvas: null,
    context: null,
    matrix: null,

    init: function(canvasElement) {
        this.canvasElement = $(canvasElement);
        this.canvas = this.canvasElement[0];
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "#FFF";
        var canvasWidth = this.canvasElement.width();
        var canvasHeight = this.canvasElement.height();
        this.matrix = new CanvasMatrix(canvasWidth, canvasHeight);
    },

    drawAll: function() {
        var me = this;
        $(this.matrix.cells).each(function(i,e) {
            me.drawCell(e);
        });
    },

    drawCell:function(cell) {
        var pos = cell.getPixelPosition();
        this.context.font = "bold 13px courier";
        this.context.fillText(cell.char, pos.top, pos.left);
    },

    draw: function(chr) {
        var pos = this.matrix.getPixelPosition();
        this.context.font = "bold 13px courier";
        if (chr !== null && chr !== undefined) {
            this.context.fillText(chr, pos.left, pos.top);
            this.matrix.moveCaretRight();
        }
    },

    backspace: function() {
        this.matrix.moveCaretLeft();
        this.deleteChar();
    },

    deleteChar: function() {
        var pos = this.matrix.getPixelPosition();
        this.context.fillStyle = "#000";
        this.context.fillRect(pos.left, pos.top-this.matrix.cellHeight, this.matrix.cellWidth, this.matrix.cellHeight);
        this.context.fillStyle = "#FFF";
    }
});





