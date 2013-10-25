
/**
 * Date：2013/04/18
 * Author:caiguangsong
 * Plugin:router
 *
 * last update:~
 */
;;(function($) {
// What does the router plugin do?
// 
$.router = function(obj,options){
	if(!(this instanceof $.router)){
		return new $.router(obj,options);
	}

	this.initialize.apply(this,arguments);
}



/**
 * todo :
 * 		1. from url :-> get hash -> parse url -> change iframe url
 * 		
 * 		2. click url: match url ->  parse url ->  change iframe url
 * 		3. parse url 
 *
 * 		3. data-bind="router"  data-index="0" data-parent="p1"  data-parent=""
 * 		
 *   	p1=0&p2=
 * 		
 * 		                       
 */
$.router.prototype = {
	initialize:function(obj,options){
		if(arguments.length == 2){
			this.options = options;
			this.target = $(obj);
			this.targetId  = obj.substr(obj.indexOf('#') +1,obj.length);
			this.matchUrl = $('a[target='+ this.targetId + ']');
			this.__init__();
		}
	},
	__init__:function(){
		this.cacheEvent();
		this.loadPage().formatUrl();
	},	
	_RegExp:{
		url:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
		strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
		loose :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
	},
	_namespace:'iframeNavItem',
	escape:function(a) {
    	return window.encodeURIComponent ? window.encodeURIComponent(a) : escape(a);
	},
	unescape:function (a) {
    	return window.decodeURIComponent ? window.decodeURIComponent(a) : unescape(a);
	},
 	lastBraceInKey:function(str) {
		var len = str.length,
			 brace, c;
		for (var i = 0; i < len; ++i) {
			c = str[i];
			if (']' == c) brace = false;
			if ('[' == c) brace = true;
			if ('=' == c && !brace) return i;
		}
	},
	parse:function(paramStr){
		var fn = this;
		var temp = {};
		$.each(paramStr.split(/&/),function(i,pair){
			var eql = pair.indexOf('='),
					brace = fn.lastBraceInKey(pair),
					key = pair.substr(0, brace || eql),
					val = pair.substr(brace || eql, pair.length),
					val = val.substr(val.indexOf('=') + 1, val.length);
					temp[key] = val; 
		}) 
		return temp;
	},
	loadPage:function(){
		var fn = this;
		fn.hash = window.location.hash;
		var param;
		if(fn.hash != "" && /^#!(\S+)/.test(fn.hash)){
			param = fn.parse(RegExp.$1);

			this.changeIframe(this.unescape(param.url));
			this.triggerEvent(param);
		}else{
			this.target.eq(0).trigger('click');
		}
		return this;
	},
	changeHash:function(pm,index,url){
		var param = $.extend(pm,{
			app:index,
			url:this.escape(url)
		})

		window.location.hash = '#!'+ $.param(param);
	},
	/**
	 * [pathResolve description]
	 * @param  {String} cururl base url
	 * @param  {String} href   resolve url
	 * @return {String}        resolved url
	 */
	pathResolve:function(cururl,href){ // arguments : [cururl,] href;
		var fn = this;
		var pathurl,currenturl,newpaths;
		if(arguments.length == 1){
			pathurl = cururl;
			// window.location not for ifarme
			currenturl = window.location.href; 
		}else{
			currenturl = fn._RegExp.strict.test(cururl) ? cururl : window.location.href;
			pathurl = href;
		}
		if(/[^#?]+(\w+\/^)|(\/\w+^)/.test(currenturl)){
			if(RegExp.$1.slice(-1) !== '/'){
				currenturl = currenturl + '/'
			}
		}else{
			var ma = ['?','#'],g;
			while(~ (g = currenturl.indexOf(ma.shift()))){
				currenturl = currenturl.slice(0,g);
			}
		}
		var cur = currenturl;
		    cur = cur.slice(0,cur.lastIndexOf('/')+1);
		var origin = currenturl.slice(0,cur.lastIndexOf('/')+1) || location.origin;
		//  handle : www.example.com/abc/../abd/../././a.html remove  [ ./]
		 pathurl.replace(/(?:^|[^\.])(\.\/)/g,function($0,$1){ 
		 	return $0.replace($1,'');
		 }) 
		 if(/^(?:\.\.\/|\/)/.test(pathurl)){
		 	if(RegExp.$1.length == 1){
		 		newpaths =  origin + pathurl;
		 	}else{
		 		newpaths = cur + pathurl;
		 	}
		 	 //handle  www.example.com/abc/../abd/../a.html
		 	while(/[^\.]\w+\/\.\.\//.test(newpaths)){ 
				newpaths = newpaths.replace(/\w+\/\.\.\//,'')
		 	}
		 	// handle   www.example.com/../../
		 	newpaths.replace(/\.\.\//g,''); 

		 }else{
		 	newpaths = origin + '/'+pathurl
		 }
		 return newpaths;
	},
	changeIframe:function(url){
		var fn = this;

		console.log(url);

		var url = this.unescape(url);
		var nocache = ''
		if(!this.options.cache){
			nocache = (new  Date).getTime();
			if(~url.indexOf('?')){
				url = url.split('');
				url.splice("".indexOf.call(url,'?')+1,0,'cache='+ nocache+'&');
				//console.log(url);
				url=  url.join(''); 
			}else{
				url = url +'?cache='+ nocache
			}
		}

		// this.target.load( url + 'body',function(response, status, xhr){

		// 	this.target.find('[src]').each(function(i,el){
		// 		var src = $(el).attr('src');
		// 		if(~src.indexOf('http')){
		// 			$(el).attr('src',url.substr(0,url.lastIndexOf('/')+1) +src);
		// 		}
		// 	})

		// 	console.log(arguments);


		// })

		if(this._RegExp.url.test(url) && !~RegExp.$1.indexOf('http') == -1){

			if(/^file/.test(location.href)){
				this.target.attr('src','http://'+url);
			}else{
				this.target.attr('src','//'+url);
			}
		}else{
			this.target.attr('src',url);
		}
		this.target.load(function(){
			//$.proxy(this.options.onload,this.target[0].contentWindow||this.target[0].contentDocument.parentWindow)
			fn.options.onload.call(fn.target[0].contentWindow||fn.target[0].contentDocument.parentWindow,fn,fn.target)
		});
		return this;
	},
	clickEvent:function(url,index,element){
		var fn = this;
		$(element).bind('click.'+ fn._namespace,function(event){
			event.preventDefault();
			fn.changeIframe(url).changeHash(fn._cachemenu,index,url);
			//return false;
		})
	},
	checkhasEvent:function(obj,evt,namespace){
		if($._data(obj, "events") === undefined){
			return false;
		}
		var events = $._data(obj, "events")[evt];
		for (var i = 0; i < events.length; i++) {
			if(events[i].namespace == namespace){
				return true;
			}
		};
		return false;
	},
	formatUrl:function(){
		var fn = this;
		this.matchUrl.each(function(i,el){ 
			var url = $(el).attr('href'),
				index;
			if(url == '#'){
				$(el).attr('href','javascript:;')
			}else if(!!fn.options.app  && !!url && !!fn.options.app[url]){ // handler match this.target Elements
					index = url.slice(1);
					fn.clickEvent.call(fn,fn.options.app[url],index,el);
			} else if(fn._RegExp.strict.test(url)){  // handler url  Elements
				fn.clickEvent.call(fn,url,i,el);
			}
			$(el).removeAttr('target');
		});
		for (var key in fn.options.app) { // handler id
		   //if (fn.options.app.hasOwnProperty(key)) {
		   	var jObj = $(key);
			if(!!jObj.length  && !fn.checkhasEvent(jObj.get(0),'click',fn._namespace)){
				var index = jObj.get(0).id.toLowerCase();
				fn.clickEvent.call(fn,fn.options.app['#'+jObj.get(0).id.toLowerCase()],index,jObj.get(0));
			}
		   //}
		}
		return this;
	},
	cacheEvent:function(){
		var fn = this;
		fn._cachemenu = {};

		fn._pbmenu_level = {};
		// 3. data-bind="router"  data-index="0" data-parent="p1"  data-parent=""
		for (var i = 0; i < this.options.level -1; i++) {
			(function(i,fn){
				fn._pbmenu_level['p' + (i+1) ] = $('[data-bind="router"]').filter('[data-parent="p'+ (i+1) +'"]');
				fn._pbmenu_level['p' + (i+1) ].each(function(j,el){
					$(el).click(function(){
						fn._cachemenu['p' + (i+1) ] = j;
					})
				})
			})(i,fn)
		};
	},
	triggerEvent:function(param){
		var fn = this;
		for(var i in fn._pbmenu_level){
			console.log(fn._pbmenu_level[i].eq(param[i]));
			fn._pbmenu_level[i].eq(param[i]).trigger('click');
		}
	}
}

$.fn.router = function(options) {
  if (!this.length) { return this; }
  	var opts = $.extend(true, {}, $.fn.router.defaults, options);
    $.router(this.selector,opts)
  return this;
};

// default options
$.fn.router.defaults = {
	cache:true,
	target:'#iframe1',
	/**
	 * [app description]
	 * @type {Object}
	 */
	app:null,
	expries:30,
	level:1,
	onload:function(){}
}
})(jQuery);


