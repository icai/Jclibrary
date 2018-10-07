---
layout: docs
comments: true
title: Tooltip
keywords: tooltip, jquery, plugin
---


<link rel="stylesheet" href="{{root_url}}/ui/tooltip/css/tooltip.css">


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
<td class="code">template</td>
<td class="code">undefined</td>
<td class="code">String</td>
<td>tip 层 模版 ，可以是 String 常量，也可以是 script 标签的id(#abcd),className(不推荐)，其他选择器</td>
</tr>
<tr>
<td class="code">content</td>
<td class="code">null</td>
<td class="code">String,Function</td>
<td>
当值设定为 String 时，则清空 [ data-tooltip="content" ] 内容区，并插入当前值，
当值设定为 Function 时，实现动态插入，调用this.insertContent()
<pre>        
content:function(){
        var cnt = ' 1234';
        var fn = this;
          setTimeout(function(){
              fn.insertContent(cnt);
          },2000)
        }
</pre>
</td>
</tr>
<tr>
<td class="code">loading</td>
<td class="code">null</td>
<td class="code">String,Boolean</td>
<td>
当值设定为true 时，实现动态加载，并在内容区设定 [ data-tooltip="content" ]，和参数 'content'相互关联。

默认loading模版： <p class="defalut_tooltip_loading">loading....</p>
当值设定为 String 时，则覆盖默认的loading模版
</td>
</tr>
<tr>
<td class="code">trigger</td>
<td class="code">'hover'</td>
<td class="code">String</td>
<td>可选参数：‘click’</td>
</tr>
<tr>
<td class="code">selector</td>
<td class="code">false</td>
<td class="code">Boolean</td>
<td>selector 不等于false时，实现动态绑定：
// 动态  
$(elem).tooltip({   
selecotr:'.XXXX'  
})

//方法原理：  
$(elem).on(event,selector,function(){ // elem 静态元素  
// selector 动态元素  
})
</td>
</tr>
<tr>
<td class="code">visible</td>
<td class="code">false</td>
<td class="code">Boolean</td>
<td>当值设定为 true 时，鼠标能在tip层上停留，和参数 'trigger'相互关联</td>
</tr>
<tr>
<td class="code">timeout</td>
<td class="code">0</td>
<td class="code">Number</td>
<td>不可用</td>
</tr>
<tr>
<td class="code">zIndex</td>
<td class="code">1990</td>
<td class="code">Number</td>
<td>设定tip层的z-index 值</td>
</tr>
<tr>
<td class="code">position</td>
<td class="code">'auto'</td>
<td class="code">String</td>
<td>和参数 'center'相互关联，参考[方向说明](#pic_1)图</td>
</tr>
<tr>
<td class="code">center</td>
<td class="code">false</td>
<td class="code">Boolean</td>
<td>和参数 'position'相互关联，参考[方向说明](#pic_1)图</td>
</tr>
<tr>
<td class="code">appendTo</td>
<td class="code">'body'</td>
<td class="code">String</td>
<td>可选参数：‘after’，设置tip dom 元素追加到 body 或者 目标元素之后</td>
</tr>
<tr>
<td class="code">offset</td>
<td class="code">30</td>
<td class="code">Number</td>
<td>tip偏移微调，校正箭头对准目标元素</td>
</tr>
<tr>
<td class="code">arrowSize</td>
<td class="code">6</td>
<td class="code">Number</td>
<td>箭头的宽度或者高度，当箭头绝对定位于在tip 层外面（代码），不适用于最外层包裹（padding）</td>
</tr>
<tr>
<td class="code">close</td>
<td class="code">false</td>
<td class="code">Boolean</td>
<td>关闭按钮，事件绑定[ data-tooltip="close" ]</td>
</tr>
<tr>
<td class="code">callback</td>
<td class="code">function(){}</td>
<td class="code">Function</td>
<td>回调函数</td>
</tr>
</tbody>
</table>

## 默认参数

<pre class="brush: js;">       
     // 默认参数
    $.tooltip.defaults = {
      template: undefined,
      content: null,
      loading:null,
      trigger:'hover', // hover click
      selector:false,
      visible:false, // when  the mouse leave the target , over the tips ,tips is visible ?
      timeout: 0,
      zIndex: 1990,
      position:"auto",  // auto left top right bottom
      appendTo:'body',
      offset:30,
      arrowSize:6,
      close: false, // close btn
      center:false,
      callback: function() {}
    };
</pre>

## 定位说明

![方向说明](images/trigger.png)

##参考实例

<table  class="classtable" cellspacing="0" >
      <tr>
        <td style="width:33.3%;">
          <span class="dynamic_demo1">示例1</span>

          <pre class="brush:js">


            $('.dynamic_demo1').tooltip({
              template:itourstyle,
              offset:40,
              visible:true
            });
            // 屏幕缩放 位置只适应
          </pre>  

        </td>
        <td style="width:33.3%;" >

          <span class="dynamic_demo2">示例2</span>

          <pre class="brush:js">
            $('.dynamic_demo2').tooltip({
              template: vancltempl,
              offset:40,
              visible:true,
              position:'bottomRight'
            });
          </pre> 
        </td>
        <td style="width:33.4%;">
          <span class="dynamic_demo3">示例3</span>
          <pre class="brush:js">
            $('.dynamic_demo3').tooltip({
              template:Qzonestyle,
              offset:40,
              visible:true,
              position:'rightBottom'
            });
          </pre> 
        </td>
      </tr>
      <tr>
        <td>
          <span class="dynamic_demo4">示例4</span>
          <pre class="brush:js">
            $('.dynamic_demo4').tooltip({
              template:Qzonestyle,
              offset:40,
              visible:true,
              position:'bottomLeft'
            });
          </pre> 
        </td>
        <td>
          <span class="dynamic_demo5">示例5</span>
          <pre class="brush:js">
            $('.dynamic_demo5').tooltip({
              template:douban,
              offset:28,
              visible:true,
              position:'rightBottom'
            });
          </pre> 
        </td>
        <td>

          <div class="hotel_pic">
             
             <img width="130" height="130" name="hotelpic"  class="dynamic_demo6" alt="惠州龙门南昆山温泉大观园" src="http://images4.c-ctrip.com/target/hotel/68000/67286/B315F7A9-B1AB-4765-AD61-9FC2D48DCCB0_130_130.jpg">
          </div>
          <span>示例6</span>
          <pre class="brush:js">
            $('.dynamic_demo6').tooltip({
              template:hotelstyle,
              offset:40,
              visible:true,
              position:'topLeft',
              appendTo:'after'
            });
          </pre> 
        </td>
      </tr>
      <tr>
        <td>
          <span class="dynamic_demo7">示例7</span>
          <pre class="brush:js">
            $('.dynamic_demo7').tooltip({
              template:vancltempl,
              offset:30,
              position:'leftTop'
            });
          </pre> 
        </td>
        <td>
          <span class="dynamic_demo8">示例8</span>
          <pre class="brush:js">
            $('.dynamic_demo8').tooltip({
              template:vancltempl,
              offset:30,
              position:'topRight'
            });
          </pre>
        </td>
        <td>
          <span class="dynamic_demo9">示例9</span>
          <pre class="brush:js">
              $('.dynamic_demo9').tooltip({
                template:vancltempl,
                offset:30,
                position:'rightTop'
              });  
          </pre>
        </td>
      </tr>

      <tr>
        <td>
          <span class="dynamic_demo10">示例10：异步加载</span>
          <pre class="brush:js">
           // 显示 loading 
           // 并异步加载（ajax 请求）
           // data-tooltip="content"  
           // 属性为内容区 (必须)。

          var douban2 = '<div class="detail-tip shadow-right" style="left: 835px; top: 399px;"><div class="" data-tooltip="content" ></div><span class="arrow-left"></span></div>';

            $('.dynamic_demo10').tooltip({
              template:douban2,
              offset:30,
              loading:true,
              visible:true,
              position:'rightBottom',
              content:function(){

                var cnt = '&lt;h2>荒潮</h2><p class="color-gray">陈楸帆 / 2013-1 / 长江文艺出版社 / 24.80元 / 平装</p><p>如果并非只有人类拥有灵魂？如果并非只有生物才能进化？如果我们的未来必须穿过地狱之门？进步浪潮席卷之处，人的灵魂一片荒芜。故事发生在近未来的硅屿——一座被进步浪潮抛弃的垃圾之岛，对生态灾难习以为常的麻木岛民迎来了不可预知的变化：宣称要用环保技术造福硅屿的外来资本精英；在底层苦苦挣扎沉湎于电子毒品的垃圾少女；为拯救受未知病毒感染的爱子而不惜代...</p>';

                var fn = this;
                setTimeout(function(){


                  fn.insertContent(cnt); 
                  // 异步 否则直接 return
                },2000)
              }
          </pre> 
        </td>
        <td>
          <span class="dynamic_demo11">示例11</span>
          <pre class="brush:js">
            
          </pre>
        </td>
        <td>
          <span class="dynamic_demo12">示例12</span>
          <pre class="brush:js">

          </pre>
        </td>
      </tr>
  </table>

## 动态加载

<pre class="brush:js">      selector：false;// 默认值
      $(elem).tooltip({ // 默认 非动态

      })
      $(elem).on(event,function(){ // elem 静态元素
      })
      // 动态
      $(elem).tooltip({ 
        selecotr:'.XXXX'
      })
      //方法原理：
      $(elem).on(event,selector,function(){ // elem 静态元素
      // selector 动态元素
      })
</pre>



<script src="{{root_url}} /ui/tooltip/jquery.tooltip.js"></script>
<script src="{{root_url}} /ui/tooltip/demo.js"></script>