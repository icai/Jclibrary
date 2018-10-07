---
layout: docs
comments: true
title: Tabs
keywords: tabs, jquery, plugin
---

<link rel="stylesheet" href="{{root_url}}/ui/tabs/css/tabs.css">

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

<td class="code">addClass</td>

<td class="code">'current'</td>

<td class="code">String</td>

<td>

tab触发事件时，添加的className

</td>

</tr>

<tr>

<td class="code">trigger</td>

<td class="code">'click'</td>

<td class="code">String</td>

<td>

触发事件，可选值：'mouseover'

</td>

</tr>

<tr>

<td class="code">handleBox</td>

<td class="code">'.Jc_handlebox'</td>

<td class="code">String[selector]</td>

<td>handle Box</td>

</tr>

<tr>

<td class="code">handleClass</td>

<td class="code">'.Jc_handle'</td>

<td class="code">String[selector]</td>

<td>

handle Class

</td>

</tr>

<tr>

<td class="code">panelBox</td>

<td class="code">'.Jc_panelbox'</td>

<td class="code">String[selector]</td>

<td>

panel Box

</td>

</tr>

<tr>

<td class="code">panelClass</td>

<td class="code">'.Jc_panel'</td>

<td class="code">String[selector]</td>

<td>panelClass</td>

</tr>

<tr>

<td class="code">callback</td>

<td class="code">null</td>

<td class="code">Function</td>

<td>回调函数</td>

</tr>

<tr>

<td class="code">content</td>

<td class="code">null</td>

<td class="code">Function</td>

<td>动态设置::func</td>

</tr>

</tbody>

</table>

## 参考示例

<ul class="tabdemo clearfix">
    <li>
        <h3>默认状态</h3>
        <div class="box demo1">
            <ul class="tab_menu">
                <li class="current">新闻</li>
                <li>图片</li>
                <li>军事</li>
            </ul>
            <div class="tab_box">
                <div>新闻</div>
                <div class="hide">图片</div>
                <div class="hide">军事</div>
            </div>
        </div>      
    </li>
    <li>
    <h3>鼠标划过</h3>
    <div class="box demo2">
        <ul class="tab_menu">
            <li class="current">新闻</li>
            <li>图片</li>
            <li>军事</li>
        </ul>
        <div class="tab_box">
            <div>新闻</div>
            <div class="hide">图片</div>
            <div class="hide">军事</div>
        </div>
    </div>      
    </li>
    <li>
        <h3>index == 2 </h3>
        <div class="box demo3">
            <ul class="tab_menu">
                <li class="current">新闻</li>
                <li>图片</li>
                <li>军事</li>
            </ul>
            <div class="tab_box">
                <div>新闻</div>
                <div class="hide">图片</div>
                <div class="hide">军事</div>
            </div>
        </div>
    </li>
    <li>
        <h3>回调函数</h3>
        <div class="box demo4">
            <ul class="tab_menu">
                <li class="current">新闻</li>
                <li>图片</li>
                <li>军事</li>
            </ul>
            <div class="tab_box">
                <div>新闻</div>
                <div class="hide">图片</div>
                <div class="hide">军事</div>
            </div>
        </div>
    </li>   
</ul>


## 示例代码

<pre class="brush: js;">    
    $('.demo1').tabs({
        addClass:'current',
        trigger:'click',
        index: 0,
        handleClass:null,
        handleBox:'.tab_menu',  
        panelBox:'.tab_box',
        panelClass:null,
    });

    $('.demo2').tabs({
        addClass:'current',
        trigger:'mouseover',
        index: 0,
        handleClass:null,
        handleBox:'.tab_menu',  
        panelBox:'.tab_box',
        panelClass:null
    });

    $('.demo3').tabs({
        addClass:'current',
        trigger:'click',
        index: 0,
        handleClass:null,
        handleBox:'.tab_menu',  
        panelBox:'.tab_box',
        panelClass:null
    });

    $('.demo4').tabs({
        addClass:'current',
        trigger:'click',
        index: 0,
        handleClass:null,
        handleBox:'.tab_menu',  
        panelBox:'.tab_box',
        panelClass:null,
        callback:function(index){
            alert(arguments);
        }
    });
</pre>
<script src="{{root_url}} /ui/tabs/jquery.tabs.js"></script>
<script src="{{root_url}} /ui/tabs/demo.js"></script>