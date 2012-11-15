DomCell = Class.extend({

    element: null,
    isAnimated: false,

    init: function() {
        this.element = this.createElement();
        this.setDefaultMapping();
    },

    createElement: function() {
        var e = $("<div></div>");
        e.addClass("char-cell");
        //e.css('background-position', '-0px -16px');
        e.addClass("font-cav-of-sillahc");
        return e;
    },

    getElement: function() {
        return this.element;
    },

    applyChar: function(chr, animate) {

        var pos = SpriteAgent.getPositionForChar(chr);

        this.element.css({
            'background-position': '-' + pos.left + 'px ' + '-' + pos.top + 'px'
        });

        if (animate) {
            this.animate(true);
        }
        else {
            this.deAnimate();
        }
    },

    applyMapping: function(mapping, animate) {

        var spritePosTop = mapping[0] * 16;
        var spritePosLeft = mapping[1] * 16;

        this.element.css({
            'background-position': '-' + spritePosLeft + 'px ' + '-' + spritePosTop + 'px'
        });

        if (animate) {
            this.animate(true);
        }
        else {
            this.deAnimate();
        }
    },

    setDefaultMapping: function() {
        this.element.css('background-position', '-0px -16px');
    },

    animate: function(forceSetOrigX) {
        this.isAnimated = true;
        this.element.addClass("animated");
        if (this.element.attr('orig-x') === undefined || forceSetOrigX) {
            this.element.attr('orig-x', this.element.css('background-position-x').replace('px','')); //keep track of original background offset
        }
        Events.trigger("ANIMATED_CHARACTER_ENTERED");
    },

    deAnimate: function() {
        this.element.removeClass("animated");
        this.isAnimated = false;
    },

    duplicateCell_old: function(sourceCell) {
        var bgPos = sourceCell.getElement().css('background-position');
        var classes = sourceCell.getElement().className;
        this.element.css('background-position', bgPos);
        this.element.className = classes;
        if (sourceCell.isAnimated) {
            this.element.attr('orig-x', sourceCell.element.attr('orig-x'));  // TODO: måste ta ett större grepp om detta. orig-x ersätts inte om man försöker skriva ett nytt animerat tecken i en ruta som har ett annat animerat tecken sedan förut.
            this.animate();
        }
    },

    duplicateCell: function(sourceCell) {
        var sourceElem = sourceCell.getElement();
        var attributes = sourceElem.prop("attributes");
        var me = this;

        $.each(attributes, function() {
            me.element.attr(this.name, this.value);
        });

        if (sourceCell.isAnimated) {
            this.animate();
        }
    },




    setColor: function(color) {
        this.removeColor();
        $(this.element).addClass("color-" + color);
    },

    removeColor: function() {
        $(this.element).removeClass (function (index, css) {
            return (css.match (/\bcolor-\S+/g) || []).join(' ');
        });
    },

    isBlank: function() {
        var bgCss = $(this.element).css('background-position');
        var pos = SpriteAgent.getPositionForChar(' ');
        return (bgCss = ('-' + pos.left + 'px ' + '-' + pos.top + 'px'))
    }


});