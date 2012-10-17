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
        this.horizontalPosition = 16;

        var me = this;
        this.interval = window.setInterval(function() {

            me.horizontalPosition -= 1;
            me.update();

            if(me.horizontalPosition === 0) {
                window.clearInterval(me.interval);
                me.doAnimation();
            }
        }, 25)
    },

    update: function() {
        $(".animated").find("div.original").css('left', -16 + this.horizontalPosition);
        $(".animated").find("div.copy").css('left', this.horizontalPosition);
    }
});