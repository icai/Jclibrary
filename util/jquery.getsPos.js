/**
 * date：201203~
 * author:caiguangsong
 * 
 *
 */
	$.fn.extend({
		getsPos: function() {
			if(!this[0]) {
				return null;
			}
			var curOffset = $(this[0]).offset();
			var eTop = curOffset.top,
				eLeft = curOffset.left;
			var eScreenTop = eTop - $(window).scrollTop(),
				eScreeneLeft = eLeft - $(window).scrollLeft();
			var w_height = $(window).height(),
				w_width = $(window).width();
			var inTop = false,
				inBottom = false,
				inLeft = false,
				inRight = false;
			var curPos = 0;
			var angle = undefined;
			if(w_height / 2 - eScreenTop > 0) {
				inTop = true;
			} else {
				inBottom = true;
			}
			if(w_width / 2 - eScreeneLeft > 0) {
				inLeft = true;
			} else {
				inRight = true;
			}
			if(inTop && inLeft) {
				curPos = 1;
				if(w_width/w_height > eScreeneLeft/eScreenTop){
					angle = 'leftTop'
				}else{
					angle = 'topLeft'
				}
			}
			if(inTop && inRight) {
				curPos = 2;
				if(w_width/w_height > (eScreeneLeft - w_width/2)/(w_height / 2  - eScreenTop)){
					angle = 'topRight'

				}else{
					angle = 'rightTop'
				}
			}
			if(inBottom && inRight) {
				curPos = 3;

				if(w_width/w_height >  (eScreeneLeft- w_width/2)/(eScreenTop - w_height / 2)){
					angle = 'rightBottom'
				}else{
					angle = 'bottomRight'
				}			
			}
			if(inBottom && inLeft) {
				curPos = 4;
				if(w_width/w_height > eScreeneLeft /(w_height - eScreenTop)){
					angle = 'bottomLeft'
				}else{
					angle = 'leftBottom'
				}						
			}

			return {
				sTop: eScreenTop,
				sLeft: eScreeneLeft,
				sWidth: w_width,
				sHeight: w_height,
				top: eTop,
				left: eLeft,
				curPos: curPos,
				angle:angle
			}
		}
	})