/**
 * jq.web.template - a javascript template library
 * Templating from John Resig - http://ejohn.org/ - MIT Licensed
 * url： http://ejohn.org/blog/javascript-micro-templating/
 *  ~fork and added support comment
 */
;(function($,window) {

    $.template = function(tmpl, data) {
        return (template(tmpl, data));
    };

    $.tmpl = function(tmpl, data) {
        return $(template(tmpl, data));
    };
    var template = function(str, data) {
        //If there's no data, let's pass an empty object so the user isn't forced to.
        if (!data)
            data = {};
        return tmpl(str, data);
    };
    ;(function() {
        var cache = {};
        this.tmpl = function tmpl(str, data) { 
            // Figure out if we're getting a template, or if we need to
            // load the template - and be sure to cache the result.
            var fn = !/\W/.test(str) ?
                cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML):
            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
            // Convert the template into pure JavaScript
            str
                .replace(/\/\/[\s\S]*?\n/g, " ") // comment  //  comment
                .replace(/<!--[\s\S]*?-->/g, " ") // comment   <!-- comment --> 
                .replace(/\/\*[\s\S]*?\*\//g, " ") // comment / * comment */
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'") + "');} return p.join('')"+
                ".replace("+ new RegExp("(\\>)[\\s\\r\\t]+(\\<)","g") +",'$1$2');"
                );
            // Provide some basic currying to the user
            return data ? fn(data) : fn;
        };

    })();
})(jQuery,window);
