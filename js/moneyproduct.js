$(function() {
  var productId  = GetQueryString('productId');
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getmoneyctrlproduct',
        data: { productid : productId },
        success:function(data){
          var html = template('mpdTpl',data);
          $('main').html(html);
        }
    })


    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})
