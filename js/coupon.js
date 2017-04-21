$(function(){
  $.ajax({
    url: 'http://127.0.0.1:3000/api/getcoupon',
    success:function(data){
      var html = template('navListTpl',data);
      $('#navList').html(html);
    }
  })
})