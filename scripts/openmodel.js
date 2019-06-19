
var verify = []; // 通过长度判断是否包含了所有的笑脸
$('.smile>li').click(function () {
    if($(this).hasClass('verify') && $(this).children('.verifed').css('opacity') == 0){
        verify.push(1)
    }
    if($(this).hasClass('verify') && $(this).children('.verifed').css('opacity') == 1){
        verify.pop()
    }
    if($(this).children('.verifed').css('opacity') == 0){
        $(this).children('.verifed').css('opacity',1);
        $(this).children('.verifed').siblings().addClass('narrow');
    }else {
        $(this).children('.verifed').css('opacity',0);
        $(this).children('.verifed').siblings().removeClass('narrow');
    }
});

function validation() {
    var allVerify = $('.smile>li>.narrow');
    if((verify.length) == 3 && (allVerify.length == 3)){
        $('.verifybtn>a>img').attr('src', 'img/verified.png');
        setTimeout(function () {
            $('#main').css('display', 'none');
            $('.verifybtn>a>img').attr('src', 'img/verify.png');
            $('.smile>li').children('.verifed').css('opacity',0);
            $('.smile>li').children('.verifed').siblings().removeClass('narrow');
            verify = []
        }, 800)
    }else {
        $('.verifybtn>a>img').attr('src', 'img/failed.png');
        $('.model-box .title').css('display', 'none');
        $('.model-box .text').html('Sorry, Please try again');
        setTimeout(function () {
            $('.verifybtn>a>img').attr('src', 'img/verify.png');
            $('.model-box .title').css('display', 'block');
            $('.model-box .text').html('Select all happy faces from below');
        },3000)
    }
}

function openmodel() {
    $('#main').css('display', 'block')
}
