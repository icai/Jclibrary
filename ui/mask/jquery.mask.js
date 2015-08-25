/**
 * date：20130114
 * author:caiguangsong 
 */



(function($, window, undefined) {

    var comPrefix = window.comPrefix || 'youcompany';

    function isIe6() {
        return /MSIE 6\.\d+/i.test(navigator.userAgent)
    }
    var cache = [];
    $.extend({
            mask: function(optss) {
                var opts = $.extend(true, {}, $.mask.defaults, optss); // jQuery.extend( [deep], target, object1 [, objectN] )
                var curId = comPrefix + "_ui_mask_" + (new Date).getTime();
                var cacheObject = {
                    "_maskId": curId,
                    options: opts
                }
                cache[cache.length] = cacheObject;

                opts.before.call(this, curId);
                var _mask = $('<div />', {
                    'class': comPrefix + "-ui-mask",
                    'id': curId,
                    style: '	background: ' + opts.background + ';-khtml-opacity: ' + opts.opacity + ';-moz-opacity: ' + opts.opacity + ';opacity: ' + opts.opacity + ';filter: alpha(opacity=' + 100.00 * opts.opacity + ');-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 100.00 * opts.opacity + ')";z-index:' + opts.zIndex + ';position:' + (isIe6() ? "absolute" : "fixed") + ';left:0;top:0;width:' + (isIe6() ? $(document.body).width() + "px" : "100%") + ';height:' + (isIe6() ? $(document.body).height() + "px" : "100%") + ';',
                    html: (isIe6() ? '<iframe class="mask_iframe" style="position: absolute; left: 0px; filter: progid:dximagetransform.microsoft.alpha(opacity=0); z-index: -1; top: 0px; opacity: 0" height="100%" frameborder=no width="100%"></iframe>' : "")
                })

                $(document.body).append(_mask);
                opts.callback.call(this, curId);
                return _mask;
            },
            unmask: function(a, b) { // (ture,300);
                var args = [].slice.call(arguments, 0),
                    target = args[0] || 400, // animate
                    length = args.length,
                    deep = false,
                    callback = function() {};

                if (cache.length == 0) {
                    return;
                }

                if (typeof target === "boolean") {
                    deep = target; // del all
                    target = args[1] || false; // animate
                    //callback = args[2] || callback
                }
                if (deep) {
                    if (target == "fast") {
                        $.each(cache, function(i, el) {
                            $('#' + el._maskId).remove();
                        })
                    } else {
                        $.each(cache, function(i, el) {
                            $('#' + el._maskId).animate({
                                "opacity": 0
                            }, target, function() {
                                $(this).remove();
                            })
                        })
                    }
                    cache = []; // del all instance !!
                } else {
                    if (target == "fast") {
                        $('#' + cache[cache.length - 1]['_maskId']).remove();
                    } else {
                        $('#' + cache[cache.length - 1]['_maskId']).animate({
                            "opacity": 0
                        }, target, function() {
                            $(this).remove();
                        })
                    }
                    cache.pop();
                    // del the last one;
                }
            }
        })
        // default optss
    $.mask.defaults = {
        background: "#000",
        zIndex: 9999,
        opacity: 0.2,
        before: function() {},
        callback: function() {}
    };
})(jQuery, window);
