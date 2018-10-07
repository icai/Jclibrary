$(function(){
     $('#right-buttom-tips').dialog({
        drag:false,
        position:["0","0"],
        direction:["right","buttom"],
        button:[
            {caption:"close",callback:function(){
                this.destroy()
            }},
            {caption:"unfold", callback:function(){
                $(this.getDom()).css({
                    height: '230px',
                    width: '350px'
                });
                this.getButton({caption:'unfold'}).hide();
                this.getButton({caption:'fold'}).show();
                this.setPositionOffset();
            }},
            {caption:"fold", callback:function(){
                $(this.getDom()).css({
                    height: '28px',
                    width: '210px'
                })
                this.getButton({caption:'fold'}).hide();
                this.getButton({caption:'unfold'}).show();
                this.setPositionOffset();
            }}
        ]
    });
    $('.demo1 .btn.click').click(function(){
        $('.qz_dialog_layer').remove();
        var title = $('#wr_title').val();
        var content = $('#wr_content').val();
        var mask = !!(+$('#st_mask').val());
        if(title && content){
             $('#dialog_temp2').dialog({
                title:title,
                content:content,
                mask:mask,
                drag:true,
                //position:["50%","120%"],
                close:function(){
                    this.destroy();
                },
                ok:function(){
                    this.destroy();
                },
                cancel:function(){
                    this.destroy();
                },
                afterRender:function(r){
                    var me = this;
                    // $(r).on('mouseenter',function(){
                    //  me.setPositionOffset('50%',"100%")
                    // }).on("mouseleave",function(){
                    //  me.setPositionOffset()
                    // })
                }
            });
        }else{
            $('#dialog_tips3').dialog({
                content:'请输入必要的内容，亲!',
                timeout:700
            });

        }
    })
    $('.demo2 .btn.tc1').click(function(){
        $('#dialog_tips1').dialog({
            content:'发表成功！',
            timeout:2000
        });
    })
    $('.demo2 .btn.tc2').click(function(){
        $('#dialog_tips2').dialog({
            content:'对不起，本网站不兼容IE6浏览器!',
            timeout:2000
        });
    })
    $('.demo2 .btn.tc3').click(function(){

         var demoapi = $.dialog('#dialog_tips3',{
            content:'正在加载...'
            //timeout:1000
        });
        $('.trigger_tc3').one('click',function(){
            demoapi && demoapi.destroy();
        })
    })
}); 