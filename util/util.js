
(function($,exports) {
// What does the namespace plugin do?


$.config = function(options) {

    var opts = $.extend(true, {}, $.config.defaults, options);

    for( var i in opts){
        $.config[i] = opts[i];

        console.log($.config[i])
    }
    exports[opts.namespace] = exports[opts.namespace]|| {};


    $.config.flog = true;

    return this;
};


$.config.defaults = {
        namespace:'itour',
        debug:true,
        charset:'utf-8',
        version:"1.0",
        list:{
                swf:'',
                ui:{
                    dailog:'',
                },
                util:{},
                array:{},
                date:{},
                string:{},
                browser:{}    
        }
}

$.namespace = function(c, d) {
    if(!$.config && !$.config.namespace){
        throw new Error("your namespace undefined.")
    }

    var e = c.split("."),
        f = exports[$.config.namespace],
        g = null;
    while (g = e.shift()) if (e.length) {
        f[g] === undefined && (f[g] = {});
        f = f[g]
    } else if (f[g] === undefined) try {
        f[g] = d
    } catch (h) {
        
    }
  return this;
};
//test pass 

$.browser = (function(){
     var W = navigator.userAgent.toLowerCase(),
         t = {
            msie6: /msie 6\.0/,
            // msie7: /msie 7\.0/,
            // msie8: /msie 8\.0/,
            // msie9: /msie 9\.0/,
            // msie10: /msie 10\.0/,
            iPad: /ipad/,
            iPhone: /iphone/,
            android: /android/,
            mozilla :/(mozilla)(?:.*? rv:([\w.]+))?.*?(gecko)\//,
            webkit :/(webkit)[ \/]([\w.]+)/,
            opera :/(opera)(?:.*version)?[ \/]([\w.]+)/,
            msie :/(msie) ([\w.]+)/
        },version = "0";

    for (var v in t) {
        var match = false;
        if(t[v].test(W)){
             match = true;
             version = RegExp.$2;
             RegExp.$2 = undefined;
        }
        t[v] = match;
    };
    t.version = version;
    return t;
})()
//test pass 

$.console = window.console || {};
$.each('log debug info warn error'.split(" "),function(i,name){
    $[name] =  function(){
       ($.console[name] || function noop(){}).apply($.console,arguments);
    };
})

//test pass 


$.docfire = function(hidelist, callback) { // docuemnt事件触发

    var plist = typeof hidelist == "string" ? hidelist.split(0) : hidelist;
    function checkin(etg, list) {
        var k = 1,
            p = list;
        for (var i = 0; i < p.length; i++) {
            var nodelist = !$(etg.target).closest(p[i]).length;
            if (!nodelist) {
                return 0;
            }
            k = nodelist && k;
        };
        return k;
    }
    var time = (new Date).getTime();
    var hash = 'mousedown.' + time;
    $(document).bind(hash, function(e) {
        var ev = e;
        if (checkin(ev, plist)) {
            if (typeof callback != undefined && $.isFunction(callback)) {
                callback.call(this, ev, hash);
            } else {
                for (var i = 0; i < plist.length; i++) {
                    $(plist[i]).hide();
                };
            }
        }
    })
}


$.callback = function(){

}

$.require  = function(){
}


String.prototype.repeat = function(n) {
    var n = n || 1;
    return Array(n + 1).join(this);
};


String.prototype.fillLength = function(l, ch, isRight){
    var source;
    if ((source = String(this)).length < l) {
            var ar = new Array(l - source.length);
            ar[isRight ? 'unshift' : 'push'](source);
            source = ar.join(ch || '0');
    }
    return source;
};

Date.prototype.format = function(str) {
    var fn = this;
    var lang ='zh-CN',
        wk = {
            'en':['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            "zh-CN":['日', '一', '二', '三', '四', '五', '六']
        }, 
        map={y:"getYear",Y:"getFullYear",M:"getMonth",d:"getDate",h:"getHours",m:"getMinutes",s:"getSeconds",D:"getDay"};

    var val,p1f;
    var _re =  /([yYMdhmsD]{1,4})/g;
    return str.replace(_re,function(match,p1,offset,s){
        p1f = p1.charAt(0);
        if(!map[p1f]) return match;
        val = fn[map[p1f]]();
        p1f == 'y' && (val %= 100);
        (p1f.toLowerCase() == 'y') && (p1.length == 4) && (val = fn[map['Y']]())
        p1f == 'M' && val++;
        p1f == 'D' && (val = wk[lang][val]);
        return val < 10 && p1.length > 1 ? String(val).fillLength(2) : String(val);
    })
}



// timemap: {
//             _re: /\{([_yYMdhms]{1,2})(?:\:([\d\w\s]))?\}/g,
//             _map: {
//                 y: ['getYear', 31104000000],
//                 Y: ['getFullYear', 31104000000, '年前'],
//                 M: ['getMonth', 2592000000, '个月前'],
//                 d: ['getDate', 86400000, '天前'],
//                 h: ['getHours', 3600000, '小时前'],
//                 m: ['getMinutes', 60000, '分钟前'],
//                 s: ['getSeconds', 1000, '秒前']
//             },
//             _units: ['Y', 'M', 'd', 'h', 'm', 's']
// },
// timeFormatString:function(date, ptn, baseTime) {
//     try {
//         date = date.getTime ? date : (new Date(date));
//     } catch(ign) {
//         return '';
//     }
//     var fn = this;
//     var me = this.timemap,
//         map = me._map,
//         unt = me._units,
//         rel = false,
//         t, delta, v;
//     if(!ptn) {
//         baseTime = baseTime || new Date();
//         delta = Math.abs(date - baseTime);
//         for(var i = 0, len = unt.length; i < len; ++i) {
//             t = map[unt[i]];
//             if(delta > t[1]) {
//                 return Math.floor(delta / t[1]) + t[2];
//             }
//         }
//         return "刚刚";
//     } else {
//         return ptn.replace(me._re, function($0, b, c) {
//             (rel = b.charAt(0) == '_') && (b = b.charAt(1));
//             if(!map[b]) {
//                 return $0;
//             }
//             if(!rel) {
//                 v = date[map[b][0]]();
//                 b == 'y' && (v %= 100);
//                 b == 'M' && v++;
//                 return v < 10 ? fn.fillLength(v, 2, c) : v.toString();
//             } else {
//                 return Math.floor(Math.abs(date - baseTime) / map[b][1]);
//             }
//         });
//     }
// },




})(jQuery,this);