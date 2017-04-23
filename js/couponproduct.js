$(function() {
    var couponId = GetQueryString('couponId');
    // 动态加载标题
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getcoupon',
        success: function(data) {
            var arr = data.result;
            // 遍历数组
             $(arr).each(function(i) {
              // 判断是否是点击的标题
               if(couponId==data.result[i].couponId){
                  var titStr = data.result[i].couponTitle + '优惠券';
                  // 将对应的标题字符串渲染到页面上
                  $('#header h3').html(titStr);
               }
             });
        }
    })
    // 动态加载商品列表
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getcouponproduct',
        data: { couponid: couponId },
        success: function(data) {
          console.log(data);
            var html = template('comListTpl', data);
            $('#comList').html(html);
        }
    })

    $('.imgBox').on('click', function() {
        
    });

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})
