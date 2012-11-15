DomAgent = DrawingAgent.extend({

    element: null,
    matrix: null,
    cursor: null,
    color: 'white',

    init: function(element) {
        this.element = element;
        this.cursor = new DomCursor(16, 16);
        this.matrix = new Matrix(40, 40, DomCell);
        this.setUp();
    },

    setUp: function() {
        this.addCells();
        this.listen();
        this.updatePosition();
    },

    listen: function() {
        var me = this;
        Events.register("MATRIX_POSITION_UPDATED", this, this.updatePosition);
        Events.register("CHARACTER_RESOLVED", this, this.writeChar);
        Events.register("SPECIAL_KEY_BACKSPACE", this, this.backspace);
        Events.register("SPECIAL_KEY_INSERT", this, this.insert);
        Events.register("SPECIAL_KEY_ENTER", this, this.enter);
        Events.register("SPECIAL_KEY_LEFT", this, this.moveLeft);
        Events.register("SPECIAL_KEY_UP", this, this.moveUp);
        Events.register("SPECIAL_KEY_RIGHT", this, this.moveRight);
        Events.register("SPECIAL_KEY_DOWN", this, this.moveDown);
        Events.register("SPECIAL_KEY_COLOR-LIGHTBROWN", this, function() { me.setColor('lightbrown'); } );
        Events.register("SPECIAL_KEY_COLOR-DARKBROWN", this, function() { me.setColor('darkbrown'); } );
        Events.register("SPECIAL_KEY_COLOR-PINK", this, function() { me.setColor('pink'); } );
        Events.register("SPECIAL_KEY_COLOR-DARKGREY", this, function() { me.setColor('darkgrey'); } );
        Events.register("SPECIAL_KEY_COLOR-MEDIUMGREY", this, function() { me.setColor('mediumgrey'); } );
        Events.register("SPECIAL_KEY_ANIMATED-EQUALS", this, function() { me.writeChar('≈', true); } );
        Events.register("SPECIAL_KEY_ANIMATED-DASH", this, function() { me.writeChar('~', true); } );
        Events.register("SPECIAL_KEY_ANIMATED-ASTERISK", this, function() { me.writeChar('™', true); } );
    },


    empty: function() {
        $(this.element).empty();
    },

    reset: function() {
        this.empty();
        this.matrix = new Matrix(40, 40, DomCell);
        this.addCells();
        this.updatePosition();
    },


    updatePosition: function() {
        this.updateCursor();
    },

    addCells: function() {
        var me = this;
        this.matrix.forEach(function(r, c, e) {
            $(me.element).append(e.getElement());
        })
    },

    writeChar: function(chr, animate) {
        var mapping = SpriteMap[chr];
        this.write(mapping, animate);
    },

    moveLeft: function() {
        this.matrix.moveLeft();
    },

    moveUp: function() {
        this.matrix.moveUp();
    },

    moveRight: function() {
        this.matrix.moveRight();
    },

    moveDown: function() {
        this.matrix.moveDown();
    },


    write: function(spriteMapping, animate) {
        var currentCell = this.matrix.getCurrentUnit();
        currentCell.applyMapping(spriteMapping, animate);
        currentCell.setColor(this.color);
        this.moveRight();
    },

    setCell: function(cell) {
        this.currentCell = cell;
        this.updateCursor();
    },

    copyCell: function(fromCell, toCell) {
        toCell.duplicateCell(fromCell);
    },

    setColor: function(color) {
        this.color = color;
    },


    enter: function() {
        this.matrix.moveToNextRow(0);
    },

    backspace: function() {
        if (!this.matrix.getCurrentPosition().isFirst())
        {
            this.moveLeft();
            this.getCurrentCell().deAnimate();
            this.pullLine();
        }
    },

    insert: function() {
        this.pushLine();
    },


    pullLine: function() {
        try {
            var me = this;
            this.matrix.untilEndOfRow(function(i, e, matrix) {
                var curRow = matrix.getCurrentPosition().row;
                var pos = new Position(curRow, i+1);
                var nextCell = matrix.getUnitAtPosition(pos);
                if (nextCell !== undefined) {
                    e.duplicateCell(nextCell);
                    if (!nextCell.isAnimated) {
                        e.deAnimate();
                    }
                }
                else {
                    e.setDefaultMapping();
                }
            })
        }
        catch (ex) {
            console.log(ex);
        }
    },

    pushLine: function() {
        try {
            var me = this;
            this.matrix.fromEndOfRow(function(i, e, matrix) {
                if (i > matrix.getCurrentPosition().col) {
                    var pos = new Position(matrix.getCurrentPosition().row, i-1);
                    var cell = matrix.getUnitAtPosition(pos);
                    e.duplicateCell(cell);
                    cell.deAnimate();
                }
                else {
                    e.setDefaultMapping();
                }
            })
        }
        catch (ex) {
            console.log(ex);
        }
    },


    updateCursor: function() {
        this.cursor.setCell(this.getCurrentCell());
    },

    getCurrentCell: function() {
        return this.matrix.getCurrentUnit();
    }

});


/*
DomMatrix = Class.extend({

    matrix: null,
    element: null,
    cursor: null,
    color: null,

    init: function(element) {
        this.element = element;

        this.setUp();
    },

    setUp: function() {
        this.addCells();
        this.listen();
        this.updatePosition();
    },

    listen: function() {
        Events.register("MATRIX_POSITION_UPDATED", this, this.updatePosition);
    },




    moveLeft: function() {
        this.matrix.moveLeft();
    },

    moveUp: function() {
        this.matrix.moveUp();
    },

    moveRight: function() {
        this.matrix.moveRight();
    },

    moveDown: function() {
        this.matrix.moveDown();
    }

});
  */



/*
DomMatrix_holdthatthought = Class.extend({

    dimensions: {
        rowWidth: 40,
        colHeight: 40
    },

    currentPosition: null,
    element: null,
    rows: [],

    init: function(element) {
        this.element = element;
        this.currentPosition = new Position(0,0);
        this.setUp();
    },

    setUp: function() {
        this.createCells();
        this.addCells();
    },

    createCells: function() {
        for (r=0; r<this.dimensions.colHeight; r++) {
            var row = { cols: [] };
            for (c=0; c<this.dimensions.rowWidth; c++) {
                var cell = new DomCell();
                row.cols.push(cell);
            }
            this.rows.push(row);
        }
    },

    addCells: function() {
        for (r=0; r < this.rows.length; r++) {
            for (c=0; c < this.rows[r].cols.length; c++) {
                $(this.element).append(this.rows[r].cols[c].getElement());
            }
        }
    },

    getCurrentCell: function() {
        return this.getCellAtPosition(this.currentPosition);
    },

    getCellAtPosition: function(position) {
        var row = position.row;
        var col = position.col;
        return this.rows[row].cols[col];
    },

    moveToRightCell: function() {
        if (this.currentPosition.col !== 39) {
            this.currentPosition.col++;
        }
        else {
            this.currentPosition.row++;
            this.currentPosition.col = 0;
        }
    }

}); */