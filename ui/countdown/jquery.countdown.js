// The MIT License (MIT)
// Copyright (c) 2013 icai
//  https://github.com/icai/countDown

(function($,undefined) {

String.prototype.fillLength = function(l, ch, isRight){
    var source;
    if ((source = String(this)).length < l) {
            var ar = new Array(l - source.length);
            ar[isRight ? 'unshift' : 'push'](source);
            source = ar.join(ch || '0');
    }
    return source;
};
// helper function


$.countDown = function(obj,options){
	if(!(this instanceof $.countDown)){
		return new $.countDown(obj,options);
	}
	this.initialize.apply(this,arguments);
};

$.countDown.prototype = {
	initialize:function($obj,options){
		this.container = $obj,
		this.setting = options;
		this.endFlag = true;
		this.refresh();
	},
	format:function(diff) {
		var dateD={y:0,Y:0,M:0,d:0,h:0,m:0,s:0,x:0,X:0};
		var _map =  {
			y: ['getYear', 31104000000],
			Y: ['getFullYear', 31104000000, '年前'],
			M: ['getMonth', 2592000000, '个月前'],
			d: ['getDate', 86400000, '天前'],
			h: ['getHours', 3600000, '小时前'],
			m: ['getMinutes', 60000, '分钟前'],
			s: ['getSeconds', 1000, '秒前'],
			x: ['getMilliseconds', 1, '毫秒前'],
			X: ['getMilliseconds', 1, '毫秒前']
		},
		_units =  ['Y', 'M', 'd', 'h', 'm', 's','X'];
		for (var i = 0; i < _units.length; i++) {
	        if (diff >= _map[_units[i]][1]) {
	        	this.endFlag = false;
	          dateD[_units[i]] = Math.floor(diff / _map[_units[i]][1]);
	          diff -= dateD[_units[i]] * _map[_units[i]][1];
	        }
		};
		if(!this.setting.hasMonth){
			dateD.d += (dateD.M *  _map['M'][1] + dateD.Y * _map['Y'][1])/_map['d'][1];
			dateD.M = 0,dateD.Y = 0;
		}
		dateD.y = dateD.Y,dateD.x = ~~(dateD.X/100);
		return dateD;
	},
	render:function(data,tmpl){
		if(this.endFlag && this.setting.onEnd && this.setting.onEnd.call(this,data) == false){
			this.__clearTimefn(this.__timer);
			return false;
		}
		if(this.setting.onRender && this.setting.onRender.call(this,data) == false){
			return false;
		}
		tmpl = this.compile(this.setting.template,data);
		this.container.html(tmpl);
	},
	compile: function(s, d) {
		for (var p in d)
		s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
		return s;
	},
    differ: function(v1, v2) {
        return parseInt(this.getTime(v1) - this.getTime(v2));
    },
    getTime: function(v) {
    	if(! (v instanceof Date)){
    		v = new Date(v);
    	}
    	return v.getTime();
    },
	refresh:function(){
		var fn = this,
			op = this.setting,
			seTimefn =  !!op.refresh ?  window.setInterval : window.setTimeout;
			fn.__clearTimefn = !!op.refresh ?  window.clearInterval : window.clearTimeout;
			fn.__timer;
		fn.__timer =  seTimefn(function(startTime){
			startTime =  !!op.refresh ? new Date() : op.startTime;
			fn.render( fn.format(fn.differ(op.endTime,startTime)) )
		},op.refresh)
	}
}


$.fn.countDown = function(options) {
  if (!this.length) { return this; }
  var opts = $.extend(true, {}, $.fn.countDown.defaults, options);

  this.each(function() {
    var $this = $(this);
    	$.countDown($this,opts);
  });
  return this;
};

$.fn.countDown.defaults = {
	endTime:1,
	startTime:new Date(),
	refresh:1000,
	template:'{h}:{m}:{s}.{x}',
	hasMonth:false,
	onRender:undefined,
	onEnd:undefined,
};

})(jQuery);

