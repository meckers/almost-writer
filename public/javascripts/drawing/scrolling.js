Scrolling = Class.extend({

    $element: null,
    $textElement: null,
    text: null,

    init: function(element) {
        this.$element = $(element);
        this.$textElement = $("<div></div>").css('position', 'absolute').addClass('text');
        this.$element.append(this.$textElement);
    },

    setText: function(text) {
        this.text = text;
        this.$textElement.text(this.text);
    },

    start: function() {
        console.log("scrolling start");
        this.$textElement.css('right', '-' + this.$element.width() + 'px');

        var me = this;

        window.setInterval(function() {
            var curRight = parseInt(me.$textElement.css('right').replace('px', ''));
            me.$textElement.css('right', curRight+1);
        }, 5);
    }

});