(function($){
	var r1=r2=r3=r4=r5=false;
	var foucs_ns = false;
	var mc = true;
	var pd = 0;
	var id = 0;
	var userid = 0;
	var sessionid = '';
	var usermail;
	var om = 0;
	var ls = 120;
	var ls_returnurl = 5;
	var has_trail = false;
	var mailTipsIndex = 1;
	$.fn.checkRegMail = function() {
		var mailExt = ['163.com','126.com','qq.com','sina.com','sohu.com','gmail.com','yahoo.cn','hotmail.com','139.com','189.cn'];
		var mailExt2 = ['hotmail.com', 'gmail.com', 'yahoo.cn', 'yahoo.com', 'msn.com'];
		var $mailTips = $('.rcf_comp');
		var patrn1 = /[\D]+/; 
		var patrn2 = /^[\d]+$/; 
		var patrn3 = /^13|14|15|18/; 
		this.keyup(function(event){
			var mailTipsHtml = '';	
			if(event.keyCode == 38) {
				if(mailTipsIndex>1) mailTipsIndex--;
			} else if (event.keyCode == 40) {
				if(mailTipsIndex<mailExt.length) mailTipsIndex++;
			} else {
				var user_input = $.trim($(this).val());
				if(user_input.length>=3 || user_input.indexOf('@')>-1) {
					if(user_input.length>10) {
						$('.rcf_comp').addClass('long_mail');
					} else {
						$('.rcf_comp').removeClass('long_mail');
					}
					if(user_input.length>30) {
						user_input = $.trim($(this).val()).substr(0,30);
						$(this).val(user_input);
					}
					var suggestMail = false;				
					if (patrn1.exec(user_input)) {
						suggestMail = true;
					} else if (patrn2.exec(user_input) && !patrn3.exec(user_input)) {
						suggestMail = true;
					}
					if(user_input.indexOf('@')>-1) {
						suggestMail = true;
						var user_input_ary = user_input.split("@");
						var user_input_front = user_input_ary[0];
						var user_input_back = user_input_ary[1];
					} else {
						var user_input_front = user_input;
						var user_input_back = '';
					}
					if(suggestMail) {
						var patrn4 =  eval("/^"+user_input_back+"/i"); 
						var mailExtCount = 0;
						var lastMail = '';
						$.each(mailExt, function(i, n){
							if(user_input_back == '') {
								mailTipsHtml += '<li><a href="#">'+user_input_front+'@'+n+'</a></li>';
								mailExtCount++;
								lastMail = user_input_front+'@'+n;
							} else if(patrn4.exec(n)) {
								mailTipsHtml += '<li><a href="#">'+user_input_front+'@'+n+'</a></li>';
								mailExtCount++;
								lastMail = user_input_front+'@'+n;
							}
						});
						if(mailTipsIndex>mailExtCount) {
							mailTipsIndex = 1;
						}
						if(lastMail == user_input && mailExtCount==1) {
							mailTipsHtml = '';
						}
						if(mailTipsHtml != '') {
							mailTipsHtml = '<ul>'+
											'<li><span>请选择邮箱类型</span></li>'+
											mailTipsHtml+
											'</ul>';
							$mailTips.html(mailTipsHtml);
							$mailTips.show();
							$('.rcf_comp li').click(function(){								
								$('#i_mp').val($(this).find('a').html());
								$mailTips.hide();
								return false;
							});
						} else {
							$mailTips.hide();
						}
					}
				} else {
					$mailTips.hide();
				}
			}
			$('.rcf_comp li').removeClass('on').eq(mailTipsIndex).addClass('on');
		}).blur(function(){
			if($('.rcf_comp').css('display') != 'none') {
				return false;
			}
			$mailTips.hide();
			r1 = false;
			$.xlreg.hideRegTips(0);
			var user_input = $.trim($(this).val());
			if(user_input == '') {
				$.xlreg.showRegTips(0, '请输入邮箱或手机号作为帐号', 1);
			} else if(user_input.indexOf('@') == -1 && !patrn3.exec(user_input)) {
				$.xlreg.showRegTips(0, '请输入正确的邮箱或手机号作为帐号', 3);
			} else if(user_input.indexOf('@') == -1 && patrn3.exec(user_input) && user_input.length!=11) {
				if(user_input.length>11) {
					$.xlreg.showRegTips(0, '您的手机号码超过11位了', 3);
				} else {
					$.xlreg.showRegTips(0, '您的手机号码不足11位哦', 3);
				}
			} else {
				if(user_input.indexOf('@') == -1) {
					$.xlreg.showRegTips(0, '检测手机号是否可用，请稍候...', 1);
				} else {
					$.xlreg.showRegTips(0, '检测邮箱是否可用，请稍候...', 1);
				}				
				var params="m=check_mail&mail="+encodeURIComponent($.trim($('#i_mp').val()));
				params+="&cache="+new Date().getTime();
				var url = 'http://login.i.xunlei.com/register?'+params;
				$.getJSON(url+"&jsoncallback=?", function(data){
					$.xlreg.hideRegTips(0);
					if(data.result == 1301) {
						$.xlreg.showRegTips(0, '抱歉，服务器出了点问题，请稍候再试', 3);
					} else if(data.result == 1302 || data.result == 1303) {
						$.xlreg.showRegTips(0, '帐号已存在，请直接<a href="http://i.xunlei.com/login.html?referfrom=ZC_5" title="登录">登录</a>或<a id="ss_6" href="#" title="更换">更换</a>', 3);
						$('#ss_6').click(function(){
							$('#i_mp').val('');
							$('#i_mp').focus();
							$.xlreg.pvStat('6');
						});
					} else if(data.result == 1304) {
						$.xlreg.showRegTips(0, '邮箱格式错误请重新输入', 3);
					} else if(data.result == 1305) {
						if(user_input.length>11) {
							$.xlreg.showRegTips(0, '您的手机号码超过11位了', 3);
						} else {
							$.xlreg.showRegTips(0, '您的手机号码不足11位哦', 3);
						}						
					} else {
						r1 = true;
						if(user_input.indexOf('@') > -1) {
							var user_input_ary = user_input.split("@");
							var mf = 0;
							$.each(mailExt2, function(i, n){
								if(user_input_ary[1]==n) {
									$.xlreg.showRegTips(0, '激活邮件可能会出现在您邮箱的垃圾邮件中', 1);
									mf = 1;
								}
							});
							if(mf == 0) {
								$.xlreg.showRegResult(0);
							}
						} else {						
							$.xlreg.showRegResult(0);
						}
					}
					$.xlreg.showStep(0);
				});
			}
		}).focus(function(){
			$('.rc_i_wp').removeClass('on_this').eq(0).addClass('on_this');
			if(foucs_ns) {
				foucs_ns = false;
			} else {
				$.xlreg.hideRegResult(0);
				$.xlreg.hideRegTips(0);
				$.xlreg.showRegTips(0, '请输入邮箱或手机号作为帐号', 1);	
			}
		}).change(function(){
			r1 = false;
		});
	};

	$.fn.checkRegNickname = function() {
		this.keyup(function(event){
			
		}).blur(function(){
			r2 = false;
			$.xlreg.hideRegTips(1);
			var nl = parseInt($.xlreg.getByteLen($.trim($(this).val())));
			if(nl == 0) {
				$.xlreg.showRegTips(1, '请填写昵称', 1);
			} else if (nl>10) {
				r2 = true;
				$(this).val($.xlreg.cutStr($.trim($(this).val()), 5));
				$.xlreg.hideRegTips(1);
				$.xlreg.showRegResult(1);
			} else {
				r2 = true;
				$.xlreg.hideRegTips(1);
				$.xlreg.showRegResult(1);
			}
			$.xlreg.showStep(0);
		}).focus(function(){
			if($('.rcf_comp').css('display') != 'none') {
				$('.rcf_comp').hide();
				$('#i_mp').blur();
				$('#i_nn').focus();
				return false;
			}
			$('.rc_i_wp').removeClass('on_this').eq(1).addClass('on_this');
			if(foucs_ns) {
				foucs_ns = false;
			} else {
				$.xlreg.hideRegResult(1);
				$.xlreg.hideRegTips(1);
				$.xlreg.showRegTips(1, '长度不超过10个英文字或5个汉字', 1);
			}
		});
	};

	$.fn.checkRegPassword = function() {
		var passSim = ['14e1b600b1fd579f47433b88e8d85291','70873e8580c9900986939611618d7b1e','9db06bcff9248837f86d1a6bcf41c9e7','ff92a240d11b05ebd392348c35f781b2','63ee451939ed580ef3c4b6f0109d1fd0','d59eb828e57156014adc4ce1ec3a6167','49bae67c778a75d14bf3e58c750b136e','d477887b0636e5d87f79cc25c99d7dc9','224cf2b695a5e8ecaecfb9015161fa4b','550e1bafe077ff0b0b67f4e32f29d751','b537a06cf3bcb33206237d7149c27bc3','c2f1366c51911b52369fe27df307ff84','d7b2e1e00c702af1bea5854f7d9817af','2757a9a6ad29160f71f3645a01309cc6','af26610db5e49dd014584b03cd4d3599','b9e79361b4040a3f3a71668163d2f058','4a6629303c679cfa6a5a81433743e52c','894c925e9616baf4484f6fccbf9013c0','46cc468df60c961d8da2326337c7aa58','d0521106f6ba7f9ac0a7370fb28d0ec6'];
		this.keyup(function(event){
			var user_input = $.trim($(this).val());
			if(user_input.length>=1) {
				pd = $.xlreg.pwDeg(user_input);
				var d = pd<=25 ? 11 : (pd<=50 ? 12 : 13);
				$.xlreg.hideRegTips(2);
				$.xlreg.showRegTips(2, '', d);
			}			
		}).blur(function(){//alert('pawword');
			r3 = false;
			var user_input = $.trim($(this).val());
			$.xlreg.hideRegTips(2);
			var ps = false;
			$.each(passSim, function(i, n){
				if(n == $.md5($.md5(user_input))) {
					ps = true;
				}
			});
			if(user_input == '') {
				$.xlreg.showRegTips(2, '请输入密码，区分大小写', 1);
			} else if(user_input.length < 6) {
				$.xlreg.showRegTips(2, '密码太短了，至少要6位哦', 2);
			} else if(user_input.length > 16) {
				$.xlreg.showRegTips(2, '密码太长了，最多16位哦', 2);
			} else if(ps) {
				$.xlreg.showRegTips(2, '密码过于简单请重新输入', 2);
			} else {
				r3 = true;
				pd = $.xlreg.pwDeg(user_input);
				var d = pd<=25 ? 11 : (pd<=50 ? 12 : 13);
				$.xlreg.showRegTips(2, '', d);
			}
			if($.trim($('#i_rp').val()) != '' && $(this).val() != $('#i_rp').val()) {
				$.xlreg.hideRegResult(3);
				$.xlreg.hideRegTips(3);
				$.xlreg.showRegTips(3, '两次输入密码不一致', 3);
				//alert('focus');
			}
			$.xlreg.showStep(0);
		}).focus(function(){
			$('.rc_i_wp').removeClass('on_this').eq(2).addClass('on_this');
			if(foucs_ns) {
				foucs_ns = false;
			} else {
				$.xlreg.hideRegResult(2);
				$.xlreg.hideRegTips(2);
				$.xlreg.showRegTips(2, '密码长度为6-16个字符，区分大小写', 1);	
			}
		});
	};

	$.fn.checkRegRePassword = function() {
		this.keyup(function(event){
			
		}).blur(function(){
			r4 = false;
			$.xlreg.hideRegTips(3);
			if($.trim($(this).val()) == '') {
				$.xlreg.showRegTips(3, '请再次输入密码', 1);
			} else if($(this).val() != $('#i_pw').val()) {
				$.xlreg.showRegTips(3, '两次输入密码不一致', 3);
			} else {
				if(r3) {
					r4 = true;
					$.xlreg.showRegResult(3);
				}
			}
			$.xlreg.showStep(0);
		}).focus(function(){
			$('.rc_i_wp').removeClass('on_this').eq(3).addClass('on_this');
			if(foucs_ns) {//alert('repassword');
				foucs_ns = false;
			} else {
				$.xlreg.hideRegResult(3);
				$.xlreg.hideRegTips(3);
				$.xlreg.showRegTips(3, '请再次输入密码', 1);
			}
		});
	};

	$.fn.checkRegVerifycode = function() {
		this.keyup(function(event){
			
		}).blur(function(){
			r5 = false;
			$.xlreg.hideRegTips(4);
			if($.trim($(this).val()) == '') {
				$.xlreg.showRegTips(4, '需要输入验证码哦', 1);
			} else if($.trim($(this).val()).length < 4) {
				$.xlreg.showRegTips(4, '验证码错误，再试试', 3);
			} else {
				r5 = true;
			}
			$.xlreg.showStep(0);
		}).focus(function(){
			$('.rc_i_wp').removeClass('on_this').eq(4).addClass('on_this');
			if(foucs_ns) {
				foucs_ns = false;
			} else {
				$.xlreg.hideRegResult(4);
				$.xlreg.hideRegTips(4);
				$.xlreg.showRegTips(4, '请输入验证码', 1);
			}
		});
	};

	$.fn.checkRegVerifycodeLink = function() {
		getVerifyCode('i_vi');
		this.click(function(){
			getVerifyCode('i_vi');
			return false;
		});
	};

	$.fn.checkRegSubmit = function() {
		
		this.click(function(){
			if(!r1 || $.trim($('#i_mp').val()) == ''){
				foucs_ns = true;
				document.getElementById('i_mp').focus();
				return false;
			} 
			if (!r2 || $.trim($('#i_nn').val()) == '') {
				foucs_ns = true;
				document.getElementById('i_nn').focus();
				return false;
			} 
			if (!r3 || $.trim($('#i_pw').val()) == '') {
				foucs_ns = true;
				document.getElementById('i_pw').focus();
				return false;
			} 
			if (!r4 || $.trim($('#i_rp').val()) == '') {
				foucs_ns = true;
				document.getElementById('i_rp').focus();
				return false;
			} 
			if ($.trim($('#i_vc').val()) == '' || $.trim($('#i_vc').val()).length<4) {
				foucs_ns = true;
				document.getElementById('i_vc').focus();
				return false;
			} else {
				$.xlreg.hideRegTips(4);
				$.xlreg.hideRegResult(4);
			}
			if(bs) return false;
			bs = true;
			$("#i_sm").html('正在提交，请稍候...');
			var params="m=new&mail="+encodeURIComponent($.trim($('#i_mp').val()));
			params+="&nickname="+encodeURIComponent($.trim($('#i_nn').val()));
			params+="&password="+$.md5($.md5($.trim($('#i_pw').val())));
			params+="&pd="+pd;
			params+="&om="+om;
			params+="&verifycode="+encodeURIComponent($.trim($('#i_vc').val()).toUpperCase());
			params+="&cache="+new Date().getTime();
			var regfrom = $.xlreg.request('regfrom');
			if(regfrom == '' || regfrom == null) {
				regfrom = $.xlreg.request('referfrom');
			}
			params+="&regfrom="+regfrom;
			$.getJSON('http://login.i.xunlei.com/register?'+'jsoncallback=?&'+params, function(data){
				bs = false;
				$("#i_sm").html('同意以下协议，<strong>提交</strong>');
				if(data.result == 1007) {
					getVerifyCode('i_vi');
					$('#i_vc').val('');
					$.xlreg.showStep(0);
					$.xlreg.hideRegTips(4);
					$.xlreg.hideRegResult(4);
					foucs_ns = true;
					document.getElementById('i_vc').focus();
					$.xlreg.showRegTips(4, '验证码错误，再试试', 3);
					$('.rc_i_wp').removeClass('on_this').eq(4).addClass('on_this');return false;					
					return false;
				} else if(data.result == 1005 || data.result == 1006 || data.result == 1031) {
					getVerifyCode('i_vi');
					$('#i_vc').val('');
					$('#i_pw').val('');
					$('#i_rp').val('');
					$.xlreg.hideRegResult(3);
					foucs_ns = true;
					$('#i_pw').focus();
					$.xlreg.showRegTips(2, '密码过于简单请重新输入', 3);
					$.xlreg.showStep(0);
					return false;
				} else if(data.result == 1008 || data.result == 1020 || data.result == 1022 || data.result == 1009 || data.result == 1010 || data.result == 1041 || data.result == 1042) {
					getVerifyCode('i_vi');
					$('#i_vc').val('');
					$('#i_nn').val('');
					$('#i_pw').val('');
					$('#i_rp').val('');
					$.xlreg.hideRegResult(0);
					$.xlreg.hideRegResult(1);
					$.xlreg.hideRegResult(2);
					$.xlreg.hideRegResult(3);
					$.xlreg.hideRegTips(2);
					foucs_ns = true;
					$('#i_mp').focus();
					bs = true;
					$.xlreg.showPop(11);
					//$.xlreg.showRegTips(0, '抱歉，服务器出了点问题，请稍候再试', 3);
					$.xlreg.showStep(0);
					return false;
				} else if(data.result == 1043) {
					getVerifyCode('i_vi');
					$('#i_vc').val('');
					$('#i_nn').val('');
					$('#i_pw').val('');
					$('#i_rp').val('');
					$.xlreg.hideRegResult(0);
					$.xlreg.hideRegResult(1);
					$.xlreg.hideRegResult(2);
					$.xlreg.hideRegResult(3);
					$.xlreg.hideRegTips(2);
					foucs_ns = true;
					$('#i_mp').focus();
					bs = true;
					$.xlreg.showPop(13);
					$.xlreg.showStep(0);
					return false;
				} else if(data.result == 1001 || data.result == 1002 || data.result == 1003 || data.result == 1004) {
					getVerifyCode('i_vi');
					$('#i_vc').val('');
					$.xlreg.hideRegResult(0);
					foucs_ns = true;
					$('#i_mp').focus();
					if(data.result == 1001) {
						$.xlreg.showRegTips(0, '提交异常，建议您新开浏览器重新注册', 3);
					} else {
						$.xlreg.showRegTips(0, '请输入正确的邮箱或手机号作为帐号', 3);
					}
					$.xlreg.showStep(0);
					return false;
				} else if(data.result == 1035) { // 超过邮箱修改次数
					bs = true;
					$.xlreg.showPop(2);
					return false;
				} else if(data.result == 1036) { // 超过手机发送次数
					bs = true;
					$.xlreg.showPop(3);
					return false;
				} else {
					bs = true;
					id = data.id;
					userid = data.userid;
					usermail = data.mail;
					mc = data.mail_change;
					if(data.type == 1) {
						$.xlreg.showTips(2);
						$('.t_box:eq(0) .co_yl:eq(0)').html(data.phone);
						$('.t_box:eq(0) .close a').click(function(){
							$.xlreg.closePop();
							window.clearInterval(pq);
							ls = 120;
							$('.t_box:eq(0) .co_blue:eq(0)').html('');
							$('#reg_resms').html('重新发送');
						});
						$.xlreg.showPop(1);
						$.xlreg.d();
						pq = window.setInterval('$.xlreg.d()', 1000);
						$.xlreg.pvStat('12');
					} else {
						$.xlreg.showStep(6);
						$.xlreg.showTips(1);
						hlogin = true;
						var u = 'http://login.xunlei.com/sessionid?sessionid='+data.sessionid+'&u1=';
						hlogin_url = u;

						$('.r_c_hd').html('<h3>恭喜您注册成功！</h3>');
						$('.r_c_form').hide();

						$('.wp_so:eq(0) .yahei:eq(0)').html(data.nickname + '，您好！');
						$('.wp_so:eq(0) .co_yl:eq(0)').html(data.mail);
						$('.wp_so:eq(0) .co_yl:eq(1)').html(data.number);
						$('.wp_so:eq(0) .qd_tipbox a').attr('href', data.url);

						$('.wp_so:eq(0)').show();
						$('.no_mail_help').show();
						$('.other_col').show();
						$.xlreg.checkReturn(0, data.sessionid);
						$.xlreg.pvStat('8');
					}
					return false;
				}				
			});
		});
		$(document).bind('keyup',function(event){
			if(event.keyCode == 13) {
				if($('.t_box').css('display') != 'none') {
					if($('.t_box:eq(0)').css('display') != 'none') {
						$('#i_pksm').click();
					}
				} else if($('.rcf_comp').css('display') == 'none') {
					$('#i_vc').blur();
					$('#i_sm').focus();
					$('#i_sm').click();
					//$('body').focus();
				} else {
					$('#i_mp').val($('.rcf_comp li').eq(mailTipsIndex).find('a').html());
					$('.rcf_comp').hide();
					return false;
				}
			}
		});
	};

	$.fn.reSendMail = function() {
		var hs = false;
		this.click(function(){
			if(hs) return false;
			hs = true;
			$('#reg_remail').html('正在重新发送，请稍候...');
			//$.xlreg.pvStat(statUrl['10'].page, 'ZC_10');
			var params="m=remail&userid="+userid+"&mail="+usermail;
			params+="&cache="+new Date().getTime();
			var url = 'http://login.i.xunlei.com/register?'+params;
			$.getJSON(url+"&jsoncallback=?", function(data){
				hs = false;
				if(data.result == 0) {
					$('#reg_remail').after("<span class='co_gr'>已重发激活邮件</span>");
					$('#reg_remail').remove();
				} else if(data.result == 1401 ||　data.result == 1402 ||　data.result == 1412) {
					$('#reg_remail').after("<span class='co_gr'>操作错误，请重新注册</span>");
					$('#reg_remail').remove();
				} else if(data.result == 1403) {
					$('#reg_remail').after("<span class='co_gr'>已超过重试次数，请重新注册</a>");
					$('#reg_remail').remove();
				} else if(data.result == 1404 || data.result == 1413) {
					$('#reg_remail').after("<span class='co_gr'>此邮件已被激活</span>");
					$('#reg_remail').remove();
				} else {
					$('#reg_remail').html('抱歉，服务器出了点问题，请稍候重试');
				}
			});
		});
	};

	$.fn.reSendSms = function() {
		var hs = false;
		this.click(function(){
			if(hs) return false;
			hs = true;
			$('.t_box:eq(0) .co_gr_bb:eq(0)').addClass('co_yl');
			$('.t_box:eq(0) .co_gr_bb:eq(0)').html(' 正在重新发送，请稍候...');
			$('#reg_resms').html('');
			var params="m=resms&id="+id;
			params+="&cache="+new Date().getTime();
			var url = 'http://login.i.xunlei.com/register?'+params;
			$.getJSON(url+"&jsoncallback=?", function(data){
				hs = false;
				//$('.t_box:eq(0) .co_gr_bb:eq(0)').html('');
				if(data.result == 1505) {
					$('.t_box:eq(0) .co_gr_bb:eq(0)').html('抱歉，服务器出了点问题，请稍候重试');
					$('#reg_resms').html('重新发送');
				} else if(data.result == 1501 ||　data.result == 1502) {
					$('.t_box:eq(0) .co_gr_bb:eq(0)').html('操作错误，请重新注册');
				} else if(data.result == 1503) {
					$('.t_box:eq(0) .co_gr_bb:eq(0)').html('已超过重试次数，请尝试使用下面的方法激活安全邮箱');
				} else if(data.result == 1504) {
					$('.t_box:eq(0) .co_gr_bb:eq(0)').html('此手机号已被激活');
				} else {
					$('.t_box:eq(0) .co_gr_bb:eq(0)').html('已向您的手机：<strong class="co_yl">'+data.phone+'</strong > 发送了验证短信，请输入：');
					$('.t_box:eq(0) .co_gr_bb:eq(0)').removeClass('co_yl');
					$.xlreg.d();
					pq = window.setInterval('$.xlreg.d()', 1000);
				}
			});
			$.xlreg.pvStat('10');
		});
	};

	$.fn.changeMail = function() {
		this.click(function(){
			location.href='http://i.xunlei.com/register.html';
		});
	};

	$.fn.changePhone = function(f) {
		this.click(function(){
			if(mc) {
				om = id;
				$.xlreg.closePop();
				bs = false;
				getVerifyCode('i_vi');
				$('#i_vc').val('');
				$.xlreg.hideRegResult(0);
				$('#i_mp').val('');
				$('#i_mp').focus();
				$.xlreg.showStep(0);
				if(f) {
					$.xlreg.pvStat('14');
				} else {
					$.xlreg.pvStat('13');
				}
			} else {
				$.xlreg.showPop(3);
			}
		});
	};

	$.fn.checkSmsSubmit = function(f) {
		var hs = false;
		this.click(function(){
			var patrnkey = /^[\d]{6}$/; 
			if (!patrnkey.exec($.trim($('#i_pk').val()))) {
				$('.t_box:eq(0) .co_gr_bb:eq(0)').html('请输入6位数字验证码：');
				$('#i_pk').focus();
				return false;
			}
			if(hs) return false;
			hs = true;
			$('.t_box:eq(0) .co_gr_bb:eq(0)').addClass('co_yl');
			$('.t_box:eq(0) .co_gr_bb:eq(0)').html('正在激活，请稍候...');
			var params="m=mobile_active&key="+$.trim($('#i_pk').val());
			params+="&phone="+$.trim($('#i_mp').val());
			params+="&cache="+new Date().getTime();
			var url = 'http://login.i.xunlei.com/register?'+params;
			$.getJSON(url+"&jsoncallback=?", function(data){
				hs = false;				
				if(data.result == 1222 ||　data.result == 1210) {
					$('.t_box:eq(0) .co_gr_bb:eq(0)').html('抱歉，服务器出了点问题，请稍候重试');
				} else if(data.result == 1201 ||　data.result == 1202) {
					$('.t_box:eq(0) .co_gr_bb:eq(0)').html('验证码错误，请重新输入：');
				} else if(data.result == 1203) {
					$('.t_box:eq(0) .co_gr_bb:eq(0)').html('验证码错误，请重新输入：');
				} else if(data.result == 1204) {
					$('.t_box:eq(0) .co_gr_bb:eq(0)').html('您的验证码已过有效期，请重新注册');
				} else if(data.result == 1223) {
					$('.t_box:eq(0) .co_gr_bb:eq(0)').html('您的手机号已被使用，请更换手机号或邮箱注册');
				} else if(data.result == 1211) {
					$('.t_box:eq(0) .co_gr_bb:eq(0)').html('你的手机号已被激活，无须再次激活');
				} else {
					$('.r_c_hd').html('<h3>恭喜您注册成功！</h3>');
					hlogin = true;
					userid = data.userid;
					sessionid = data.sessionid;
					var u = 'http://login.xunlei.com/sessionid?sessionid='+data.sessionid+'&u1=';
					hlogin_url = u;
					$('.wp_so:eq(1) .yahei:eq(0)').prepend(data.nickname);
					$('.wp_so:eq(1) .co_yl:eq(0)').html(data.usernewno);
					$('.wp_so:eq(1) .reg_btn_area a:eq(1)').attr('href', 'http://login.i.xunlei.com/register?m=reg_download&number='+data.usernewno);
					$.xlreg.closePop();
					$.xlreg.showStep(7);
					$('.r_c_form').hide();
					$('.wp_so:eq(1)').show();
					$('.other_col').show();
					$.xlreg.checkReturn(1, data.sessionid);
					$.xlreg.pvStat('20');
				}

			});
		});
	};

	$.fn.trailVip = function() {
		this.click(function(){
			if(has_trail) {
				$.xlreg.showError('您已经领取过体验会员，不能重复领取');
			} else {
				var params="&cache="+new Date().getTime();
				var url = 'http://dyact.vip.xunlei.com/exttrial/activetrialvip/?type=newreg&userid='+userid+params;
				$.getJSON(url+"&callback=?", function(data){
					if(data.ret == 0) {
						$.xlreg.showPop(12);
						has_trail = true;
					} else if(data.ret == 1 || data.ret == 2 || data.ret == 3 || data.ret == 4 || data.ret == 15) {
						$.xlreg.showError('对不起，您的帐号不能申请体验会员，请与客服联系');
					} else if(data.ret == 5) {
						$.xlreg.showError('对不起，您的ip超过当天最大申请次数');
					} else if(data.ret == 16) {
						$.xlreg.showError('对不起，您的新帐号长时间内没有操作。赠送活动自动过期！');
					} else if(data.ret == 7) {
						$.xlreg.showError('对不起，您的ip请求过于频繁');
					} else {
						$.xlreg.showError('抱歉，服务器出了点问题，请稍候再试');
					}
				});
			}
		});
	};
	
	$.xlreg = {
		showRegTips: function(no, msg, type) {
			if(type == 1) {
				var h = '<div class="qd_tipbox tips_blue"><div class="tips_con">'+msg+'</div><div class="qd_tipbox-direction qd_tipbox-down"><em>&#9670;</em><span>&#9670;</span></div></div>';
			} else if(type == 2){
				var h = '<div class="qd_tipbox tips_red have_ico"><div class="tips_con"><span class="h_ico ico_jg"></span>'+msg+'</div><div class="qd_tipbox-direction qd_tipbox-down"><em>&#9670;</em><span>&#9670;</span></div></div>';
			} else if(type == 3){
				var h = '<div class="qd_tipbox tips_red have_ico"><div class="tips_con"><span class="h_ico ico_cw"></span>'+msg+'</div><div class="qd_tipbox-direction qd_tipbox-down"><em>&#9670;</em><span>&#9670;</span></div></div>';
			} else if(type == 11){
				var h = '<div class="qd_tipbox tips_red pass_ico"><div class="tips_con"><span class="h_ico ico_jr"></span>较弱</div><div class="qd_tipbox-direction qd_tipbox-down"><em>&#9670;</em><span>&#9670;</span></div></div>';
			} else if(type == 12){
				var h = '<div class="qd_tipbox tips_blue pass_ico"><div class="tips_con"><span class="h_ico ico_yb"></span>一般</div><div class="qd_tipbox-direction qd_tipbox-down"><em>&#9670;</em><span>&#9670;</span></div></div>';
			} else if(type == 13){
				var h = '<div class="qd_tipbox tips_green pass_ico"><div class="tips_con"><span class="h_ico ico_aq"></span>安全</div><div class="qd_tipbox-direction qd_tipbox-down"><em>&#9670;</em><span>&#9670;</span></div></div>';
			}
			$('.rc_i_wp').eq(no).after(h);
		},
		
		d: function() {
			if(ls == 0) {
				window.clearInterval(pq);
				ls = 120;
				$('.t_box:eq(0) .co_blue:eq(0)').html('');
				$('#reg_resms').html('重新发送');
			} else {
				$('#reg_resms').html('');
				$('.t_box:eq(0) .co_blue:eq(0)').html(' '+ls+'秒后可以重新发送');
				ls--;
			}
		},

		f: function(url) {
			if(ls_returnurl == 0) {
				window.clearInterval(pq_returnurl);
				location.href=url;
			} else {
				$('.reg_info_font').html('页面将于'+ls_returnurl+'s后跳转回来源页,<a href="'+url+'">立刻返回</a>');
				$('.reg_info_font').show();
				ls_returnurl--;
			}
		},
		
		checkReturn: function(type, sessionid) {
			var url = location.href; 
			var return_url = decodeURIComponent($.xlreg.request('redirect_url'));
			if(return_url!='' && return_url.indexOf("http://")>-1 && (return_url.indexOf("xunlei.com/")>-1 || return_url.indexOf("xlpan.com/")>-1 || return_url.indexOf("kankan.com/")>-1)) {
				//if(type == 0) {// 邮箱
				//} else {// 手机
				//}
				if(return_url.indexOf("xunlei.com/")>-1) {
					var u = 'http://login.xunlei.com/sessionid?sessionid='+sessionid+'&u1='+encodeURI(return_url);
				} else if(return_url.indexOf("xlpan.com/")>-1) {
					var u = 'http://login.xlpan.com/sessionid?sessionid='+sessionid+'&u1='+encodeURI(return_url);
				} else if(return_url.indexOf("kankan.com/")>-1) {
					var u = 'http://login.kankan.com/sessionid?sessionid='+sessionid+'&u1='+encodeURI(return_url);
				} else {
					var u = encodeURI(return_url);
				}
				$.xlreg.f(u);
				pq_returnurl = window.setInterval('$.xlreg.f(\''+u+'\')', 1000);
			}
		},

		hideRegTips: function(no) {
			$('.rcf_box').eq(no).find('.qd_tipbox').remove();
		},
		
		showRegResult: function(no) {
			var h = '<span class="h_ico ico_zhq"></span>';
			$('.rc_i_wp').eq(no).after(h);
		},
		
		hideRegResult: function(no) {
			$('.rcf_box').eq(no).find('.h_ico').remove();
		},

		getStep: function() {
			var step = 0;
			if($('.wp_so:eq(0)').css('display') != 'none') return 6;
			if(r1 && $.trim($('#i_mp').val()) != '') step++;
			if(r2 && $.trim($('#i_nn').val()) != '') step++;
			if(r3 && $.trim($('#i_pw').val()) != '') step++;
			if(r4 && $.trim($('#i_rp').val()) != '') step++;
			if(r5 && $.trim($('#i_vc').val()) != '') step++;
			return step;
		},

		showStep: function(n) {
			if(n==0) {
				var num = $.xlreg.getStep();
			} else {
				var num = n;
			}
			$('.qd_tipbox:eq(0)').hide();
			switch(num) {
				case 1: 
					$('.bz_jd:eq(0) .jd_con').css({width:'23px'});$('.bz_jd:eq(0) .bz_arrow').css({left:'19px'});break;
				case 2: 
					$('.bz_jd:eq(0) .jd_con').css({width:'46px'});$('.bz_jd:eq(0) .bz_arrow').css({left:'42px'});break;
				case 3: 
					$('.bz_jd:eq(0) .jd_con').css({width:'69px'});$('.bz_jd:eq(0) .bz_arrow').css({left:'65px'});break;
				case 4: 
					$('.bz_jd:eq(0) .jd_con').css({width:'92px'});$('.bz_jd:eq(0) .bz_arrow').css({left:'88px'});break;
				case 5: 
					$('.bz_jd:eq(0) .jd_con').css({width:'114px'});$('.bz_jd:eq(0) .bz_arrow').css({left:'110px'});$('.bz_jd:eq(0) .qd_tipbox:eq(0)').css({left:'51px'});$('.bz_jd:eq(0) .tips_con').html('注册信息填写完毕！');$('.bz_jd:eq(0) .qd_tipbox:eq(0)').show();break;
				case 6: 
					$('.bz_jd:eq(0) .jd_con').css({width:'142px'});$('.bz_jd:eq(0) .bz_arrow').css({left:'138px'});$('.bz_jd:eq(0) .qd_tipbox:eq(0)').css({left:'79px'});$('.bz_jd:eq(0) .tips_con').html('注册成功，为了帐号安全，请激活邮箱');$('.bz_jd:eq(0) .qd_tipbox:eq(0)').show();break;
				case 7: 
					$('.bz_jd:eq(0) .jd_con').css({width:'170px'});$('.bz_jd:eq(0) .bz_arrow').css({left:'164px'});$('.bz_jd:eq(0) .qd_tipbox:eq(0)').css({left:'106px'});$('.bz_jd:eq(0) .tips_con').html('恭喜！恭喜您注册成功！');$('.bz_jd:eq(0) .qd_tipbox:eq(0)').show();break;
				default:
					$('.bz_jd:eq(0) .jd_con').css({width:'0px'});$('.bz_jd:eq(0) .bz_arrow').css({left:'0px'});break;
			}
			if(!sc_45 && num>0) {
				$.xlreg.pvStat('45');
				sc_45 = true;
			}
		},

		showError: function(msg) {
			$.xlreg.hideGb();
			$('.t_box').hide();
			$('.t_box:eq(1) .ti_2em').html(msg);
			$('.t_box:eq(1) .co_gr_bb:eq(1)').html('');
			$('.t_box:eq(1) .r_m_btn').hide();
			$('.t_box:eq(1) .close a').click(function(){$.xlreg.closePop();});
			$.xlreg.showGb();
			$('.t_box').eq(1).show();
		},

		showPop: function(type) {
			$.xlreg.hideGb();
			$('.t_box').hide();
			if(type == 1) {
				$.xlreg.showGb();
				$('.t_box').eq(0).show();
			} else if(type == 2) {
				$('.t_box:eq(1) .ti_2em').html('也许是邮箱服务器无法接收激活邮件的原因，您已修改邮箱');
				$('.t_box:eq(1) .co_gr_bb:eq(1)').html('超过两次。为了您帐号信息的安全，建议<a class="co_blue" href="http://i.xunlei.com/register.html" title="重新注册">重新注册</a>。');
				$('.t_box:eq(1) .r_m_btn').html('<span>重新注册</span>');
				$('.t_box:eq(1) .r_m_btn').show();
				$('.t_box:eq(1) .r_m_btn').attr('href', 'http://i.xunlei.com/register.html');
				$('.t_box:eq(1) .close a').click(function(){$.xlreg.closePop();});
				$.xlreg.showGb();
				$('.t_box').eq(1).show();
			} else if(type == 3) {
				$('.t_box:eq(1) .ti_2em').html('也许由于信号原因，您的手机未能接收超过3条验证短信。');
				$('.t_box:eq(1) .co_gr_bb:eq(1)').html('为了保证您能够注册成功，建议改用<a class="co_blue" href="#" title="邮箱注册">邮箱注册</a>。');
				$('.t_box:eq(1) .r_m_btn').html('<span>邮箱注册</span>');
				$('.t_box:eq(1) .r_m_btn').show();
				$('.t_box:eq(1) .co_gr_bb:eq(1) a').changePhone(1);
				$('.t_box:eq(1) .r_m_btn').changePhone(1);
				$('.t_box:eq(1) .close a').click(function(){$.xlreg.closePop();});
				$.xlreg.showGb();
				$('.t_box').eq(1).show();
			} else if(type == 11) {
				$('.t_box:eq(1) .ti_2em').html('抱歉，服务器出了点问题，请稍候再试');
				$('.t_box:eq(1) .co_gr_bb:eq(1)').html('');
				$('.t_box:eq(1) .r_m_btn').hide();
				$('.t_box:eq(1) .close a').click(function(){$.xlreg.closePop();});
				$.xlreg.showGb();
				$('.t_box').eq(1).show();
			} else if(type == 12) {
				var u = 'http://login.xunlei.com/sessionid?sessionid='+sessionid+'&u1=';
				$('.t_box:eq(1) .hd h3').html('提示');
				$('.t_box:eq(1) .ti_2em').html('<center style="margin-left:-2em;">恭喜您成功领取迅雷体验会员3天</center>');
				$('.t_box:eq(1) .co_gr_bb:eq(1)').html('<center>想了解迅雷体验会员享有哪些特权吗？<a href="'+u+'http://act.vip.xunlei.com/studyvip" target="_blank">快来看看吧>></a></center>');
				$('.t_box:eq(1) .r_m_btn').html('<span>登录官网</span>');
				$('.t_box:eq(1) .r_m_btn').show();
				$('.t_box:eq(1) .r_m_btn').attr('href', u+'http://vip.xunlei.com/');
				$('.t_box:eq(1) .close a').click(function(){$.xlreg.closePop();});
				$.xlreg.showGb();
				$('.t_box').eq(1).show();
			} else if(type == 13) {
				$('.t_box:eq(1) .ti_2em').html('您所在IP的注册操作过于频繁，请稍后再试');
				$('.t_box:eq(1) .co_gr_bb:eq(1)').html('');
				$('.t_box:eq(1) .r_m_btn').hide();
				$('.t_box:eq(1) .close a').click(function(){$.xlreg.closePop();});
				$.xlreg.showGb();
				$('.t_box').eq(1).show();
			} 
		},

		closePop: function() {
			bs = false;
			$('.t_box:eq(1) .hd h3').html('抱歉');
			getVerifyCode('i_vi');
			$('#i_vc').val('');
			$.xlreg.hideRegResult(0);
			foucs_ns = true;
			$('#i_mp').val('');
			$('#i_mp').focus();
			$.xlreg.showStep(0);
			$('#i_pk').val('');
			$.xlreg.hideGb();
			$('.t_box:eq(1) .r_m_btn').unbind('click');
			$('.t_box').hide();
		},
		
		showGb: function() {
			$('#pop_gb').addClass('gr_layout');
			$('#pop_gb').css({
				width:Math.max(document.body.scrollWidth, document.documentElement.clientWidth),
				height:Math.max(document.body.scrollHeight, document.documentElement.clientHeight)
			});
			$('#pop_gb').show();
		},

		showTips: function(t) {
			if(t==1) {
				$('.rc_tips p:eq(0) a').html('为什么要激活邮箱？');
				$('.rc_tips p:eq(0) a').attr('title', '为什么要激活邮箱？');
				$('.rc_tips p:eq(1)').html('为了充分保障您的帐号安全，我们需要激活您的邮箱，方便日后通过该邮箱找回密码。');
				$('.rc_tips p:gt(1):lt(5)').hide();
				//$('.rc_tips p:eq(7) a').click(function(){$.xlreg.pvStat('9');});
				$('.rc_tips p:eq(7) a').attr('id', 'sc_9');		
				$('.rc_tips p:eq(7) a').attr('href', 'http://i.xunlei.com/help');			
			} else if(t==2) {
				$('.rc_tips p:eq(0) a').html('迅雷帐号有什么增值服务？');
				$('.rc_tips p:eq(0) a').attr('title', '迅雷帐号有什么增值服务？');
				$('.rc_tips p:eq(1)').html('我们推荐您开通迅雷会员，会员用户拥有包含高速通道、离线下载在内的近30项特权。');
				$('.rc_tips p:gt(1):lt(5)').hide();
				$('.rc_tips p:eq(7) a').html('了解迅雷会员');
				$('.rc_tips p:eq(7) a').attr('title', '了解迅雷会员');
				$('.rc_tips p:eq(7) a').attr('href', 'http://vip.xunlei.com');	
				$('.rc_tips p:eq(7) a').attr('id', 'sc_24');
			}
		},

		hideGb: function() {
			$('#pop_gb').removeClass('gr_layout');
			$('#pop_gb').css('width', '0px');
			$('#pop_gb').css('height', '0px');
			$('#pop_gb').hide();
		},

		getByteLen: function(val) { 
			var len = 0; 
			for (var i = 0; i < val.length; i++) { 
				if (val.charAt(i).match(/[^\x00-\xff]/ig) != null) {
					len += 2; 
				} else {
					len += 1; 
				}
			}
			return len; 
		},
		
		cutStr: function (value, length) { 
			var result = value.toString();
			var regE = /^[A-Za-z0-9]+$/i;
			var regC = /^[\u4E00-\u9FA5]+$/;
			var regAll = /^([a-zA-Z0-9\u4E00-\u9FA5])+$/;
			var len = result.length;
			var val_len  = 0;
			var index = 1;
			if (regE.test(result)) {
				length *= 2;
			} else if (regAll.test(result)) {
				for (var i = 0; i < len; i++) {
					var s = result.charAt(i);
					if (regE.test(s)) {
						val_len += 0.5;
					} else {
						val_len += 1;
					}
					var M = Math.ceil(val_len);
					if (M == length) {
						index += i;
					}
				}
			}
			var padding = length - len;
			if (padding < 0) {
				if (length < val_len) {
					result = result.substr(0,index);
				} else {
					result = result.substr(0,length);
				}
			} 
			return result;
		},

		pwDeg: function(p) {
			var pl = p.length;
			var lt = pl - p.replace(/[a-z]/g,'').length;
			var ut = pl - p.replace(/[A-Z]/g,'').length;
			var dt = pl - p.replace(/\d/g,'').length;
			var st = pl - p.replace(/[^\da-zA-Z]/g,'').length;
			var s = 0;
			s+= pl>10 ? 25 : (pl>=8 ? 10 : 5);
			s+= (lt>0 && ut>0) ? 20 : (lt>0 || ut>0 ? 10 : 0);
			s+= dt>2 ? 20 : (dt>0 ? 10 : 0);
			s+= st>1 ? 25 : (st==1 ? 10 : 0);
			s+= (lt>0 && ut>0 && dt>0 && st>0) ? 5 : ((lt>0 || ut>0) && dt>0 && st>0 ? 3 : ((lt>0 || ut>0) && dt>0 ? 2 : 0));
			return s;
		},

		request: function(param) { 
			var url = location.href; 
			var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
			var paraObj = {} 
			for (i=0; j=paraString[i]; i++){ 
				paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
			} 
			var returnValue = paraObj[param.toLowerCase()]; 
			if(typeof(returnValue)=="undefined"){ 
				return ""; 
			} else { 
				return returnValue; 
			} 
		},

		pvStat: function(id) {
			try{
				var page = statUrl[id].page;
				var code = 'ZC_'+id;
				xl_pvManually("http://i.xunlei.com/func/"+page+"?click="+code);
			} catch(e){}
		},
		
		goReferUrl: function(url, from, target) {
			if (url.indexOf("?")!=-1) {
				url = url+"&referfrom="+from;
			} else {
				url = url+"?referfrom="+from;
			}
			if(hlogin) {
				url = hlogin_url+url;
			}
			if(target == 0) {
				location.href=url;
			} else {
				window.open(url);
			}
		}

	};
})(jQuery);

var statUrl = {
	"1":{"page":"pagereg","url":""},
	"2":{"page":"pagereg","url":"http://i.xunlei.com/login.html","target":0},
	"3":{"page":"pagereg","url":"http://hao.xunlei.com","target":1},
	"4":{"page":"pagereg","url":"http://i.xunlei.com/help","target":1},
	"5":{"page":"pagereg","url":"http://i.xunlei.com/login.html","target":0},
	"6":{"page":"pagereg","url":""},
	"7":{"page":"pagereg","url":"http://i.xunlei.com/func","target":1},
	"8":{"page":"pagereg","url":""},
	"9":{"page":"pagereg","url":"http://i.xunlei.com/help","target":1},
	"10":{"page":"pagereg","url":""},
	"11":{"page":"pagereg","url":"http://i.xunlei.com/register.html","target":0},
	"12":{"page":"pagereg","url":""},
	"13":{"page":"pagereg","url":""},
	"14":{"page":"pagereg","url":""},
	"18":{"page":"pageactive","url":"http://i.xunlei.com/func","target":1},
	"20":{"page":"pagereg","url":""},
	"21":{"page":"pagereg","url":"http://i.xunlei.com/func","target":1},
	"22":{"page":"pagereg","url":"http://i.xunlei.com/func","target":1},
	"23":{"page":"pagereg","url":"http://i.xunlei.com/func","target":1},
	"24":{"page":"pagereg","url":"http://i.xunlei.com/func","target":1},
	"31":{"page":"pageactive","url":"http://i.xunlei.com/func","target":1},
	"45":{"page":"pagereg","url":""},
	"51":{"page":"pagereg","url":"http://i.xunlei.com/func","target":1},
	"121":{"page":"pagereg","url":"http://i.xunlei.com/func","target":1},
	"122":{"page":"pagereg","url":"http://i.xunlei.com/func","target":1}
};
var pq = null;
var pq_returnurl = null;
var bs = false;
var sc_45 = false;
var hlogin = false;
var hlogin_url = '';

$(document).ready(function(){
	$('#i_mp').checkRegMail();
	$('#i_nn').checkRegNickname();
	$('#i_pw').checkRegPassword();
	$('#i_rp').checkRegRePassword();
	$('#i_vc').checkRegVerifycode();
	$('#i_va').checkRegVerifycodeLink();
	$('#i_sm').checkRegSubmit();
	$('#reg_remail').reSendMail();
	$('#reg_changemail').changeMail();
	$('#reg_resms').reSendSms();
	$('#reg_changephone').changePhone(0);
	$('#reg_changephone2').changePhone(1);
	$('#i_pksm').checkSmsSubmit();
	$('#reg_trailvip').trailVip();
	$.xlreg.pvStat('1');
	//$('#i_mp').focus();

	$('a').click(function() {
		var tid = this.id;
		if(this.id == 'reg_remail') {
			tid = 'sc_10';
		} else if(this.id == 'reg_changemail') {
			tid = 'sc_11';
		} else if(this.id == 'reg_changephone') {
			tid = 'sc_13';
		} else if(this.id == 'reg_changephone2') {
			tid = 'sc_14';
		} else if(this.id == 'sc_121') {
			tid = 'sc_21';
		} else if(this.id == 'sc_122') {
			tid = 'sc_22';
		}
		var al = tid.match(/^sc\_([\d]+)$/);
		if(al!=null) {
			var id = al[1];
			if(id == 118) { // 目标页面无统计
				$.xlregactive.pvStat(id);
			}
			if($.trim(statUrl[id].url)!= '' && $.trim(statUrl[id].url) == 'http://i.xunlei.com/func') {
				var url = $(this).attr('href');
				$.xlreg.goReferUrl(url, 'ZC_'+id, statUrl[id].target);
			} else if($.trim(statUrl[id].url)!= '') {
				$.xlreg.goReferUrl(statUrl[id].url, 'ZC_'+id, statUrl[id].target);
			} else {
				$.xlreg.pvStat(id);
			}	
			return false;
		}
	});


	$('body').click(function(){
		if($('.rcf_comp').css('display') != 'none'){
			$('.rcf_comp').hide();
		}
	});	
	
});