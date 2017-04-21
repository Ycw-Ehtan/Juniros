$(function() {
	var categoryId = GetQueryString('categoryId');
	$.ajax({
		url: 'http://127.0.0.1:3000/api/getinlanddiscount',
		success: function(data) {
			console.log(data);
			var html = template("inlandTpl", data);
			$('#main').html(html);
		}
	})

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
})