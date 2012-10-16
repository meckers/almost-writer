CanvasMatrix = Class.extend({

    cellWidth: 16,
    cellHeight: 16,
    rowLength: 0,
    colLength: 0,
    cells: [],
    currentCell: null,
    currentColor: 'white',

    init: function(canvasWidth, canvasHeight) {

        this.rowLength = canvasWidth / this.cellWidth;
        this.colLength = canvasHeight / this.cellHeight;

        for(var r=0; r<this.rowLength; r++) {
            for(var c=0; c<this.colLength; c++) {
                this.cells.push(new WriterCell(r,c, this.cellWidth, this.cellHeight));
            }
        }
        this.currentCell = this.cells[0];
    },

    getPixelPosition: function() {
        return this.currentCell.getPixelPosition();
    },

    moveCaretRight: function() {
        var col = this.currentCell.col;
        var row = this.currentCell.row;

        if (col < this.colLength - 1) {
            col++;
        }
        else {
            col = 0;
            row++;
        }

        this.currentCell = this.getCell(row, col);
    },

    moveCaretLeft: function() {
        var col = this.currentCell.col;
        var row = this.currentCell.row;

        if (col !== 0) {
            col--;
        }
        else if (row !== 0) {
            col = this.colLength;
            row--;
        }

        this.currentCell = this.getCell(row, col);
    },

    getCell: function(row, col) {

        for (i=0; i<this.cells.length; i++) {
            if (this.cells[i].row === row && this.cells[i].col === col) {
                return this.cells[i];
            }
        }

        console.error("Warning: getCell returning null");
        return null;
    }
});