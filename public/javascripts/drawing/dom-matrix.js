DomMatrix = Class.extend({

    element: null,
    currentColor: 'white',

    cellSize: {
        width: 16,
        height: 16
    },

    dimensions: {
        rows: 40,
        cols: 40
    },

    currentCell: null,
    rows: [],
    cursor: null,

    init: function(element) {
        this.element = element;
        this.dimensions.cols = Math.floor($(element).width() / this.cellSize.width);
        this.dimensions.rows = Math.floor($(element).height() / this.cellSize.height);
        this.reset();
    },

    empty: function() {
        this.rows = [];
        $(this.element).empty();
    },

    reset: function() {
        this.empty();
        this.createCells();
        this.cursor = new DomCursor(this.cellSize.width, this.cellSize.height);
        this.setCell(this.getCell(0,0));
    },

    createCells: function() {
        for (r=0; r<this.dimensions.rows; r++) {
            var row = { cols: [] };
            for (c=0; c<this.dimensions.cols; c++) {
                var cell = new DomCell(this.cellSize.width, this.cellSize.height, r, c);
                row.cols.push(cell);
                $(this.element).append(cell.element);
            }
            this.rows.push(row);
        }
        //console.log("createCells finished", this);
    },

    getCell: function(row, col) {
        return this.rows[row].cols[col];
    },

    putChar: function(chr) {
        this.writeToCurrentCell(chr);
        this.goToNextCell();
    },

    backspace: function() {
        try {
            var loc = this.currentCell.col === 0 ?
                { r: this.currentCell.row - 1, c: this.dimensions.cols-1 }
                :
                { r: this.currentCell.row, c: this.currentCell.col - 1};
            var prevCell = this.getCell(loc.r, loc.c);
            this.writeToCell(prevCell, ' ');
            this.goToPreviousCell();
            this.pullLine();
        }
        catch(ex) {
            console.error(ex.message);
        }
    },

    enter: function() {
        try {
            this.gotoCell(this.currentCell.row + 1, 0);
        }
        catch(ex) {
            console.error(ex.message);
        }
    },

    pullLine: function() {
        for(i = this.currentCell.col; i<this.dimensions.cols-1; i++) {
            var row = this.rows[this.currentCell.row];
            //row.cols[i] = row.cols[i + 1];
            //console.log("copying content in", row.cols[i+1], "to", row.cols[i]);
            row.cols[i].copy(row.cols[i+1]);
        }
    },

    writeToCurrentCell: function(chr) {
        this.writeToCell(this.currentCell, chr);
    },

    writeToCell: function(cell, chr) {
        //$(cell.element).html(chr);
        cell.setColor(this.currentColor);
        cell.write(chr);
    },

    goToNextCell: function() {
        var col = null;
        var row = null;

        if (this.currentCell.col === this.dimensions.cols -1) {
            col = 0;
            row = this.currentCell.row + 1;
        }
        else {
            col = this.currentCell.col + 1;
            row = this.currentCell.row;
        }

        this.gotoCell(row, col);

    },

    goToPreviousCell: function() {
        var col = null;
        var row = null;

        if (this.currentCell.col === 0) {
            col = this.dimensions.cols - 1;
            row = this.currentCell.row - 1;
        }
        else {
            col = this.currentCell.col - 1;
            row = this.currentCell.row;
        }

        this.gotoCell(row, col);

    },

    goLeft: function() {
        this.goToPreviousCell();
    },

    goRight: function() {
        this.goToNextCell();
    },

    goUp: function() {
        var col = null;
        var row = null;

        if (this.currentCell.row === 0) {
            return;
        }
        else {
            col = this.currentCell.col;
            row = this.currentCell.row - 1;
        }

        this.gotoCell(row, col);
    },

    goDown: function() {
        var col = null;
        var row = null;

        if (this.currentCell.row === this.dimensions.rows - 1) {
            return;
        }
        else {
            col = this.currentCell.col;
            row = this.currentCell.row + 1;
        }

        this.gotoCell(row, col);
    },

    gotoCell: function(row, col) {
        this.setCell(this.getCell(row, col));
    },

    setCell: function(cell) {
        this.currentCell = cell;
        this.cursor.setCell(this.currentCell);
    },

    setColor: function(color) {
        this.currentColor = color;
        console.log("current color is now", color);
    },

    dump: function() {

        var data = { rows: [] };

        for (r=0; r<this.dimensions.rows; r++) {
            var row = { cols: [] };
            for (c=0; c<this.dimensions.cols; c++) {
                var cell = this.rows[r].cols[c];
                row.cols.push({
                    ch: cell.getChar(),
                    co: cell.color
                });
            }
            data.rows.push(row);
        }

        $("#json").text(JSON.stringify(data));
    },

    unDump: function(obj) {

        this.reset();
        for (r=0; r<this.dimensions.rows; r++) {
            for (c=0; c<this.dimensions.cols; c++) {
                this.getCell(r, c).write(obj.rows[r].cols[c].ch);
            }
        }
        //console.log("createCells finished", this);
    }

});