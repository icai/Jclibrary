---
layout: docs
comments: true
title: Slides
keywords: slides, jquery, plugin
---


<link rel="stylesheet" href="{{root_url}}/ui/slides/css/slides.css">

##参数设置
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
            <td class="code">container</td>
            <td class="code">'.slides-container'</td>
            <td class="code">String</td>
            <td>
                <p>slides 的 Dom容器<span class="code"></span>，设置</p>
            </td>
        </tr>
        <tr>
            <td class="code">btnNext</td>
            <td class="code">null</td>
            <td class="code">String</td>
            <td>
                <p>下一个，导航按钮（jquery selector）</p>
            </td>
        </tr>
        <tr>
            <td class="code">btnPrev</td>
            <td class="code">null</td>
            <td class="code">String</td>
            <td>
                <p>上一个，导航按钮（jquery selector）</p>
            </td>
        </tr>
        <tr>
            <td class="code">paginationClass</td>
            <td class="code">null</td>
            <td class="code">String</td>
            <td>pagination parent Class</td>
        </tr>
        <tr>
            <td class="code">current</td>
            <td class="code">'current'</td>
            <td class="code">String</td>
            <td>当前页，导航按钮高亮className，</td>
        </tr>
        <tr>
            <td class="code">circular</td>
            <td class="code">false</td>
            <td class="code">Boolean</td>
            <td>
                <p>循环滚动</p>
            </td>
        </tr>
        <tr>
            <td class="code">effect</td>
            <td class="code">'default'</td>
            <td class="code">String</td>
            <td>
                <p>滑动效果，[none, default ,fade , easing:easeOutExpo ,easing:easeOutSine , ...]</p>
                <p>'none':没有切换效果,</p>
                <p>'default':默认切换效果,</p>
                <p>'fade':淡进淡出,</p>
                <p>'easing:easeOutExpo':easing 库效果，需要加载jquery.easing.js</p>
                <p>&nbsp;</p>
            </td>
        </tr>
        <tr>
            <td class="code">vertical</td>
            <td class="code">false</td>
            <td class="code">Boolean</td>
            <td>滑动的方向，默认水平方向</td>
        </tr>
        <tr>
            <td class="code">visible</td>
            <td class="code">1</td>
            <td class="code">Number</td>
            <td>可视个数</td>
        </tr>
        <tr>
            <td class="code">scroll</td>
            <td class="code">1</td>
            <td class="code">Number</td>
            <td>滚动个数
                <a href="#button_desc" class="red"></a>
            </td>
        </tr>
        <tr>
            <td class="code">fadeSpeed</td>
            <td class="code">500</td>
            <td class="code">Number</td>
            <td>淡入淡出速度</td>
        </tr>
        <tr>
            <td class="code">slideSpeed</td>
            <td class="code">350</td>
            <td class="code">Number</td>
            <td>滑动速度
                <a href="#button_desc" class="red"></a>
            </td>
        </tr>
        <tr>
            <td class="code">play</td>
            <td class="code">0</td>
            <td class="code">Number</td>
            <td>自动轮播必须设定,间隔毫秒</td>
        </tr>
        <tr>
            <td class="code">pause</td>
            <td class="code">0</td>
            <td class="code">Number</td>
            <td>自动轮播必须设定，轮播划过，移开暂停多少毫秒继续轮播</td>
        </tr>
        <tr>
            <td class="code">hoverPause</td>
            <td class="code">false</td>
            <td class="code">Boolean</td>
            <td>划过暂停</td>
        </tr>
        <tr>
            <td class="code">paginationEvent</td>
            <td class="code">&quot;click&quot;</td>
            <td class="code">String</td>
            <td>页面按钮导航事件，可选'hover'</td>
        </tr>
        <tr>
            <td class="code">start</td>
            <td class="code">1</td>
            <td class="code">Number</td>
            <td>初始化状态，默认第一个开始，静态样式应该同步，否则可能会出错</td>
        </tr>
        <tr>
            <td class="code">mouseWheel</td>
            <td class="code">false</td>
            <td class="code">Boolean</td>
            <td>鼠标滚动事件</td>
        </tr>
    </tbody>
</table>
##默认参数
<pre class="brush: js;">
    // default opts
    $.slider.defaults = {
        container: '.slides-container',
        btnNext: "", // Next button
        btnPrev: "", // Next button
        paginationClass: "",  // page button
        current:'current', 
        circular:false,
        effect:'default', // none|| default|| fade || easing:easeOutExpo || easing:easeOutSine || ...
        vertical:false, // default horizontal
        visible: 1, // visible count
        scroll:1, //  scroll count
        fadeSpeed: 500, // fade speed
        slideSpeed: 350,  // slide speed
        play: 0,  // duration time
        pause: 0, // pause time

        hoverPause: true, // haover pause
        mouseWheel: false, // action mouse wheel

        paginationEvent:'click', // pagination event
        start: 1, // start on el eq()
        // preload: false, 
        // preloadImage: '/img/loading.gif',    
        // autoHeight: false, 
        // autoHeightSpeed: 350, 
        before: function() {},
        callback: function() {}
    };
</pre>
##样式约定
<pre class="brush: html;">
    <div class="slider-outer">
        <div class="slider-container"> <!-- position:relative;overflow:hidden; -->
            <ul class="slider-list" style=""> <!-- position:absolute; -->
              <li><a href="#"><img src="images/buttom_0.jpg"></a></li>
              <li><a href="#"><img src="images/buttom_1.jpg"></a></li>
              <li><a href="#"><img src="images/buttom_2.jpg"></a></li>
              <li><a href="3"><img src="images/buttom_3.jpg"></a></li>
            </ul>
            <ul class="num">  <!-- Pagination -->
              <li class="on"><a href="" title="">1</a></li>
              <li class=""><a href="" title="">2</a></li>
              <li class=""><a href="" title="">3</a></li>
              <li class=""><a href="" title="">4</a></li>
            </ul>
         </div>
         <a href="javascript:;" class="next"></a>
         <a href="javascript:;" class="prev"></a>
    </div>
</pre>

##参考示例


<h3>无效果</h3>
<div class="slider-outer demo0">
    <div class="slider-container">
        <ul class="slider-list" style="">
            <li>
                <a href="#"><img src="images/buttom_0.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_1.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_2.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_3.jpg"></a>
            </li>
        </ul>
        <ul class="num">
            <li class="on"><a href="javascript:;" title="">1</a></li>
            <li class=""><a href="javascript:;" title="">2</a></li>
            <li class=""><a href="javascript:;" title="">3</a></li>
            <li class=""><a href="javascript:;" title="">4</a></li>
        </ul>
    </div>
</div>

<pre class="brush: js;">
$('.demo0').slider({
    container: '.slider-container',
    btnNext: '.next', 
    btnPrev: '.prev',
    paginationClass: '.num', 
    paginationEvent:"mouseover", // page 按钮 事件
    current:'on', //
    effect:'none', 
    play: 1000,  
    pause: 500,
    hoverPause: true// 划过是否停止
});
</pre>

<h3>默认状态</h3>
<div class="slider-outer demo1">
    <div class="slider-container">
        <ul class="slider-list" style="">
            <li>
                <a href="#"><img src="images/buttom_0.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_1.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_2.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_3.jpg"></a>
            </li>
        </ul>
        <ul class="num">
            <li class="on"><a href="javascript:;" title="">1</a></li>
            <li class=""><a href="javascript:;" title="">2</a></li>
            <li class=""><a href="javascript:;" title="">3</a></li>
            <li class=""><a href="javascript:;" title="">4</a></li>
        </ul>
    </div>
</div>

<pre class="brush: js;">
$('.demo1').slider({
    container: '.slider-container',
    btnNext: '.next', 
    btnPrev: '.prev',
    paginationClass: '.num', 
    current:'on', // 
    play: 1000,  
    pause: 500,
    hoverPause: true // 划过是否停止
});
</pre>

<h3>淡入</h3>
<div class="slider-outer demo2">
    <div class="slider-container">
        <ul class="slider-list" style="">
            <li>
                <a href="#"><img src="images/buttom_0.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_1.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_2.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_3.jpg"></a>
            </li>
        </ul>
        <ul class="num">
            <li class="on"><a href="javascript:;" title="">1</a></li>
            <li class=""><a href="javascript:;" title="">2</a></li>
            <li class=""><a href="javascript:;" title="">3</a></li>
            <li class=""><a href="javascript:;" title="">4</a></li>
        </ul>
    </div>
</div>
<pre class="brush: js;">
$('.demo2').slider({
    container: '.slider-container',
    btnNext: '.next', 
    btnPrev: '.prev',
    paginationClass: '.num', 
    current:'on', // 
    effect:'fade'
});
</pre>

<h3>有导航 next prev</h3>
<div class="slider-outer demo3">
    <div class="slider-container">
        <ul class="slider-list" style="">
            <li>
                <a href="#"><img src="images/buttom_0.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_1.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_2.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_3.jpg"></a>
            </li>
        </ul>
        <ul class="num">
            <li class="on"><a href="javascript:;" title="">1</a></li>
            <li class=""><a href="javascript:;" title="">2</a></li>
            <li class=""><a href="javascript:;" title="">3</a></li>
            <li class=""><a href="javascript:;" title="">4</a></li>
        </ul>
    </div>
    <a href="javascript:;" class="prev">&lt;</a>
    <a href="javascript:;" class="next">&gt;</a>
</div>

<pre class="brush: js;">
$('.demo3').slider({
    container: '.slider-container',
    btnNext: '.next', 
    btnPrev: '.prev',
    paginationClass: '.num', 
    current:'on'
});
</pre>


<h3>垂直</h3>
<div class="slider-outer demo4">
    <div class="slider-container">
        <ul class="slider-list" style="">
            <li>
                <a href="#"><img src="images/buttom_0.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_1.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_2.jpg"></a>
            </li>
            <li>
                <a href="#"><img src="images/buttom_3.jpg"></a>
            </li>
        </ul>
        <ul class="num">
            <li class="on"><a href="javascript:;" title="">1</a></li>
            <li class=""><a href="javascript:;" title="">2</a></li>
            <li class=""><a href="javascript:;" title="">3</a></li>
            <li class=""><a href="javascript:;" title="">4</a></li>
        </ul>
    </div>
    <a href="javascript:;" class="prev">&lt;</a>
    <a href="javascript:;" class="next">&gt;</a>
</div>
<pre class="brush: js;">
$('.demo4').slider({
    container: '.slider-container',
    btnNext: '.next', 
    btnPrev: '.prev',
    vertical:true,
    paginationClass: '.num', 
    current:'on' // 
});
 </pre>

<h3>多图，effect:'easing:easeInOutBack'，无页按钮，循环滚动（长度:9,visible: 3, 
    scroll:1）</h3>
<div class="slider-outer demo5">
    <div class="slider-container">
        <div class="slide-show">
            <ul class="slider-list" style="">
                <li>
                    <a href="#"><img src="images/buttom_0.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_1.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_2.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_3.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_4.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_5.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_6.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_7.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_8.jpg"></a>
                </li>
            </ul>
        </div>
    </div>
    <a href="javascript:;" class="prev">&lt;</a>
    <a href="javascript:;" class="next">&gt;</a>
</div>

<pre class="brush: js;">
$('.demo5').slider({
    container: '.slider-container',
    btnNext: '.next', 
    btnPrev: '.prev',
    effect:'easing:easeInOutBack',
    visible: 3, // 显示多少个
    scroll:1, // 滚动个数
    circular：true
});
</pre>


<h3>多图,有页按钮，循环滚动（长度:9,visible: 3, 
    scroll:3）</h3>
<div class="slider-outer demo6">
    <div class="slider-container">
        <div class="slide-show">
            <ul class="slider-list">
                <li>
                    <a href="#"><img src="images/buttom_0.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_1.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_2.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_3.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_4.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_5.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_6.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_7.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_8.jpg"></a>
                </li>
            </ul>
        </div>
         <ul class="num">
            <li class="on"><a href="javascript:;" title="">1</a></li>
            <li class=""><a href="javascript:;" title="">2</a></li>
            <li class=""><a href="javascript:;" title="">3</a></li>
        </ul>
    </div>
    <a href="javascript:;" class="prev">&lt;</a>
    <a href="javascript:;" class="next">&gt;</a>
</div>
<pre class="brush: js;">
    $('.demo6').slider({
        container: '.slider-container',
        btnNext: '.next', 
        btnPrev: '.prev',
        paginationClass: '.num', 
        current:'on', 
        visible: 3, // 显示多少个
        scroll:3, // 滚动个数
        circular：true
    });
</pre>
<h3>多图,无页按钮，循环滚动,鼠标滚动（长度:9,visible: 3, 
    scroll:2,mouseWheel:true）</h3>
<div class="slider-outer demo7">
    <div class="slider-container">
        <div class="slide-show">
            <ul class="slider-list">
                <li>
                    <a href="#"><img src="images/buttom_0.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_1.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_2.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_3.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_4.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_5.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_6.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_7.jpg"></a>
                </li>
                <li>
                    <a href="#"><img src="images/buttom_8.jpg"></a>
                </li>
            </ul>
        </div>
    </div>
    <a href="javascript:;" class="prev">&lt;</a>
    <a href="javascript:;" class="next">&gt;</a>
</div>
<pre class="brush: js;">   
    $('.demo7').slider({
        container: '.slider-container',
        btnNext: '.next', 
        btnPrev: '.prev',
        //paginationClass: '.num', 
        //current:'on', 
        visible: 3, // 显示多少个
        scroll:3, // 滚动个数
        circular：true,
        mouseWheel:true
    });
</pre>


##Changelog

* ~2013/01/08 : init commit
* ~2013/04/02 : reconstruct the code
* ~2014/05/01:support mouseWheel, optimize effect: none/fade implementation


<script src="{{root_url}} /javascripts/jquery.easing.1.3.js"></script>
<script src="{{root_url}} /javascripts/jquery.mousewheel.js"></script>
<script src="{{root_url}} /ui/slides/jquery.slides.js"></script>
<script src="{{root_url}} /ui/slides/demo.js"></script>