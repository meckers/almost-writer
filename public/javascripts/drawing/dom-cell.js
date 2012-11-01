DomCellOld = Class.extend({

    element: null,
    row: null,
    col: null,
    charElement: null,
    spriteManager: null,
    chr: '',
    color: 'white',
    charContainer: null,
    secondCharElement: null,
    animated: false,

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
        this.relativizer = $("<div></div>");
        this.relativizer.attr('name', 'relativizer');
        this.relativizer.css({
            'position': 'relative'
        });
        this.charContainer = $("<div></div>");
        this.charContainer.addClass("char-container");
        this.relativizer.append(this.charContainer);
        this.element.append(this.relativizer);
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

        $(this.charContainer).removeClass (function (index, css) {
            return (css.match (/\bcolor-\S+/g) || []).join(' ');
        });

        $(this.charContainer).addClass("color-" + color);

        /*
        this.element.css({
            'background-color': 'white'
        });*/
    },

    setFont: function(font) {
        this.charContainer.addClass("cav-of-sillahc");
    },

    setToSpace: function() {
        this.write(' ');
    },

    write: function(chr) {
        this.deAnimate();
        var charWidth = this.spriteManager.charSize.width;
        var charHeight = this.spriteManager.charSize.height;
        var spritePos = SpriteMap[chr];
        this.chr = chr;
        this.setColor(this.color);

        this.charContainer.css({
            'background-position': '-' + (charWidth * spritePos[1]) + 'px ' + '-' + (charHeight * spritePos[0]) + 'px'
        });
        //this.charElement.html(chr);
    },

    getChar: function() {
        //return this.charElement.html();
        return this.chr;
    },

    copy: function(fromCell) {
        this.write(fromCell.getChar());
    },

    animate: function() {
        this.secondCharElement = this.charContainer.clone();
        this.charContainer.addClass("original");
        this.secondCharElement.addClass("copy");
        this.relativizer.append(this.secondCharElement);
        this.relativizer.addClass("animated");
        Events.trigger("ANIMATED_CHARACTER_ENTERED");
    },

    deAnimate: function() {
        if (this.relativizer.hasClass("animated")) {
            console.log("de-animating");
            this.relativizer.find(".original").css('left', 0).removeClass("original");
            this.relativizer.find(".copy").remove();
            this.relativizer.removeClass("animated");
        }
    }



});