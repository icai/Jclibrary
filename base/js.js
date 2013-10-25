/*
	animate(oDiv,{
		'width':100,
		'left':100,
		'top':50
	},{
		'width':300,
		'left':400,
		'top':300
	},900,Quad);
*/

function animate(o,start,alter,dur,fx) {
	var curTime=0;
	var t=setInterval(function () {
		if (curTime>=dur) clearTimeout(t);
		for (var i in start) {
			o.style[i]=fx(start[i],alter[i],curTime,dur)+"px";
		}
		curTime+=50;
		
	},50);
}
function Linear(start,alter,curTime,dur) {
	return start+curTime/dur*alter;
}

function Quad(start,alter,curTime,dur) {
	return start+Math.pow(curTime/dur,2)*alter;
}

function opacityAnimate(o,start,alter,dur,fx) {
	var curTime=0;
	
	var t=setInterval(function () {
		if (curTime>=dur) clearTimeout(t);
		//o.style.opacity=fx(start,alter,curTime,dur)+"px";
		setOpacity(o,fx(start,alter,curTime,dur));
		curTime+=50;
		
	},50);
}

var setOpacity = (document.documentElement.filters)?function (obj,val) {
	obj.style.filter = "alpha(opacity="+val+")";
}:function (obj,val) {
	obj.style.opacity = val/100+"";
};



var Tween = {
	Linear:function (start,alter,curTime,dur) {return start+curTime/dur*alter;},//最简单的线性变化,即匀速运动
	Quad:{//二次方缓动
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,2)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,2)-2*progress)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,2):-((--progress)*(progress-2) - 1))*alter/2+start;
		}
	},
	Cubic:{//三次方缓动
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,3)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,3)-Math.pow(progress,2)+1)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,3):((progress-=2)*Math.pow(progress,2) + 2))*alter/2+start;
		}
	},
	Quart:{//四次方缓动
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,4)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,4)-Math.pow(progress,3)-1)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,4):-((progress-=2)*Math.pow(progress,3) - 2))*alter/2+start;
		}
	},
	Quint:{//五次方缓动
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,5)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,5)-Math.pow(progress,4)+1)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,5):((progress-=2)*Math.pow(progress,4) +2))*alter/2+start;
		}
	},
	Sine :{//正弦曲线缓动
		easeIn:function (start,alter,curTime,dur) {
			return start-(Math.cos(curTime/dur*Math.PI/2)-1)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			return start+Math.sin(curTime/dur*Math.PI/2)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			return start-(Math.cos(curTime/dur*Math.PI/2)-1)*alter/2;
		}
	},
	Expo: {//指数曲线缓动
		easeIn:function (start,alter,curTime,dur) {
			return curTime?(start+alter*Math.pow(2,10*(curTime/dur-1))):start;
		},
		easeOut:function (start,alter,curTime,dur) {
			return (curTime==dur)?(start+alter):(start-(Math.pow(2,-10*curTime/dur)+1)*alter);
		},
		easeInOut:function (start,alter,curTime,dur) {
			if (!curTime) {return start;}
			if (curTime==dur) {return start+alter;}
			var progress =curTime/dur*2;
			if (progress < 1) {
				return alter/2*Math.pow(2,10* (progress-1))+start;
			} else {
				return alter/2* (-Math.pow(2, -10*--progress) + 2) +start;
			}
		}
	},
	Circ :{//圆形曲线缓动
		easeIn:function (start,alter,curTime,dur) {
			return start-alter*Math.sqrt(-Math.pow(curTime/dur,2));
		},
		easeOut:function (start,alter,curTime,dur) {
			return start+alter*Math.sqrt(1-Math.pow(curTime/dur-1));
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?1-Math.sqrt(1-Math.pow(progress,2)):(Math.sqrt(1 - Math.pow(progress-2,2)) + 1))*alter/2+start;
		}
	},
	Elastic: {//指数衰减的正弦曲线缓动
		easeIn:function (start,alter,curTime,dur,extent,cycle) {
			if (!curTime) {return start;}
			if ((curTime==dur)==1) {return start+alter;}
			if (!cycle) {cycle=dur*0.3;}
			var s;
			if (!extent || extent< Math.abs(alter)) {
				extent=alter;
				s = cycle/4;
			} else {s=cycle/(Math.PI*2)*Math.asin(alter/extent);}
			return start-extent*Math.pow(2,10*(curTime/dur-1)) * Math.sin((curTime-dur-s)*(2*Math.PI)/cycle);
		},
		easeOut:function (start,alter,curTime,dur,extent,cycle) {
			if (!curTime) {return start;}
			if (curTime==dur) {return start+alter;}
			if (!cycle) {cycle=dur*0.3;}
			var s;
			if (!extent || extent< Math.abs(alter)) {
				extent=alter;
				s =cycle/4;
			} else {s=cycle/(Math.PI*2)*Math.asin(alter/extent);}
			return start+alter+extent*Math.pow(2,-curTime/dur*10)*Math.sin((curTime-s)*(2*Math.PI)/cycle);
		},
		easeInOut:function (start,alter,curTime,dur,extent,cycle) {
			if (!curTime) {return start;}
			if (curTime==dur) {return start+alter;}
			if (!cycle) {cycle=dur*0.45;}
			var s;
			if (!extent || extent< Math.abs(alter)) {
				extent=alter;
				s =cycle/4;
			} else {s=cycle/(Math.PI*2)*Math.asin(alter/extent);}
			var progress = curTime/dur*2;
			if (progress<1) {
				return start-0.5*extent*Math.pow(2,10*(progress-=1))*Math.sin( (progress*dur-s)*(2*Math.PI)/cycle);
			} else {
				return start+alter+0.5*extent*Math.pow(2,-10*(progress-=1)) * Math.sin( (progress*dur-s)*(2*Math.PI)/cycle);
			}
		}
	},
	Back:{
		easeIn: function (start,alter,curTime,dur,s){
			if (typeof s == "undefined") {s = 1.70158;}
			return start+alter*(curTime/=dur)*curTime*((s+1)*curTime - s);
		},
		easeOut: function (start,alter,curTime,dur,s) {
			if (typeof s == "undefined") {s = 1.70158;}
			return start+alter*((curTime=curTime/dur-1)*curTime*((s+1)*curTime + s) + 1);
		},
		easeInOut: function (start,alter,curTime,dur,s){
			if (typeof s == "undefined") {s = 1.70158;}
			if ((curTime/=dur/2) < 1) {
				return start+alter/2*(Math.pow(curTime,2)*(((s*=(1.525))+1)*curTime- s));
			}
			return start+alter/2*((curTime-=2)*curTime*(((s*=(1.525))+1)*curTime+ s)+2);
		}
	},
	Bounce:{
		easeIn: function(start,alter,curTime,dur){
			return start+alter-Tween.Bounce.easeOut(0,alter,dur-curTime,dur);
		},
		easeOut: function(start,alter,curTime,dur){
			if ((curTime/=dur) < (1/2.75)) {
				return alter*(7.5625*Math.pow(curTime,2))+start;
			} else if (curTime < (2/2.75)) {
				return alter*(7.5625*(curTime-=(1.5/2.75))*curTime + .75)+start;
			} else if (curTime< (2.5/2.75)) {
				return alter*(7.5625*(curTime-=(2.25/2.75))*curTime + .9375)+start;
			} else {
				return alter*(7.5625*(curTime-=(2.625/2.75))*curTime + .984375)+start;
			}
		},
		easeInOut: function (start,alter,curTime,dur){
			if (curTime< dur/2) {
				return Tween.Bounce.easeIn(0,alter,curTime*2,dur) *0.5+start;
			} else {
				return Tween.Bounce.easeOut(0,alter,curTime*2-dur,dur) *0.5 + alter*0.5 +start;
			}
		}
	}
};



function addClassName(C, D) {
	var F = C.className.split(" ");
	var E = false;
	for (var B = 0, A = F.length; B < A; B++) {
		if (F[B] == D) {
			E = true;
			break
		}
	}
	if (!E) {
		C.className = F.concat(D).join(" ")
	}
	return this;
};

function addEvent(obj, type, fn) {
	if (obj.attachEvent) {
		obj['e' + type + fn] = fn;
		obj[type + fn] = function() {
			obj['e' + type + fn](window.event);
		}
		obj.attachEvent('on' + type, obj[type + fn]);
	} else obj.addEventListener(type, fn, false);
}

function removeEvent(obj, type, fn) {
	if (obj.detachEvent) {
		obj.detachEvent('on' + type, obj[type + fn]);
		obj[type + fn] = null;
	} else obj.removeEventListener(type, fn, false);
}

function esc(a) {
    return window.encodeURIComponent ? window.encodeURIComponent(a) : escape(a);
};

function autoSize(obj, _w, _h, custom) {
    var MAX_W = _w || 90;
    var MAX_H = _h || 90;
    var img = new Image();
    img.src = obj.src;
    var w = img.width || MAX_W;
    var h = img.height || MAX_H;
    if (w <= 0 || h <= 0) {
        setTimeout(function () {
                autoSize(obj, _w, _h, custom);
            }, 100);11
        return;11
    }
    if (w <= MAX_W && h <= MAX_H) {
        obj.style.width = w + 'px';
        obj.style.height = h + 'px';
        if (!custom)
            obj.style.marginTop = (MAX_H - h) / 2 + 'px';
        return;
    }
    if (w / h > MAX_W / MAX_H) {
        obj.style.width = MAX_W + 'px';
        obj.style.height = MAX_H * h / w + 'px';
        if (!custom)
            obj.style.marginTop = (MAX_H - MAX_H * h / w) / 2 + 'px';
    } else {
        obj.style.width = MAX_W * w / h + 'px';
        obj.style.height = MAX_H + 'px';
    }
}

function getRealStyle(o,name) {
	if (window.getComputedStyle) {
		var style=window.getComputedStyle(o,null);
		return style.getPropertyValue(name);
	} else {
		var style=o.currentStyle;
		name=camelize(name);
		if (name=="float")
			name="styleFloat";
		return style[name];
	}
	
} 

function getSize() {
    if (document.all) {
        myWidth = (document.documentElement.clientWidth) ? document.documentElement.clientWidth: document.body.clientWidth;
        myHeight = (document.documentElement.clientHeight) ? document.documentElement.clientHeight: document.body.clientHeight;
        myScroll = (document.documentElement.scrollTop) ? document.documentElement.scrollTop: document.body.scrollTop
    } else {
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
        myScroll = window.pageYOffset
    }
    if (window.innerHeight && window.scrollMaxY) {
        myScrollWidth = document.body.scrollWidth;
        myScrollHeight = window.innerHeight + window.scrollMaxY
    } else {
        if (document.body.scrollHeight > document.body.offsetHeight) {
            myScrollWidth = document.body.scrollWidth;
            myScrollHeight = document.body.scrollHeight
        } else {
            myScrollWidth = document.body.offsetWidth;
            myScrollHeight = document.body.offsetHeight
        }
    }
}

(function loadScript(url) {
	var cookiecity = Cookie.get('addrcity') || null,
		url = header.http + hostname + proxys.html +"?url=" + encodeURIComponent(url);
	if(!!cookiecity){
		return ajax(cookiecity,localLanguage);
	}
	var iframe = document.createElement("iframe");
		iframe.src = url;
		iframe.border = "0px";
		iframe.width = "0";
		iframe.height = "0";
		iframe.style.cssText = "position: absolute; width: 0px; height: 0px;border-top-style: none; border-right-style: none; border-bottom-style: none; border-left-style: none;"
		document.body.appendChild(iframe);

	var iframeWindow = iframe.contentWindow || iframe.contentDocument.parentWindow; // getIframeWindow(iframe)

	if (iframeWindow.attachEvent) {

		iframeWindow.attachEvent("onload", function() {

			var evaldata = iframeWindow.document.body.innerHTML ;

			eval(evaldata); 
			var citypy = CC2PY(remote_ip_info.city);//涓婁笅鏂囨暟鎹紶閫?
			
			Cookie.set('addrcity', citypy, 3*24);

			ajax(citypy,localLanguage); 

		});
	} else {
		iframeWindow.onload = function() {
			var evaldata = iframeWindow.document.body.innerHTML; //innerText not firefox
			eval(evaldata);
			//createInlineJS(evaldata);
			var citypy = CC2PY(remote_ip_info.city);//涓婁笅鏂囨暟鎹紶閫?


			Cookie.set('addrcity', citypy, 3*24);

			ajax(citypy,localLanguage);
		};
	}
	
	
})(sinaIpUrl);




