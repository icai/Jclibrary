$(function(){
	$('.demo0').click(function(){
		$.mask();
	});
	$('.demo1').click(function(){
		$.unmask();

	});

	$('.demo2').click(function(){

		$.mask({
			background:"#2932E1",
			zIndex:9999,
			opacity:0.7
		});
	});
	$('.demo3').click(function(){
		$.unmask("fast");
	});
	$('.demo4').click(function(){
		$.unmask(2000);
	});

	$('.demo5').click(function(){
		$.unmask(true,2000);
		
		
	});
	$('.demo6').click(function(){
		$.mask({
			background:"#FEB20F",
			zIndex:9999,
			opacity:0.8,
			before:function(r){
				alert("将会生成的遮罩层id:" + r);
			},
			callback:function(r){
				alert("已经生成的遮罩层id:" + r);
			}
		});

	});

	$('.demo7').click(function(){

	});
});	