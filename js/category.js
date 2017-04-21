$(function() {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getcategorytitle',
        success: function(data) {
            var html = template('bijiaTpl', data);
            $('#bjMain').html(html);
            var count = 0;
            $('.pdMenuTwo').on('click', function() {
                var id = this.dataset.id;
                var that = this;
                count++;
                $.ajax({
                    url: 'http://127.0.0.1:3000/api/getcategory',
                    data: { titleid: id },
                    success: function(item) {
                        console.log(item);
                        var html = template('xialaTpl', item);
                        $(that).next().html(html);
                        if(count % 2 != 0){
                          $('.pdMenuThree').fadeIn(300);
                        }else{
                          $('.pdMenuThree').fadeOut(300);
                        }
                    }
                })
            });
        }
    })


})
