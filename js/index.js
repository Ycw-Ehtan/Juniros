$(function() {
    var count = 0;
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getindexmenu',
        success: function(data) {
            var html = template('menuTpl', data);
            $('#menu ul').html(html);
            $('.menuUi > li').each(function(index, value) {
                if (index > 7) {
                    $(value).hide();
                }
            })
            // 修改白菜价跳转后的值
            $('.menuUi #3 a').attr(
                'href', 'http://localhost/MMB(慢慢买)/MobileShopProject/baicaijia.html?titleId=0'
            );
            $('.menuUi > li:nth-child(8)').on('click', function() {
                count++;
                if (count % 2 != 0) {
                    $('.menuUi > li').fadeIn();
                } else {
                    $.each($('.menuUi > li'), function(i) {
                        var idValue = $(".menuUi > li").eq(i).attr("id");
                        if (idValue > 7) {
                            // $(this).hide()
                            $(this).fadeOut()
                        }
                    })
                }
            })
        }
    })
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getmoneyctrl',
        success: function(data) {
            var html = template('comTpl', data);
            $('#recommen ul').html(html);
        }
    })

})
