$(function(){
  $.ajax({
    url:'http://127.0.0.1:3000/api/getsitenav',
    success:function(data){
      var html = template('sitenavTpl',data);
      $('#sitenavList').html(html);
    }
  })
})