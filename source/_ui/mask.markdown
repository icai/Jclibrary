---
layout: docs
comments: true
title: Mask
keywords: mask, jquery, plugin
---
<link rel="stylesheet" href="{{root_url}}/ui/mask/css/mask.css">

##参考示例

<select id="" name=""><option value="0">iebug</option> <option value="1">ie6</option> <option value="2">ie7</option> <option value="3">ie8</option></select>


### 默认状态（打开）
<button class="btn demo0">默认状态开</button>
<pre class="brush: js;">                
$.mask();
</pre>

### 默认状态（关闭）
<button class="btn demo1">默认状态关</button>
<pre class="brush: js;">               
 $.unmask();
</pre>

### 设置样式参数

<button class="btn demo2">设置样式</button>
<pre class="brush: js;">                
    $.mask({
        background:"#2932E1",
        zIndex:9999,
        opacity:0.7
    });
</pre>

### 直接删除
<button class="btn demo3">直接删除</button>
<pre class="brush: js;">                
$.unmask("fast");
</pre>

### 删除动画过渡时间
<button class="btn demo4">删除动画</button>
<pre class="brush: js;">               
$.unmask(2000);
</pre>

### 删除所有遮罩层
<button class="btn demo5">删除所有</button>
<pre class="brush: js;">               
 $.unmask(true,2000); // 第一个参数设置成 true
</pre>

### mask 函数 before,callback

<button class="btn demo6">mask函数</button>
<pre class="brush: js;">                
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
</pre>

### unmask 函数

<pre class="brush: js;">                
    $.mask(function(){
    });
</pre>


## 参数及其说明

<pre class="brush: js;">
    $.extend({

        /**
         * mask 生成遮罩层
         * @param  {[Object]} optss [description]
         * @return {[type]}       [description]
         */
        mask:function(optss){

            // ...
        },
        /**
         * unmask:: 删除 遮罩层
         * 
         * @arguments  {[Boolean]} a [description]
         * @param  {[Boolean]} b [description]
         * 
         */
        unmask:function(a,b){ // (ture,300);

           // ...

        }

        // default optss
        $.mask.defaults = {
            background:"#000",
            zIndex:9999,
            opacity:0.5,
            before: function(a) {},
            callback: function(a) {}
        };

    })
</pre>

<script src="{{root_url}} /ui/mask/jquery.mask.js"></script>
<script src="{{root_url}} /ui/mask/demo.js"></script>