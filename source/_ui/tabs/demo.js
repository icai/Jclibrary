$(function(){
    $('.demo1').tabs({
        addClass:'current',
        trigger:'click',
        index: 0,
        handleClass:null,
        handleBox:'.tab_menu',  
        panelBox:'.tab_box',
        panelClass:null
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
        index: 2,
        handleClass:null,
        handleBox:'.tab_menu',  
        panelBox:'.tab_box',
        panelClass:null,
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
}); 