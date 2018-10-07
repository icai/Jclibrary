(function($) {
    var JsLoader = function() {
        this.loaded = false;
        this.onload = function() {};
        this.onerror = function() {};
    };
    JsLoader.scriptId = 1;
    JsLoader.prototype.load = function(src, doc, charset) {
        var sId = JsLoader.scriptId;
        JsLoader.scriptId++;
        var o = this;
        setTimeout(function() {
            o._load2.apply(o, [sId, src, doc, charset]);
            o = null;
        }, 0);
    };
    JsLoader.prototype._load2 = function(sId, src, doc, charset) {
        var self = this;
        var _doc = doc || document;
        charset = charset || "utf-8";
        var ua = navigator.userAgent;
        var _ie = ua.match(/MSIE/);
        var _js = _doc.createElement("script");
        var $js = $(_js);
        var eventType = _ie ? 'readystatechange' : 'load';
        $js.on(eventType, function(e) {
            var $this = $(this);
            if (_ie) {
                if (_js && !(_js.readyState == "complete" || _js.readyState == "loaded")) {
                    return;
                }
            }
            self.onload();
            $this.remove();
            _js = null;
        });
        if (!_ie) {
            $js.on('error', function(e) {
                var $this = $(this);
                self.onerror();
                $this.remove();
                _js = null;
            });
        }
        _js.id = "js_" + sId;
        _js.async = true;
        _js.charset = charset;
        _js.src = src;
        _doc.getElementsByTagName("head")[0].appendChild(_js);
    };
    $.jsLoader = function(options, success) {
        var settings = {
            url: '',
            charset: 'utf-8',
            success: function() {},
            error: function() {}
        };
        $.extend(settings, options);
        var jsLoader = new JsLoader();
        jsLoader.onload = settings.success;
        jsLoader.onerror = settings.error;
        jsLoader.load(settings.url, document, settings.charset);
    };
})(jQuery);