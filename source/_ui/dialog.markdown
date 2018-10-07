---
layout: docs
comments: true
title: Dialog
keywords: dialog, jquery, plugin
---

<link rel="stylesheet" href="{{root_url}}/ui/dialog/css/dialog.css">

## 参数设置
<table class="classtable" cellspacing="0">
<thead>
<tr>
    <th width="14%">参数</th>
    <th width="13%">默认值</th>
    <th width="14%">类型</th>
    <th width="59%">描述</th>
</tr>
</thead>
<tbody>
<tr>
    <td class="code">type</td>
    <td class="code">undefined</td>
    <td class="code">String</td>
    <td>
    对话框类型，如，['成功'，‘失败’,‘异常’]，不同类型模版之间差异于图标，模版绑定类型，
    如： <span class="dialog_type_{{type}}"></span>
    </td>
</tr>
<tr>
    <td class="code">title</td>
    <td class="code">''</td>
    <td class="code">String</td>
    <td>
    对话框标题，
    模版绑定对话框标题：..</div><span class="title">{{title}}</span>
    </td>
</tr>
<tr>
    <td class="code">content</td>
    <td class="code">''</td>
    <td class="code">String</td>
    <td>
    对话框内容，
    模版绑定对话框内容：..</div><span class="title">{{content}}</span>
    </td>
</tr>

<tr>
    <td class="code">timeout</td>
    <td class="code">0</td>
    <td class="code">Number</td>
    <td>适用于['发表成功'，‘网络延时’，'加载中']等提示，但是注意加载中异步问题，参考[腾讯提示-异常提示]</td>
</tr>
<tr>
    <td class="code">zIndex</td>
    <td class="code">10001</td>
    <td class="code">Number</td>
    <td>对话框层高度，mask设置为 true， mask（阴影层自动 -1）</td>
</tr>
<tr>
    <td class="code">mask</td>
    <td class="code">false</td>
    <td class="code">Boolean</td>
    <td>
    阴影层，依赖 $.mask,$.unmask
    </td>
</tr>
<tr>
    <td class="code">opacity</td>
    <td class="code">0.5</td>
    <td class="code">Number</td>
    <td>阴影层透明度，[0,1]</td>
</tr>
<tr>
    <td class="code">background</td>
    <td class="code">"#000"</td>
    <td class="code">String</td>
    <td>阴影层颜色</td>
</tr>
<tr>
    <td class="code">button</td>
    <td class="code">[]</td>
    <td class="code">Array</td>
    <td>
    <pre>           button:[{
                        caption: "句柄字段",
                        name:"这里是名字",
                        callback: function() {
                          // 按钮点击回调函数
                        }
                    },
                    {
                        caption: "句柄字段",
                        name:"这里是名字",
                        callback: function() {
                          // 按钮点击回调函数
                        }
                    }       
                ]
            </pre>
    </td>
</tr>
<tr>
    <td class="code">close</td>
    <td class="code">undefined</td>
    <td class="code">Function</td>
    <td>close按钮执行事件，相当于button 中的callback: function() {}</td>
</tr>
<tr>
    <td class="code">ok</td>
    <td class="code">undefined</td>
    <td class="code">Function</td>
    <td>ok按钮执行事，相当于button 中的callback: function() {}</td>
</tr>
<tr>
    <td class="code">cancel</td>
    <td class="code">undefined</td>
    <td class="code">Function</td>
    <td>cancel按钮执行事件，相当于button 中的callback: function() {}</td>
</tr>
<tr>
    <td class="code">closeVal</td>
    <td class="code">undefined</td>
    <td class="code">String</td>
    <td>close按钮的名称，相当于button 中的name:"这里是名字"</td>
</tr>

<tr>

<td class="code">okVal</td>

<td class="code">undefined</td>

<td class="code">String</td>

<td>ok按钮的名称，相当于button 中的name:"这里是名字"</td>

</tr>

<tr>

<td class="code">cancelVal</td>

<td class="code">undefined</td>

<td class="code">String</td>

<td>cancel按钮的名称，相当于button 中的name:"这里是名字"</td>

</tr>

<tr>

<td class="code">beforeRender</td>

<td class="code">function(){}</td>

<td class="code">Function</td>

<td>打开对话框 前调函数</td>

</tr>

<tr>

<td class="code">afterClose</td>

<td class="code">function(){}</td>

<td class="code">Function</td>

<td>关闭对话框 回调函数</td>

</tr>

<tr>

<td class="code">afterRender</td>

<td class="code">function(){}</td>

<td class="code">Function</td>

<td>对话框显示后回调函数，用于比较复杂的对话框，如：绑定事件</td>

</tr>

</tbody>

</table>


## 样式约定
    data-dialog-btn 属性 用于绑定事件， close,ok,cancel 是常用按钮. 以 ' {{close}}, {{ok}}' 等 是 模板字符串.
<pre class="brush: html;">      
        <button class="btn" title="{{close}}" data-dialog-btn="close">×</button>
        <button class="btn" data-dialog-btn="ok">{{ok}}</button>
        <button class="btn" data-dialog-btn="cancel">{{cancel}}</button>
</pre>


##参考示例

### 腾讯对话框


<div class="dialog demo1">
    <div class="autoset">
        <label for="wr_title">自定义标题：</label>
        <input type="text" name="wr_title" id="wr_title" value="删除说说提醒">
        <label for="wr_content">自定义内容：</label>
        <input type="text" name="wr_content" id="wr_content" value="确定删除这条说说内容吗？">
        <label for="st_mask">设置遮罩层：</label>
        <select name="st_mask" id="st_mask">
                    <option value="0">关</option>
                    <option value="1">开</option>
        </select>
    </div>
    <button class="btn click">打开对话框</button>
 </div>

__html模板__

```html
    <div class="qz_dialog_layer"  id="">
        <div id="dialog_main_1" class="qz_dialog_layer_main qz_dialog_btn_bpadding">
            <div class="qz_dialog_custom custom_left" id="dragdrop_1" style="cursor: move;"></div>
            <div class="qz_dialog_custom custom_top" id="dragdrop_2" style="cursor: move;"></div>
            <div id="dialog_head_1" class="qz_dialog_layer_title" style="cursor: move;">
                <h3 id="dialog_title_1">{{title}}</h3> 
                <!-- 这里绑定  标题 -->
                <button id="dialog_button_1" title="关闭" data-dialog-btn="close"   class="qz_dialog_btn_close">
                    <span class="none">╳</span>
                </button>
            </div>
            <div id="dialog_content_1" class="qz_dialog_layer_cont" style="height:140px;">
                <div class="qz_dialog_layer_confirm_content" style="width:260px;"> <i class="qz_dialog_layer_icon qz_dialog_layer_icon_notice"></i>
                    <h3>{{content}}</h3>
                    <!-- 这里绑定 内容 -->
                    <div class="qz_dialog_layer_confirm_content_p"></div>
                    <div class="qz_dialog_layer_confirm_content_p"> <i class=""><i></i></i> 
                    </div>
                </div>
            </div>
            <div class="qz_dialog_layer_ft">
                <div class="qz_dialog_layer_other"></div>
                <div class="qz_dialog_layer_op">
                    <a href="javascript:;" title="点击这里确认" data-dialog-btn="ok" class="qz_dialog_layer_btn qz_dialog_layer_sub">
                        <span>是</span>
                    </a>
                    <!-- data-dialog-btn="ok"  用于绑定事件-->
                    <a href="javascript:;" title="点击这里否决" data-dialog-btn="cancel" class="qz_dialog_layer_btn qz_dialog_layer_nor">
                        <span>否</span>
                    </a>
                    <!-- data-dialog-btn="cancel"  用于绑定事件-->
                </div>
            </div>
        </div>
    </div>
```

### 腾讯提示
<div class="dialog demo2">
    <button class="btn click tc1">成功提示</button>
    <button class="btn click tc2">失败提示</button>
    <button class="btn click tc3">异常提示</button>
    <button class="btn click trigger_tc3">触发异常提示关闭</button>
</div>



## 模版调用说明
{% raw %}
<pre class="brush: js;"  >
        $.dialog('#dialog_temp2',{ // dialog_temp2 为 'script'模板
            title:title,
            content:content,
            mask:mask,
            close:function(){
                this.destroy();
            },
            ok:function(){
                this.destroy();
            },
            cancel:function(){ 
                this.destroy();
            }
        })
         $('#dialog_temp2').dialog({ // dialog_temp2 为 'script'模板
            title:title,
            content:content,
            mask:mask,
            close:function(){
                this.destroy();
            },
            ok:function(){
                this.destroy();
            },
            cancel:function(){ 
                this.destroy();
            }
        });
        var templss = '<p/>{{xxx}}<div/>{{xxx}}';
        $.dialog(templss,{ // templss 为 模板字符串
            title:title,
            content:content,
            mask:mask,
            close:function(){
                this.destroy();
            },
            ok:function(){
                this.destroy();
            },
            cancel:function(){ 
                this.destroy();
            }
        })
</pre>
{% endraw %}

## changelog

 1. ~2013/02/20 : add options afterRender::function
 2.  ~2013/03/06 : add options type::function
 3. ~2014/03/15 : add drag::function and reconstruct this.
 4. ~2014/03/22 : add options position,direction


<script src="{{root_url}} /javascripts/jquery.easing.1.3.js"></script>
<script src="{{root_url}} /javascripts/jquery.mousewheel.js"></script>
<script src="{{root_url}} /ui/mask/jquery.mask.js"></script>
<script src="{{root_url}} /ui/dialog/jquery.dialog.js"></script>

{% raw %}
<script type="text/template" id="dialog_temp1">
    <div class="dialog_test">
        <h3>{{title}}</h3>
        <div>{{content}}</div>
        <button class="btn" data-dialog-btn="wo">{{wo}}</button>
        <button class="btn" data-dialog-btn="ni">{{ni}}</button>
        <button class="btn" data-dialog-btn="close" title="{{close}}">×</button>
        <button class="btn" data-dialog-btn="ok">{{ok}}</button>
        <button class="btn" data-dialog-btn="cancel">{{cancel}}</button>
    </div>
</script>
<script type="text/template" id="dialog_temp2">
    <div class="qz_dialog_layer"  id="" style="width:300px;">
        <div id="dialog_main_1" class="qz_dialog_layer_main qz_dialog_btn_bpadding">
            <div class="qz_dialog_custom custom_left" id="dragdrop_1" style="cursor: move;"></div>
            <div class="qz_dialog_custom custom_top" id="dragdrop_2" style="cursor: move;"></div>
            <div id="dialog_head_1" data-drag="handler" class="qz_dialog_layer_title" style="cursor: move;">
                <h3 id="dialog_title_1">{{title}}</h3>
                <button id="dialog_button_1" title="关闭" data-dialog-btn="close" data-param="{a:'a',b:'b'}" class="qz_dialog_btn_close">
                    <span class="none">╳</span>
                </button>
            </div>
            <div id="dialog_content_1" class="qz_dialog_layer_cont" style="height:140px;">
                <div class="qz_dialog_layer_confirm_content" style="width:260px;">
                    <i class="qz_dialog_layer_icon qz_dialog_layer_icon_notice"></i>
                    <h3>{{content}}</h3>
                    <div class="qz_dialog_layer_confirm_content_p"></div>
                    <div class="qz_dialog_layer_confirm_content_p"> <i class=""><i></i></i> 
                    </div>
                </div>
            </div>
            <div class="qz_dialog_layer_ft">
                <div class="qz_dialog_layer_other"></div>
                <div class="qz_dialog_layer_op">
                    <a href="javascript:;" title="点击这里确认" data-dialog-btn="ok" class="qz_dialog_layer_btn qz_dialog_layer_sub">
                        <span>是</span>
                    </a>
                    <a href="javascript:;" title="点击这里否决" data-dialog-btn="cancel" class="qz_dialog_layer_btn qz_dialog_layer_nor">
                        <span>否</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</script>
<script type="text/template" id="dialog_tips1">
     <div class="gb_tip_layer">
        <span class="gtl_ico_succ"></span><span>{{content}}</span><span class="gtl_end"></span>
     </div>

</script>

<script type="text/template" id="dialog_tips2">
 <div class="gb_tip_layer">
    <span class="gtl_ico_fail"></span><span>{{content}}</span><span class="gtl_end"></span>
 </div>
</script>
<script type="text/template" id="dialog_tips3">
 <div  class="gb_tip_layer">
    <span class="gtl_ico_hits"></span><span>{{content}}</span><span class="gtl_end"></span>
 </div>
</script>
<script type="text/template" id="right-buttom-tips">
<div style="z-index: 600; right: 0px; bottom: 0px; height: 28px; width: 210px; overflow: hidden; position: fixed;" id="PcPoPmarket">
    <div style="z-index:600;position: absolute;right:0;width:50px;height:30px;overflow:hidden;background:transparent;">
        <span title="关闭" style="background:url(http://www1.pcauto.com.cn/indexwindow/2012/images/buttons.png) no-repeat -28px 0;cursor:pointer;float:right;clear:none;width:13px;height:13px;margin:8px 10px 0 0;" data-dialog-btn="close" ></span>
        <span title="展开" style="cursor: pointer; float: right; width: 13px; height: 13px; overflow: hidden; clear: none; display: block; margin: 8px 13px 0px 0px; background: url(http://www1.pcauto.com.cn/indexwindow/2012/images/buttons.png) 0px 0px no-repeat;" data-dialog-btn="unfold"  id="showvod"></span>
        <span title="缩小" style="cursor: pointer; float: right; overflow: hidden; width: 13px; height: 13px; clear: none; margin: 8px 13px 0px 0px; display: none; background: url(http://www1.pcauto.com.cn/indexwindow/2012/images/buttons.png) -14px 0px no-repeat;" data-dialog-btn="fold" id="hidevod"></span>
    </div>
    <iframe scrolling="no" frameborder="0" allowtransparency="true" width="350" height="230" id="tmpAreaLmtDivIframe" src="http://www.pcauto.com.cn/qcbj/open/gz/index.html">-</iframe>
    <iframe frameborder="no" border="0" src="about:blank" style="position:absolute; visibility:inherit; top:0px; left:0px; width:100%; height:100%; z-index:-1; filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';"></iframe>
</div>
</script>
{% endraw %}
<script src="{{root_url}} /ui/dialog/demo.js"></script>

