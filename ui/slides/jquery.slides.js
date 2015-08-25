
/**
 * date：20130108 
 * author:caiguangsong
 *
 * last update:2014/05/01
 *
 * ~2013/04/02 : reconstruct the code
 * ~2014/05/01: support mouseWheel, optimize effect: none/fade implementation
 * 
 */
;;(function($,window,undefined) {
	var comPrefix = window.comPrefix || 'youcompany';

	var exports = this;
	var instanceCount = 0;

	$.slider = function(obj, optss) {
		var opts = $.extend(true, {}, $.slider.defaults, optss);

		$.fn.slider.instance.$count++;
		$.fn.slider.instance['_$slicer'+ instanceCount++] = opts;

		return new $.slider.fn.init(obj, opts);
	}
	$.slider.fn = $.slider.prototype = {
		constructor: $.slider,
		init: function(obj, opts) {
			this.options = {};

			var fn = this;
			var op = this.options;
			    this.options.elem = $(obj),
				this.options.slider_lists = $('.slider-list', obj),
				this.options.lists = op.slider_lists.find('li'),
				this.options.total = op.slider_lists.children().size(),
				this.options.width = op.slider_lists.children().outerWidth(),
				this.options.height = op.slider_lists.children().outerHeight();

				$.extend(true, this.options, opts);

				this.options.currentClass = this.options.current, // current used
				this.options.start = opts.start - 1, //  view start form 1, but code 0; 
				this.options.next = 0,
				this.options.prev = 0,
				this.options.number = 0,
				this.options.current = 0,
				this.options.runFunc = {
					'none':'aniNone',
					'default':'aniEasing',
					'fade':'aniFade',
					'easing':'aniEasing'
				},
				this.options.clicked = 0;

				this.options.animCss = op.vertical ? "top" : "left",
				this.options.sizeCss = op.vertical ? "height" : "width";

				this.options.getVal = op.vertical ? op.height : op.width; 

				this._init();

				//console.log(this);
			return this;
		},
		_init:function(){
			var fn = this;
			var op = this.options;

			fn.checkSetting();
			op.circular && fn.circular(); //循环
			fn.vertical().bindEvent(); // 垂直
		},
		checkSetting:function(){
			var fn = this;
			var op = this.options;

			if(op.total < 2) {
				$.log && $.log("slider lists is less equal  to 2!");
				return;
			}
			if(op.start < 0) {
				op.start = 0;
			};
			if(op.start > op.total) {
				op.start = op.total - 1;
			};

			if(op.start) {
				op.current = op.start;  // 0
			};
			return this;
		},
		circular:function(){
			var fn = this;
			var op = this.options;

			op.slider_lists.prepend(op.lists.slice(op.total - op.visible).clone()).append(op.lists.slice(0, op.visible).clone());
			op.start += op.visible

			return this;
		},
		vertical:function(){ // reconstruction
			var fn = this;
			var op = this.options;

			$(op.container, op.elem).css({ // slider container
				overflow: 'hidden',
				position: 'relative',
				width:op.vertical ? op.width : op.width * op.visible,
				height:op.vertical ? op.height * op.visible : op.height
			});

			if(op.effect == 'none' || op.effect == 'fade'){
                op.lists.css({
                    display: "none",
                    position: "absolute"
                }).eq(op.start - 1 ).show();
			}else if(/^(easing):([\w]+)/.test(op.effect) || op.effect === 'default'){
				var cirVal = op.circular ? 2 : 1;
				op.slider_lists.css({ // slider list
					position: 'absolute'
				}).css(op.animCss,- op.getVal * op.start); // set start value
				op.slider_lists.css(op.sizeCss,op.getVal * op.total * cirVal).children().css({
					float:op.vertical ? "none" : "left"
				})
			}
			return this;
		},
		play:function(){
			var fn = this;
			var op = this.options;
			if(op.play) {
			var	playInterval = setInterval(function() {
					fn.nextCtrl()
				}, op.play);
				op.elem.data('interval', playInterval);
			};
			return this;
		},
		stop:function(){
			var fn = this;
			var op = this.options;
			clearInterval(op.elem.data('interval'));

			return this;
		},
		pause:function(){
			var fn = this;
			var op = this.options;
			clearTimeout(op.elem.data('pause'));
			clearInterval(op.elem.data('interval'));
			var pauseTimeout = setTimeout(function() {
				clearTimeout(op.elem.data('pause'));
				playInterval = setInterval(function() {
					fn.nextCtrl()
				}, op.play);
				op.elem.data('interval', playInterval);
			}, op.pause);
			op.elem.data('pause', pauseTimeout);

			return this;
		},
		nextCtrl:function(){
			var fn = this;
			var op = this.options;

			op.prev = op.current;
			op.next = op.current + op.scroll;
			op.next =  op.next >= op.total ? op.next - op.total : op.next; // 
			op.current = op.next;

			fn.animate("next",op.current)

			return this;
		},
		prevCtrl:function(){
			var fn = this;
			var op = this.options;

			op.prev = op.current ;
			op.next = op.current - op.scroll;
			op.next = op.next < 0 ? op.total + op.next: op.next;
			op.current = op.next;
			fn.animate("prev",op.current)

			return this;
		},
		pageCtrl:function(){
			var fn = this;
			var op = this.options;

			op.next = parseInt(op.clicked, 10) * op.scroll; // new 
			op.prev = $(op.paginationClass + ' li.'+ op.currentClass +' a', op.elem).index() * scroll;  // old
			op.current = op.next;
			var temp;
			if(op.prev > op.next){
				temp = "next";
			}else{
				temp = "prev";
			}
			fn.animate(temp,op.current);

			return this;

		},
		animate:function(dir,num){

			var fn = this;
			var op = this.options;
			var easing;
			if(/^(easing):([\w]+)/.test(op.effect)){
				fn[ op.runFunc[RegExp.$1] ](num,dir,RegExp.$2);
			}else if(op.effect === 'default'){
				fn[ op.runFunc[op.effect] ](num,dir,'linear');
			}else{
				fn[ op.runFunc[op.effect] ](num,dir,easing);
			}

			if(op.paginationClass) {
				$(op.paginationClass + ' li', op.elem).removeClass(op.currentClass);
				$(op.paginationClass + ' li', op.elem).eq( Math.floor(num/op.scroll) ).addClass(op.currentClass);
			}
		},
		aniNone:function(num){
			var fn = this;
			var op = this.options;
				op.lists.hide().eq(num).show();
				op.callback(num);
		},
		aniFade:function(num){
			var fn = this;
			var op = this.options;
			op.lists.filter(':visible').fadeOut(op.fadeSpeed).end().eq(num).fadeIn(op.fadeSpeed,function(){
				op.callback(num);
			});
		},
		aniEasing:function (num,dir,easing,step){
			var fn = this;
			var op = this.options;

			var param = {};
			var curr = num;
			if(op.circular) {
				if(dir == "next"){
					if(num < op.visible){
						op.slider_lists.css(op.animCss, -((op.visible + num - op.scroll) * op.getVal));
					}
				}else if(dir == "prev"){
					if(num >=  op.total - op.visible){
						op.slider_lists.css(op.animCss, -((op.visible + num + op.scroll) * op.getVal));  
					}
				}
				curr = num + op.visible;  // direction value
			}
			op.slider_lists.stop().animate(op.animCss == "left" ? {
					left: -(curr * op.getVal)
				} : {
					top: -(curr * op.getVal)
				},op.slideSpeed,easing,function() {
				op.callback(num);
			});
		},
		bindEvent: function() {
			var fn = this;
			var op = this.options;
			if(op.btnNext) $(op.btnNext, op.elem).click(function(e) {
				e.preventDefault();
				if(op.play) {
					fn.pause();
				};
				fn.nextCtrl();
			});
			if(op.btnPrev) $(op.btnPrev, op.elem).click(function(e) {
				e.preventDefault();
				if(op.play) {
					fn.pause();
				};
				fn.prevCtrl();
			});
			if(op.paginationClass) {
				$(op.paginationClass + ' li:eq(' + op.start + ')', op.elem).addClass(op.current);
				$(op.paginationClass + ' li a', op.elem).on(op.paginationEvent,function() {
					if(op.play) {
						fn.pause();
					};
					op.clicked = $(this).closest('li').index(); 
					if(op.current != op.clicked) {
						fn.pageCtrl();
					}
					return false;
				});
			}
			if(op.play) {
				playInterval = setInterval(function() {
					fn.nextCtrl()
				}, op.play);
				op.elem.data('interval', playInterval);
			};
			if(op.hoverPause && op.play) {
				op.slider_lists.children().on('mouseover', function() {
					fn.stop();
				});
				op.slider_lists.children().on('mouseleave', function() {
					fn.pause();
				});
			}
			if(op.mouseWheel && $.fn.mousewheel){
				$(op.container, op.elem).on('mousewheel',function(event){
					event.preventDefault();
					if(op.play) {
						fn.pause();
					};
					if(event.deltaX  == 1 || event.deltaY == 1){
						fn.nextCtrl();
					}else if(event.deltaX  == -1 || event.deltaY == -1){
						fn.prevCtrl();
					}
				})

			}
			return this;
		}
	}
	$.slider.fn.init.prototype = $.slider.fn;
	$.fn.slider = function(optss) {
		if(!this.length) {
			return this;
		}
		this.each(function(i,el) {
			$.slider(el,optss);
		});
		return this;
	};

	$.fn.slider.version = "1.5.1";
	$.fn.slider.instance = {
		$count:0
		
	};
	// default opts
	$.slider.defaults = {
		container: '.slides-container',
		btnNext: "", // Next button
		btnPrev: "", // Next button
		paginationClass: "",  // page button
		current:'current', 
		circular:false,
		effect:'default', // none|| default|| fade || easing:easeOutExpo || easing:easeOutSine || ...
		vertical:false, // default horizontal
		visible: 1, // visible count
		scroll:1, //  scroll count
		fadeSpeed: 500, // fade speed
		slideSpeed: 350,  // slide speed
		play: 0,  // duration time
		pause: 0, // pause time

		hoverPause: true, // haover pause
		mouseWheel: false, // action mouse wheel

		paginationEvent:'click', // pagination event
		start: 1, // start on el eq()
		// preload: false, 
		// preloadImage: '/img/loading.gif', 	
		// autoHeight: false, 
		// autoHeightSpeed: 350, 
		before: function() {},
		callback: function() {}
	};

})(jQuery,window);
