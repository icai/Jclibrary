/**
 *	
 *  Author:
 *  
 *  @plugin 
 *  @copyright
 *  
 */
;;(function($) {

Array.prototype.map||(Array.prototype.map=function(a,b){var c,d,e;if(null==this)throw new TypeError(" this is null or not defined");var f=Object(this),g=f.length>>>0;if("function"!=typeof a)throw new TypeError(a+" is not a function");for(b&&(c=b),d=Array(g),e=0;g>e;){var h,i;e in f&&(h=f[e],i=a.call(c,h,e,f),d[e]=i),e++}return d});

$.treeMenu = function(obj,options){
	if(!(this instanceof $.treeMenu)){
		return new $.treeMenu(obj,options);
	}

	return this.initialize.apply(this,arguments);
}

$.treeMenu.prototype = {

	initialize:function(obj,options){
		var opts = $.extend(true, {}, $.treeMenu.defaults, options);
		this.options = opts;
		this.wraper = obj;
		jQuery.extend(true,this._tmpl,options.tmpl);
		this.__init__();
		return { a:'a',b:'b'};
	},
	__init__:function(){
		this.wraper.html(this.render(this.options.data,true));
	},
	_tmpl:{
		parentNode:'<ul></ul>',
		childNode:'<li class="{node} {cc}" data-node="{}">{name}#child#</li>'
	},

	clsName:{
		hasChild:'hasChild',
		openNode:'open',
		hover:'hover',
		topNode:'nodetop nav'
	},
	_childNodeData:'children',
	wrap:function(){
	},
	insert:function(){
	},
	compile:function(s,d){
		for(var p in d)
		    s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
		return s;
	},
	getNodeProps:function(e){
		var t =this;
		var nodeProps = {};
		for (var o in e) {
			if(o != t._childNodeData){
				nodeProps[o] =  e[o];
			}
		}
		return nodeProps;	
	},
	isChildNode:function(d){
		for (var o in e) {

		}
	},
	parse:function(s,d){
		return this.compile(s,d);
	},
	template:function(){

	},
	close:function(){

	},
	open:function(){

	},
	closeAll:function(){

	},
	openAll:function(){

	},
	createEl:function(name){
   		 return document.createElement(name);
	},
	hasClass:function(el,cls){
		var className = typeof(el) == 'string' && el || el.className;
		if(!className||!cls)
			return false;
		var cls=cls.split(/[\. ]+/);
		var re;
		for(var i=cls.length-1;i>=0;i--){
			re=new RegExp('(^| +)'+cls[i]+'( +|$)');
			if(!re.test(className))
				return false;
		}
		return true;
	},
	addClass:function(el,cls){
		if(!cls) return true;
		var arrCls=cls.split(/ +/);
		if(el.className){
			for(var i=0;i<arrCls.length;i++){
				if(this.hasClass(el,cls)){
					cls=cls.replace(new RegExp('(^| +)'+arrCls[i]+'( +|$)'),' ');
				}
			}
			el.className=[el.className].concat(cls).join(' ');
		}
		else{
			el.className=cls;
		}
	},
	_prefix:'node',
	setStrClass:function(nodestr,name){
		var div = this.createEl('div');
		    div.innerHTML = nodestr;
		    this.addClass(div.firstChild,name);
		var node = div.innerHTML;
		    div = null;
		  return  node;
	},
	setStyle:function(){},
	render:function(e,root,parent,index){
        var t = this;
        var op = t.options;
        var parent = parent || 0;
        var index = index || 0;
        if ($.type(e) == 'array') {
        	var cindex = parent + '-'+ index;
            var n = [],
            	topNode = t._tmpl.parentNode,
                r = e.length;
			return topNode.replace(/^<(\w+)\s*\/?>(?:<\/\1>)?$/,function($0,$1){ // ul Node
				    var restr;
					var div = t.createEl('div'),
						thisNode = t.createEl($1);
						thisNode.setAttribute('data-node',t._prefix + '-' + cindex);

						if(root == true){
							t.addClass(thisNode,t.clsName.topNode); // set top
						}else{
							if(op.unfold == true) t.addClass(thisNode,'unfold'); 
							else t.addClass(thisNode,'fold');
						}
						for (var i = 0; i < r; i++) n.push(t.render(e[i],false,cindex,i+1));
					    thisNode.innerHTML = n.join("");
					    div.appendChild(thisNode);
					    restr = div.innerHTML;
					    thisNode = null; div = null;
					return  restr;
			})
        }
        if($.type(e) == 'object'){ // li Node
        	var cindex = parent + '_'+ index;
        	var nodehtml = t.parse(t._tmpl.childNode,t.getNodeProps(e)); // Node
					var div = t.createEl('div');
					    div.innerHTML = nodehtml;
					    div.firstChild.setAttribute('data-node',t._prefix + '-' + cindex);
					    if(div.firstChild.firstChild.nodeType == 1){
					    	t.addClass(div.firstChild.firstChild,'node');
					    }
					    nodehtml = div.innerHTML;
					    div = null;
        	if(e[t._childNodeData] && e[t._childNodeData] !== undefined ){
        				nodehtml = t.setStrClass(nodehtml,t.clsName.hasChild);
	            return  nodehtml.replace(new RegExp('#child#','g'),function(){
	            	return t.render(e.children,false,cindex);
	            })
        	}else{
        		nodehtml = t.setStrClass(nodehtml,'nochild');
	            return  nodehtml.replace(new RegExp('#child#','g'), "")
        	}
        }
	}	
}


$.fn.treeMenu = function(options) {
  if (!this.length) { return this; }
  	$.treeMenu(this,options);
  return this;
};

// default options
$.treeMenu.defaults = {
	unfold:true,
	//explain:false, // true ,['children']

	childNodeName:["children"],
	data:[],
	prefix:'node',
	callback:function(){

	}
};

})(jQuery);





// $('.test_tree').treeMenu({
// 	unfold:true,
// 	childNode:"", // true ,['children'],
// 	clsName:{
// 		hasChildNode:'hasChild',
// 		openNode:'open',
// 		hover:'hover'
// 	},
// 	addClass:'nav',

// 	data:[{
// 	    id: '1',
// 	    nodename: "nodenameis1",
// 	    index: "1",
// 	    children:[{
// 				    id: '1_1',
// 				    nodename: "nodenameis11",
// 				    index: "11"	    	
// 			     },{
// 				    id: '1_2',
// 				    nodename: "nodenameis12",
// 				    index: "12",
// 				    children:[{
// 							    id: '1_2-1',
// 							    nodename: "nodenameis11",
// 							    index: "121"	    	
// 						    },{
// 							    id: '1_2',
// 							    nodename: "nodenameis12",
// 							    index: "12"
// 						    }]
// 			    }]
// 	    }, {
// 	        id: '2',
// 	    	nodename: "nodenameis2",
// 	        index: "2",
// 		    children:[{
// 					    id: '2_1',
// 					    nodename: "nodenameis21",
// 					    index: "21"	    	
// 				    },{
// 					    id: '2_2',
// 					    nodename: "nodenameis22",
// 					    index: "22"
// 				    }]
// 	    }],
// 	tmpl:{
// 		childNode:'<li class=""><div class=""><dfn>{nodename}</dfn></div>#child#</li>',  
// 		parentNode:'<ul />'
// 	}, 
// 	callback:function(){

// 	}
// })
