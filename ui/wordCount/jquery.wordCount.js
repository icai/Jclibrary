
(function($) {

$.wordCount = function(){
	if(!(this instanceof $.wordCount)){
		return new $.wordCount(obj,options);
	}
	this.initialize.apply(this,arguments);
}


$.wordCount.prototype = {
	support:(function(){
		var ip = document.createElement('input');
		var rtvals = {
			input:false
		}
		if('oninput' in ip){
			rtvals.input = true;
		}

	})(),
	initialize:function(){

	},
	bindEvent:function(){

	}
}


$.fn.wordCount = function(options) {

  if (!this.length) { return this; }

  var opts = $.extend(true, {}, $.fn.wordCount.defaults, options);

  this.each(function() {
    var $this = $(this);
    
  });

  return this;
};

// default options
$.fn.wordCount.defaults = {
  defaultOne: true,
  defaultTwo: false,
  defaultThree: 'yay!'
};

})(jQuery);
