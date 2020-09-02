var url = 'api/login.php';
function login(e) {
	e.preventDefault();

	let data = {};

	data.user = $("#username").val();
	data.pass = $("#password").val();

	console.log(data);

	$.post({
		url: url,
		data: JSON.stringify(data),
		success: function(result) {
    		$("#error").html(result);
    	}
    });
}