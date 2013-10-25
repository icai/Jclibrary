(function($,exports) {
// What does the placeholder plugin do?
$.fn.placeholder = function(options) {

  if (!this.length) { return this; }

  var opts = $.extend(true, {}, $.fn.placeholder.defaults, options);

  this.each(function() {
    var that = $(this);

    var forobjid = that.attr('for');
    var forobj  = that.parent().find('#'+forobjid);
    if('placeholder' in document.createElement('input')){ //如果浏览器原生支持placeholder
        forobj.attr('placeholder',that.text());
        that.hide();
      return this;
    };

    
    that.bind('click',function(){
      forobj.focus();
    })
    forobj[0].onkeyup = forobj[0].onkeydown = forobj[0].onkeypress  = function(){
        var val = forobj[0].value;
        if(val != ""){
          that.hide()
        }else{
          that.show()
        }
    }

  });
  return this;
};

// default options
$.fn.placeholder.defaults = {
};
function __import(o,param){
  $(o).placeholder(param);
}

var comPrefix = 'itour';
exports[comPrefix] = exports[comPrefix] ? exports[comPrefix] : {};
exports[comPrefix].util = exports[comPrefix].util ? exports[comPrefix].util : {};
exports[comPrefix].util.placeholder = __import;

})(jQuery,this);

