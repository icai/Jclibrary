
/**
 * Plugin: tabs
 * Date：20130107 
 * Author:caiguangsong
 * Mail:gidcai#gmail.com
 * Last update:##
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
		reqAjax :function(tpbox,callback){

			var op = this.options;

			jQuery.ajax({
			  url: op.qjax.url,
			  type: op.qjax.type,
			  dataType: op.qjax.dataType,
			  data:  op.qjax.data,
			  beforeSend: function(xhr, settings) {
			  	tpbox.empty().append('loading...');
			    //loading
			  },
			  success: function(data, textStatus, xhr) {
			  	if(op.qjax.template){
			  		callback.call(this,(function(){
			  			if(!w.itour.util.template) throw new Error('namespace --> itour.util.template is undefined!!')
			  			data = op.qjax.dataType == 'text'?  eval('('+ data +')') : data;
			  			return w.itour.util.template(op.qjax.template, data);
			  		})())
			  	}else{
			  		callback.call(this,data);
			  		
			  	}
			  },
			  error: function(xhr, textStatus, errorThrown) {
			     throw new Error('Ajax request timeout');
			  }
			});
		},
		delayTab:function(time,callback) {
				clearTimeout(this.timer);
				this.timer =  setTimeout(callback, time);
		},
		swap:function(elem,contentbox,tpbox){
			var op = this.options;
				if(!$.isEmptyObject(op.qjax)){
					this.reqAjax(tpbox,function(html){
						elem.siblings().removeClass(op.addClass).end().addClass(op.addClass);
						tpbox.empty().append(html);
						op.callback && op.callback.call(this,elem.index(),elem,tpbox);
					})
				}else{
					elem.siblings().removeClass(op.addClass).end().addClass(op.addClass);
					//elem.;
					//console.log(elem)
					contentbox.siblings().hide().end().eq(elem.index()).show();
					op.callback && op.callback.call(this,elem.index(),elem,tpbox);
				}
		},
		_tabActive :function(oChilds,oEvent,tbox,tpbox){
			var fn = this;
		 	oChilds.bind(oEvent,function(){
		 		var that = $(this);
		 		if(oEvent == "mouseover"){
		 			fn.delayTab(50,function(){
		 				fn.swap(that,tbox,tpbox)
		 			})
		 		}else{
		 			fn.swap(that,tbox,tpbox);
		 		}
		 		
		 	})
		},
		bindEvent:function(){
			var op = this.options;
			var that = $(this.wraper);
			var oChilds = (!!op.tabParentClass && !!op.tabClass) ? that.find(op.tabParentClass+" "+op.tabClass)

						: (!op.tabParentClass && !!op.tabClass) ? that.find(op.tabClass)
						: (!!op.tabParentClass && !op.tabClass) ? that.find(op.tabParentClass).children()
						:that.find(op.tabClass);

			var tbox = (!!op.contentParentClass && !!op.contentClass) ? that.find(op.contentParentClass+" "+op.contentClass)
						: (!op.contentParentClass && !!op.contentClass) ? that.find(op.contentClass)
						: (!!op.contentParentClass && !op.contentClass) ? that.find(op.contentParentClass).children()
						: that.find(op.contentClass);

			this._tabActive(oChilds,op.oEvent,tbox,tbox.parent())

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
		oEvent:'click',
		cEffect:null,
		tabIndex: 0,
		tabClass:null,
		tabParentClass:null,
		contentParentClass:null,
		contentClass:null,
		addClass:'current',		
		qjax:null,

		// qjax:{
		// 	url: '/path/to/file',
		// 	type: 'POST',
		// 	data: {param1: 'value1'},
		// 	dataType:'xml/html/script/json/jsonp',
		// 	template:null,
		// },

		callback:null
	};
	function __tab__(q,param){
		return $(q).tabs(param);
	}
    w.itour = w.itour ? w.itour : {};
    w.itour.ui = w.itour.ui ? w.itour.ui : {};
    w.itour.ui.tab = __tab__


})(jQuery,window);
