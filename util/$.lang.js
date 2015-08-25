(function($){

    $.lang = $.lang || {};
    $.lang.obj2str = function(object) {
        var type = typeof object;
        if ('object' == type) {
            if (Array == object.constructor) type = 'array';
            else if (RegExp == object.constructor) type = 'regexp';
            else type = 'object';
        }
        switch (type) {
            case 'undefined':
            case 'unknown':
                return;
                break;
            case 'function':
            case 'boolean':
            case 'regexp':
                return object.toString();
                break;
            case 'number':
                return isFinite(object) ? object.toString() : 'null';
                break;
            case 'string':
                return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() {
                    var a = arguments[0];
                    return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : ""
                }) + '"';
                break;
            case 'object':
                if (object === null) return 'null';
                var results = [];
                for (var property in object) {
                    var value = $.lang.obj2str(object[property]);
                    if (value !== undefined) results.push($.lang.obj2str(property) + ':' + value);
                }
                return '{' + results.join(',') + '}';
                break;
            case 'array':
                var results = [];
                for (var i = 0; i < object.length; i++) {
                    var value = $.lang.obj2str(object[i]);
                    if (value !== undefined) results.push(value);
                }
                return '[' + results.join(',') + ']';
                break;
        }
    };
    $.lang.json2str = function(e) { 
        var t = $.lang;
        switch (typeof e) {
        case "string":
            return '"' + e.replace(/(["\\])/g, "\\$1") + '"';
        case "array":
            return "[" + e.map(t.json2str).join(",") + "]";
        case "object":
            if (e instanceof Array) {
                var n = [],
                    r = e.length;
                for (var i = 0; i < r; i++) n.push(t.json2str(e[i]));
                return "[" + n.join(",") + "]"
            }
            if (e == null) return "null";
            var s = [];
            for (var o in e) s.push(t.json2str(o) + ":" + t.json2str(e[o]));
            return "{" + s.join(",") + "}";
        case "number":
            return e;
        case !1:
            return e
        }
    }

})(jQuery)