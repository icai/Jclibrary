/**
 * date：20130115-16
 * author:caiguangsong
 *
 * last update:2013/03/06
 *
 *
 * ~2013/02/20 : add options showCallback::function
 * ~2013/03/06 : add options type::function
 *
 */



(function($, exports) {
	var comPrefix = 'itour';

	function formatText(msg, values, filter) {
		var pattern = /\{\{([\w\s\.\(\)"',-\[\]]+)?\}\}/g;
		return msg.replace(pattern, function(match, key) {
			var value = values[key] || eval('(values.' + key + ')');
			return $.isFunction(filter)  ? filter(value, key) : value;
		});
	}

	function throwError(msg) {
		throw new Error(msg);
	}

	$.dialog = function(id, optss) {
		var elem = $(id);
		var template = "";
		if(elem.length && elem[0].tagName.toLowerCase() == 'script') template = elem.html(); // DOM 对象
		else template = id; // 字符串
		var opts = $.extend(true, {}, $.dialog.defaults, optss);
		return new $.dialog.fn.init(template, opts);
	}
	$.dialog.fn = $.dialog.prototype = {
		constructor: $.dialog,
		options: {},
		dgId: '',
		setmask: false,
		isIe6: !! $.browser.msie && parseInt($.browser.version, 10) == 6,
		init: function(tmpl, opts) {
			var fn = this;
			for(var i in opts) {
				this.options[i] = opts[i];
			}

			var curId = comPrefix+"_ui_dialog_" + (new Date).getTime();
			this._template = tmpl;
			this.dgId = curId;
			var bdata = opts.before.call(this, curId);
			if(!bdata) {
				opts = $.extend(true, {}, opts, bdata); // before function 重载 设置
				for(var i in opts) {
					this.options[i] = opts[i];
				}
			}
			this._init();
			return this;
		},
		_init: function() {
			var op = this.options;
			var gstyle = {
				left: op.left,
				top: op.top,
				position: (op.fixed ? "fixed" :"absolute")
			}
			this.format().setStyle(gstyle).show().bindEvent();
		},
		content: function() {

			return this;
		},
		format: function() { // 格式化模板
			var fn = this;
			var op = this.options;

			var data = {
				title: op.title,
				content: op.content,
				type:op.type
			}
			if(op.close) { //常用按钮 关闭
				//data.close = "关闭";
				op.button = op.button || [];
				op.button[op.button.length] = {
					caption: "close",
					name: "关闭",
					callback: $.isFunction(op.close) ? op.close : function() {
						fn.hide();
					}
				}
			}
			if(op.ok) { //常用按钮 OK
				//data.ok = this.okVal;
				op.button = op.button || [];
				op.button[op.button.length] = {
					caption: "ok",
					name: this.okVal || "确定",
					callback: $.isFunction(op.ok) ? op.ok : function() {
						fn.hide();
						op.callback && op.callback();
					}
				}
			}
			if(op.cancel) { //常用按钮 cancel
				//data.cancel = cancelVal;
				op.button = op.button || [];
				op.button[op.button.length] = {
					caption: "cancel",
					name: this.cancelVal || "取消",
					callback: $.isFunction(op.cancel) ? op.cancel : function() {
						fn.hide();
						op.callback && op.callback();
					}
				}

			}
			if(op.button) { // 自定义按钮
				for(var i = 0; i < op.button.length; i++) {
					data[op.button[i]['caption']] = op.button[i]['name'];
				};
			}
			this.template = formatText(this._template,data);
			return this;
		},

		setStyle: function(param) { //样式设定
			var fn = this,
				ifm = '<iframe class="dialog_iframe" style="position: absolute; left: 0px; filter: progid:dximagetransform.microsoft.alpha(opacity=0); z-index: -1; top: 0px; opacity: 0" height="100%" frameborder=no width="100%"></iframe>';

			this.template = $(this.template).attr({
				'id': this.dgId
			}).css({
				zIndex: this.options.zIndex,
				position: (this.isIe6 ? "absolute" : "fixed")
			}).append(this.isIe6 ? ifm : '');

			return this;
		},
		_center:function(b){
			var fn = this,
				w = {
					height: $(window).height(),
					width: $(window).width(),
					scrollLeft: $(window).scrollLeft(),
					scrollTop: $(window).scrollTop()
				},
				o = {height: b.height(),width: b.width()};
			if(fn.isIe6) {
				b.css({
					top: w.scrollTop + (w.height - o.height) / 2,
					left: w.scrollLeft + (w.width - o.width) / 2
				})
			} else {
				b.css({
					top: (w.height - o.height) / 2,
					left: (w.width - o.width) / 2
				})
			}
		},
		_resize : function(b) {
			var fn = this,
				w = {
					height: $(window).height(),
					width: $(window).width(),
					scrollLeft: $(window).scrollLeft(),
					scrollTop: $(window).scrollTop()
				},
				o = {height: b.height(),width: b.width()};
			if(fn.isIe6) {
				b.css({
					top: w.scrollTop + (w.height - o.height) / 2,
					left: w.scrollLeft + (w.width - o.width) / 2
				})
			} else {
				b.css({
					top: (w.height - o.height) / 2,
					left: (w.width - o.width) / 2
				})
			}
		},
		show: function() {
			var fn = this;
			var op = this.options;

			if(op.mask) {
				if(!$.mask) throwError(" please add $.mask plugin!");
				this.setmask = true;

				$.mask({
					background: op.background,
					opacity: op.opacity,
					zIndex: op.zIndex - 1
				})
			}
			this.template.appendTo('body');

			this._resize($('#' + fn.dgId));
			$(window).bind('resize.' + this.dgId, function() {
				fn._resize($('#' + fn.dgId))
			})

			if(op.showCallback && $.isFunction(op.showCallback)){
				op.showCallback.call(this,fn.dgId);
			}
			return this;
		},
		hide: function() {
			if(this.setmask) {
				$.unmask();
			}
			$('#' + this.dgId).remove();
			$(window).unbind('resize.' + this.dgId);
			return this;
		},
		bindEvent: function() {
			var fn = this;
			var op = this.options;
			var that = $('#' + this.dgId);

			if(op.button) {
				$.each(op.button, function(i, el) {
					that.find('[data-dialog-btn="' + el.caption + '"]').bind('click', function() {
						el.callback.call(fn)
					});
				})
			}
			if(op.timeout) {
				setTimeout(function() {
					fn.hide();
				}, op.timeout)
			}
		},
		mask: $.mask,
		unmask: $.unmask
	}

	$.dialog.fn.init.prototype = $.dialog.fn;

	$.fn.dialog = function(optss) {
		if(!this.length) {
			return this;
		}
		this.each(function() {
			$.dialog(this, optss);
		});
		return this;
	};
	// default optss
	$.dialog.defaults = {
		type:undefined,
		theme: undefined,
		// 待定
		title: null,
		content: null,
		timeout: 0,
		fixed: false,
		// 待定		
		zIndex: 10001,
		mask: false,
		opacity: 0.5,
		background: "#000",
		drag: false,
		// 待定
		left: 'center',
		// 待定				
		top: 'center',
		// 待定		
		button: null,
		close: null,
		ok: null,
		cancel: null,
		okVal: null,
		cancelVal: null,
		// button:[
		// 	{caption:"wo",callback:function(){
		// 	}},
		// 	{caption:"",callback:function(){
		// 	}}		
		// ],
		before: function() {},
		callback: function() {},
		showCallback:null
	};
	$.dialog.cache = [];
})(jQuery, this);