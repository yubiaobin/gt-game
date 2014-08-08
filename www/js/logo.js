$(function(){
    var $width = $(window).width();
    var $height = $(window).height();
    $('#scroller').css('width',$width*4);
    $('#scroller li').css({'width':$width,'height':$height});
    var picHeight = 1.5*$width;//图片刚加载进来的高度,1.5=681/454
    if(picHeight > $height){
        $('#scroller li img').css({'width':'auto','height':$height});
        var imgLeft = ($width - $('.start1 img').width())/2;
        $('#scroller li img').css('left',imgLeft);
    }else{
        var imgTop = ($height - picHeight)/2;
        $('#scroller li img').css('top',imgTop);
    };
    $('.start').css('left',($width - $('.start').width())/2);




    var myScroll;
    function loaded() {
        myScroll = new iScroll('wrapper', {
            snap: true,
            momentum: false,
            hScrollbar: false,
            bounce : false,
        });
    };
    loaded();



    $('.start').on('click',function(){
        window.localStorage.setItem("FirstGuest" , "true");
        window.location.href="index.html";
    });



});









