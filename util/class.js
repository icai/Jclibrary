function $A(iterable) {
	if (!iterable) return [];
	if ('toArray' in Object(iterable)) return iterable.toArray();
	var length = iterable.length || 0,
		results = new Array(length);
	while (length--) results[length] = iterable[length];
	return results;
};


function isFunction(object) {
	return Object.prototype.toString.call(object) === '[object Function]';
}


Function.prototype.argumentNames = function() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
        .replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
}

(function() {
	function extend(destination, source) {
		for (var property in source)
		destination[property] = source[property];
		return destination;
	}

	extend(Object, {
		extend: extend

	});
})();

var Class = (function() {
	var IS_DONTENUM_BUGGY = (function() {
		for (var p in {
			toString: 1
		}) {
			if (p === 'toString') return false;
		}
		return true;
	})(); //可以枚举，返回false
	function subclass() {}; //创建空对象待用
	function create() {
		var parent = null,
			properties = $A(arguments); //$A:转换成数组  arguments.toArray()
		if (isFunction(properties[0])) //判断是否是 Function
		parent = properties.shift(); //取出数组第一个

		function klass() { // 初始化
			this.initialize.apply(this, arguments);
		}
		Object.extend(klass, Class.Methods); //扩展klass 挂载 addMethods方法
		klass.superclass = parent; // destination（属性名）
		klass.subclasses = []; //source（方法）
		if (parent) {
			subclass.prototype = parent.prototype; //存储已有的属性
			klass.prototype = new subclass; //复制一个副本储存到klass
			parent.subclasses.push(klass); //传入
		}
		
		for (var i = 0, length = properties.length; i < length; i++)
		klass.addMethods(properties[i]); //挂载方法
		if (!klass.prototype.initialize) klass.prototype.initialize = function() {}; //Prototype.emptyFunction; //function() { }
		klass.prototype.constructor = klass;
		return klass;
	}

	function addMethods(source) {
		var ancestor = this.superclass && this.superclass.prototype,
			properties = Object.keys(source); //获取属性名

		if (IS_DONTENUM_BUGGY) {
			if (source.toString != Object.prototype.toString) properties.push("toString");
			if (source.valueOf != Object.prototype.valueOf) properties.push("valueOf");
		}

		for (var i = 0, length = properties.length; i < length; i++) {
			var property = properties[i],
				value = source[property]; //获取属性值（方法）
			if (ancestor && isFunction(value) && value.argumentNames()[0] == "$super") {
				var method = value;
				value = (function(m) {
					return function() {
						return ancestor[m].apply(this, arguments);
					};
				})(property).wrap(method);

				value.valueOf = method.valueOf.bind(method);
				value.toString = method.toString.bind(method);
			}
			this.prototype[property] = value; //绑定属性
		}

		return this;
	}

	return {
		create: create,
		Methods: {
			addMethods: addMethods
		}
	};
})();





/** new, preferred syntax **/
    
// properties are directly passed to `create` method
var Person = Class.create({
  initialize: function(name) {
    this.name = name;
  },
  say: function(message) {
    return this.name + ': ' + message;
  }
});
    
// when subclassing, specify the class you want to inherit from
var Pirate = Class.create(Person, {
  // redefine the speak method
  say: function($super, message) {
    return $super(message) + ', yarr!';
  }
});
    
var john = new Pirate('Long John');
john.say('ahoy matey');
// -> "Long John: ahoy matey, yarr!"