$(function() {
    var shopid = 0,
        areaid = 0;
    $.ajax({
        url: "http://127.0.0.1:3000/api/getgsproduct",
        data: { shopid: shopid, areaid: areaid },
        success: function(data) {
            var html = template("template_pro", data);
            $("#product").html(html);
        }
    });
    $("#jd").on("click", function() {
        $(this).find("i").toggleClass('zhuan').end().parent().siblings("li").find("i").removeClass('zhuan');
        if ($(".jd").html()) {
            $(".area").hide();
            $(".jd").toggle();
        } else {
            $.ajax({
                url: "http://127.0.0.1:3000/api/getgsshop",
                success: function(data) {
                  console.log(data);
                    var tmp = template("template_title", data);
                    $(".area").hide();
                    $(".jd").html(tmp).show().find("li").on("click", function() {
                        $(this).find("i").addClass('show').end().siblings('li').find("i").removeClass('show');
                        shopid = $(this).attr("shopId");
                        $.ajax({
                            url: "http://127.0.0.1:3000/api/getgsproduct",
                            data: { shopid: shopid, areaid: areaid },
                            success: function(data) {
                                var html = template("template_pro", data);
                                $("#product").html(html);
                                $(".jd").hide();
                                $("#jd").find("i").removeClass('zhuan');
                            }
                        })
                    });
                }
            })
        }
    });
    $("#ar").on("click", function() {
        $(this).find("i").toggleClass('zhuan').end().parent().siblings("li").find("i").removeClass('zhuan');
        if ($(".area").html()) {
            $(".jd").hide();
            $(".area").toggle();
        } else {
            $.ajax({
                url: "http://127.0.0.1:3000/api/getgsshoparea",
                success: function(data) {
                    var tmp = template("template_area", data);
                    $(".jd").hide();
                    $(".area").html(tmp).show().find("li").on("click", function() {
                        $(this).find("i").addClass('show').end().siblings('li').find("i").removeClass('show');
                        areaid = $(this).attr("areaId");
                        $.ajax({
                            url: "http://127.0.0.1:3000/api/getgsproduct",
                            data: { shopid: shopid, areaid: areaid },
                            success: function(data) {
                                console.log(data);
                                var html = template("template_pro", data);
                                $("#product").html(html);
                                $(".area").hide();
                                $("#ar").find("i").removeClass('zhuan');
                            }
                        })
                    });
                }
            })
        }
    })
})
