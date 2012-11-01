Animation = Class.extend({

    interval: null,
    horizontalPosition: 0,
    animating: false,

    init: function() {
        this.listen();
    },

    listen: function() {
        Events.register("ANIMATED_CHARACTER_ENTERED", this, this.animate);
    },

    animate: function() {
        if (!this.animating) {
            this.doAnimation();
        }
    },

    doAnimation: function() {
        this.animating = true;
        this.horizontalPosition = 0;

        var me = this;
        this.interval = window.setInterval(function() {

            me.horizontalPosition -= 1;
            me.update();

            if(me.horizontalPosition === -16) {
                window.clearInterval(me.interval);
                me.doAnimation();
            }
        }, 10)
    },

    update: function() {
        var me = this;
        $('.animated').each(function(i,e) {
            var x = parseInt($(e).attr('orig-x')) + me.horizontalPosition;
            $(e).css('background-position-x', x);
        });
    }
});