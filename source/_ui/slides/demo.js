jQuery(function($) {
    $('.demo0').slider({
        container: '.slider-container',
        btnNext: '.next',
        btnPrev: '.prev',
        paginationClass: '.num',
        paginationEvent: "mouseenter",
        current: 'on', //
        effect: 'none',
        play: 1000,
        pause: 500,
        hoverPause: true // 划过是否停止
    });
    $('.demo1').slider({
        container: '.slider-container',
        btnNext: '.next',
        btnPrev: '.prev',
        paginationClass: '.num',
        slideSpeed: 200,
        current: 'on', // 
        play: 0,
        pause: 0,
        hoverPause: true // 划过是否停止
    });

    $('.demo2').slider({
        container: '.slider-container',
        btnNext: '.next',
        btnPrev: '.prev',
        paginationClass: '.num',
        paginationEvent: "mouseenter",
        current: 'on', // 
        effect: 'fade'
    });
    $('.demo3').slider({
        container: '.slider-container',
        btnNext: '.next',
        btnPrev: '.prev',
        paginationClass: '.num',
        current: 'on'
    });

    $('.demo4').slider({
        container: '.slider-container',
        btnNext: '.next',
        btnPrev: '.prev',
        vertical: true,
        paginationClass: '.num',
        current: 'on' // 
    });


    $('.demo5').slider({
        container: '.slider-container',
        btnNext: '.next',
        btnPrev: '.prev',
        effect: 'easing:easeInOutBack',
        visible: 3, // 显示多少个
        scroll: 1, // 滚动个数
        circular: true
    });

    $('.demo6').slider({
        container: '.slider-container',
        btnNext: '.next',
        btnPrev: '.prev',
        paginationClass: '.num',
        paginationEvent: "hover",
        current: 'on',
        visible: 3, // 显示多少个
        scroll: 3, // 滚动个数
        circular: true
    });

    $('.demo7').slider({
        container: '.slider-container',
        btnNext: '.next',
        btnPrev: '.prev',
        paginationClass: '.num',
        current: 'on',
        visible: 3, // 显示多少个
        scroll: 2, // 滚动个数
        circular: true,
        mouseWheel: true
    });
});