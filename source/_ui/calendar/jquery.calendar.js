/**
 *  plugin :calendar 
 *  author: caiguangsong
 *  
 *  notice :some code form kissy travel calendar
 */


(function(window, $, undefined) {

    $.calendar = function(options) {
        var options = $.extend(true, {}, $.calendar.defaults, options);
        if (!(this instanceof $.calendar)) {
            return new $.calendar($.extend(true, {}, options, {
                autoRender: $.type(options.autoRender) == 'boolean' ? options.autoRender : true
            }));
        }
        this.initialize.apply(this, arguments);
        if (options.autoRender)
            this.trigger('render');
    };
    var REG = /\d+/g,
        RDATE = /^((19|2[01])\d{2})-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01])$/;

    var Events = {
        on: function(id, fn, lazyinit) {
            this._events || (this._events = {});
            var set = (this._events[id] || (this._events[id] = []));
            var handler = {
                fn: fn
            };
            set.push(handler);
            return this;
        },
        off: function(id) {
            if (this._events[id]) delete this._events[id];
        },
        trigger: function(id, data) {
            var fn = this;
            var handles = this._events[id];
            if (handles) {
                for (var i = 0; i < handles.length; i++) {
                    if ((handles[i].fn.apply(fn, data || (data = []))) === false) {
                        return false;
                    }
                };
            }
        }
    };


    $.calendar.prototype = {
        initialize: function(options) {
            var fn = this;
            this.setting = options;
            var op = this.setting;
            jQuery.extend(this, Events); // extend;

            this.TEMPLATE = $.extend(true, {}, this.TEMPLATE, options.TEMPLATE);
            // this.DATENAME = $.extend(this.DATENAME,options.DATENAME);
            // this.HOLIDAY = $.extend(this.HOLIDAY,options.HOLIDAY);
            //this.DAYNAMES = options.dayNames.slice(options.firstDayOfWeek,7).concat(options.dayNames.slice(0,options.firstDayOfWeek));

            this.guid = 'Jc_calendar_' + new Date().getTime();
            this.guidClassName = 'Jc_calendar_' + (op.container != '' ? 'event' : 'input');
            this.activeNode = '';
            this.ajaxActive = undefined;
            this.disabledEndDate = true;

            this.weekico = '[data-bind="week"]';
            this.on('render', $.proxy(this._setup, this));

        },
        _setup: function() {
            var fn = this;
            var op = this.setting;


            this.minDate = this.stringify(new Date);
            this.maxDate = undefined;


            this.curDate = this.minDate || this.stringify(new Date); // pointer

            if (op.afterDays) {
                this.afterDays = op.afterDays;
            }
            if (op.triggerNode || op.endTriggerNode) {
                this.initEvent()
            }
            var op = this.setting;
            if (op.container) {
                this.render();
            }
            if (this.trigger('init') !== false) { // init input value
                (op.triggerNode || op.endTriggerNode) && this.setInitialValue();
            }
            this.on('aftershow', function(evt) {
                if ((op.triggerNode || op.endTriggerNode) && !op.container) {
                    $(window).on('resize.' + this.guid, function() {
                        fn._winEvent.resize.call(fn)
                    }).trigger('resize.' + this.guid);

                    this.docfire(['#' + this.guid, op.triggerNode, op.endTriggerNode], function(v) {
                        $(document).off(v);
                        fn._btnEvent.close.call(fn, {
                            currentTarget: window
                        });
                        fn._winEvent.unresize.call(fn, {
                            currentTarget: window
                        });
                    })
                }
            })

        },
        $: function(selector) {
            return this.getDom().find(selector);
        },
        getDom: function() {
            return $('#' + this.guid);
        },
        fillLength: function(str, l, ch, isRight) {
            var source;
            if ((source = String(str)).length < l) {
                var ar = new Array(l - source.length);
                ar[isRight ? 'unshift' : 'push'](source);
                source = ar.join(ch || '0');
            }
            return source;
        },
        mergeArray: function(arr, k) {
            var tarr = [];
            for (var i = 0; i < arr.length / k; i++) {
                var str = '';
                for (var j = k * i; j < k * (i + 1); j++) {
                    if (arr[j] == undefined) break;
                    str += arr[j];
                };
                tarr.push(str);
            };
            return tarr;
        },
        repeat: function(str, n) {
            var n = n || 1;
            return new Array(n + 1).join(str);
        },
        compile: function(s, d) {
            for (var p in d)
                s = s.replace(new RegExp('{' + p + '}', 'ig'), d[p]);
            return s;
        },
        setInitialValue: function() {
            var op = this.setting;
            var curdate = this.stringify(new Date);
            this.cacheTriggerDate(op.triggerNode, curdate);
            this.setDateString($(op.triggerNode), curdate);
            this._setDefaultDate();
            this.cacheTriggerDate(op.endTriggerNode, this.siblings(curdate, 1));
            this.setDateString($(op.endTriggerNode), this.siblings(curdate, 1));
        },
        setDateString: function(jobj, dateStr) { //  overwrite this to set  date value
            jobj.val(dateStr).parent().children('[data-bind="week"]').text(this.getDateInfo(dateStr));
        },
        cacheTriggerDate: function(node, date) {
            var op = this.setting;
            switch (node) {
                case op.triggerNode:
                    this.triggerDate = date;
                    break;
                case op.endTriggerNode:
                    this.endTriggerDate = date;
                    break;
            }
        },
        _setDefaultDate: function() {
            var op = this.setting;
            if (this.activeNode == op.triggerNode) {
                this.startDate = undefined;
            }
            if (this.startDate) {
                this.minDate = this.startDate;
            }

            if (this.afterDays != -1) {
                this.maxDate = this.siblings(this.minDate, this.afterDays);
            } else {
                this.maxDate = this.siblings(this.minDate, 999);
            }
        },
        TEMPLATE: {
            WRAPPER: '<div class="Jc_calendar {guidClassName}" >{TABLEBOX}{BTNBOX}</div>',
            TABLEBOX: '<div class="panel_content" data-bind="refresh" >{table}</div>',
            TABLE: '<div class="panel_item " id="panel_calendar_{count}"><table class="" data-item="calendar_{count}">{CAPTION}{HEAD}{BODY}</table></div>',
            CAPTION: '<caption><div class="month_title">{year}年{month}月</div></caption>',
            HEAD: '<thead>{hrow}</thead>',
            HROW: '<tr>{hcell}</tr>',
            HCELL: '<th class="{isweekend}" >{week}</th>',
            BODY: '<tbody>{brow}</tbody>',
            BROW: '<tr>{cell}</tr>',
            BCELL: '<td class="{isweekend} {oldDate} {overDate}" data-bind="date" data-date="{date}"><div class="date_box"><div data-asyn="price" class="price"></div><div class="date {holidayclass}">{day}</div><div data-asyn="lowprice" class=""></div></div></td>',
            BCELL2: '<td></td>',
            BTNBOX: '<div class="btn_box">{NEXTBTN}{PREVBTN}{CLOSEBTN}</div>',
            NEXTBTN: '<a class="next_month disable" href="javascript:;" data-bind="next" title="下一月"><span></span></a>',
            PREVBTN: '<a class="prev_month" href="javascript:;" title="上一月" data-bind="prev" ><span></span></a>',
            CLOSEBTN: '<a class="close_btn" href="javascript:;" title="关闭" data-bind="close" >关闭</a>',

            SELECT: '<select data-bind="{event}" class="select {changeDate}">{selectoption}</select>',
            SELECTOPTION: '<option value="{option}" {selected}>{option}</option>'

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
        isOldDate: function(v) {
            return this.minDate && this.parse(v) < this.parse(this.minDate)
        },
        isOverDate: function(v) {
            return this.maxDate && this.parse(v) > this.parse(this.maxDate);
        },
        isRangeDate: function(v) {
            return !this._getDateStatus(v);
        },
        _getDateStatus: function(v) {
            return this.isOldDate(v) || this.isOverDate(v);
        },
        _getHolidaysClass: function(v, b) {
            var oHolidays = this.HOLIDAYS;
            switch (true) {
                case b:
                case !this.setting.isHoliday: // no allow
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
            }!this._dateMap && this.setting.isHoliday && (this._dateMap = this._createDateMap());
            return this._dateMap && this._dateMap[v] || sDateName[iDiff] || this.week(v);
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
        getMonthDays: function(year, month) {
            var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
                monthDays[1] = 29
            }
            return monthDays[month]
        },
        prefixLen: function(date) {
            var op = this.setting;
            var firstDay = op.firstDayOfWeek;
            var wkday = date.getDay(); // frist Date 
            return wkday >= firstDay ? (wkday - firstDay) : (7 - firstDay + wkday);
        },
        isWeekend: function(date) {
            return date.getDay() == 0 || date.getDay() == 6;
        },
        format: function(date, str) {
            var _fn = this;
            if (typeof date == 'string') {
                date = this.parse(date);
            }
            var fn = date;
            var wk = this.setting.dayNames,
                map = {
                    y: "getYear",
                    Y: "getFullYear",
                    M: "getMonth",
                    d: "getDate",
                    h: "getHours",
                    m: "getMinutes",
                    s: "getSeconds",
                    D: "getDay"
                };
            var val, p1f;
            var _re = /([yYMdhmsD]{1,4})/g;
            return str.replace(_re, function(match, p1, offset, s) {
                p1f = p1.charAt(0);
                if (!map[p1f]) return match;
                val = fn[map[p1f]]();
                p1f == 'y' && (val %= 100);
                (p1f.toLowerCase() == 'y') && (p1.length == 4) && (val = fn[map['Y']]())
                p1f == 'M' && val++;
                p1f == 'D' && (val = wk[val]);
                return val < 10 && p1.length > 1 ? _fn.fillLength(val, 2) : String(val);
            })
        },
        week: function(v) {
            return this.setting.weekPrefix + this.setting.textNames.dayNames[this.parse(v).getDay()];
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
        between: function(v1, v2) {
            return parseInt((this.parse(v1) - this.parse(v2)) / 24 / 60 / 60 / 1000);
        },

        show: function() {
            this.getDom().show();
            this.trigger('aftershow');
        },
        hide: function() {
            this.getDom().hide();
        },
        setPositionOffset: function() {
            var _activeNode;
            if ($(this.activeNode).length > 1) {
                _activeNode = $(this.activeNode).filter(':visible');
            } else {
                _activeNode = $(this.activeNode);
            };
            this.getDom().css({
                position: 'absolute',
                zIndex: this.setting.zIndex
            })
            this.OFFSET = {
                top: _activeNode.offset().top + _activeNode.outerHeight(),
                left: (this.getDom().width() + _activeNode.offset().left > document.documentElement.clientWidth) ?
                    _activeNode.offset().left + _activeNode.outerWidth() - this.getDom().width() : _activeNode.offset().left
            };
            this.getDom().css(this.OFFSET);
        },
        render: function(date) {
            var op = this.setting;
            (op.triggerNode || op.endTriggerNode) && this._setDefaultDate();
            this.renderUI(date || this.minDate);
            this.afterRender(date || this.minDate);
        },
        afterRender: function(date) {
            var fn = this;
            var op = this.setting;
            if (this._bindEvented) {
                this.show();
            } else {
                this.bindEvent();
                this.show();
                this._bindEvented = true;
            }
            fn.trigger('afterRender', [date, fn.setting.count]);
        },
        _resetFlagValue: function() {
            this._selectrender = false;
        },
        renderUI: function(date) {
            var fn = this;
            var op = this.setting;
            this._resetFlagValue();

            var reHtml = fn.renderHtml(date, op.count);
            if (this.getDom().length)
                this.getDom().html(reHtml);
            else {
                var wrapper = $('<div />', {
                    id: this.guid,
                    role: 'calendar'
                }).append(reHtml);
                if (op.container) $(op.container).empty();
                $(op.container || 'body').append(wrapper);
            }
            this.selectRange();
        },
        selectRange: function() {
            var fn = this;
            var op = this.setting;

            if (this.disabledEndDate === true) {
                return false;
            }
            if (!!(this.triggerDate && this.endTriggerDate) && !!op.classNames.selectRangeDay) {
                var _start = this.triggerDate,
                    _end = this.endTriggerDate;
                this.getDom().find('[data-bind="date"]').each(function(i, el) {
                    var el = $(el),
                        _cur = el.data('date');
                    if (_start <= _cur && _cur <= _end) {
                        el.addClass(op.classNames.selectRangeDay);
                    }
                })
            }
        },
        renderHtml: function(date, len) {
            var reHtml = '',
                tables = '',
                btnbox = '';
            var TEMPLATE = this.TEMPLATE;

            if (len === undefined || len == 1) {
                tables = this.renderOne(date);
            } else {
                tables = this.renderMulti(date, len);
            }
            btnbox = this.compile(TEMPLATE.BTNBOX, {
                nextbtn: TEMPLATE.NEXTBTN,
                prevbtn: TEMPLATE.PREVBTN,
                nextyearbtn: TEMPLATE.NEXTYEARBTN,
                prevyearbtn: TEMPLATE.PREVYEARBTN,
                todaybtn: TEMPLATE.TODAYBTN,
                closebtn: TEMPLATE.CLOSEBTN
            });
            tablebox = this.compile(TEMPLATE.TABLEBOX, {
                table: tables
            })
            reHtml = this.compile(TEMPLATE.WRAPPER, {
                tablebox: tablebox,
                btnbox: btnbox,
                guidClassName: this.guidClassName
            });
            return reHtml;
        },
        isElement: function(el, str) {
            return new RegExp('^\\s*(?:<(' + el + ')[\\s\\S]*?(?=<(\\1)|<\\\/\\1>|$))(?!<\\\/\\1>)\\s*$', 'ig').test(str);
        },
        renderSelect: function(type, currentValue) {
            var fn = this,
                op = this.setting;
            var TEMPLATE = this.TEMPLATE;
            var ry = [];
            if (type == 'year') {
                if (currentValue > op.rangeYear[1])
                    ry = [op.rangeYear[0], currentValue];
                else if (currentValue < op.rangeYear[0])
                    ry = [currentValue, op.rangeYear[1]];
                else
                    ry = op.rangeYear;
            }
            var range = type == 'year' ? ry : [1, 12];
            var
                temp1 = this.compile(TEMPLATE.SELECT, {
                    'event': type,
                    changeDate: op.classNames.changeDate || '',
                    selectoption: (function(range) {
                        var t1 = '';
                        for (var i = range[0]; i <= range[1]; i++) {
                            t1 += fn.compile(TEMPLATE.SELECTOPTION, {
                                option: i,
                                selected: i == currentValue ? 'selected="selected"' : ''
                            })
                        };
                        return t1;
                    })(range)
                })
            return temp1;
        },
        renderOne: function(date, count) {
            date = this.parse(date);
            count = count || 1;
            var fn = this,
                op = this.setting;
            var TEMPLATE = this.TEMPLATE;
            var table = '',
                caption = '',
                head = '',
                body = '',
                temp1 = '',
                temp2 = '';
            var year = date.getFullYear(),
                month = date.getMonth() * 1,
                daylen = this.getMonthDays(year, month);
            var preEmpty = this.prefixLen(new Date(year, month, 1));
            var firstDay = op.firstDayOfWeek;
            if (op.changeYear || op.changeMonth) {
                if (this._selectrender)
                    caption = this.compile(TEMPLATE.CAPTION, { //
                        year: year,
                        month: !!op.textNames.monthNames ? op.textNames.monthNames[month] : month + 1
                    });
                else {
                    caption = this.compile(TEMPLATE.CAPTION, { //
                        year: op.changeYear ? this.renderSelect('year', year) : year,
                        month: op.changeMonth ? this.renderSelect('month', month + 1) : (!!op.textNames.monthNames ? op.textNames.monthNames[month] : month + 1)
                    });
                    this._selectrender = true;
                }
            } else {
                caption = this.compile(TEMPLATE.CAPTION, { //
                    year: year,
                    month: !!op.textNames.monthNames ? op.textNames.monthNames[month] : month + 1
                });

            }
            head = this.compile(TEMPLATE.HEAD, { // calendar head
                hrow: (function(week) {
                    var t1 = '',
                        t2 = '';
                    var isweekend = fn.isWeekend(new Date(year, month, i));
                    for (var i = 0; i < week.length; i++) {
                        t1 += fn.compile(TEMPLATE.HCELL, {
                            week: week[i],
                            isweekend: i == (6 - firstDay) || (firstDay == 0 && i == 0 || i == (6 - firstDay + 1)) && !!op.classNames.weekend ? op.classNames.weekend : ''
                        })
                    };
                    t2 = fn.compile(TEMPLATE.HROW, {
                        hcell: t1
                    });
                    return t2;
                })(op.textNames.dayNames.slice(firstDay, 7).concat(op.textNames.dayNames.slice(0, firstDay)))
            });
            body = this.compile(TEMPLATE.BODY, {
                brow: (function(week) {
                    var t1 = [],
                        t2 = '';
                    for (var i = 0; i < preEmpty; i++) {
                        t1.push(TEMPLATE.BCELL2)
                    };
                    for (var i = 1; i <= daylen; i++) {
                        var isweekend = fn.isWeekend(new Date(year, month, i));
                        var curdate = fn.format(new Date(year, month, i), 'YYYY-MM-dd');

                        var dateState = fn._getDateStatus(curdate);
                        var holidayclass = fn._getHolidaysClass(curdate, dateState);
                        t1.push(fn.compile(TEMPLATE.BCELL, {
                            date: curdate,
                            day: !!holidayclass ? fn.DATENAME[holidayclass] : i,
                            rangeDate: !!op.classNames.rangeDate && fn.isRangeDate(curdate) ? op.classNames.rangeDate : '',
                            oldDate: !!op.classNames.oldDate && fn.isOldDate(curdate) ? op.classNames.oldDate : '',
                            overDate: !!op.classNames.overDate && fn.isOverDate(curdate) ? op.classNames.overDate : '',
                            activeDate: !!op.classNames.activeDate && curdate == fn.triggerDate || (!fn.disabledEndDate && curdate == fn.endTriggerDate) ? op.classNames.activeDate : '',
                            holidayclass: fn.isOldDate(curdate) || fn.isOverDate(curdate) ? '' : holidayclass,
                            isweekend: isweekend && !!op.classNames.weekend ? op.classNames.weekend : ''
                        }))
                    };
                    var len = t1.length;
                    for (var i = 0; i < 42 - len; i++) {
                        t1.push(TEMPLATE.BCELL2)
                    };
                    t1 = fn.mergeArray(t1, 7);
                    for (var i = 0; i < t1.length; i++) {
                        t2 += fn.compile(TEMPLATE.BROW, {
                            cell: t1[i]
                        });
                    };
                    return t2;
                })(op.textNames.dayNames.slice(firstDay, 7).concat(op.textNames.dayNames.slice(0, firstDay)))
            });
            table = this.compile(TEMPLATE.TABLE, {
                caption: caption,
                head: head,
                body: body,
                count: count,
                year: year,
                month: !!op.textNames.monthNames ? op.textNames.monthNames[month] : month + 1
            });
            return table;
        },
        renderMulti: function(date, len) {
            var fn = this;
            var reHtml = '';
            for (var i = 0; i < len; i++) {
                reHtml += fn.renderOne.call(fn, this.stringify(fn.siblingsMonth(this.parse(date), i)), i + 1);
            }
            return reHtml;
        },
        stepMonth: function(count) {
            var fn = this;
            this.curDate = this.stringify(this.siblingsMonth(this.parse(this.curDate), count));
            this.renderUI(this.curDate);
            this.afterRender(this.curDate);
        },
        changeYear: function(year) {
            var count = +year - this.parse(this.curDate).getFullYear();
            this.curDate = this.stringify(this.siblingsMonth(this.parse(this.curDate), count * 12));
            this.renderUI(this.curDate);
            this.afterRender(this.curDate);
        },
        changeMonth: function(month) {
            var count = +month - 1 - this.parse(this.curDate).getMonth();
            this.curDate = this.stringify(this.siblingsMonth(this.parse(this.curDate), count));
            this.renderUI(this.curDate);
            this.afterRender(this.curDate);
        },
        nextMonth: function() {
            var op = this.setting;
            this.stepMonth(op.stepMonth);
        },
        prevMonth: function() {
            var op = this.setting;
            this.stepMonth(-(op.stepMonth));
        },
        nextYear: function() {
            this.stepMonth(12);
        },
        prevYear: function() {
            this.stepMonth(-12);
        },
        curMonth: function() {
            this.curDate = this.stringify(new Date);
            this.stepMonth(0);
        },
        docfire: function(hidelist, callback) { //
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
            $(document).on(hash, function(e) {
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
        _selectEvent: {
            year: function(e) {
                if (this.trigger('ctrl', [{
                        target: e.currentTarget,
                        type: 'changeyear'
                    }]) === false) {
                    return false;
                }

                this.changeYear(e.target.value);
                if (!this.setting.container) this.setPositionOffset();
            },
            month: function(e) {
                if (this.trigger('ctrl', [{
                        target: e.currentTarget,
                        type: 'changemonth'
                    }]) === false) {
                    return false;
                }
                this.changeMonth(e.target.value);
                if (!this.setting.container) this.setPositionOffset();
            }
        },
        _dateEvent: { // 重构
            mouseenter: function(e) {
                var fn = this;
                var op = fn.setting;
                var target = e.currentTarget;
                if ((!op.classNames.hoverRangeDay || this.activeNode == op.triggerNode)) {
                    return false;
                }
                var _curdate = fn.parse($(target).data('date'));
                if (this.triggerDate) {
                    var els = this.getDom().find('[data-bind="date"]')
                        //els.removeClass(op.classNames.hoverRangeDay);
                    $.each(els, function(i, el) {
                        var jel = $(el);
                        if (fn.parse(jel.data('date')) <= _curdate &&
                            !jel.hasClass(op.classNames.oldDate) &&
                            !jel.hasClass(op.classNames.overDate)) {

                            els.eq(i).addClass(op.classNames.hoverRangeDay)
                        }
                    })
                }
            },
            mouseleave: function(e) {
                var fn = this;
                var op = fn.setting;
                var els = this.getDom().find('[data-bind="date"]')
                els.removeClass(op.classNames.hoverRangeDay);
            },
            click: function(e) {
                var fn = this;
                var op = fn.setting;
                var target = e.currentTarget;
                if (($(target).hasClass(op.classNames.oldDate)) || ($(target).hasClass(op.classNames.overDate))) { // !!op.classNames.oldDate &&  !!op.classNames.overDate && 
                    return fn;
                }

                var date = $(target).data('date');
                var _triggerNode = this.activeNode;
                fn.cacheTriggerDate(_triggerNode, date);
                fn.trigger('click', [{
                    preNode: _triggerNode,
                    target: target
                }, date])

                if ((op.triggerNode || op.endTriggerNode) && !op.container) {
                    this.hide();
                }
            }
        },
        _btnEvent: {
            next: function(e) {
                if (this.trigger('ctrl', [{
                        target: e.currentTarget,
                        type: 'nextmonth'
                    }]) === false) {
                    return false;
                }
                this.nextMonth();
                if (!this.setting.container) this.setPositionOffset();
            },
            prev: function(e) {
                if (this.trigger('ctrl', [{
                        target: e.currentTarget,
                        type: 'prevmonth'
                    }]) === false) {
                    return false;
                }
                this.prevMonth();
                if (!this.setting.container) this.setPositionOffset();

            },
            nextyear: function(e) {
                if (this.trigger('ctrl', [{
                        target: e.currentTarget,
                        type: 'nextyear'
                    }]) === false) {
                    return false;
                }
                this.nextYear();
                if (!this.setting.container) this.setPositionOffset();
            },
            prevyear: function(e) {
                if (this.trigger('ctrl', [{
                        target: e.currentTarget,
                        type: 'prevyear'
                    }]) === false) {
                    return false;
                }
                this.prevYear();
                if (!this.setting.container) this.setPositionOffset();
            },
            today: function(e) {
                if (this.trigger('ctrl', [{
                        target: e.currentTarget,
                        type: 'today'
                    }]) === false) {
                    return false;
                }
                this.curMonth();
                if (!this.setting.container) this.setPositionOffset();
            },
            close: function(e) {
                if (this.trigger('ctrl', [{
                        target: e.currentTarget,
                        type: 'hide'
                    }]) === false) {
                    return false;
                }
                this.hide();
            }
        },
        _winEvent: {
            resize: function() {
                this.setPositionOffset();
            },
            unresize: function() {
                $(window).off('resize.' + this.guid);
            }
        },
        bindEvent: function() { // after show event
            var fn = this;
            var op = this.setting;
            for (var i in this._btnEvent) {
                this.getDom().on('click', '[data-bind="' + i + '"]', $.proxy(this._btnEvent[i], this));
            }
            for (var i in this._dateEvent) {
                this.getDom().on(i, '[data-bind="date"]', $.proxy(this._dateEvent[i], this))
            }
            if (op.changeYear || op.changeMonth) {
                if (this.isElement('select', this.TEMPLATE.SELECT)) {
                    for (var i in this._selectEvent) {
                        this.getDom().on('change', '[data-bind="' + i + '"]', $.proxy(this._selectEvent[i], this));
                    }
                }
            }
        },
        initEvent: function() { // init bind event 
            var fn = this;
            var op = this.setting;
            switch ($(op.triggerNode)[0].tagName.toLowerCase()) {
                case 'input':
                    this.triggerNodeEvent = 'focus';
                    break;
                default:
                    this.triggerNodeEvent = 'click';
            }

            $.each([op.triggerNode, op.endTriggerNode], function(i, node) {
                $(node)[fn.triggerNodeEvent](function(e) {
                        fn.activeNode = node;
                        if (fn.trigger('show', [{
                                target: node
                            }]) === false) {
                            return false;
                        }
                        switch (node) {
                            case op.triggerNode:
                                fn.render(fn.triggerDate);
                                break;
                            case op.endTriggerNode:
                                fn.render(fn.endTriggerDate);
                                break;
                        }
                    })
                    // .parent().children(this.weekico).click( // input calendar logo
                    //  $.proxy(
                    //      $(node).trigger
                    //      ,$(node)
                    //      ,fn.triggerNodeEvent) // see jquery proxy
                    // );
            })
        }
    }


    // jQuery.extend($.calendar.prototype, jQuery.eventEmitter);

    $.calendar.defaults = {
        container: '',
        triggerNode: '',
        endTriggerNode: '',
        position: 'auto',
        count: 2, //
        stepMonth: 1,
        afterDays: -1,
        weekPrefix: '星期',
        isHoliday: true,
        firstDayOfWeek: 0,
        classNames: {
            changeDate: 'changeDate',
            oldDate: 'oldDate',
            overDate: 'overDate',
            choosedDate: 'choosed',
            weekend: 'weekend',
            hoverRangeDay: 'hover',
            selectRangeDay: 'day_selected'
        },
        textNames: {
            monthNames: '', // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            dayNames: ['日', '一', '二', '三', '四', '五', '六'] //['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // 
        },
        changeMonth: false,
        changeYear: false,
        rangeYear: [1900, new Date().getFullYear()],
        //autoRender:true,
        rangeLock: false // 范围锁
    };

})(window, jQuery);
