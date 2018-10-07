$(function() {

    var tooltiptempl = '<div class="tooltip fade in" style="display: block;"><div class="tooltip-arrow"></div><div class="tooltip-inner" data-tooltip="content" ></div></div>';
    $('.demo_content').tooltip({
        template: tooltiptempl,
        selector: '.tooltip_target_demo1',
        offset: 15,
        visible: true,
        appendTo: 'after'
    });


    var itourstyle = '<div style="position: absolute; z-index: 999; width: 380px; top: 370px; left: 364px; display: block;" class="itour_style itour-tip-v-ru"><div class="orange"><div class="itour-tip-arrow" style="position: absolute; top: 166px; left: 20px;"></div><div class="tip-wrapper"><div class="tip-body"><div class="tip-content"><div id="xian" class="popup_window_bar"><div class="stoer_phone"><img onerror="this.onerror=\' \';this.src=\'../../themes/images/cms_info/store/no_picture.jpg\';this.onclick=function(){return false;};" alt="" src="images/xian.jpg"></div><dl class="company"><dt>陕西西安分公司</dt><dd><span>地址：</span>西安市环城南路西段48号城市郦景一楼</dd></dl></div></div></div></div></div></div>';


    var Qzonestyle = '<div id="qzNameCardDiv" style="position: absolute; top: 1145px; left: 692px; background-color: white; z-index: 1024; visibility: visible; opacity: 1;"><div class="qzone_cards  qzone_cards_default"><div id="_qzone_cards" class="qzone_cards_wrap new_year_cards"><a href="http://rc.qzone.qq.com/mall?target=1238&amp;referrer=http%3A%2F%2Fmall.qzone.qq.com%2Fnamecard" target="_blank" class="link_change_skin" data-click="||0|common_namecard.shop|" title="名片装扮"></a><div class="cards_abstract"><div class="card_user_pic photos"><a href="http://user.qzone.qq.com/328765211" target="_blank" data-click="||0|common_namecard.picture|"><img alt="" src="http://qlogo4.store.qq.com/qzone/328765211/328765211/100" title="点击访问的空间" class="photo"></a></div><div class="card_main"><div class="card_user_info" id="nc_cardUserInfo"><a href="http://user.qzone.qq.com/328765211" class="nickname ui_mr5 textoverflow" id="nc_userNickname" title="点击访问的空间" target="_blank" data-click="||0|common_namecard.nick|">XXXX</a><a class="nickname_ico" href="javascript:;" data-click="editRemark|328765211|1||" title="给好友添加备注名"><i class="icon_pencil"></i></a><a href="javascript:;" onclick=";return false;" class="qz_qzone_lv_s qz_qzone_lv qz_qzone_lv_3" title="当前空间等级：33级； 积分：6953分"><span class="no"><b class="d3"></b><b class="d3"></b></span></a></div><p id="nc_userRemarkEdit" class="card_remark none"><input id="nc_remarkInput" name="" type="text"><a href="javascript:;" data-click="setRemark|328765211|1||" class="qzone_cards_btn">保存</a><a href="javascript:;" data-click="cancelRemark||1||" class="qzone_cards_btn">取消</a></p><div class="card_user_basicinfo"><p>男 QQ座 </p></div><div class="card_user_op"><a href="javascript:;" data-click="setSpecialCare|328765211-1|1||" title="特别关心"><i class="ui_ico ico_user_like"></i><span class="ui_txt">特别关心</span></a><a href="javascript:;" title="可访问您的空间" class="setting_op ui_ml5" data-click="visitAction|328765211|1|common_namecard.visit|"><i class="icon_access"></i>访问设置</a></div></div></div><div class="qzone_cards_feed qzone_cards_app none" id="_namecard_recent_app"></div><div id="_namecard_feed" class="qzone_cards_feed"><div class="qzone_cards_shuoshuo clearfix"><strong class="quotes_symbols_left">“</strong><span class="shuoshuo_content">offset(∩_∩)O哈哈~。。。</span><strong class="quotes_symbols_right">”</strong></div><div id="_namecard_op" class="right"><div class="right_inner"><a href="javascript:;" data-click="openChatbox|328765211|1|common_namecard.chat|" class="expand">聊天<b class="trig"></b></a><ul><li><a href="javascript:;" data-click="sendGift|328765211-&amp;type=556&amp;birthdaytab=&amp;lunarFlag=undefined&amp;source=undefined&amp;nick=|1|common_namecard.gift|">送礼</a></li><li><a href="javascript:;" data-click="openReportbox|328765211|1||">举报</a></li><li><a href="javascript:;" data-click="confirmToBlack|328765211|1|common_namecard.blacklist|">黑名单</a></li><li><a href="javascript:;" data-click="visitAction|328765211|1|common_namecard.visit|">访问设置</a></li></ul></div></div></div></div></div></div>';

    var vancltempl = '<div id="popup" style="position: absolute; z-index: 101; top: 1360px; left: 914px; " class="fc02"><div align="center" class="jJ" style="position: relative;width:270px;margin:0 auto;"><img id="popupimage" src="http://p2.vanclimg.com/270/270/product/0/0/8/0080435/big/0080435-1j201211231401523639.jpg" style="width:270px;height:270px;"></div><div class="sd">高品质纯羊毛V领套衫(男款) 军绿色</div><p class="jJ01">产品编号：0080435</p><p class="jJ02"><strong>特惠价：￥49.00</strong></p><p class="jJ03">市场价：<del>￥299.00</del> <span>售价：￥199.00</span></p><p class="jJ04">用户综合评分：<span class="s_s1"></span><span class="s_s1"></span><span class="s_s1"></span><span class="s_s1"></span><span class="s_s05"></span>共有 <strong>15397</strong> 条评论</p></div>';



    var hotelstyle = '<img width="300" height="225" alt="" class="hotel_pic_big" src="http://images4.c-ctrip.com/target/hotel/72000/71434/F3264857-3F0F-4577-A11D-B2C6DBBB21A9_300_225.jpg">';


    var douban = '<div class="detail-tip shadow-right" style="left: 835px; top: 399px;"><h2>荒潮</h2><p class="color-gray">陈楸帆 / 2013-1 / 长江文艺出版社 / 24.80元 / 平装</p><p>如果并非只有人类拥有灵魂？如果并非只有生物才能进化？如果我们的未来必须穿过地狱之门？进步浪潮席卷之处，人的灵魂一片荒芜。故事发生在近未来的硅屿——一座被进步浪潮抛弃的垃圾之岛，对生态灾难习以为常的麻木岛民迎来了不可预知的变化：宣称要用环保技术造福硅屿的外来资本精英；在底层苦苦挣扎沉湎于电子毒品的垃圾少女；为拯救受未知病毒感染的爱子而不惜代...</p><span class="arrow-left"></span></div>';



    var douban2 = '<div class="detail-tip shadow-right" style="left: 835px; top: 399px;"><div class="" data-tooltip="content" ></div><span class="arrow-left"></span></div>';



    $('.dynamic_demo1').tooltip({
        template: itourstyle,
        offset: 40,
        visible: true
    });

    $('.dynamic_demo2').tooltip({
        template: vancltempl,
        offset: 40,
        visible: true,
        position: 'bottomRight'
    });


    $('.dynamic_demo3').tooltip({
        template: Qzonestyle,
        offset: 40,
        visible: true,
        position: 'rightBottom'
    });


    $('.dynamic_demo4').tooltip({
        template: Qzonestyle,
        offset: 40,
        visible: true,
        position: 'bottomLeft'
    });


    $('.dynamic_demo5').tooltip({
        template: douban,
        offset: 28,
        visible: true,
        position: 'rightBottom'
    });


    $('.dynamic_demo6').tooltip({
        template: hotelstyle,
        offset: 40,
        visible: true,
        position: 'topLeft',
        appendTo: 'after'
    });

    $('.dynamic_demo7').tooltip({
        template: vancltempl,
        offset: 30,
        position: 'leftTop'
    });


    $('.dynamic_demo8').tooltip({
        template: vancltempl,
        offset: 30,
        position: 'topRight'
    });

    $('.dynamic_demo9').tooltip({
        template: vancltempl,
        offset: 30,
        position: 'rightTop'
    });


    $('.dynamic_demo10').tooltip({
        template: douban2,
        offset: 30,
        loading: true,
        visible: true,
        position: 'rightBottom',
        content: function() {
            var cnt = '<h2>荒潮</h2><p class="color-gray">陈楸帆 / 2013-1 / 长江文艺出版社 / 24.80元 / 平装</p><p>如果并非只有人类拥有灵魂？如果并非只有生物才能进化？如果我们的未来必须穿过地狱之门？进步浪潮席卷之处，人的灵魂一片荒芜。故事发生在近未来的硅屿——一座被进步浪潮抛弃的垃圾之岛，对生态灾难习以为常的麻木岛民迎来了不可预知的变化：宣称要用环保技术造福硅屿的外来资本精英；在底层苦苦挣扎沉湎于电子毒品的垃圾少女；为拯救受未知病毒感染的爱子而不惜代...</p>';
            var fn = this;
            setTimeout(function() {
                fn.insertContent(cnt);
            }, 2000)
        },
        callback: function() {

        }
    });

});
