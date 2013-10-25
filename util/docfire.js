


/**
 * 点击 页面任何一个位置关闭 窗体
 * @param  {[String || Array]}   hidelist 不能点击的元素
 * @param  {Function} callback   回调函数  event::ev 事件对象,  
 *                                         string::'mouseup.'+(new Date).getTime() 用于解除绑定
 */
function docfire(hidelist, callback) { 

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
    var hash = 'mouseup.' + time;
    $(document).bind(hash, function(e) {
        var ev = e;
        if (checkin(ev, plist)) {
            if (typeof callback != undefined && a.isFunction(callback)) {
                callback.call(this, ev, hash);
            } else {
                for (var i = 0; i < plist.length; i++) {
                    $(plist[i]).hide();
                };
            }
        }
    })
}