/**
 * date：20130117
 * author:caiguangsong
 *
 */
(function($, exports) {
	"use strict"; // jshint ;_;

	var isIe6  = /MSIE 6\.\d+/i.test(navigator.userAgent);

	$.extend({
		isScrollTo: function() {
			var b = !1;
			if(arguments.length) {
				var c = arguments[0],
					d = $(window).height(),
					e = $(document).scrollTop(),
					f = $(document).height();
				if("number" == typeof c && (b = e >= c), "string" == typeof c) {
					var g = 0;
					("bottom" == c || "100%" == c) && (b = e >= f - d), ("top" == c || "0%" == c) && (b = 0 === e), /\%$/.test(c) && (g = c.replace(/\%$/, ""), g *= .01, !isNaN(g) && 1 > g && (b = e >= g * (f - d)))
				}
			} else b = e  >= f - d;
			return b
		}
	});




	$.fn.scrollFixed = function(options) {
		if(!this.length) {
			return this;
		}

		var opts = $.extend(true, {}, $.fn.scrollFixed.defaults, options);
		var orginEl  = this;
		this.each(function() {

			var elem = $(this);
			var now = (new Date).getTime();
			var oO = elem.offset(),
				oH = elem.outerHeight(),
				oT = oO.top,
				oL = oO.left;

			var oS = {
				position:elem.css('position'),
				
				top:elem.css('top'),
				// right:elem.css('right'),
				// bottom:elem.css('bottom'),
				zIndex:elem.css('zIndex'),
				padding:elem.css('padding'),
				margin:elem.css('margin')
			};

			var oSx = {
				left:(elem.css('left') == 'auto'? 0 : parseFloat(elem.css('left')))
			}
			var oSz = {
				height:elem.css('height'),
				width:elem.css('width')
			}
			var pH = oO.top - elem.position().top; // the offset value of  the relative element relativing to body 

			if(opts.limit){
				if($(opts.limit).length){
					var limit = $(opts.limit)
				}else{
					throw new Error(" arguments \'limit\' element Not find!")
				}



				$(window).bind('scroll.fixed'+now+',resize.fixed'+now,function(){

					var limitH = limit.outerHeight();

					var lH = limitH + limit.offset().top; // limit object limited Height

					elem.attr('data-scroll','fixed'+now);
					$.fn.scrollFixed.cache['fixed'+now] = oS;

					var sT = $(window).scrollTop();
					var sL = $(window).scrollLeft();
					if(!isIe6){

						if($.isScrollTo(oT - opts.top) && $.isScrollTo(lH - oH)){
							elem.css({
								position:"fixed",
								top:lH - (sT  + oH),
								zIndex:opts.zIndex
							})

						}else if($.isScrollTo(oT - opts.top)){
							elem.css({
								position:"fixed",
								top:opts.top,
								zIndex:opts.zIndex,
								height:oSz.height,
								width:oSz.width				
							})
						}else{

							elem.removeAttr('style').css(oS);
						}
					}else{
						if($.isScrollTo(oT - opts.top) && $.isScrollTo(lH - oH)){

							elem.css({
								position:"absolute",
								top:lH - oH - opts.top -pH,
								zIndex:opts.zIndex
							})

						}else if($.isScrollTo(oT - opts.top)){
							elem.css({
								position:"absolute",
								top:sT + opts.top - pH,
								zIndex:opts.zIndex
							})							
							
						}else{
							elem.css(oS);

						}
					}
				})

			}else{
				$(window).bind('scroll.fixed'+now+',resize.fixed'+now,function(){

					elem.attr('data-scroll','fixed'+now);

					var sT = $(window).scrollTop();
					var sL = $(window).scrollLeft();
					if(!isIe6){
						if($.isScrollTo(oT - opts.top)){
								elem.css({
									position:"fixed",
									top:opts.top,
									zIndex:opts.zIndex,
									height:oSz.height,
									width:oSz.width				
								})
						}else{
							elem.removeAttr('style').css(oS);
						}
					}else{
						if($.isScrollTo(oT - opts.top) ){
								elem.css({
									position:"absolute",
									top:sT + opts.top - pH,
									zIndex:opts.zIndex
								})	
						}else{
							elem.css(oS);
						}
					}
				})
			}
			$(window).scroll().resize(); //  fixed f5 

			
		});
		return this;
	};

	$.fn.unscrollFixed  = function(){
		var orginEl  = this;
		var namespace = this.attr('data-scroll');
		if(namespace){
			$(window).unbind('scroll.'+namespace+',resize.'+namespace);
			 orginEl.removeAttr('data-scroll').removeAttr('style').css($.fn.scrollFixed.cache[namespace]);
			delete $.fn.scrollFixed.cache[namespace];
		}
		return this;
	}
	// default optss
	$.fn.scrollFixed.defaults = {
		top:0,
		zIndex:300,
		limit:null
	};


	$.fn.scrollFixed.cache = {};

	function __import(o,param){
		$(o).scrollFixed(param)
	}
	function __unimport(o,param){
		$(o).unscrollFixed(param)
	}


	exports.itour = exports.itour ? exports.itour : {};
	exports.itour.util = exports.itour.util ? exports.itour.util : {};
	exports.itour.util.scrollFixed = __import;
	exports.itour.util.unscrollFixed = __unimport;

})(jQuery, this);

