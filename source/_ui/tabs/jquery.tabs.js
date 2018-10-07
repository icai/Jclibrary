
/**
 * Plugin: tabs
 * Date：20130107 
 * Author:caiguangsong
 * Mail:gidcai#gmail.com
 * Last update:20130625
 *
 *	~ add argument 'trigger' replace with 'oEvent'
 *	~ remove argument 'qjax'
 * 
 */

(function($,w) {

	$.tabs = function(obj,options){
		if(!(this instanceof $.tabs)){
			return new $.tabs(obj,options);
		}
		return this.initialize.apply(this,arguments);
	}

	$.tabs.prototype = {
		initialize:function(target,param){
			this.wraper = target;
			this.options = param;
			this.__init__();
		},
		__init__:function(){
			this.bindEvent();
		},
		timer:null,
		setIndex:function(obj){
			if(this.options.index != 0){
				obj.trigger('click');
			}
		},
		delayTab:function(time,callback) {
				clearTimeout(this.timer);
				this.timer =  setTimeout(callback, time);
		},
		swap:function(elem,panelCls,panelBox){
			var op = this.options;
			elem.siblings().removeClass(op.addClass).end().addClass(op.addClass);
			
			panelCls.siblings().hide().end().eq(elem.index()).show();
			op.callback && op.callback.call(this,elem.index(),elem,panelBox);
			typeof op.content == "function"  &&  op.content.call(this,elem.index);

		},
		_tabActive:function(handleCls,panelCls,panelBox){
			var fn = this;
			var op = this.options;
		 	handleCls.bind(op.trigger,function(){
		 		var that = $(this);
		 		if(op.trigger == "mouseover"){
		 			fn.delayTab(50,function(){
		 				fn.swap(that,panelCls,panelBox)
		 			})
		 		}else{
		 			fn.swap(that,panelCls,panelBox);
		 		}
		 	})
		},
		bindEvent:function(){
			var op = this.options;
			var that = $(this.wraper);

			var handleCls = (!!op.handleBox && !!op.handleClass) ? that.find(op.handleBox+" "+op.handleClass)

						: (!op.handleBox && !!op.handleClass) ? that.find(op.handleClass)
						: (!!op.handleBox && !op.handleClass) ? that.find(op.handleBox).children()
						:that.find(op.handleClass);

			var panelCls = (!!op.panelBox && !!op.panelClass) ? that.find(op.panelBox+" "+op.panelClass)
						: (!op.panelBox && !!op.panelClass) ? that.find(op.panelClass)
						: (!!op.panelBox && !op.panelClass) ? that.find(op.panelBox).children()
						: that.find(op.panelClass);
			this._tabActive(handleCls,panelCls,panelCls.parent())

			this.setIndex(handleCls.eq(op.index));
		}


	}
	$.fn.tabs = function(options) {
		if(!this.length) {
			return this;
		}
		var opts = $.extend(true, {}, $.fn.tabs.defaults, options);

		this.each(function() {
			$.tabs(this,opts);
		})

		return this;
	};



	// default options
	$.fn.tabs.defaults = {
		trigger:'click', // 设置其中一个，oEvent后续会删除
		index: 0,
		handleBox:'.Jc_tabbox',
		handleClass:'.Jc_tab',
		panelBox:'.Jc_panelbox',
		panelClass:'.Jc_panel',
		addClass:'current',
		callback:null,
		content:null
	};

})(jQuery,window);
