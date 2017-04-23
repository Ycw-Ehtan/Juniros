$(function() {
    var pageid = GetQueryString('pageid');
    var pagecount = 0;
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getmoneyctrl',
        data: { pageid: pagecount },
        success: function(data) {
            var html = template('comTpl', data);
            $('#recommen ul').html(html);
            // 获得总页数
            pagecount = Math.ceil(data.totalCount / data.pagesize);
            // 商品列表渲染以后渲染最下面的页码切换
            var pageStr = '';
            var totalPage = Math.ceil(data.totalCount / data.pagesize);
            // totalPage = ++totalPage;
            for (var i = 0; i < totalPage; i++) {
                pageStr += '<option value="' + i + '">第' + (+i + 1) + '页</option>'
            }
            $('#pageBox').html(pageStr);
        }
    })
    $('.upPage').on('click', function() {
        var num = +$('#pageBox').val() - 1;
        if (num >= pagecount) {
            num = pagecount;
            $('#pageBox').val(num);
        } else if (num <= 0) {
            num = 0;
            $('#pageBox').val(num);
        }
        pageFunc(num);
        $('#pageBox').val(num);
    });
    $('#pageBox').on('change', function() {
        pageFunc(this.value);
    });
    $('.downPage').on('click', function() {
        var num = +$('#pageBox').val() + 1;
        if (num >= pagecount) {
            num = pagecount;
            $('#pageBox').val(num);
        } else if (num <= 1) {
            num = 1;
            $('#pageBox').val(num);
        }
        if (num == pagecount) {
            num = pagecount;
        }
        pageFunc(num);
        $('#pageBox').val(num);
    })

    $('.backTop').on('click', function() {
        $(window).scrollTop(0);
    });

    function pageFunc(newPage) {
        $.ajax({
            url: 'http://192.168.20.30:3000/api/getmoneyctrl',
            data: {
                pageid: newPage
            },
            success: function(data) {
                var html = template("comTpl", data);
                $('#recommen ul').html(html);
            }
        })
    }


    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})
