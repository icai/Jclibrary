
/**
* date：20130108 
*/
(function ($, exports) {
    var instanceCount = 0;
    $.fn.slider = function (optss) {
        if (!this.length) {
            return this;
        }
        var opts = $.extend(true, {}, $.fn.slider.defaults, optss);

        $.fn.slider.instance.$count++;
        $.fn.slider.instance['_$slicer' + instanceCount++] = opts;

        this.each(function (i) {

            var elem = $(this),
				slider_lists = $('.slider_list', elem),
				lists = slider_lists.find('li'),
				total = slider_lists.children().size(),
				width = slider_lists.children().outerWidth(),
				height = slider_lists.children().outerHeight(),
				effect = opts.effect,

				visible = opts.visible,
				scroll = opts.scroll,

				start = opts.start - 1,
				next = 0,
				prev = 0,
				number = 0,
				current = 0,
				loaded, active, clicked, imageParent;


            //console.log(total);


            var animCss = opts.vertical ? "top" : "left",
				sizeCss = opts.vertical ? "height" : "width";

            var getVal = opts.vertical ? height : width; // 赋值

            var cirVal = opts.circular ? 2 : 1;


            // visible: 1, // 显示多少个
            // scroll:1, // 区域可见个数
            if (total < 2) {
                throwError("slider lists is less equal  to 2!")
            }

            // if(total%opts.visible){ // 可视个数
            // 	throwError('arguments \'visible\' setting Error!!')
            // }
            // if(total%opts.scroll || opts.circular){ //滚动个数
            // 	throwError('arguments \'scroll\'  setting Error!!')
            // }

            // if(opts.scroll != 1){
            // 	if(opts.visible > opts.scroll){ //滚动个数
            // 		throwError('arguments \'scroll\' or \'visible\' setting error!!')
            // 	}
            // }


            // if(opts.scroll != 1){
            // 	if(opts.visible == opts.scroll && opts.paginationClass){ //滚动个数
            // 		throwError('arguments \'scroll\' or \'visible\' \'paginationClass\'  setting error!!')
            // 	}
            // }

            if (opts.effect == "fade" && opts.vertical) {
                throwError('arguments \'effect\' or \'vertical\' setting error!!')
            }

            if (opts.circular && effect == "fade") {
                throwError('arguments \'effect\' or \'circular\' setting error!!')
            }



            if (start < 0) {
                start = 0;
            };
            if (start > total) {
                start = total - 1;
            };

            if (opts.start) {
                current = start;  // 0

            };

            if (opts.circular) {
                slider_lists.prepend(lists.slice(total - visible).clone()).append(lists.slice(0, visible).clone());
                start += visible
            }
            //console.log(slider_lists.children().length);

            /**
            * 设置 Css样式
            */
            if (opts.vertical) {
                $(opts.container, elem).css({ // slider container
                    overflow: 'hidden',
                    position: 'relative',
                    width: width,
                    height: height * opts.visible
                });
            } else {
                $(opts.container, elem).css({ // slider container
                    overflow: 'hidden',
                    position: 'relative',
                    width: width * opts.visible,
                    height: height
                });
            }


            slider_lists.css({ // slider 列表
                position: 'absolute'
            }).css(animCss, -getVal * start); //设定开始值


            slider_lists.css(sizeCss, getVal * total * cirVal).children().css({
                float: opts.vertical ? "none" : "left"
            })
            /**
            * 左右键
            */
            if (opts.btnNext) $(opts.btnNext, elem).click(function (e) {
                e.preventDefault();
                if (opts.play) {
                    pause();
                };
                goNext();
            });
            if (opts.btnPrev) $(opts.btnPrev, elem).click(function (e) {
                e.preventDefault();
                if (opts.play) {
                    pause();
                };
                goPrev();
            });

            /**
            * 导航键
            */
            // 有导航按钮
            if (opts.paginationClass) {
                $(opts.paginationClass + ' li:eq(' + start + ')', elem).addClass(opts.current);
                $(opts.paginationClass + ' li a', elem).bind(opts.paginationEvent, function () {
                    if (opts.play) {
                        pause();
                    };
                    clicked = $(this).closest('li').index();
                    if (current != clicked) {
                        goPage();
                    }
                    return false;
                });
            }
            /**
            * 自动轮播
            */
            if (opts.play) {

                playInterval = setInterval(function () {
                    goNext()
                }, opts.play);

                elem.data('interval', playInterval);
            };
            /**
            * 划过时暂停
            */
            if (opts.hoverPause && opts.play) {
                slider_lists.children().bind('mouseover', function () {
                    stop();
                });
                slider_lists.children().bind('mouseleave', function () {
                    pause();
                });
            }
            /**
            * 抛出错误
            * @param  {[type]} msg [description]
            * @return {[type]}     [description]
            */
            function throwError(msg) {
                throw new Error(msg);
            }

            /**
            * 没有动画切换
            * @param  {[type]} num [description]
            * @return {[type]}     [description]
            */
            function noneAnimate(num) {
                slider_lists.css({
                    left: -width * num
                })
                opts.callback(num);
                active = false;
            }

            /**
            * easing 动画
            * @param  {[String]} num  当前点击 index 
            * @param  {[String]} easing 动画参数  
            * 
            */
            function easingAnimate(num, easing, dir, step) {
                var param = {};
                var curr = num;

                //console.log(next,prev);
                // what is num ? // num :: after scroll value 
                // if  visible :3 ,scroll :3  so ::  3,6,0   
                // if  visible :3 ,scroll :1  so ::  1,2,3,4,5,6,7,8,0
                /**
                *  status 1:
                *   ,5,6][1,2,3,4,5,6][1,2,  //num :: 2
                *   	   ↑ ↑	
                *   ,5,6][1,2,3,4,5,6][1,2,  // num :: 4
                *   		   ↑ ↑
                *   ,5,6][1,2,3,4,5,6][1,2// num :: 0
                *                 ↑ ↑
                *   			  ,5,6][1,2,3,4,5,6][1,2
                *                 ↑ ↑
                *                ,5,6][1,2,3,4,5,6][1,2
                *   					↑ ↑
                *                ,5,6][1,2,3,4,5,6][1,2
                *   						↑ ↑
                *                ,5,6][1,2,3,4,5,6][1,2
                *   							↑ ↑
                *          					5,6][1,2,3,4,,5,6][1,2
                *   							↑ ↑	  
                *  status 2:
                *   ,6,7][1,2,3,4,5,6,7][1,2 //num :: 2
                *   	   ↑ ↑	
                *   ,6,7][1,2,3,4,5,6,7][1,2// num :: 4
                *   		   ↑ ↑
                *   ,6,7][1,2,3,4,5,6,7][1,2 // num :: 6
                *                 ↑ ↑
                *   ,6,7][1,2,3,4,5,6,7][1,2  // num :: 1 if num <= visible
                *                     ↑  ↑
                *                  ,6,7][1,2,3,4,5,6,7][1,2 // num :: 1
                *   				   ↑  ↑
                num + visible
                *   	      		,6,7][1,2,3,4,5,6,7][1,2 // num :: 3
                *   					  	↑ ↑
                *   	       		,6,7][1,2,3,4,5,6,7][1,2 // num :: 5
                *   						    ↑ ↑
                *   	         	,6,7][1,2,3,4,5,6,7][1,2,3,4,5 // num :: 7
                *   								↑ ↑
                *           					   ,6,7][1,2,3,4,5,6,7][1,2 
                *   								↑ ↑
                *          					   ,6,7][1,2,3,4,5,6,7][1,2 // num :: 2
                *   							         ↑ ↑	  
                */

                // how to set the 'slider_lists' style to be circular?
                if (opts.circular) {

                    if (dir == "next") {
                        if (num < visible) {
                            slider_lists.css(animCss, -((visible + num - scroll) * getVal));
                        }
                    } else if (dir == "prev") {
                        if (num >= total - visible) {
                            slider_lists.css(animCss, -((visible + num + scroll) * getVal));
                        }
                    }
                    curr = num + visible;  // direction value
                }

                slider_lists.stop().animate(animCss == "left" ? {
                    left: -(curr * getVal)
                } : {
                    top: -(curr * getVal)
                }, opts.slideSpeed, easing, function () {
                    opts.callback(num);
                    active = false;
                });
            }

            /**
            * 淡入动画
            * @param  {[type]} num [description]
            * @return {[type]}     [description]
            */

            function fadeAnimate(num) {// 处理值


                slider_lists.css({
                    left: -width * num
                }).children(':eq(' + num + ')', elem).hide().fadeIn(opts.fadeSpeed, function () {
                    opts.callback(num);
                    active = false;
                })
            }
            /**
            * 动画
            * @param  {[type]} num [description]
            * @return {[type]}     [description]
            */
            function go(dir, num) {
                goDebug();
                opts.before();
                if (effect == "none") {
                    noneAnimate(num)
                } else if (effect === 'default') {
                    easingAnimate(num, "linear", dir)
                } else if (effect == 'fade') {
                    fadeAnimate(num)
                } else if (/^easing:([\w]+)/.test(effect)) {
                    easingAnimate(num, RegExp.$1, dir)
                } else {
                    throwError('arguments \'effect\' setting error!!')
                }
                if (opts.paginationClass) {
                    $(opts.paginationClass + ' li', elem).removeClass(opts.current);
                    $(opts.paginationClass + ' li', elem).eq(Math.floor(num / scroll)).addClass(opts.current);
                }
            }

            /**
            * 上一个
            * @return {[type]} [description]
            */
            function goNext() {
                prev = current;
                next = current + scroll;
                next = next >= total ? next - total : next; // 
                current = next;
                go("next", current)
            }
            /**
            * 下一个
            * @return {[type]} [description]
            */
            function goPrev() {
                prev = current;
                next = current - scroll;
                next = next < 0 ? total + next : next;
                current = next;
                go("prev", current)
            }
            /**
            * 按页
            * @return {[type]} [description]
            */
            function goPage() {
                next = parseInt(clicked, 10) * scroll; // new 
                prev = $(opts.paginationClass + ' li.' + opts.current + ' a', elem).index() * scroll;  // old

                current = next;
                var temp;
                if (prev > next) {
                    temp = "next";
                } else {
                    temp = "prev";
                }
                go(temp, current);
            }


            /**
            * 调试
            * @return {[type]} [description]
            */
            function goDebug() {
                return false;
                console.log("prev :" + prev);
                console.log("next:" + next);
                console.log("current:" + current);
            }
            /**
            * 停止
            * @return {[type]} [description]
            */
            function stop() {
                clearInterval(elem.data('interval'));
            };
            /**
            * 暂停/继续
            * @return {[type]} [description]
            */
            function pause() {
                if (opts.pause) {
                    clearTimeout(elem.data('pause'));
                    clearInterval(elem.data('interval'));
                    pauseTimeout = setTimeout(function () {
                        clearTimeout(elem.data('pause'));
                        playInterval = setInterval(function () {
                            goNext()
                        }, opts.play);
                        elem.data('interval', playInterval);
                    }, opts.pause);
                    elem.data('pause', pauseTimeout);
                } else {
                    stop();
                }
            }
        });

        return this;
    };

    $.fn.slider.version = "1.0";
    $.fn.slider.instance = {
        $count: 0

    };
    // default optss
    $.fn.slider.defaults = {

        container: '.slides-container',
        btnNext: null, // Next 按钮
        btnPrev: null, // Next 按钮
        paginationClass: null,  // page按钮
        current: 'current',
        circular: false, // 循环：待定参数
        effect: 'default', // none|| default|| fade || easing:easeOutExpo || easing:easeOutSine || ...
        vertical: false, // horizontal 默认横向
        visible: 1, // 显示多少个
        scroll: 1, //  切换个数（针对） haspagination ==  false && hasNextPrev == true
        fadeSpeed: 350, // 淡入速度
        slideSpeed: 350,  // 切换速度
        play: 0,  // 间隔时间
        pause: 0, //暂停时间
        hoverPause: false, // 划过是否停止
        hasNextPrev: false, // 左右键(考虑取消：：转为 null 判断)
        haspagination: true, // 导航键（考虑取消：：转为 null 判断）
        mouseWheel: false, // 鼠标滚动：：待定参数
        paginationEvent: 'click', // 由哪一个开始：待定参数
        start: 1, // 由哪一个开始：待定参数
        preload: false, // ：：待定参数
        preloadImage: '/img/loading.gif', // ：：待定参数		
        autoHeight: false, // ：待定参数
        autoHeightSpeed: 350, // ：待定参数
        before: function () { },
        callback: function () { }
    };
    function __slider__(q, param) {
        return $(q).slider(param);
    }


    exports.itour = exports.itour ? exports.itour : {};
    exports.itour.ui = exports.itour.ui ? exports.itour.ui : {};
    exports.itour.ui.slider = __slider__


})(jQuery, this);
