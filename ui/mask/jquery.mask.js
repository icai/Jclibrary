
/**
 * date：20130114
 * author:caiguangsong 
 */



(function($,exports) {

	function isIe6(){
		return  /MSIE 6\.\d+/i.test(navigator.userAgent)
	}

	var class2type = {};
	( "Boolean Number String Function Array Date RegExp Object"
	).replace(/\w+/g, function(n) {
		class2type[ "[object " + n + "]" ] = n.toLowerCase();
	});

	$.type = $.type || function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ Object.prototype.toString.call(obj) ] || "object";
	};

	Date.prototype.now = Date.prototype.now || function() {
		return (new Date).getTime()
	};

	$.extend({

		/**
		 * mark 生成遮罩层
		 * @param  {[Object]} optss [description]
		 * @return {[type]}       [description]
		 */
		mask:function(optss){
			var opts = $.extend(true, {}, $.mask.defaults, optss); // jQuery.extend( [deep], target, object1 [, objectN] )
			var curId = "itour_ui_mask_" +  (new Date).now(); 
			var cacheObject = {
				"_maskId":curId,
				options:opts
			}
			this.mask.cache[this.mask.cache.length] = cacheObject;

			opts.before.call(this,curId);
			var _mask = $('<div />',{
				'class':"itour_ui_mask",
				'id':curId,
				style:'	background: '+ opts.background 
					+';-khtml-opacity: '+opts.opacity 
					+';-moz-opacity: '+ opts.opacity
					+';opacity: '+opts.opacity 
					+';filter: alpha(opacity='+ 99.99*opts.opacity 
					+');-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity='+ 99.99*opts.opacity 
					+')";z-index:'+ opts.zIndex 
					+';position:'+ (isIe6() ? "absolute" : "fixed") 
					+';left:0;top:0;width:'+(isIe6() ? $(document.body).width()  +"px": "100%")+';height:'+ (isIe6() ? $(document.body).height() +"px": "100%")+';',
				html:(isIe6() ? '<iframe class="mask_iframe" style="position: absolute; left: 0px; filter: progid:dximagetransform.microsoft.alpha(opacity=0); z-index: -1; top: 0px; opacity: 0" height="100%" frameborder=no width="100%"></iframe>' :"")
			})
			
			$(document.body).append(_mask);
			opts.callback.call(this,curId);
		},
		/**
		 * unmark:: 删除 遮罩层
		 * 
		 * @arguments  {[Boolean]} a [description]
		 * @param  {[fixed]} b [description]
		 * 
		 */
		unmask:function(a,b){ // (ture,300);
			var args = [].slice.call(arguments,0),
				target = args[0] || 400, // animate
				length = args.length,
				deep = false,
				callback = function(){};

			if($.mask.cache.length == 0){
				return;
			}	

			if ( typeof target === "boolean") {
				deep = target; // del all
				target = args[1] || false;  // animate
				//callback = args[2] || callback
			}

			// else if($.type(target) == "function"){
			// 	callback = target;
			// }

			if(deep){
				if(target == "fast"){
					$.each($.mask.cache,function(i,el){
						$('#'+ el._maskId).remove();
					})
				}else{
					$.each($.mask.cache,function(i,el){
						$('#'+ el._maskId).animate({
							"opacity": 0
						},target,function(){
							$(this).remove();
						})
					})	
				}
				$.mask.cache = []; // del all instance !!
			}else{
				if(target == "fast"){
					$('#'+ $.mask.cache[$.mask.cache.length -1]['_maskId']).remove();	
				}else{
					$('#'+ $.mask.cache[$.mask.cache.length -1]['_maskId']).animate({
						"opacity": 0
					},target,function(){
						$(this).remove();
					})
				}
				$.mask.cache.pop(); 
				// del the last one;
			}
		}
	})


	// default optss
	$.mask.defaults = {
		background:"#000",
		zIndex:9999,
		opacity:0.5,
		before: function() {},
		callback: function() {}
	};
	$.mask.cache = [];

    exports.itour = exports.itour ? exports.itour : {};
    exports.itour.ui = exports.itour.ui ? exports.itour.ui : {};
    exports.itour.ui.mask = $.mask;
	exports.itour.ui.unmask = $.unmask;

})(jQuery,this);
