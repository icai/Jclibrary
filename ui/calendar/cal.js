(function($) {
// What does the calendar plugin do?

$.calendar = function(options){
	var options = $.extend(true, {}, $.calendar.defaults, options);	
	if(!(this instanceof $.calendar)){
		return new $.calendar(options);
	}
	return this.initialize.apply(this,arguments);
};
var REG = /\d+/g,
	RDATE = /^((19|2[01])\d{2})-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01])$/;

$.calendar.prototype = {
	initialize:function(options) {
		this.options = options;
		var op = this.options;

		this.TEMPLATE = $.extend(true,{},this.TEMPLATE,options.TEMPLATE);
		this.DATENAME = $.extend(this.DATENAME,options.DATENAME);
		this.HOLIDAY = $.extend(this.HOLIDAY,options.HOLIDAY);
		this.DAYNAMES = options.dayNames.slice(options.firstDayOfWeek,7).concat(options.dayNames.slice(0,options.firstDayOfWeek));
		this.container = op.container;
		this.triggerNode = op.triggerNode;
		this.endTriggerNode = op.endTriggerNode;
		this.date = op.minDate;
		this.guid = 'Jc_calendar_' + new Date().getTime();
		this.guidClassName = 'Jc_calendar_'+ (this.container != '' ? 'event': 'input');
		this.activeInput = '';
		this.minDate = op.minDate;
		this.maxDate = op.maxDate;
		this.afterDays = op.afterDays;
		this.endafterDays = op.endafterDays;

		return this;
	},
	__init__:function(){
		var fn = this;
		var op = this.options;
		if(op.triggerNode || op.endTriggerNode){
			this.initEvent()
		}
		if(op.container){
			this.show();
		}
	},
	TEMPLATE:{
		WRAPPER:'<div class="Jc_calendar {guidClassName}" id="{guid}" >{TABLEBOX}{BTNBOX}</div>',
		TABLEBOX:'<div class="panel_content">{table}</div>',
		TABLE:'<div class="panel_item"><table class="" data-item="calendar_{count}">{CAPTION}{HEAD}{BODY}</table></div>',
			CAPTION:'<caption><div class="month_title">{year}年{month}月</div></caption>',
			HEAD:'<thead>{hrow}</thead>',
				HROW:'<tr>{hcell}</tr>',
					HCELL:'<th class="{isweekend}" >{week}</th>',
			BODY:'<tbody>{brow}</tbody>',
				BROW:'<tr>{cell}</tr>',
					BCELL:'<td class="{isweekend} {oldDate} {overDate}" data-bind="date" data-date="{date}"><div class="date_box"><div data-asyn="price" class="price"></div><div class="date {holidayclass}">{day}</div><div data-asyn="lowprice" class=""></div></div></td>',
					BCELL2:'<td></td>',
		BTNBOX:'<div class="btn_box">{NEXTBTN}{PREVBTN}{CLOSEBTN}</div>',
			NEXTBTN:'<a class="next_month disable" href="javascript:;" data-bind="nextbtn" title="下一月"><span>下一月</span></a>',
			PREVBTN:'<a class="prev_month" href="javascript:;" title="上一月" data-bind="prevbtn" ><span>上一月</span></a>',
			CLOSEBTN:'<a class="close_btn" href="javascript:;" title="关闭" data-bind="closebtn" >关闭</a>',
	},
    DATENAME: {
        "today": "今天",
        "yuandan": "元旦",
        "chuxi": "除夕",
        "chunjie": "春节",
        "yuanxiao": "元宵节",
        "qingming": "清明",
        "wuyi": "劳动节",
        "duanwu": "端午节",
        "zhongqiu": "中秋节",
        "guoqing": "国庆节"
    },
    HOLIDAYS: {
        yuandan: ["2012-01-01", "2013-01-01", "2014-01-01", "2015-01-01", "2016-01-01", "2017-01-01", "2018-01-01", "2019-01-01", "2020-01-01"],
        chuxi: ["2012-01-22", "2013-02-09", "2014-01-30", "2015-02-18", "2016-02-07", "2017-01-27", "2018-02-15", "2019-02-04", "2020-01-24"],
        chunjie: ["2012-01-23", "2013-02-10", "2014-01-31", "2015-02-19", "2016-02-08", "2017-01-28", "2018-02-16", "2019-02-05", "2020-01-25"],
        yuanxiao: ["2012-02-06", "2013-02-24", "2014-02-14", "2015-03-05", "2016-02-22", "2017-02-11", "2018-03-02", "2019-02-19", "2020-02-08"],
        qingming: ["2012-04-04", "2013-04-04", "2014-04-05", "2015-04-05", "2016-04-04", "2017-04-04", "2018-04-05", "2019-04-05", "2020-04-04"],
        wuyi: ["2012-05-01", "2013-05-01", "2014-05-01", "2015-05-01", "2016-05-01", "2017-05-01", "2018-05-01", "2019-05-01", "2020-05-01"],
        duanwu: ["2012-06-23", "2013-06-12", "2014-06-02", "2015-06-20", "2016-06-09", "2017-05-30", "2018-06-18", "2019-06-07", "2020-06-25"],
        zhongqiu: ["2012-09-30", "2013-09-19", "2014-09-08", "2015-09-27", "2016-09-15", "2017-10-04", "2018-09-24", "2019-09-13", "2020-10-01"],
        guoqing: ["2012-10-01", "2013-10-01", "2014-10-01", "2015-10-01", "2016-10-01", "2017-10-01", "2018-10-01", "2019-10-01", "2020-10-01"]
    },
	show:function(){
		var op = this.options;
		this.render(this.date);
		this.bindOne();
		this.asynRender(this.date,op.count);
	},
	hide:function(){
		$('#'+ this.guid).remove();
		this._unresize();
	},
	isOldDate:function(v){
		return this.minDate && this.parse(v) < this.parse(this.minDate)
	},
	isOverDate:function(v){
		return this.maxDate && this.parse(v) > this.parse(this.maxDate);
	},
	_getDateStatus: function(v) {
        return this.isOldDate(v) || this.isOverDate(v);
    },
	_getHolidaysClass: function(v, b) {
        var oHolidays = this.HOLIDAYS;
        switch (true) {
            case b:
            case !this.options.isHoliday: // no allow
                return '';
            case v == this.stringify(new Date):
                return 'today';
            case true:
                for (var property in oHolidays) {
                    if (~$.inArray(v, oHolidays[property])) return property;
                }
            default:
                return '';
        }
    },
    getDateInfo: function(v) {
        var iDiff = -1,
            sNowDate = this.stringify(new Date),
            sDateName = ['今天', '明天', '后天'];
        switch (true) {
            case v == sNowDate:
                iDiff = 0;
                break;
            case v == this.siblings(sNowDate, 1):
                iDiff = 1;
                break;
            case v == this.siblings(sNowDate, 2):
                iDiff = 2;
                break;
        }!this._dateMap && this.options.isHoliday && (this._dateMap = this._createDateMap());
        return this._dateMap && this._dateMap[v] || sDateName[iDiff] || this.week(v);
        					 // 节日 -     今日~ -   星期
    },
    _createDateMap: function() {
        var oTmp = {};
        for (var propety in this.HOLIDAYS) {
            var curHoliday = this.HOLIDAYS[propety];
            for (var i = 0; i < curHoliday.length; i++) {
                var sDate = curHoliday[i],
                    sName = this.DATENAME[propety];
                for (var j = 0; j < 7; j++) {
                    var curDate = this.siblings(sDate, j - 3);
                    (function(j, v) {
                        oTmp[curDate] = oTmp[curDate] ? j > 2 ? v : oTmp[curDate] : v;
                    })(j, sName + (j != 3 ? (j < 3 ? '前' : '后') + Math.abs(j - 3) + '天' : ''));
                }
            }
        }
        return oTmp;
    },
	render:function(date){
		var fn = this;
		var op = this.options;
		var reHtml = '';
		if(op.count > 1 ){
			reHtml = fn.renderHtml(this.date,op.count)
		}else{
			reHtml = fn.renderHtml(this.date);
		}
		if($('#'+ this.guid).length) $('#'+ this.guid).remove();
		if(this.container) $(this.container).empty();
		$(this.container || 'body').append(reHtml);
	},
	setPosition:function(){
		this.OFFSET = {
			position:'absolute',
			zIndex:this.options.zIndex,
			top:$(this.activeInput).offset().top + $(this.activeInput).outerHeight(),
			left:$(this.activeInput).offset().left
		};
		$('#'+this.guid).css(this.OFFSET);
	},
	asynRender:function(date){
	},
	renderHtml:function(date,len){
		var reHtml ='',tables = '',btnbox = '';
		var TEMPLATE = this.TEMPLATE;

		if(len === undefined || len == 1){
			tables = this.singleHtml(date);
		}else{
			tables = this.multiHtml(date,len);
		}
		btnbox = this.compile(TEMPLATE.BTNBOX,{
			nextbtn:TEMPLATE.NEXTBTN,
			prevbtn:TEMPLATE.PREVBTN,
			closebtn:TEMPLATE.CLOSEBTN
		});
		tablebox = this.compile(TEMPLATE.TABLEBOX,{
			table:tables
		})
		reHtml = this.compile(TEMPLATE.WRAPPER,{
			tablebox:tablebox,
			btnbox:btnbox,
			guid:this.guid,
			guidClassName:this.guidClassName
		});
		return reHtml;
	},
	singleHtml:function(date,count){
		var fn = this, op = this.options;
		var TEMPLATE = this.TEMPLATE;
		var table ='',caption = '',head = '',body ='',temp1 = '',temp2 = '';
		var year = date.getFullYear(),month = date.getMonth()*1,daylen = this.getMonthDays(year,month);
		var preEmpty = this.prefixLen(new Date(year,month,1));
		var firstDay = op.firstDayOfWeek;
		var count = count || 1;
			caption = this.compile(TEMPLATE.CAPTION,{
				year:year,
				month:month + 1
			});
			head = this.compile(TEMPLATE.HEAD,{
				hrow:(function(week){
					var t1 = '',t2 = '';
					var isweekend = fn.isWeekend(new Date(year,month,i)); 
					for (var i = 0; i < week.length; i++) {
						t1 += fn.compile(TEMPLATE.HCELL,{
							week:week[i],
							isweekend:i == (6 - firstDay) || (firstDay == 0 && i == 0 || i == (6 - firstDay +1)) && op.highlightWeekend.value ? op.highlightWeekend.className :''
						})
					};
					t2 = fn.compile(TEMPLATE.HROW,{
						hcell:t1
					});
					return t2;
				})(op.dayNames.slice(firstDay,7).concat(op.dayNames.slice(0,firstDay)))
			});
			body = this.compile(TEMPLATE.BODY,{
				brow:(function(week){
					var t1 = [],t2 = '';
					for (var i = 0; i < preEmpty; i++) {
						t1.push(TEMPLATE.BCELL2)
					};
					for (var i = 1; i <= daylen; i++) {
						var isweekend = fn.isWeekend(new Date(year,month,i));
						var curdate = fn.format(new Date(year,month,i),'YYYY-MM-dd');

						console.log(curdate);

						var dateState = fn._getDateStatus(curdate);
						var holidayclass = fn._getHolidaysClass(curdate, dateState);
						t1.push(fn.compile(TEMPLATE.BCELL,{
							date:curdate,
							day: !!holidayclass ? fn.DATENAME[holidayclass] : i,
							oldDate:op.disableOldDate.value && fn.isOldDate(curdate)? op.disableOldDate.className : '',
							overDate:op.disableOverDate.value && fn.isOldDate(curdate)? op.disableOverDate.className : '',
							holidayclass: fn.isOldDate(curdate) || fn.isOldDate(curdate) ? '': holidayclass,
							isweekend:isweekend && op.highlightWeekend.value ? op.highlightWeekend.className :''
						}))
					};
					var len = t1.length;
					for (var i = 0; i < 42 - len; i++) {
						t1.push(TEMPLATE.BCELL2)
					};
					t1 = fn.mergeArray(t1,7);
					for (var i = 0; i < t1.length; i++) {
						t2 += fn.compile(TEMPLATE.BROW,{
							cell:t1[i]
						});
					};
					return t2;
				})(op.dayNames.slice(firstDay,7).concat(op.dayNames.slice(0,firstDay)))
			});
			table = this.compile(TEMPLATE.TABLE,{
				caption: caption,
				head:head,
				body:body,
				count:count,
				year:year,
				month:month+1
			});
		return table;
	},
	multiHtml:function(date,len){
		var fn = this;
		var reHtml = '';
		for (var i = 0; i < len; i++) {
			var args = fn.siblingsMonth(date,i);
			reHtml += fn.singleHtml.call(fn,args,i+1);
		}
		return  reHtml;
	},
    getMonthDays:function(year, month) {
        var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
            monthDays[1] = 29
        }
        return monthDays[month]
    },
    prefixLen:function(date){
    	var op = this.options;
		var firstDay = op.firstDayOfWeek;
		var wkday = date.getDay(); // frist Date 
		return wkday >= firstDay ? (wkday - firstDay) : (7 - firstDay + wkday);
    },
    subfixLen:function(date){
    },
    isWeekend:function(date){
    	return date.getDay() == 0 || date.getDay() == 6;
    },
	fillLength:function(str,l, ch, isRight){
	    var source;
	    if ((source = String(str)).length < l) {
	            var ar = new Array(l - source.length);
	            ar[isRight ? 'unshift' : 'push'](source);
	            source = ar.join(ch || '0');
	    }
	    return source;
	},
	format:function(date,str) {
		var _fn = this;
		if(typeof date == 'string'){
			date = this.parse(date);
		}
	    var fn = date;
	    var wk = this.options.dayNames, 
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
	        p1f == 'D' && (val = wk[val]);
	        return val < 10 && p1.length > 1 ? _fn.fillLength(val,2) : String(val);
	    })
	},
    mergeArray:function(arr,k){
		var tarr = [];
        for (var i = 0; i < arr.length/k; i++) {
        	var str = '';
        	for (var j = 7 * i; j < k * (i+ 1); j++) {
        		if(arr[j] == undefined)break;
        		str+= arr[j];
        	};
        	tarr.push(str);
        };
        return tarr;
    },
	repeat:function(str,n){
		var n = n || 1;
		return new Array(n+1).join(str);
	},
	compile: function(s, d) {
		for (var p in d)
		s = s.replace(new RegExp('{' + p + '}', 'ig'), d[p]);
		return s;
	},
	week: function(v) {
        return this.options.weekPrefix + this.options.dayNames[this.parse(v).getDay()];
    },
    parse: function(v) {
        v = v.match(REG);
        return v ? new Date(v[0], v[1] - 1, v[2]) : null;
    },
	isDate: function(v) {
		if (v instanceof Date) {
			return true;
		}
		return false;
	},
    stringify: function(v) {
        if (!this.isDate(v)) return null;
        return v.getFullYear() + '-' + this.filled(v.getMonth() * 1 + 1) + '-' + this.filled(v.getDate());
    },
    siblings: function(v, n) {
        v = v.match(REG);
        return this.stringify(new Date(v[0], v[1] - 1, v[2] * 1 + n * 1));
    },
    siblingsMonth: function(v, n) {
        return new Date(v.getFullYear(), v.getMonth() * 1 + n);
    },
    filled: function(v) {
        return String(v).replace(/^(\d)$/, '0$1');
    },
    differ: function(v1, v2) {
        return parseInt(Math.abs(this.parse(v1) - this.parse(v2)) / 24 / 60 / 60 / 1000);
    },
    nextMonth:function(){
		var fn = this;
		var op = this.options;
		this.date = this.siblingsMonth(this.date,op.stepMonth);
		this.show();
    },
    prevMonth:function(){
		var fn = this;
		var op = this.options;
		this.date = this.siblingsMonth(this.date,-(op.stepMonth));
		this.show();
    },
    nextYear:function(){

    },
    prevYear:function(){

    },
    docfire: function (hidelist, callback) { // docuemnt事件触发
        var plist = typeof hidelist == "string" ? hidelist.split(0) : hidelist;
        function checkin(etg, list) {
            var k = 1, p = list;
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
        $(document).bind(hash, function (e) {
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
    },
    ontriggerNode:function(){

    },
    onendTriggerNode:function(){

    },
    _dateEvent:{
    	mouseenter:function(e){

    	},
    	mouseleave:function(e){

    	},
		click:function(e){
			var dv = $(e.currentTarget).data('date');

			if(this.activeInput){
				this.date = this.parse(dv);
				switch(this.activeInput){
					case this.triggerNode:
						this.triggerDate = dv;
					break;
					case this.endTriggerNode:
						this.endTriggerDate = dv;
					break;
				}
				var	dvformat = this.format(dv,this.options.format);
				$(this.activeInput).val(dvformat);
				 this.hide();
			}
			if(this.container){
				this.ondateClick.call(this,dv);
			}
		},
    },
    _resize:function(){
    	this.setPosition();
    },
    _unresize:function(){
    	$(window).off('resize.'+this.guid);
    },
    _input:{
		focus:function(jid,trigger,e){

			this.activeInput = jid;
			this['on'+ trigger ]();
			this.show();
			this.setPosition();
		}
    },
	_btnEvent:{
		nextbtn:function(){
			this.nextMonth();
			if(!this.container) this.setPosition();
			
		},
		prevbtn:function(){
			this.prevMonth();
			if(!this.container) this.setPosition();
			
		},
		closebtn:function(){
			this.hide();
		}
	},
	bindOne:function(){ // after show event
		var fn = this;
		var op = this.options;
		for( var i in this._btnEvent){
			$('#'+this.guid).on('click','[data-bind="' + i + '"]', $.proxy(this._btnEvent[i],this));
		}
		for(var i in this._dateEvent){
			$('#'+this.guid).on(i,'[data-bind="date"]', $.proxy(this._dateEvent[i],this));
		}

		if(this.triggerNode || this.endTriggerNode){
			$(window).on('resize.'+this.guid,$.proxy(this._resize,this));
			this.docfire(['#'+this.guid,this.triggerNode,this.endTriggerNode],function(v){
				$(document).unbind(v);
				fn._btnEvent.closebtn();

			})
		}
	},
	initEvent:function(){ // init bind event 
		if(this.triggerNode || this.endTriggerNode){
			for(var i in this._input){
				if(i == 'blur') continue;
				$(this.triggerNode).on(i,$.proxy(this._input[i],this,this.triggerNode,'triggerNode'));
				$(this.endTriggerNode).on(i,$.proxy(this._input[i],this,this.endTriggerNode,'endTriggerNode'));	
			}
		}
	}
}


$.calendar.defaults = {
	container:'',
	triggerNode:'',
	endTriggerNode:'',
	position:'auto',
	format:'YYYY-MM-dd',   //  return to callback(_callback) func
	count:2, //
	stepMonth:1,

	startDate:new Date,

	minDate:new Date,
	maxDate:null,
	afterDays:null,
	endafterDays:null,


	disableOldDate:{
		value:true,
		className:'oldDate'
	},
	disableOverDate:{
		value:true,
		className:'overDate'
	},
	highlightWeekend:{
		value:true,
		className:'weekend'
	},
	hoverAfterDay:{
		value:false,
		className:'hover',
		calculate:false
	},

	firstDayOfWeek:0,
	monthNames:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // 
	dayNames:['日', '一', '二', '三', '四', '五', '六'], //['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // 
	weekPrefix:'星期',
	isHoliday:true,
	asynRender:true,
	callback:function(){

	}
};

})(jQuery);








