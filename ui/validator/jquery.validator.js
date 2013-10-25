/**
 * date：20130124
 * author:caiguangsong
 *
 */




/*
   guide
 */
/**
 
	Event:Array(
		onFocus -> if(onfocuse) -> if(status == mutex ):hideAllStatus() -> showtips{tipsStatus},

		* onKeyup -> if(onkeyup) ->  if(status == mutex ):hideAllStatus() -> checklength{lengthStatus},

		onBlur()  ->  if(onblur) ->   if(status == mutex ):hideAllStatus() ->  checkpass{passStatus,errorStatus}

		onSubmit:trigger('blur')  ->  checkpass{errorStatus} else trigger::passfield
	)



	View:Array(
		tipsfield:-> showtips{tipsStatus},

		* lengthfield  -> checklength{lengthStatus},

		passfield  -> checkpass{passStatus} -> setSave(this),

		trigger::passfield   -> setSave(this),

		errorfield  -> checkpass{errorStatus}
	)


	Type：Array(
		data-type='value' :-> type= value,
		data-type='.custom' :-> type= extend->custom[i].selector = '.custom' 
	)

	submit：Array(
		getSave(this)-> if(empty) -> trigger('blur') ->  getSave(this)
	)

	status :独立(self) 互斥(mutex)

 */






(function($, exports) {
	"use strict"; // jshint ;_;

	var isIe6  = /MSIE 6\.\d+/i.test(navigator.userAgent)

	 // "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)"

	var comPrefix = 'itour';

	var comVlist = ['username','mail','mobile','password','password2','authcode','protocol','idcard','zipcode'];

	var isInArray = function (a,array){
		$.each(array,function(i,el){
			if(el == a){
				return true;
			}
		})
		return false;
	}

	String.prototype.isInArray = function(array){
		return isInArray(this,array);
	}




	$.validator = function(elem,option){
		return new $.validator.fn.init(elem, option);
	};


// element = [
// 	{
// 		elem：'[data-type="' + el + '"]',
// 		blurelem:'',
// 		focuselem:'',


// 	},{
// 		selector：'[data-type="' + el + '"]',
// 	}]



	$.validator.fn = $.validator.prototype = {
		constructor: $.validator,

		field:['blur','focus','success'],
		init:function(elem,option){ // 自动化部署
			this.vlist = [];
			this.options = option;

			var fn = this;

			if(elem.attr('type') == 'validator'){
				$.each(comVlist, function(i, el) {
					var item = elem.find('[data-type="' + el + '"]');
					if(item.length == 1){
						fn.vlist[fn.vlist.length].elem = item;
						var iblur = elem.find('[data-blur="' + el + '"]'); // data-focus
						var ifocus = elem.find('[data-focus="' + el + '"]');
						var isuccess = elem.find('[data-success="' + el + '"]');
						fn.vlist[fn.vlist.length].iblur  = iblur.length == 1 ? iblur:"";
						fn.vlist[fn.vlist.length].ifocus  = ifocus.length == 1 ? ifocus:"";
						fn.vlist[fn.vlist.length].isuccess  = isuccess.length == 1 ? isuccess:"";
					}
				})
				$.each(option.custom, function(i, el) {
					var item = elem.find('[data-type="' + el.selector + '"]');
					if(item.length == 1){
						fn.vlist[fn.vlist.length].elem = item;
						var iblur = elem.find('[data-blur="' + el.selector + '"]'); // data-focus
						var ifocus = elem.find('[data-focus="' + el.selector + '"]');
						var isuccess = elem.find('[data-success="' + el.selector + '"]');
						fn.vlist[fn.vlist.length].iblur  = iblur.length == 1 ? iblur:"";
						fn.vlist[fn.vlist.length].ifocus  = ifocus.length == 1 ? ifocus:"";
						fn.vlist[fn.vlist.length].isuccess  = isuccess.length == 1 ? isuccess:"";
					}
				})
			}else{
				throw new Error('no elememt has data-type="validator" attr. ');
			}

			$.each(fn.vlist,function(i,el){
				fn.blur(el).focus(el).keyup(el);
			})	
		},
		hideSt:function(item){
			var fn = this;
			if(fn.options.status == 'mutex'){
				$.each(fn.field,function(i,el){
					item['i'+el].hide()
				})
			}
		},
		_blur:function(item){
			var val = item.elem.val();
			var type = item.elem.data('type');
			$.validator.vFunction[type].applay(this,[val,item]);


		},
		blur:function(item){
			var fn = this;
			item.elem.bind('blur',function(){
				fn.hideSt(item);
				fn._blur(item);


			})
		},
		_focus:function(item){
			var val = item.elem.val();
			var type = item.elem.data('type');
			$.validator.vFunction[type].applay(this,[val,item]);

		},
		focus:function(item){
			var fn = this;
			item.elem.bind('focus',function(){
				fn.hideSt(item);
				fn._focus(item);


			})
		},
		_keydown:function(item){
			var val = item.elem.val();
			var type = item.elem.data('type');
			$.validator.vFunction[type].applay(this,[val,item]);
		},
		keydown:function(item){
			var fn = this;
			item.elem.bind('keydown',function(){
				fn.hideSt(item);
				fn.keydown(item);
			})
		},
		getSave:function(item){


		},
		setSave:function(item){


		},
		submit:function(){


		}
	}


	$.validator.fn.init.prototype = $.validator.fn;

	$.fn.validator = function(options) {
		if(!this.length) {
			return this;
		}

		var opts = $.extend(true, {}, $.fn.validator.defaults, options);

		this.each(function() {
			var elem = $(this);
			$.validator(elem,opts);

		});
		return this;
	};


	$.extend($.validator.vRegExp,{
	    zipcode:"^\\d{6}$", //邮编
	    mobile:"^0?(13|15|18|14)[0-9]{9}$", //手机
	    notempty:"^\\S+$", //非空
	    qq:"^[1-9]*[1-9][0-9]*$", //QQ号码
	    idcard:"^[1-9]([0-9]{14}|[0-9]{17})$", //身份证
	    date:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
	    email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
	    password:"^.*[A-Za-z0-9\\w_-]+.*$", //密码
	    username:"^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //用户名        
	    realname:"^[A-Za-z\\u4e00-\\u9fa5]+$", // 真实姓名
	    tel:"^[0-9\-()（）]{7,18}$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
	    picture:"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$" //图片
	})

	//验证规则
	$.extend($.validator.vRules,{
	    isNull:function (str) {
	        return (str == "" || typeof str != "string");
	    },
	    betweenLength:function (str, _min, _max) {
	        return (str.length >= _min && str.length <= _max);
	    },
	    isUid:function (str) {
	        return new RegExp(vRegExp.username).test(str);
	    },
	    fullNumberName:function (str) {
	        return new RegExp(vRegExp.fullNumber).test(str);
	    },
	    isPassword:function (str) {
	        return /^.*([\W_a-zA-z0-9-])+.*$/i.test(str);
	    },
	    isPassword2:function (str1, str2) {
	        return (str1 == str2);
	    },
	    isEmail:function (str) {
	        return new RegExp(vRegExp.email).test(str);
	    },
	    isTel:function (str) {
	        return new RegExp(vRegExp.tel).test(str);
	    },
	    isMobile:function (str) {
	        return new RegExp(vRegExp.mobile).test(str);
	    },
	    checkType:function (element) {
	        return (element.attr("type") == "checkbox" || element.attr("type") == "radio" || element.attr("rel") == "select");
	    },
	    isChinese:function (str) {
	        return new RegExp(vRegExp.chinese).test(str);
	    },
	    isRealName:function (str) {
	        return new RegExp(vRegExp.realname).test(str);
	    },
	    isDeptname:function (str) {
	        return new RegExp(vRegExp.deptname).test(str);
	    }
	})


	$.extend($.validator.vPrompt,{
	    username:{
	        onFocus:"4-20位字符，可由中文、英文、数字及“_”、“-”组成",
	        succeed:"",
	        isNull:"请输入用户名",
	        error:{
	            beUsed:"该用户名已被使用，请使用其它用户名注册",
	            badLength:"用户名长度只能在4-20位字符之间",
	            badFormat:"用户名只能由中文、英文、数字及“_”、“-”组成",
	            fullNumberName:"用户名不能全为数字"
	        }
	    },
	    mail:{
	        onFocus:"请输入常用的邮箱，将用来找回密码、接收订单通知等",
	        succeed:"",
	        isNull:"请输入邮箱",
	        error:{
	            beUsed:"该邮箱已被使用，请更换其它邮箱",
	            badFormat:"请输入有效的邮箱地址",
	            badLength:"您填写的邮箱过长，邮箱地址只能在50个字符以内"
	        }
	    },
	    mobile:{
	        onFocus:"请输入常用的手机",
	        succeed:"",
	        isNull:"请输入手机号",
	        error:{
	            beUsed:"该手机号已被使用，请更换号码",
	            badLength:"用户名长度只能在4-20位字符之间",
	            badFormat:"手机号码格式有误，请输入以13/14/15/18开头的11位数字。"
	        }
	    },
	    password:{
	        onFocus:"6-20位字符，可使用字母、数字或符号的组合",
	        succeed:"",
	        isNull:"请输入密码",
	        error:{
	            badLength:"密码长度只能在6-20位字符之间",
	            badFormat:"密码只能由英文、数字及标点符号组成",
	            simplePwd:"密码太弱，有被盗风险，建议设置多种字符组成的复杂密码"
	        }
	    },
	    password2:{
	        onFocus:"请再次输入密码",
	        succeed:"",
	        isNull:"请输入密码",
	        error:{
	            badLength:"密码长度只能在6-20位字符之间",
	            badFormat2:"两次输入密码不一致",
	            badFormat1:"密码只能由英文、数字及标点符号组成"
	        }
	    },
	    authcode:{
	        onFocus:"请输入图片中的字符，不区分大小写",
	        succeed:"",
	        isNull:"请输入验证码",
	        error:"验证码错误"
	    },
	    protocol:{
	        onFocus:"",
	        succeed:"",
	        isNull:"请先阅读并同意《纵横天地用户协议》",
	        error:""
	    },
	    empty:{
	        onFocus:"",
	        succeed:"",
	        isNull:"",
	        error:""
	    }
	})

	$.extend($.validator.vSettings,{
	    onFocus:{
	        state:null,
	        container:"_error",
	        style:"focus",
	        run:function (option, str) {
	            if (!vRules.checkType(option.element)) {
	                option.element.removeClass(vSettings.INPUT_style2).addClass(vSettings.INPUT_style1);
	            }
	            option.onFocusEle.removeClass().addClass(vSettings.onFocus.style).html(str);
	        }
	    },
	    isNull:{
	        state:0,
	        container:"_error",
	        style:"null",
	        run:function (option, str) {
	            option.element.attr("sta", 0);
	            if (!vRules.checkType(option.element)) {
	                if (str != "") {
	                    option.element.removeClass(vSettings.INPUT_style1).addClass(vSettings.INPUT_style2);
	                } else {
	                    option.element.removeClass(vSettings.INPUT_style2).removeClass(vSettings.INPUT_style1);
	                }
	            }
	            option.succeedEle.removeClass(vSettings.succeed.style);
	            option.isNullEle.removeClass().addClass(vSettings.isNull.style).html(str);
	        }
	    },
	    error:{
	        state:1,
	        container:"_error",
	        style:"error",
	        run:function (option, str) {
	            option.element.attr("sta", 1);
	            if (!vRules.checkType(option.element)) {
	                option.element.removeClass(vSettings.INPUT_style1).addClass(vSettings.INPUT_style2);
	            }
	            option.succeedEle.removeClass(vSettings.succeed.style);
	            option.errorEle.removeClass().addClass(vSettings.error.style).html(str);
	        }
	    },
	    succeed:{
	        state:2,
	        container:"_succeed",
	        style:"succeed",
	        run:function (option) {
	            option.element.attr("sta", 2);
	            option.errorEle.empty();
	            if (!vRules.checkType(option.element)) {
	                option.element.removeClass(vSettings.INPUT_style1).removeClass(vSettings.INPUT_style2);
	            }
	            if (option.element.attr("id") == "schoolinput" && $("#schoolid").val() == "") {
	                return;
	            }
	            option.succeedEle.addClass(vSettings.succeed.style);
	        }
	    },
	    INPUT_style1:"highlight1",
	    INPUT_style2:"highlight2"
	});

	$.extend($.validator.vFunction,{
	    username:function (option) {
	        var format = vRules.isUid(option.value);
	        var length = vRules.betweenLength(option.value.replace(/[^\x00-\xff]/g, "**"), 4, 20);
	        if (!length && format) {
	            vSettings.error.run(option, option.prompts.error.badLength);
	        }
	        else if (!length && !format) {
	            vSettings.error.run(option, option.prompts.error.badFormat);
	        }
	        else if (length && !format) {
	            vSettings.error.run(option, option.prompts.error.badFormat);

	        } else if (vRules.fullNumberName(option.value)) {

	            vSettings.error.run(option, option.prompts.error.fullNumberName);
	        } else {
	            if (!namestate || nameold != option.value) {
	                if (nameold != option.value) {
	                    nameold = option.value;
	                    option.errorEle.html("<span style='color:#999'>检验中……</span>");
	                    $.getJSON("AjaxService.aspx?action=CheckUnicknme&uid=" + escape(option.value) + "&r=" + Math.random(), function (date) {
	                        if (date.success == 0) {
	                            vSettings.succeed.run(option);
	                            namestate = true;
	                        } else {
	                            vSettings.error.run(option, option.prompts.error.beUsed.replace("{1}", option.value));
	                            namestate = false;
	                        }
	                    })
	                }
	                else {
	                    vSettings.error.run(option, option.prompts.error.beUsed.replace("{1}", option.value));
	                    namestate = false;
	                }
	            }
	            else {
	                vSettings.succeed.run(option);
	            }
	        }
	    },

	    mobileInfo:function (option) {
	        var mobileValue = option.value;
	        if (vRules.isNull(mobileValue)) {
	            vSettings.error.run(option, option.prompts.error.badFormat);
	            return;
	        }
	        mobileValue = strTrim(mobileValue);
	        var isMobile = vRules.isMobile(mobileValue);
	        if (!isMobile || mobileValue.length > 11) {
	            vSettings.error.run(option, option.prompts.error.badFormat);
	        } else {
	            if (!namestate || nameold != option.value) {
	                if (nameold != option.value) {
	                    nameold = option.value;
	                    option.errorEle.html("<span style='color:#999'>检验中……</span>");
	                    $.getJSON("isMobileEngaged?mobile=" + option.value + "&r=" + Math.random(), function (date) {
	                        if (date.success == 0) {
	                            vSettings.succeed.run(option);
	                            namestate = true;
	                        } else {
	                            vSettings.error.run(option, option.prompts.error.beUsed);
	                            namestate = false;
	                        }
	                    })
	                }
	                else {
	                    vSettings.error.run(option, option.prompts.error.beUsed);
	                    namestate = false;
	                }
	            }
	            else {
	                vSettings.succeed.run(option);
	            }
	        }
	    },
	    password:function (option) {
	        var str1 = option.value;
	        var str2 = $("#pwd2").val();
	        var format = vRules.isPassword(option.value);
	        var length = vRules.betweenLength(option.value, 6, 20);
	        $("#pwdstrength").hide();
	        if (!length && format) {
	            vSettings.error.run(option, option.prompts.error.badLength);
	        } else if (!length && !format) {
	            vSettings.error.run(option, option.prompts.error.badFormat);
	        } else if (length && !format) {
	            vSettings.error.run(option, option.prompts.error.badFormat);
	        } else if (vRules.simplePwd(str1)) {
	            vSettings.error.run(option, option.prompts.error.simplePwd);
	        } else {
	            vSettings.succeed.run(option);
	            vFunction.pwdstrength();
	        }
	        if (str2 == str1) {
	            $("#pwd2").focus();
	        }
	    },
	    password2:function (option) {
	        var str1 = option.value;
	        var str2 = $("#pwd").val();
	        var length = vRules.betweenLength(option.value, 6, 20);
	        var format2 = vRules.isPassword2(str1, str2);
	        var format1 = vRules.isPassword(str1);
	        if (!length) {
	            vSettings.error.run(option, option.prompts.error.badLength);
	        } else {
	            if (!format1) {
	                vSettings.error.run(option, option.prompts.error.badFormat1);
	            } else {
	                if (!format2) {
	                    vSettings.error.run(option, option.prompts.error.badFormat2);
	                }
	                else {
	                    vSettings.succeed.run(option);
	                }
	            }
	        }
	    },
	    mail:function (option) {
	        var format = vRules.isEmail(option.value);
	        var format2 = vRules.betweenLength(option.value, 0, 50);
	        if (!format) {
	            vSettings.error.run(option, option.prompts.error.badFormat);
	        } else {
	            if (!format2) {
	                vSettings.error.run(option, option.prompts.error.badLength);
	            } else {
	                if (!emailstate || emailold != option.value) {
	                    if (emailold != option.value) {
	                        emailold = option.value;
	                        option.errorEle.html("<span style='color:#999'>检验中……</span>");
	                        $.getJSON("AjaxService.aspx?action=CheckUemail&str=" + escape(option.value) + "&r=" + Math.random(), function (date) {
	                            if (date.success == 0) {
	                                vSettings.succeed.run(option);
	                                emailstate = true;
	                            } else {
	                                vSettings.error.run(option, option.prompts.error.beUsed);
	                                emailstate = false;
	                            }
	                        })
	                    }
	                    else {
	                        vSettings.error.run(option, option.prompts.error.beUsed);
	                        emailstate = false;
	                    }
	                }
	                else {
	                    vSettings.succeed.run(option);
	                }
	            }
	        }
	    },
	    referrer:function (option) {
	        var bool = vRules.isNull(option.value);
	        if (bool) {
	            option.element.val("可不填");
	            return;
	        } else {
	            vSettings.succeed.run(option);
	        }
	    },
	    schoolinput:function (option) {
	        var bool = vRules.isNull(option.value);
	        if (bool) {
	            vSettings.error.run(option, option.prompts.error);
	            return;
	        } else {
	            vSettings.succeed.run(option);
	        }
	    },
	    mobileCode:function (option) {
	        var bool = vRules.isNull(option.value);
	        if (bool) {
	            vSettings.error.run(option, option.prompts.error);
	            return;
	        } else {
	            vSettings.succeed.run(option);
	        }
	    },
	    authcode:function (option) {
	//        if (!authcodestate || authcodeold != option.value) {
	//            if (authcodeold != option.value) {
	////                authcodeold = option.value;
	////                option.errorEle.html("<span style='color:#999'>检验中……</span>");
	////                var uuid = $("#JD_Verification1").attr("src").split("&uid=")[1].split("&")[0];
	////                $.getJSON("AjaxService.aspx?action=CheckAuthcode&str=" + escape(option.value) + "&r=" + Math.random() + "&uuid=" + uuid, function(date) {
	////                    if (date.success == 0) {
	////                        vSettings.succeed.run(option);
	////                        authcodestate = true;
	////                    } else {
	////                        vSettings.error.run(option, option.prompts.error);
	////                        authcodestate = false;
	////                    }
	////                })
	//            }
	//            else {
	//                vSettings.error.run(option, option.prompts.error);
	//                authcodestate = false;
	//            }
	//        }
	//        else {
	//            vSettings.succeed.run(option);
	//        }
	        vSettings.succeed.run(option);
	        authcodestate = true;
	    },
	    protocol:function (option) {
	        if (option.element.attr("checked") == true) {
	            option.element.attr("sta", vSettings.succeed.state);
	            option.errorEle.html("");
	        } else {
	            option.element.attr("sta", vSettings.isNull.state);
	            option.succeedEle.removeClass(vSettings.succeed.style);
	        }
	    },
	    pwdstrength:function () {
	        var element = $("#pwdstrength");
	        var value = $("#pwd").val();
	        if (value.length >= 6 && vRules.isPwd(value)) {
	            $("#pwd_error").empty();
	            element.show();
	            var level = pwdLevel(value);
	            switch (level) {
	                case 1:
	                    element.removeClass().addClass("strengthA");
	                    break;
	                case 2:
	                    element.removeClass().addClass("strengthB");
	                    break;
	                case 3:
	                    element.removeClass().addClass("strengthC");
	                    break;
	                default:
	                    break;
	            }
	        } else {
	            element.hide();
	        }
	    },
	    checkGroup:function (elements) {
	        for (var i = 0; i < elements.length; i++) {
	            if (elements[i].checked) {
	                return true;
	            }
	        }
	        return false;
	    },
	    checkSelectGroup:function (elements) {
	        for (var i = 0; i < elements.length; i++) {
	            if (elements[i].value == -1) {
	                return false;
	            }
	        }
	        return true;
	    },
	    showPassword:function (type) {
	        var v1 = $("#pwd").val(), s1 = $("#pwd").attr("sta"), c1 = document.getElementById("pwd").className, t1 = $("#pwd").attr("tabindex");
	        var v2 = $("#pwd2").val(), s2 = $("#pwd2").attr("sta"), c2 = document.getElementById("pwd2").className, t2 = $("#pwd2").attr("tabindex");
	        var P1 = $("<input type='" + type + "' value='" + v1 + "' sta='" + s1 + "' class='" + c1 + "' id='pwd' name='pwd' tabindex='" + t1 + "'/>");
	        $("#pwd").after(P1).remove();
	        $("#pwd").bind("keyup",
	            function () {
	                vFunction.pwdstrength();
	            }).jdValidate(validatePrompt.pwd, vFunction.pwd)
	        var P2 = $("<input type='" + type + "' value='" + v2 + "' sta='" + s2 + "' class='" + c2 + "' id='pwd2' name='pwd2' tabindex='" + t2 + "'/>");
	        $("#pwd2").after(P2).remove();
	        $("#pwd2").jdValidate(validatePrompt.pwd2, vFunction.pwd2);
	    },
	    FORM_submit:function (elements) {
	        var bool = true;
	        for (var i = 0; i < elements.length; i++) {
	            if ($(elements[i]).attr("sta") == 2) {
	                bool = true;
	            } else {
	                bool = false;
	                break;
	            }
	        }
	        return bool;
	    }
	})





	var nameold, emailold, authcodeold;
	var namestate = false, emailstate = false, authcodestate = false;




	// default optss
	$.fn.validator.defaults = {
		onFocus:false,
		onBlur:false,
		onSubmit:'#selector', // function(){ }
		custom:[{
				_onFocus:true,
				_onBlur:true,				
				selector:'',
				regexp:null,

				onFocus:"4-20位字符，可由中文、英文、数字及“_”、“-”组成",
				succeed:"",
				isNull:"请输入用户名",
				error:{
				    beUsed:"该用户名已被使用，请使用其它用户名注册",
				    badLength:"用户名长度只能在4-20位字符之间",
				    badFormat:"用户名只能由中文、英文、数字及“_”、“-”组成",
				    fullNumberName:"用户名不能全为数字"
				}
			},
			{
				selector:'',
				regexp:null,
				onFocus:"4-20位字符，可由中文、英文、数字及“_”、“-”组成",
				succeed:"",
				isNull:"请输入用户名",
				error:{
				    beUsed:"该用户名已被使用，请使用其它用户名注册",
				    badLength:"用户名长度只能在4-20位字符之间",
				    badFormat:"用户名只能由中文、英文、数字及“_”、“-”组成",
				    fullNumberName:"用户名不能全为数字"
				}
			}]
	};

	function __import(o,param){
		$(o).validator(param)
	}

	exports.itour = exports.itour ? exports.itour : {};
	exports.itour.util = exports.itour.util ? exports.itour.util : {};
	exports.itour.util.validator = __import;


})(jQuery, this);

