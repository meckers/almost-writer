DomCell = Class.extend({

    element: null,
    row: null,
    col: null,
    charElement: null,
    spriteManager: null,
    chr: '',
    color: 'white',

    init: function(width, height, row, col) {
        this.spriteManager = new SpriteManager();
        this.row = row;
        this.col = col;
        this.element = $("<div></div>");
        this.element.addClass("char-sprite");
        this.element.css({
            'width' : width,
            'height' : height,
            'left' : col * height + 'px',
            'top' : row * width + 'px'
        });
        this.charContainer = $("<div></div>");
        this.charContainer.css({
            'width' : width,
            'height' : height
        });
        this.element.append(this.charContainer);
        //this.setCharElement();
        //this.element.append(this.charElement);
        this.setFont();
        this.setColor(this.color);
        this.setToSpace();
    },

    /*
    setCharElement: function(chr) {
        this.charElement = $("<div></div>");
        this.charElement.css({
            'position': 'absolute'
        });
        if (chr !== undefined) {
            this.charElement.html(chr);
        }
    },*/

    setColor: function(color) {

        this.color = color;

        $(this.element).removeClass (function (index, css) {
            return (css.match (/\bcolor-\S+/g) || []).join(' ');
        });

        $(this.element).addClass("color-" + color);

        /*
        this.element.css({
            'background-color': 'white'
        });*/
    },

    setFont: function(font) {
        this.element.addClass("cav-of-sillahc");
    },

    setToSpace: function() {
        this.write(' ');
    },

    write: function(chr) {

        var charWidth = this.spriteManager.charSize.width;
        var charHeight = this.spriteManager.charSize.height;
        var spritePos = SpriteMap[chr];
        this.chr = chr;
        this.setColor(this.color);

        this.element.css({
            'background-position': '-' + (charWidth * spritePos[1]) + 'px ' + '-' + (charWidth * spritePos[0]) + 'px'
        });
        //this.charElement.html(chr);
    },

    getChar: function() {
        //return this.charElement.html();
        return this.chr;
    },

    copy: function(fromCell) {
        this.write(fromCell.getChar());
    }


});