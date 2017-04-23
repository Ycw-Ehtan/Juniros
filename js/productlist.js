$(function() {
    var categoryId = GetQueryString('categoryId');
    var pagecount = 0;
    // 三级菜单的ajax请求
    $.ajax({
            url: 'http://127.0.0.1:3000/api/getcategorybyid',
            data: { categoryid: categoryId },
            success: function(data) {
                var html = template('sjMenu', data);
                $('.breadcrumb').html(html);
            }
        })
        // 商品列表的ajax请求
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getproductlist',
        data: { categoryid: categoryId },
        success: function(data) {
                console.log(data);
            var html = template("productlistTpl", data);
            $('#recommen ul').html(html);
            // 获得总页数
            pagecount = Math.ceil(data.totalCount / data.pagesize);
            // 商品列表渲染以后渲染最下面的页码切换
            var pageStr = '';
            var totalPage = Math.ceil(data.totalCount / data.pagesize);
            totalPage = ++totalPage;
            for (var i = 1; i < totalPage; i++) {
                pageStr += '<option value="' + i + '">第' + i + '页</option>'
            }
            $('#pageBox').html(pageStr);
        }
    })

    $('.upPage').on('click', function() {
        var num = +$('#pageBox').val() - 1;
        if (num >= pagecount) {
            num = pagecount;
            $('#pageBox').val(num);
        } else if (num <= 1) {
            num = 1;
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


    function pageFunc(newPage) {
        $.ajax({
            url: 'http://127.0.0.1:3000/api/getproductlist',
            data: {
                categoryid: categoryId,
                pageid: newPage
            },
            success: function(data) {
                var html = template("productlistTpl", data);
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
