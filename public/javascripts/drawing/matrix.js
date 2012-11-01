Matrix = Class.extend({

    dimensions: null,
    currentPosition: null,
    rows: [],
    unitClass: null,

    init: function(rowWidth, colHeight, unitClass) {
        this.rows = [];
        this.dimensions = {
            rowWidth: rowWidth,
            colHeight: colHeight
        };
        this.currentPosition = new Position(0,0);
        this.unitClass = unitClass;
        this.setUp();
    },

    setUp: function() {
        this.createUnits();
    },

    createUnits: function() {
        for (r=0; r<this.dimensions.colHeight; r++) {
            var row = { cols: [] };
            for (c=0; c<this.dimensions.rowWidth; c++) {
                var unit = new this.unitClass();
                row.cols.push(unit);
            }
            this.rows.push(row);
        }
    },

    forEach: function(fn) {
        for (r=0; r < this.rows.length; r++) {
            for (c=0; c < this.rows[r].cols.length; c++) {
                //$(this.element).append(this.rows[r].cols[c].getElement());
                fn(r, c, this.rows[r].cols[c]);
            }
        }
    },

    untilEndOfRow: function(fn) {
        var start = this.currentPosition.col;
        var row = this.rows[this.currentPosition.row];
        for (c=start; c < row.cols.length; c++) {
            fn(c, row.cols[c], this);
        }
    },

    fromEndOfRow: function(fn) {
        var col = this.currentPosition.col;
        var start = this.dimensions.rowWidth - 1;
        var row = this.rows[this.currentPosition.row];
        for (c=start; c > col-1; c--) {
            fn(c, row.cols[c], this);
        }
    },

    getCurrentPosition: function() {
        return this.currentPosition;
    },

    getCurrentUnit: function() {
        return this.getUnitAtPosition(this.currentPosition);
    },

    getUnitAtPosition: function(position) {
        var row = position.row;
        var col = position.col;
        return this.rows[row].cols[col];
    },

    moveLeft: function() {
        if (this.currentPosition.col !== 0) {
            this.currentPosition.col--;
        }
        else {
            this.currentPosition.row--;
            this.currentPosition.col = this.dimensions.rowWidth-1;
        }
        this.reportSelection();
    },

    moveUp: function() {
        if (this.currentPosition.row > 0) {
            this.currentPosition.row--;
        }
        this.reportSelection();
    },

    moveRight: function() {
        if (this.currentPosition.col < this.dimensions.rowWidth - 1) {
            this.currentPosition.col++;
        }
        else {
            this.currentPosition.row++;
            this.currentPosition.col = 0;
        }
        this.reportSelection();
    },

    moveDown: function() {
        if (this.currentPosition.row < this.dimensions.colHeight - 1) {
            this.currentPosition.row++;
        }
        else {
            this.scrollDown();
        }
        this.reportSelection();
    },

    scrollDown: function() {
        var me = this;
        this.forEach(function(r, c, e) {
            var pos = me.getCurrentPosition();
            if (r < pos.row) {
                var pos = new Position(r+1, c);
                var cell = me.getUnitAtPosition(pos);
                e.duplicateCell(cell);
            }
            else {
                e.setDefaultMapping();
            }
        });
    },

    moveToNextRow: function(col) {
        this.currentPosition.row++;
        this.currentPosition.col = col;
        this.reportSelection();
    },

    reportSelection: function() {
        Events.trigger("MATRIX_POSITION_UPDATED");
    }

});