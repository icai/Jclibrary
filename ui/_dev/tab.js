

(function($) {
	
    $._tabs = function() {

    }
    // What does the _tabs plugin do?
    $.fn._tabs = function(options) {

        if(!this.length) {
            return this;
        }

        var opts = $.extend(true, {}, $.fn._tabs.defaults, options);

        this.each(function() {
            var $this = $(this);


                console.log(opts);
        });

        return this;
    };

    // default options
    $.fn._tabs.defaults = {
        event: "click",

        defaultTwo: false,
        defaultThree: 'yay!',

        dynamic:false,
        ajaxSrc:'www',
        ajaxParams:{},

    };


    $.fn._slider = function(options) {

        if(!this.length) {
            return this;
        }

        var opts = $.extend(true, {}, $.fn._slider.defaults, options);

        this.each(function() {
            var $this = $(this);

        });

        return this;
    };

    $.fn._slider.defaults = {
        defaultOne: true,
        defaultTwo: false,
        defaultThree: 'yay!'
    };
})(jQuery);






$(document)._tabs();