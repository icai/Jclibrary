$(function(){
  $('#timer_1').countDown({
    endTime:"2015/11/20",
    refresh:100,
    template:'距离2015/11/20，还有{d}天 {h}:{m}:{s}.{x}',
    onEnd:function(){
      this.container.html('2015/11/20，过期了');
      return false;
    }
  })
}); 