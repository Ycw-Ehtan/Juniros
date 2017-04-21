$(function() {
  var productId = GetQueryString('productId');
  $.ajax({
      url: 'http://127.0.0.1:3000/api/getproduct', 
      data: {
          productid: productId
      },
      success: function(data) {
        var pnStr = data.result[0].productName;
        var pName =  pnStr.substring(0,pnStr.indexOf(' '));
        // 加载三级菜单
        var html1=template('sjMenu', data);
        $('.breadcrumb').html(html1);
        $('.active').html(pName);
        var html2 = template('imgBoxTpl',data);
        // 加载图片盒子
        $('.titleImgBox').html(html2);
        // 加载比价购买店铺模板
        var html3 = template('bjShopTpl',data);
        $('.bjBuyShop').html(html3);
        $.ajax({
          url: 'http://127.0.0.1:3000/api/getcategorybyid',
          data: {categoryid: data.result[0].categoryId},
          success:function(data){
            $('.previous').html(data.result[0].category);
          }
        })
      }
  })
  $.ajax({
    url: 'http://127.0.0.1:3000/api/getproductcom',
    data: {productid: productId},
    success:function(data){
      console.log(data);
      var pjNum = data.result.length;
      pjNum = '评价'+ pjNum;
      // 动态加载评论数量
      $('.pingjia').html(pjNum);
      var html = template('pjTpl',data);
      $('.userPjia').html(html);
    }
  })
 
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
})
