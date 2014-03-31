/**
 * date：20130115-16
 * author:caiguangsong
 * blog:hi.baidu.com/tp100
 *
 * last update:2014/03/31
 *
 *
 * ~2013/02/20 : add options afterRender::function
 * ~2013/03/06 : add options type::function
 * ~2014/03/15 : add drag::function and reconstruct this.
 * ~2014/03/22 : add options position,direction
 *
 */

var Browser = {
	isIE6: /MSIE\s*6\.\d+/i.test(navigator.userAgent),
	isIEU9: /MSIE\s*(\d+)\.\d+/i.test(navigator.userAgent) && RegExp['$1'] < 9
};

var Utils = {
    getViewportRect: function (){
        var width = $(window).innerWidth();
        var height = $(window).innerHeight();
        return {
            left: 0,
            top: 0,
            height: height,
            width: width,
            bottom: height,
            right: width
        };
    },
    getClientRect: function (element){
        var bcr;
        try{
            bcr = element.getBoundingClientRect();
        }catch(e){
            bcr={left:0,top:0,height:0,width:0}
        }
        var rect = {
            left: bcr.left,
            top: bcr.top,
            height: bcr.bottom - bcr.top,
            width: bcr.right - bcr.left
        };
        rect.bottom = rect.top + rect.height;
        rect.right = rect.left + rect.width;
        return rect;
    },
    getScrollbarWidth: function(){
    	return this.hasScrollbar(true,document.body) && Browser.isIEU9 ? $.scrollbarWidth() : 0
    },
    hasScrollbar: function(Vertical,el){
    	var dir = Vertical ? 'Height' : 'Width';
    	if(el.tagName.toLowerCase() != 'body')
    		return el['scroll'+ dir] > el['client' + dir];
    	else
    		return el['scroll'+ dir] > this.getViewportRect()[dir.toLowerCase()];
    }
};


(function($, window, undefined) {
	var DragClass = function(dom,options){
		if(!this instanceof DragClass)
			return new DragClass(dom,options);
		this.dom = $(dom);
		this.options = options;
		this.initEvent.call(this, options);
	}

	DragClass.prototype = {
		constructor: DragClass,
		getDom: function(){
			return this.dom;
		},
		safeSetOffset :function(offset){
	        var me = this;
	        var el = me.getDom()[0];
	        var vpRect = Utils.getViewportRect();
	        var rect = Utils.getClientRect(el);
	        var left = offset.left;
	        if (left + rect.width > vpRect.right) {
	            left = vpRect.right - rect.width - Utils.getScrollbarWidth();
	        }
	        var top = offset.top;
	        if(me.options.fixed){
	            if (top + rect.height > vpRect.bottom) {
	                top = vpRect.bottom - rect.height;
	            }
	        }else{
	        	var bodyScrollTop = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	        	top = bodyScrollTop + top;
	        	if(top + rect.height > document.body.scrollHeight){
	        		top = document.body.scrollHeight - rect.height
	        	}
	        }
	        el.style.left = Math.max(left, 0) + 'px';
	        el.style.top = Math.max(top, 0) + 'px';
	    },
	    initEvent: function(options){
			var me = this;
			var srcElement = options.handler ? this.getDom().find(options.handler) : this.getDom();
			var rect;
			srcElement.on('mousedown', function(evt) {
				me.dragEvent(evt, options.fixed, {
					ondragstart: function(evt) {
						rect = Utils.getClientRect(me.getDom()[0]);
						options.onstart(evt);
					},
					ondragmove: function(x, y, evt) {
						var left = rect.left + x;
						var top = rect.top + y;
						me.safeSetOffset({ //
							left: left,
							top: top
						});
						options.onmove(evt);
					},
					ondragstop: function(evt) {
						options.onstop(evt);
					}
				});
			})
	    },
	    dragEvent: function (evt, fixed, callbacks, doc) {
			var fixed = fixed;
		    var doc = doc || document;
		    var startX = evt.clientX;
		    var startY = fixed ? evt.clientY : evt.pageY;
		    var clientHeight = evt.clientY;
		    function handleMouseMove(evt){
		        var x = evt.clientX - startX;
		        var y = (fixed ? evt.clientY - startY : evt.pageY - startY);
		        callbacks.ondragmove(x, y,evt);
		        evt.stopPropagation(); 
		    }
		    if (doc.addEventListener) {
		        function handleMouseUp(evt){
		        	$(doc).off('mousemove.dialogdrag',handleMouseMove)
		    			.off('mouseup.dialogdrag',handleMouseUp);
		        	$(window).off('mouseup.dialogdrag',handleMouseUp);
		            callbacks.ondragstop();
		        }
		        $(doc).on('mousemove.dialogdrag',handleMouseMove)
		        	.on('mouseup.dialogdrag',handleMouseUp);
		        $(window).on('mouseup.dialogdrag',handleMouseUp);
		        evt.preventDefault();
		    } else {
		        var elm = evt.target || evt.srcElement || doc;
		        elm.setCapture();
		        function releaseCaptrue(){
		            elm.releaseCapture();
		            $(elm).off('mousemove.dialogdrag',handleMouseMove)
		            	  .off('mouseup.dialogdrag', releaseCaptrue)
		            	  .off('losecaptrue.dialogdrag',releaseCaptrue);
		            callbacks.ondragstop();
		        }
		        $(elm).on('mousemove.dialogdrag',handleMouseMove)
		        	  .on('mouseup.dialogdrag', releaseCaptrue)
		        	  .on('losecaptrue.dialogdrag',releaseCaptrue);
		    }
		    evt.preventDefault();
		    callbacks.ondragstart();
		}
	}

	$.fn.simpledrag = function(options) {
		if (!this.length) {
			return this;
		}
		var opts = $.extend(true, {}, $.fn.simpledrag.defaults, options);
		this.each(function() {
			var me = $(this);
			var _d = new DragClass(me,opts);
		});
		return this;
	};
	// default options
	$.fn.simpledrag.defaults = {
		handler: "",
		onstart: $.noop,
		onmove: $.noop,
		onstop: $.noop
	};
})(jQuery, window);


(function($, window, undefined) {
    var __scrollbarWidth;
    $.scrollbarWidth = function() {
        var parent, child;
        if (__scrollbarWidth === undefined) {
            parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
            child = parent.children();
            __scrollbarWidth = child.innerWidth() - child.height(99).innerWidth();
            parent.remove();
        }
        return __scrollbarWidth;
    };
})(jQuery, window);


(function($, window, undefined) {
	var comPrefix = window.comPrefix || 'youcompany';

	function formatText(msg, values, filter) {
		var pattern = /\{\{([\w\s\.\(\)"',-\[\]]+)?\}\}/g;
		return msg.replace(pattern, function(match, key) {
			var value = values[key] || eval('(values.' + key + ')');
			return $.isFunction(filter)  ? filter(value, key) : value;
		});
	}

	var Dialog = function(str, opts) {
		var elem = $(str);
		var template = "";
		if(elem.length) template = elem.html(); // DOM object // && elem[0].tagName.toLowerCase() == 'script'
		else template = str; // String
		var opts = $.extend(true, {}, Dialog.defaults, opts);
		return new Dialog.fn.initialize(template, opts);
	}
	Dialog.fn = Dialog.prototype = {
		constructor: Dialog,
		setmask: false,
		mask: function(){
			$.mask.apply(null,arguments);
		},
		unmask: function(){
			$.unmask.apply(null,arguments);
		},
		draggable: function(dom,options){
			return $(dom).simpledrag(options);
		},
		initialize: function(tmpl, opts) {
			var me = this;
			this.options = $.extend(true, {},opts);
			var curId = comPrefix+"_ui_dialog_" + (new Date).getTime();
			this._template = tmpl;
			this.uuid = curId;
			var overloadData;
			if(! (overloadData = opts.beforeRender.call(this, curId)) ) {
				opts = $.extend(true, {}, opts, overloadData); // beforeRender function overload options
				this.options = $.extend(true ,{},opts);
			}
			this._init();
			return this;
		},
		_init: function() {
			var op = this.options;
			var gstyle = {
				zIndex:op.zIndex,
				position: (op.fixed ? "fixed" :"absolute")
			}
			this.format().setStyle(gstyle).render().bindEvent();
		},
		getDom: function(){
			return $('#' + this.uuid)
		},
		content: function() {
			return this;
		},
		format: function() { // format template
			var me = this;
			var op = this.options;

			var data = { // render dialog data
				title: op.title,
				content: op.content,
				type:op.type
			}
			if(op.close) { //common button close
				op.button = op.button || [];
				op.button[op.button.length] = {
					caption: "close",
					name: this.closeVal || "\u5173\u95ED",
					callback: $.isFunction(op.close) ? op.close : function() {
						me.destroy();
					}
				}
			}
			if(op.ok) { //common button OK
				op.button = op.button || [];
				op.button[op.button.length] = {
					caption: "ok",
					name: this.okVal || "\u786E\u5B9A",
					callback: $.isFunction(op.ok) ? op.ok : function() {
						me.destroy();
						op.callback && op.callback();
					}
				}
			}
			if(op.cancel) { //common button cancel
				op.button = op.button || [];
				op.button[op.button.length] = {
					caption: "cancel",
					name: this.cancelVal || "\u53D6\u6D88",
					callback: $.isFunction(op.cancel) ? op.cancel : function() {
						me.destroy();
						op.callback && op.callback();
					}
				}

			}
			if(op.button) { // custom buttons
				for(var i = 0; i < op.button.length; i++) {
					data[op.button[i]['caption']] = op.button[i]['name'];
				};
			}
			this.template = formatText(this._template,data);
			return this;
		},
		setStyle: function(param) { //set style
			var fn = this,
				ifm = '<iframe class="dialog_iframe" \
				style="position: absolute; left: 0px; z-index: -1; top: 0px; opacity: 0" height="100%" \
				filter: progid:dximagetransform.microsoft.alpha(opacity=0); \
				frameborder=no width="100%"></iframe>';
			this.template = $(this.template).attr({
				'id': this.uuid
			}).css(param).append(Browser.isIE6 ? ifm : '');
			return this;
		},
		render: function() {
			var me = this, op = this.options;
			if(op.mask) {
				try{
					me.setmask = true;
					me.mask({
						background: op.background,
						opacity: op.opacity,
						zIndex: op.zIndex - 1
					})
				}catch(e){}
			}
			this.template.appendTo('body');
			this.setPositionOffset();
			return this;
		},
		destroy: function() {
			var me =  this
			try{
				if(me.setmask) {
					me.unmask();
				}
			}catch(e){};
			this.getDom().remove();
			$(window).unbind('resize.' + this.uuid).unbind('scroll.'+ this.uuid);
			this.options.afterClose();
			return this;
		},
		setPositionOffset: function(x,y){
			var me = this,
				w = {
					scrollLeft: document.body.scrollLeft,
					scrollTop: document.body.scrollTop
				},
				position = me.options.position,
				dirX = x || position[0],
				dirY = y || position[1];

            var el = me.getDom()[0];
            var vpRect = Utils.getViewportRect();
            var rect = Utils.getClientRect(el);
            var left,top,precent;

			if(!me.options.fixed || Browser.isIE6) {
				if(dirX == "left")
					left =  w.scrollLeft;
				else if(dirX == "center")
					left =  w.scrollLeft + (vpRect.right - rect.width - Utils.getScrollbarWidth() ) / 2;
				else if(dirX == "right")
					left =  w.scrollLeft + vpRect.right - rect.width - Utils.getScrollbarWidth();
				else if(!isNaN(dirX))
					left =  dirX;
				else if (/^(\d+)%$/.test(dirX))
					precent = RegExp.$1 * 0.01,left =  (w.scrollLeft + vpRect.right - rect.width - Utils.getScrollbarWidth()) * precent;

				if(dirY == "top")
					top = w.scrollTop;
				else if(dirY == "center")
					top = w.scrollTop + (vpRect.bottom - rect.height) / 2;
				else if(dirY == "bottom")
					top = w.scrollTop + vpRect.bottom - rect.height;
				else if(!isNaN(dirY))
					top =  dirY;
				else if(/^(\d+)%$/.test(dirY))
					precent = RegExp.$1 * 0.01,top =  ( w.scrollTop + vpRect.bottom - rect.height ) * precent;

			} else {
				if(dirX == "left")
					left =  0;
				else if(dirX == "center")
					left =  (vpRect.right - rect.width - Utils.getScrollbarWidth() ) / 2;
				else if(dirX == "right")
					left =  vpRect.right - rect.width - Utils.getScrollbarWidth();
				else if(!isNaN(dirX))
					left =  dirX;
				else if(/^(\d+)%$/.test(dirX))
					precent = RegExp.$1 * 0.01,left =  (vpRect.right - rect.width - Utils.getScrollbarWidth()) * precent;
				if(dirY == "top")
					top = 0;
				else if(dirY == "center")
					top = (vpRect.bottom - rect.height) / 2;
				else if(dirY == "bottom")
					top = vpRect.bottom - rect.height;
				else if(!isNaN(dirY))
					top =  dirY;
				else  if(/^(\d+)%$/.test(dirY))
					precent = RegExp.$1 * 0.01,top =  (vpRect.bottom - rect.height) * precent;
			};
			el.style[me.options.direction[0]] = Math.max(left, 0) + 'px';
			el.style[me.options.direction[1]] = Math.max(top, 0) + 'px';
           // ( !/^0(?:px|%)/.test(el.style[me.options.direction[0]]) || (typeof x !== 'undefined') ) && (el.style[me.options.direction[0]] = Math.max(left, 0) + 'px');
           // ( !/^0(?:px|%)/.test(el.style[me.options.direction[1]]) || (typeof y !== 'undefined') ) && (el.style[me.options.direction[1]] = Math.max(top, 0) + 'px');
		},
		getButton: function(param){
			var op = this.options;
			var root = this.getDom();
				return root.find('[data-dialog-btn="' + param.caption + '"]');
		},
		bindEvent: function() {
			var me = this;
			var op = this.options;
			var root = this.getDom();

			if(op.timeout) setTimeout(function() {
					me.destroy();
			}, op.timeout)

			if(op.button) $.each(op.button, function(i, el) {
					root.find('[data-dialog-btn="' + el.caption + '"]').bind('click', function() {
						el.callback.call(me)
					});
			})
			if(op.autoStyle){
				$(window).bind('resize.' + this.uuid, function() {
					me.setPositionOffset()
				})
				if(Browser.isIE6){
					$(window).bind('scroll.' + this.uuid, function() {
						me.setPositionOffset()
					})
				}
			}
			if(op.afterRender && $.isFunction(op.afterRender)){
				op.afterRender.call(this,this.getDom());
			}
	        if (op.drag) {
	        	me.draggable(root,{
	        		fixed:op.fixed,
	        		handler: op.drag.handler || ''
	        	})
	        }
		}
	}
	Dialog.fn.initialize.prototype = Dialog.fn;
	// default optss
	Dialog.defaults = {
		type:"",
		title: '',
		content: '',
		timeout: 0,
		zIndex: 10001,

		mask: false,
		opacity: 0.2,
		background: "#000",


		drag: false,
		// drag:{
		// 	handler:''
		// },
		fixed: true, // -> postion:fixed 
		position:["center","center"], // new 
		direction:["left","top"], // new 
		autoStyle: true,


		close: undefined,
		closeVal: undefined,
		ok: undefined,
		cancel: undefined,
		okVal: undefined,
		cancelVal: undefined,
		button:[
			// {caption:"", name:"",callback:function(){
			// }},
			// {caption:"", name:"", callback:function(){
			// }}
		],


		beforeRender: function() {},
		afterClose: function() {},
		afterRender:function() {}
	};

	// import api
	$.dialog = function(str,opts){
		return new Dialog(str,opts)
	};
	$.fn.dialog = function(opts) {
		if(!this.length) {
			return this;
		}
		this.each(function() {
			new Dialog(this, opts);
		});
		return this;
	};

})(jQuery, window);