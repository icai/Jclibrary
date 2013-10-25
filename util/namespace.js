

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
       $.console[name].apply($.console,arguments);
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







})(jQuery,this);




(function(a,b){

    var time318_job = function(){

    };
    var time319_job = function(){

    };
    $.config({namespace:'stk'}).namespace('ui.dialog',time318_job).namespace('ui.bvc',time319_job);

    var time320_job = function(){

    };
    var time321_job = function(){

    };
    $.config({namespace:'stk'}).namespace('ui.dialog',time320_job).namespace('ui.bvc',time321_job);




})(jQuery,window)




$.fn.Calendar.festival ={
        HOLIDAYS: {
            yuandan: ["2012-01-01", "2013-01-01", "2014-01-01", "2015-01-01", "2016-01-01", "2017-01-01", "2018-01-01", "2019-01-01", "2020-01-01"],
            chuxi: ["2012-01-22", "2013-02-09", "2014-01-30", "2015-02-18", "2016-02-07", "2017-01-27", "2018-02-15", "2019-02-04", "2020-01-24"],
            chunjie: ["2012-01-23", "2013-02-10", "2014-01-31", "2015-02-19", "2016-02-08", "2017-01-28", "2018-02-16", "2019-02-05", "2020-01-25"],
            yuanxiao: ["2012-02-06", "2013-02-24", "2014-2-14", "2015-03-05", "2016-02-22", "2017-02-11", "2018-03-02", "2019-02-19", "2020-02-8"],
            qingming: ["2012-04-04", "2013-04-04", "2014-04-05", "2015-04-05", "2016-04-04", "2017-04-04", "2018-04-05", "2019-04-05", "2020-04-04"],
            wuyi: ["2012-05-01", "2013-05-01", "2014-05-01", "2015-05-01", "2016-05-01", "2017-05-01", "2018-05-01", "2019-05-01", "2020-05-01"],
            duanwu: ["2012-06-23", "2013-06-12", "2014-06-02", "2015-06-20", "2016-06-09", "2017-05-30", "2018-06-18", "2019-06-07", "2020-06-25"],
            zhongqiu: ["2012-09-30", "2013-09-19", "2014-09-08", "2015-09-27", "2016-09-15", "2017-10-04", "2018-09-24", "2019-09-13", "2020-10-01"],
            guoqing: ["2012-10-01", "2013-10-01", "2014-10-01", "2015-10-01", "2016-10-01", "2017-10-01", "2018-10-01", "2019-10-01", "2020-10-01"]
        },
}



节日






$('.container').Calendar({
    visible:1,
    limitday:0,
    festival:{
        normal:true,

    }
    data:function(){
        this.setData();
    }
    callback:function(){

    }
    
})











