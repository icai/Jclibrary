jQuery(document).ready(function($) {

    //  低价日历
    var priceData = {
        paiceList: [{
            date: 1,
            year: 2013,
            month: 7,
            price: 370,
            qrydate: "2013-07-01"
        }, {
            date: 2,
            year: 2013,
            month: 7,
            price: 400,
            qrydate: "2013-07-02"
        }, {
            date: 3,
            year: 2013,
            month: 7,
            price: 370,
            qrydate: "2013-07-03"
        }, {
            date: 4,
            year: 2013,
            month: 7,
            price: 370,
            qrydate: "2013-07-04"
        }, {
            date: 5,
            year: 2013,
            month: 7,
            price: 370,
            qrydate: "2013-07-05"
        }, {
            date: 6,
            year: 2013,
            month: 7,
            price: 370,
            qrydate: "2013-07-06"
        }, {
            date: 7,
            year: 2013,
            month: 7,
            price: 410,
            qrydate: "2013-07-07"
        }, {
            date: 8,
            year: 2013,
            month: 7,
            price: 370,
            qrydate: "2013-07-08"
        }, {
            date: 9,
            year: 2013,
            month: 7,
            price: 410,
            qrydate: "2013-07-09"
        }, {
            date: 10,
            year: 2013,
            month: 7,
            price: 370,
            qrydate: "2013-07-10"
        }, {
            date: 11,
            year: 2013,
            month: 7,
            price: 450,
            qrydate: "2013-07-11"
        }, {
            date: 12,
            year: 2013,
            month: 7,
            price: 450,
            qrydate: "2013-07-12"
        }, {
            date: 13,
            year: 2013,
            month: 7,
            price: 450,
            qrydate: "2013-07-13"
        }, {
            date: 14,
            year: 2013,
            month: 7,
            price: 400,
            qrydate: "2013-07-14"
        }, {
            date: 15,
            year: 2013,
            month: 7,
            price: 340,
            qrydate: "2013-07-15",
            speclass: "lowestprice"
        }, {
            date: 16,
            year: 2013,
            month: 7,
            price: 400,
            qrydate: "2013-07-16"
        }, {
            date: 17,
            year: 2013,
            month: 7,
            price: 340,
            qrydate: "2013-07-17",
            speclass: "lowestprice"
        }, {
            date: 18,
            year: 2013,
            month: 7,
            price: 340,
            qrydate: "2013-07-18",
            speclass: "lowestprice"
        }, {
            date: 19,
            year: 2013,
            month: 7,
            price: 340,
            qrydate: "2013-07-19",
            speclass: "lowestprice"
        }, {
            date: 20,
            year: 2013,
            month: 7,
            price: 440,
            qrydate: "2013-07-20"
        }, {
            date: 21,
            year: 2013,
            month: 7,
            price: 440,
            qrydate: "2013-07-21"
        }, {
            date: 22,
            year: 2013,
            month: 7,
            price: 340,
            qrydate: "2013-07-22",
            speclass: "lowestprice"
        }, {
            date: 23,
            year: 2013,
            month: 7,
            price: 440,
            qrydate: "2013-07-23"
        }, {
            date: 24,
            year: 2013,
            month: 7,
            price: 340,
            qrydate: "2013-07-24",
            speclass: "lowestprice"
        }, {
            date: 25,
            year: 2013,
            month: 7,
            price: 340,
            qrydate: "2013-07-25",
            speclass: "lowestprice"
        }, {
            date: 26,
            year: 2013,
            month: 7,
            price: 440,
            qrydate: "2013-07-26"
        }, {
            date: 27,
            year: 2013,
            month: 7,
            price: 340,
            qrydate: "2013-07-27",
            speclass: "lowestprice"
        }, {
            date: 28,
            year: 2013,
            month: 7,
            price: 440,
            qrydate: "2013-07-28"
        }, {
            date: 29,
            year: 2013,
            month: 7,
            price: 340,
            qrydate: "2013-07-29",
            speclass: "lowestprice"
        }, {
            date: 30,
            year: 2013,
            month: 7,
            price: 340,
            qrydate: "2013-07-30",
            speclass: "lowestprice"
        }, {
            date: 31,
            year: 2013,
            month: 7,
            price: 340,
            qrydate: "2013-07-31",
            speclass: "lowestprice"
        }]
    };
    var lowPriceCalendar = new $.calendar({
        container: '#calendar_demo_1',
        type: 'event',
        TEMPLATE: {
            CLOSEBTN: ''
        },
        count: 2,
        weekPrefix: '星期',
        dayNames: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
        firstDayOfWeek: 0
    });



    lowPriceCalendar.on('click', function(e, dateStr) {
        var op = this.setting;
        // var node = $(e.preNode);
        //     this.setDateString(node,dateStr);
        console.log(arguments);
        alert(dateStr);
        // var endNode = $(this.setting.endTriggerNode);
        // if(e.preNode == this.setting.triggerNode){ //
        //      this.startDate  = dateStr;
        //     if(this.between(this.endTriggerDate,dateStr) < 0){
        //         this.cacheTriggerDate(this.setting.endTriggerNode,this.siblings(dateStr,1))
        //         this.setDateString(endNode,this.siblings(dateStr,1))
        //     }
        // }  
    })

    lowPriceCalendar.on('asynRender', function(date, count) {
        var fn = this;
        var op = this.setting;
        date = date || this.stringify(new Date);
        count = count || this.setting.count;

        if (this.ajaxActive) {
            clearTimeout(this.ajaxActive);
        }
        this.ajaxActive = setTimeout(function() {
            $.each(priceData["paiceList"], function(i, el) {
                var item = $('#' + fn.guid).find('[data-date=' + el['qrydate'] + ']');
                if (item.hasClass(op.classNames.oldDate) || item.hasClass(op.classNames.overDate)) {
                    return true;
                }
                item.find('[data-asyn="price"]').html('￥' + el.price);
                if (el['speclass']) {
                    item.find('[data-asyn="lowprice"]').addClass('low');
                }
            })
        }, 10)
    }).trigger('asynRender');



    var ctripSkin = {
        TEMPLATE: {
            WRAPPER: '<div class="calendar_wrap" id="{guid}" >{TABLEBOX}{BTNBOX}</div>',
            TABLEBOX: '<div class="">{table}</div>',
            TABLE: '<div class="calendar_month" data-item="calendar_{count}" id="ctrip_calendar_{count}" >{CAPTION}{HEAD}{BODY}</div>',
            CAPTION: '<div class="calendar_title">{year}年{month}月</div>',
            HEAD: '<dl class="calendar_day">{hrow}</dl>',
            HROW: '{hcell}',
            HCELL: '<dt class="{isweekend}" >{week}</dt>',

            BODY: '<dl class="calendar_day">{brow}</dl>',
            BROW: '{cell}',
            BCELL: '<dd class="{isweekend} {oldDate} {overDate} {activeDate}" data-bind="date" data-date="{date}"><a href="javascript:;" class="date {holidayclass} "><span class="">{day}</span></a></dd>',
            BCELL2: '<dd class="day_no" ><a href="javascript:;" class=""></a></dd>',

            BTNBOX: '<div class="btn_box">{NEXTBTN}{PREVBTN}{CLOSEBTN}</div>',
            NEXTBTN: '<a class="month_next" href="javascript:;" data-bind="next" title="下一月"></a>',
            PREVBTN: '<a class="month_prev" href="javascript:;" title="上一月" data-bind="prev" ></a>',
            TODAYBTN: '',
            CLOSEBTN: ''
        },
        classNames: {
            oldDate: 'day_no',
            overDate: 'day_over',
            activeDate: 'activeDate',
            hoverRangeDay: 'day_hover',
            weekend: 'weekend',
            selectRangeDay: 'day_selected'
        }
    }

    //  携程样式   
    var ctripHotel = new $.calendar($.extend({
        triggerNode: '#J_CheckIn',
        endTriggerNode: '#J_CheckOut'
    }, ctripSkin))

    // ctripHotel.on('init',function(e){
    //     var op = this.setting;
    //     var curdate = this.stringify(new Date);
    //     this.cacheTriggerDate(op.triggerNode,curdate);
    //     this.setDateString($(op.triggerNode),curdate);
    //     this.afterDays = 90;
    //     this._setDefaultDate();
    //     this.cacheTriggerDate(op.endTriggerNode,this.siblings(curdate,1));
    //     this.setDateString($(op.endTriggerNode),this.siblings(curdate,1));
    //     return false;
    // });
    ctripHotel.on('show', function(e) {
        var op = this.setting;

        //console.log(this.startDate);
        switch (e.target) {
            case op.triggerNode:
                this.minDate = this.stringify(new Date);
                this.afterDays = 90;
                //this.render();
                break;
            case op.endTriggerNode:
                this.minDate = this.startDate || this.stringify(new Date);
                this.afterDays = Math.min(28, this.differ(this.minDate, this.maxDate) + 1);
                //this.render();
                break;
        }
    })

    ctripHotel.on('click', function(e, dateStr) {
        var op = this.setting;
        var node = $(e.preNode);
        this.setDateString(node, dateStr);
        var endNode = $(this.setting.endTriggerNode);
        if (e.preNode == this.setting.triggerNode) { //
            this.startDate = dateStr;
            if (this.between(this.endTriggerDate, dateStr) < 0 || this.between(this.endTriggerDate, dateStr) > 28) {
                this.cacheTriggerDate(this.setting.endTriggerNode, this.siblings(dateStr, 1))
                this.setDateString(endNode, this.siblings(dateStr, 1))
            }
        }
    })


    var ctripFlight = new $.calendar($.extend({
        triggerNode: '#J_DepDate',
        endTriggerNode: '#J_RetDate'
    }, ctripSkin))
    ctripFlight.on('click', function(e, dateStr) {
        var op = this.setting;
        var node = $(e.preNode);
        this.setDateString(node, dateStr);
        var endNode = $(this.setting.endTriggerNode);
        if (e.preNode == this.setting.triggerNode) { //
            this.startDate = dateStr;
            if (this.between(this.endTriggerDate, dateStr) < 0) {
                this.cacheTriggerDate(this.setting.endTriggerNode, this.siblings(dateStr, 1))
                this.setDateString(endNode, this.siblings(dateStr, 1))
            }
        }
    })


    // calendarCtrip.on('asynRender',function(){
    // })


    var TongChengSkin = {

        TEMPLATE: {
            WRAPPER: '<div class="mCalendar" id="{guid}" ><div class="date" style="height: 238px; width: 441px;" >{TABLEBOX}{BTNBOX}</div></div>',
            TABLEBOX: '<div class="cal_box">{table}</div>',
            TABLE: '<div class="panel_item clearfix" data-item="calendar_{count}" id="calendar_{count}" ><div class="contentTime" ><table cellspacing="0" cellpadding="0" border="0">{CAPTION}{HEAD}{BODY}</table> <i class="monthBg" style="font-size: 160px; line-height: 211px; height: 211px; width: 219px;">{month}</i></div></div>',
            CAPTION: '<caption><div class="monthTitle" style="width: 219px;"><h4 class="mCalTitleFir"><span class="date_title">{year}年{month}月</span></h4></div></caption>',
            HEAD: '<thead>{hrow}</thead>',
            HROW: '<tr>{hcell}</tr>',
            HCELL: '<th class="{isweekend}" >{week}</th>',
            BODY: '<tbody>{brow}</tbody>',
            BROW: '<tr>{cell}</tr>',
            BCELL: ' <td><div class="itemWrap spanDate {isweekend} {oldDate} {overDate} {rangeDate}"  data-bind="date" data-date="{date}" style="height: 28px; width: 28px;"><span class="dateWrap">{day}</span><div class="userWrap"></div></div></td>',
            BCELL2: '<td><div class="itemWrap" style="height: 28px; width: 28px;"><span class="dateWrap"></span><div class="userWrap"></div></div></td>',

            BTNBOX: '<div class="btn_box">{NEXTBTN}{PREVBTN}{CLOSEBTN}</div>',
            NEXTBTN: '<span class="nextMonthBg date_nextSpan" data-bind="next" ><span class="nextMonth"  title="下一月" ></span></span>',
            PREVBTN: '<span class="lastMonthBg date_lastSpan"  data-bind="prev" ><span class="lastMonth" title="上一月"></span></span>',
            CLOSEBTN: ''
        },
        classNames: {
            weekend: 'sun',
            hover: 'spanHover',
            rangeDate: 'spanEnable',
            // overDate:'',
            // oldDate:'',
            hoverRangeDay: 'spanHover'
        }
    }

    var calendarInc17u = new $.calendar($.extend({
        triggerNode: '#calendar_in',
        endTriggerNode: '#calendar_out'
    }, TongChengSkin))

    calendarInc17u.on('click', function(e, dateStr) {
        var op = this.setting;
        var node = $(e.preNode);
        this.setDateString(node, dateStr);
        var endNode = $(this.setting.endTriggerNode);
        if (e.preNode == this.setting.triggerNode) { //
            this.startDate = dateStr;
            if (this.between(this.endTriggerDate, dateStr) < 0) {
                this.cacheTriggerDate(this.setting.endTriggerNode, this.siblings(dateStr, 1))
                this.setDateString(endNode, this.siblings(dateStr, 1))
            }
        }
    })



    var lunarTmpl = {
        WRAPPER: '<div class="wnl-wrap" id="{guid}">{TABLEBOX}</div>',
        TABLEBOX: '{table}',
        TABLE: '<div class="">{CAPTION}<div class="bd">{HEAD}{BODY}</div></div>',
        CAPTION: '<div class="hd ks-clear"><div class="lunar-box sx5" style="text-align: center;" id="J_dateHeader" title="蛇年"><span id="sy">{year}</span> 年<span id="sm">{month}</span>月<span id="gz">农历癸巳年</span></div>{BTNBOX}</div>',
        HEAD: '<table class="week"><tbody><tr>{hrow}</tr></tbody></table>',
        HROW: '{hcell}',
        HCELL: '<td class="{isweekend}" >星期{week}</td>',

        BODY: '<ul class="date-box ks-clear" id="J_dates">{brow}</ul>',
        BROW: '{cell}',
        BCELL: '<li class="{activeDate}" data-bind="date" data-date="{date}" ><div class="inner"><i class="note-icon"></i> <em>{day}</em><p class="holidayholder"></p></div></li>',
        BCELL2: '<li><div class="inner"> <i class="note-icon"></i></div></li>',

        BTNBOX: '<div class="date-nav ks-clear">{PREVYearBTN}{NEXTYearBTN}{PREVBTN}{NEXTBTN}{TODAYBTN}</div>',
        NEXTBTN: '<div class="field-botton next-month" title="下一月" data-bind="next" id="J_nextMonth" datetype="MD"><i class="arrow"></i></div>',
        PREVBTN: '<div class="field-botton pre-month" title="上一月" data-bind="prev" id="J_preMonth" datetype="MU"><i class="arrow"></i></div>',
        NEXTYEARBTN: '<div class="field-botton next-year" data-bind="nextyear" title="下一年" id="J_nextYear" datetype="YD"><i class="arrow"></i></div>',
        PREVYEARBTN: '<div class="field-botton pre-year" data-bind="prevyear" title="上一年" id="J_preYear" datetype="YU"><i class="arrow"></i></div>',
        TODAYBTN: '<div class="field-botton cur-day" title="今天" id="J_curDay" datetype="CUR">Today</div>',
        CLOSEBTN: ''
    }

    var lunar = new $.calendar({
        container: '.lunar #content',
        type: 'event',
        TEMPLATE: lunarTmpl,
        classNames: {
            weekend: 'weekend'
        },
        count: 1,
        isHoliday: false,
        weekPrefix: '星期',
        sync: false,
        dayNames: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
        firstDayOfWeek: 0
    });



    function foramtDay(el) {
        var S = "",
            J;
        if (el.lDay == 1) {
            S = "<b>" + (el.isLeap ? "\u95f0" : "") + el.lMonth + "\u6708" + (monthDays(el.lYear, el.lMonth) == 29 ? "\u5c0f" : "\u5927") + "</b>";
        } else {
            S = cDay(el.lDay);
        }
        I = el.lunarFestival;
        if (el.lMonth == "4" && I.indexOf("\u7aef\u5348\u8282") != -1) {
            I = "";
            el.lunarFestival = ""
        }
        if (I.length > 0) {
            if (I.length > 7) {
                I = I.substr(0, 5) + "\u2026"
            }
            I = I.fontcolor("#909090");
        } else {
            I = el.solarFestival;
            if (I.length > 0) {
                J = (I.charCodeAt(0) > 0 && I.charCodeAt(0) < 128) ? 9 : 5;
                if (I.length > J + 1) {
                    I = I.substr(0, J - 1) + "\u2026"
                }
                I = I.fontcolor("#909090");
            } else {
                I = el.solarTerms;
                if (I.length > 0) {
                    I = I.fontcolor("#ff7200") // 节日
                }
            }
        }
        if (I.length > 0) {
            S = I
        }
        return S;
    }

    lunar.on('asynRender', function(date, count) {
        var me = this;
        var op = this.setting;
        date = date.split('-');
        var year = date[0],
            month = Number(date[1] )-1;
        var Today = new Date(),
            tY = parseInt(Today.getFullYear()),
            tM = parseInt(Today.getMonth()),
            tD = parseInt(Today.getDate());
        me.$('#gz').text('农历' + cyclical(year - 1900 + 36) + '年');
        me.$('#J_dateHeader').removeClass();
        me.$('#J_dateHeader').addClass('lunar-box sx' + (year - 4) % 12);
        me.$('#J_dateHeader').attr('title', Animals[(year - 4) % 12] + "年");
        //实例化日历
        this.lunar = new calendar(year, month, tY, tM, tD);
        $.each(this.lunar, function(i, el) {
            var item = me.$('[data-date="' + me.stringify(new Date(el.sYear, el.sMonth -1, el.sDay)) + '"]');
            item.find('.holidayholder').html(foramtDay(el));
            if (el.isToday) {
                item.addClass('today');
            }
        })

    }).trigger('__init__');




});