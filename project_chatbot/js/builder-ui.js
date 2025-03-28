$(document).ready(function() {

   
    

    componentDropdownBox();
    //메뉴 dropdown
    function componentDropdownBox() {
        $('.component_list li a').click(function(){
            var currentDropDown = $(this).parent(); //dropdown
            if($(currentDropDown).hasClass('down')) {
                $('.component_list li a').parent().removeClass('down');
                $(currentDropDown).removeClass('down');
            }else {
                $('.component_list li a').parent().removeClass('down');
                $(currentDropDown).addClass('down');
            }
        });
        $('.dropDown a').click(function(){
            $(this).parent().removeClass('down');
        });
    }
    


    dropdownBox();
    function dropdownBox() {
        $('.dropdown_box > a').click(function(){
            var currentDropDown = $(this).parent(); //dropdown
            if($(currentDropDown).hasClass('down')) {
                $('.component_list li a').parent().removeClass('down');
                $(currentDropDown).removeClass('down');
            }else {
                $('.component_list li a').parent().removeClass('down');
                $(currentDropDown).addClass('down');
            }
        });
        $('.dropDown a').click(function(){
            $(this).parent().parent().removeClass('down');
        });
    }
    


    // 기본유형 닫기 버튼 클릭시 팝업
    $('#chatTypeDefault .pop_close').click(function(){
        $('#popCloseMsg').show();
    });
    $('.btn_stay').click(function(){
        $('#popCloseMsg').hide();
    });
    $('.btn_out').click(function(){
        $('#chatTypeDefault, #popCloseMsg').hide();
    });

    // 소스보기 popup
    $('#btnViewSource').click(function(){
        $('#sourceView').show();
    });

    // 커스텀 제작 답변유형등록 클릭시 
    $('#chatTypeDeCustom #btnAnswer').click(function(){
        $('#popAnswerConfirm').show();
    });
    

    //답변보기 팝업
    $('#btnAnswer').click(function(){
        $('#popAnswerConfirm').show();
    });
    $('#popAnswerConfirm .pop_close').click(function(){
        $('#popAnswerConfirm').hide();
    });
    $('#popAnswerConfirm .btn_confirm').click(function(){
        $('#popAnswerConfirm').hide();
    });


    // 위아래 이동 스크립트
    $(document).on('click', '.btn_up', function(e) {
        var row = $(this).parent();
        var listWrap = $(this).parents('li');
        $(listWrap).children().eq($(row).index() - 1).before($(row));

        $(listWrap).children().find('.btn_up').removeClass('disabled');
        $(listWrap).children().eq(0).find('.btn_up').addClass('disabled');
    });

    $(document).on('click', '.btn_down', function(e) {
        var row = $(this).parent();
        var listWrap = $(this).parents('li');
        $(listWrap).children().eq($(row).index() + 1).after($(row));
        $(listWrap).children().find('.btn_up').removeClass('disabled');
        $(listWrap).children().eq(0).find('.btn_up').addClass('disabled');
    });

    // 추가 삭제 스크립트
    $(document).on('click', '.btn_module_add', function(e) {
        e.preventDefault();
        componentDropdownBox();
        var module = $(this).parent().parent().parent();
        var listWrap = $(module).parents('li');
        var cloneModule = $(module).clone();

        $(cloneModule).find('input, select, textarea').val('');
        $(cloneModule).find('.btn_up').removeClass('disabled');
        // 맨 마지막에 추가
        $(listWrap).append(cloneModule);

        $(listWrap).children().eq(0).find('.btn_up').addClass('disabled');
        
    });

    $(document).on('click', '.btn_module_delete', function(e) {
        e.preventDefault();
        var module = $(this).parent().parent().parent();
        module.remove();
    });

    // 파라미터 추가 삭제 스크립트
    $(document).on('click', '.btn_add', function(e) {
        var param = $(this).parent();
        var cloneParam = $(param).clone();
        $(cloneParam).find('input, select').val();
        $(cloneParam).find('input, .dropdown_box').hide();
        $(param).parent().append(cloneParam);
        dropdownBox();
    });

    $(document).on('click', '.btn_delete', function(e) {
        $(this).parent().remove();
    });

    // 셀렉트 박스 선택에 따른 영역 표시
    $(document).on('change', '.type-selector', function() {
        var className = $(this).val();
        $(this).siblings().hide();
        $(this).siblings().each(function() {
            if ($(this).hasClass(className)) {
                $(this).show().css('display','inline-block');
            }
        });
    });


    // 캐러셀 추가 버튼
    $(document).on('click', '.btn_addCarousel', function(e) {
        var li = $(this).parent().parent().parent();
        var cloneCarousel = $(li).clone();
        var carouselList = $(li).parent();
        


        $(carouselList).append(cloneCarousel);

        


        var count = $(carouselList).children().size();
        if (count > 3) {
            $(carouselList).css('width', count * 340);
        }
        var liLength = $('.cal_list li').size();
        if (liLength > 1) {
                $('.cal_list .btn_delCarousel').removeClass('disabled');
            }else {
                $('.cal_list .btn_delCarousel').addClass('disabled');
        }


        // 캐러셀 제목
        $('.cal_list > li').each(function(i) {
            $(this).find('h2').text( (i+1) + '번카드');
        });

             
        
        
        dropdownBox();
    });
    
    // 캐러셀 삭제 버튼
    $(document).on('click', '.btn_delCarousel', function(e) {
        var li = $(this).parent().parent().parent();
        var carouselList = $(li).parent();
        li.remove();

        var calItemSize = $('.cal_list > li').size();
        if (calItemSize == 1) {
            $('.cal_list .btn_delCarousel').addClass('disabled');
        } else {
            $('.cal_list .btn_delCarousel').removeClass('disabled');
        }

        if (calItemSize > 1) {
            $(carouselList).css('width', calItemSize * 340);
        }

        // 캐러셀 제목
        // $('.cal_list > li').each(function(i) {
        //     $(this).find('h2').text( (i+1) + '번카드');
        // });

       
    });

   


    
});