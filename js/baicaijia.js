$(function() {
    var titleId = GetQueryString('titleId');
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getbaicaijiatitle',
        success: function(data) {
            var html = template('titleTpl', data);
            $('.nav').html(html);
            navSwipe();
            // 给a标签设置点击事件，点击排他高亮
            $('.nav ul li a').on('click', function() {
                // 点击后切换地址栏的titleid
                var dataId = this.dataset.id;
                dataId = 'baicaijia.html?titleId=' + dataId;
                history.pushState({}, '', dataId);
                $('.nav ul li a').each(function() {
                    $(this).css({
                        color: '#464646'
                    });
                })
                $(this).css({
                    color: '#F4483E'
                });
                // 切换标题对应的数据
                // 重新获取titleid值
                var titleId = GetQueryString('titleId');
                $.ajax({
                    url: 'http://127.0.0.1:3000/api/getbaicaijiaproduct',
                    data: { titleid: titleId },
                    success: function(data) {
                        // 重新渲染页面
              console.log(data);
                        var html = template('bcjListTpl', data);
                        $('#bcjList').html(html);
                    }
                })
                return false;
            });

        }
    })

    $.ajax({
            url: 'http://127.0.0.1:3000/api/getbaicaijiaproduct',
            data: { titleid: titleId },
            success: function(data) {
                var html = template('bcjListTpl', data);
                $('#bcjList').html(html);
                $('.nav ul li:first a').css('color', '#F4483E');
            }
        })
        //截取地址栏信息
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    //导航栏滑动
    function navSwipe() {
        /*通过封装的swipe插件来实现*/
        itcast.iScroll({
            swipeDom: document.querySelector('.nav'),
            /*父容器对象*/
            swipeType: 'x',
            /*滑动的方向*/
            swipeDistance: 100 /*缓冲的距离*/
        });
    }
})
