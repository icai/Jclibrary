;$(function(){



	$('#slide_btn').click(function(){
		var wrap = $('.wrapper');
		if(wrap.hasClass('hidefold')){
			wrap.removeClass('hidefold');
		}else{
			wrap.addClass('hidefold');
		}
	})

});


