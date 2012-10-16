DomCursor = Class.extend({

    element: null,
    interval: null,
    cell: null,

    init: function(width, height) {
        this.element = $("<div></div>");
        this.element.css({
            'width': width,
            'height': height,
            'background-color': 'white',
            'position': 'absolute'
        });
        this.element.className = 'cursor';
        this.blink();
    },

    blink: function() {
        var me = this;
        this.interval = window.setInterval(function() {
            me.element.css('display', me.element.css('display') == 'block' ? 'none' : 'block');
        }, 750);
    },

    setCell: function(cell) {
        if (this.cell !== null) {
            this.cell.element.remove('.cursor');
        }
        this.cell = cell;
        this.cell.element.append(this.element);
    }

});