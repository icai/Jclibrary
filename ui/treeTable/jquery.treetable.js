/**
 *
 * plugin: treetable
 * 
 * date：20130123
 * author:caiguangsong
 *
 */



(function($, exports) {



	function formatText(msg, values, filter) {
		var pattern = /\{\{([\w\s\.\(\)"',-\[\]]+)?\}\}/g;
		return msg.replace(pattern, function(match, key) {
			var value = values[key] || eval('(values.' + key + ')');
			return jQuery.isFunction(filter) || isFunction(filter) ? filter(value, key) : value;
		});
	}

	function throwError(msg) {
		throw new Error(msg);
	}


	String.prototype.format = function(data, filter) {
		return formatText(this, data, filter);
	};


	$.treetable = function(id, optss) {
		var elem = $(id);
		var template = "";
		if(elem.length) template = elem.html();
		else template = id;

		var opts = $.extend(true, {}, $.treetable.defaults, optss);

		return new $.treetable.fn.init(template, opts);
	}
	$.treetable.fn = $.treetable.prototype = {
		constructor: $.treetable,
		options: {},
		dgId: '',
		setmask: false,
		isIe6: !! $.browser.msie && parseInt($.browser.version, 10) == 6,
		init: function(tmpl, opts) {


			var fn = this;

			for(var i in opts) {
				this.options[i] = opts[i];
			}

			var curId = "itour_ui_treetable_" + (new Date).getTime();

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
				content: op.content
			}

			if(op.close) { //常用按钮 关闭
				//data.close = "关闭";
				op.button = op.button || [];
				op.button[op.button.length] = {
					caption: "close",
					name: "关闭",
					callback: isFunction(this.close) ? this.close : function() {
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
					callback: isFunction(this.ok) ? this.ok : function() {
						fn.hide();
						fn.callback && fn.callback();
					}
				}
			}
			if(op.cancel) { //常用按钮 cancel
				//data.cancel = cancelVal;
				op.button = op.button || [];
				op.button[op.button.length] = {
					caption: "cancel",
					name: this.cancelVal || "取消",
					callback: isFunction(this.cancel) ? this.cancel : function() {
						fn.hide();
						fn.callback && fn.callback();
					}
				}

			}
			if(op.button) { // 自定义按钮
				for(var i = 0; i < op.button.length; i++) {
					data[op.button[i]['caption']] = op.button[i]['name'];
				};
			}
			this.template = this._template.format(data);
			return this;
		},

		setStyle: function(param) { //样式设定
			var fn = this;
			this.template = $(this.template).attr({

				'id': this.dgId
			}).css({
				zIndex: this.options.zIndex,
				position: (this.isIe6 ? "absolute" : "fixed")
			}).append(this.isIe6 ? '<iframe class="treetable_iframe" style="position: absolute; left: 0px; filter: progid:dximagetransform.microsoft.alpha(opacity=0); z-index: -1; top: 0px; opacity: 0" height="100%" frameborder=no width="100%"></iframe>' : '');

			return this;
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

			var _resize = function(b) {
					var w = {
						height: $(window).height(),
						width: $(window).width(),
						scrollLeft: $(window).scrollLeft(),
						scrollTop: $(window).scrollTop()
					}
					var o = {
						height: b.height(),
						width: b.width()

					}
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
				}


			_resize($('#' + fn.dgId));
			$(window).bind('resize.' + this.dgId, function() {
				_resize($('#' + fn.dgId))
			})


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
					that.find('[data-treetable-btn="' + el.caption + '"]').bind('click', function() {
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

	$.treetable.fn.init.prototype = $.treetable.fn;

	$.fn.treetable = function(optss) {
		if(!this.length) {
			return this;
		}
		this.each(function() {
			$.treetable(this, optss);
		});
		return this;
	};
	// default optss
	$.treetable.defaults = {
		theme: undefined,
		data:{},

	};

	$.treetable.template = {
		"defalut": {
			html: "",
			css: ''
		},
		"defalut2": {
			html: "",
			css: ''
		}
	};

	$.treetable.cache = [];
	exports.itour = exports.itour ? exports.itour : {};
	exports.itour.ui = exports.itour.ui ? exports.itour.ui : {};
	exports.itour.ui.treetable = $.treetable


})(jQuery, this);





[{  
    "id":1,  
    "text":"Folder1",
    "children":[{  
        "text":"File1",  
        "checked":true  
    },{  
        "text":"Books",  
        "state":"open",  
        "attributes":{  
            "url":"/demo/book/abc",  
            "price":100  
        },  
        "children":[{
            "text":"PhotoShop",
            "checked":true,
        },{  
            "id": 8,  
            "text":"Sub Bookds",  
            "checked":true
        }]  
    }]
},{  
    "text":"Languages",  
    "state":"closed",  
    "children":[{
        "text":"Java"  
    },{  
        "text":"C#"  
    }]  
}]


