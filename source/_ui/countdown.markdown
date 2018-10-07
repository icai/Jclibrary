---
layout: docs
comments: true
title: Countdown
keywords: countdown, jquery, plugin
---



##参数说明

<table class="classtable" cellspacing="0">
<thead>
<tr>
<th width="14%">变量/函数</th>
<th width="13%">默认值</th>
<th width="14%">类型</th>
<th width="59%">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td class="code">startTime</td>
<td class="code">new Date()</td>
<td class="code">String,Date</td>
<td>
当设置开始值的时候，结果就是时间差，请同时设置refresh为0，字符串必须符合w3c时间标准 new Date（‘str’）
</td>
</tr>
<tr>
<td class="code" height="29">endTime</td>
<td class="code"></td>
<td class="code">String,Date</td>
<td>
结束时间，字符串必须符合w3c时间标准 new Date（‘str’）
</td>
</tr>
<tr>
<td class="code">refresh</td>
<td class="code">1000</td>
<td class="code">Number</td>
<td>当值设置为0的时候，函数内部调用setTimeout</td>
</tr>
<tr>
<td class="code">template</td>
<td class="code">{h}:{m}:{s}.{x}</td>
<td class="code">String</td>
<td>
<pre>
{  
'Y'： '年',   
'M' : '月',  
'd' : '日',  
'h' : '时',  
'm' : '分',  
's' : '秒',  
'X' : '毫秒',  
'x' : '毫秒' // 除以100  
}   
</pre>
</td>
</tr>
<tr>
<td class="code">hasMonth</td>
<td class="code">false</td>
<td class="code">Boolean</td>
<td>
设置出现最大时间单位为天，否则设为true
</td>
</tr>
<tr>
<td class="code">onRender</td>
<td class="code">undefiend</td>
<td class="code">Function</td>
<td>
渲染时调用：
<pre> 
if(this.setting.onRender && this.setting.onRender.call(this,data) == false){  
    return false;  
}
</pre>

</td>
</tr>
<tr>
<td class="code">onEnd</td>
<td class="code">undefiend</td>
<td class="code">Function</td>
<td>
 结束时调用：
<pre>
    if(this.endFlag && this.setting.onEnd && this.setting.onEnd.call(this,data) == false){  
        return false;  
    }   
</pre>
</td>
</tr>
</tbody>
</table>


##参考示例

<div class="demo_box">
  <div id="timer_1"></div>
  <div id="timer_2"></div>
</div>

## 示例代码

<pre class="brush: js;">  
$('#timer_1').countDown({
    endTime:"2013/9/2",
    refresh:100,
    template:'{d}d\' {h}:{m}:{s}.{x}',
    onEnd:function(){
      this.container.html('过期了');
      return false;
    }
  })
</pre>




<script src="{{root_url}} /ui/countdown/jquery.countdown.js"></script>
<script src="{{root_url}} /ui/countdown/demo.js"></script>