$(function() {
    var brandTitleId = GetQueryString('brandTitleId');

    // 动态加载标题
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getbrandtitle',
        success: function(data) {
            var arr = data.result;
            // 遍历数组
            $(arr).each(function(i) {
                // 判断是否是点击的标题
                if (brandTitleId == data.result[i].brandTitleId) {
                    var titStr = data.result[i].brandTitle;
                    // 将对应的标题字符串渲染到页面上
                    $('#hotBrand div').html(titStr);
                }
            });
        }
    })

    // 动态加载十大品牌列表
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getbrand',
        data: { brandtitleid: brandTitleId },
        success: function(data) {
            var html = template('comTpl', data);
            $('#brandRanking').html(html);
        }
    })

    //加载商品列表
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getbrandproductlist',
        data: {
            brandtitleid: brandTitleId,
            pagesize: 4
        },
        success:function(data){
          console.log(data);
          var html = template('brComListTpl', data);
          $('#brComList').html(html);
        }
    })



    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})
