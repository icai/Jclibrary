/**
 * Plugin: menutree
 * Date：
 * Author:caiguangsong
 * Mail:gidcai#gmail.com
 * Last update:2013/02/28
 * description：http://10.128.70.2/lib/
 * 
 *  ~ 2013/02/18 : add option 'arrowSize'  && fixed 'leftBottom' miscalculation bug
 *  ~ 2013/02/28 : fix fast hover bug,when multi events binding
 */


(function($,exports) {


	function throwError(msg) {
		throw new Error(msg);
	}

	$.menuTree = function(id, optss) {
		return new $.menuTree.fn.init(id, optss);
	}

	$.menuTree.fn = $.menuTree.prototype = {
		constructor: $.menuTree,
		menuTreeId: '',
		cacheData:'',
		target:null,
		init: function(o, opts) {
			this.options = {};
			jQuery.extend(true, this.options, opts);
			var fn = this;
			var op = this.options;
			var curId = comPrefix+"_ui_menuTree_" + (new Date).getTime();
			this._init();
			return this;
		},
		_init: function() {
			var fn = this;
			var op = this.options;
			//this.format().loading().show().position().bindEvent().content().callback();
		},
		appendChild:function(){

		},
		insertChild:function(){

		},
		removeChild:function(){

		},
		appendChilds:function(){
		},
		formatData:function(data){
			var fn = this;
			var op = this.options;
			for (var i = 0; i < data.length; i++) {
				data[i]
			};
			return this;			
		},
		closeAll:function(){
		},
		openAll:function(){
		},
		node : function (pid,data){
			var args = [].slice.call(arguments,0);
			var nodeid,nodedata;
			if(args.length == 1 && typeof args[0] != "number"){
				nodepid = 0;
				nodedata = args[0];
			}else if (args.length == 3){
				nodepid = args[0];			
				nodedata = args[1];
			}else{};
			for (var i = 0; i < nodedata.length; i++) {
				if(nodedata[i].children == undefined){
					this.nodeCache.find('#'+nodepid).append() : this.nodeCache.append();
				}else{
					this.nodeCache.find('#'+nodepid+).append() : this.nodeCache.append();
					this.node(nodepid+'_'+i ,nodedata[i].children)
				}
			};
		},
		insertContent:function(cnt){
			var fn = this;
			var op = this.options;
			return this;
		},
		bindEvent: function() { //pass
			var fn = this;
			var op = this.options;
			return this;
		},
		callback:function(){
			var fn = this;
			var op = this.options;
			op.callback.call(fn);
			return this;		
		}
	}

	$.menuTree.fn.init.prototype = $.menuTree.fn;

	$.fn.menuTree = function(optss) {

		var opts = $.extend(true, {}, $.menuTree.defaults, optss);

		if(!this.length) {
			return this;
		}
		this.each(function() {
			$.menuTree(this, opts);
		});

		return this;
	};

	var defaultTemplate = {
		wrap:'<ul></ul>',
		hasChild: '<li><div class="haschild open"><a href="{{link}}" target="{{iframe}}">class</a></div></li>',
		noChild: '<li><div class=""><dfn>LIBRARY</dfn></div></li>',
		cell:'<li><div><a href="ui/menuTree/demo.html" target="c_iframe">class</a></div></li> ',
	};

	// default optss
	$.menuTree.defaults = {
		template: defaultTemplate,
		data: null,
		prefix:'node'
		autoId:true,
		parentId:
		unfoldAll:false,
		childInsert:"after","append"
		callback: function() {}
	};




//  /#!app=4&via=QZ.HashRefresh


})(jQuery,this);