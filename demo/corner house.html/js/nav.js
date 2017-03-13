$(function(){
	$('.navBtn').on('mousedown',function(){
		if($('.nav').css('display') == 'none'){
			$('.nav').css('display','block');
		}else{
			$('.nav').css('display','none');
		}
	});
});
