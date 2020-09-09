function doLogin() {
	var url = '/api/login.php';
	userId = 0;
	firstName = "";
	lastName = "";

	var login = $("#loginName").val();
	var password = $("#loginPassword").val();
	var jsonPayload = {loginName: login, loginPassword: password};

	$.post(url, JSON.stringify(jsonPayload), function(data) {
		if (data.error.length > 0) {
			$("#SignUpResult").html("Error: " + data.error);
		}
		else {
			$("#SignUpResult").html("Success");
		}
	});
}


function doCreate() {
	var url = '/api/create.php';
	userId = 0;
	firstName = "";
	lastName = "";

	var login = $("#loginName").val();
	var password = $("#loginPassword").val();
	var jsonPayload = {loginName: login, loginPassword: password};

	$.post(url, JSON.stringify(jsonPayload), function(data) {
		if (data.error.length > 0) {
			$("#SignUpResult").html("Error: " + data.error);
		}
		else {
			$("#signUpButtonText").html("Success");
		}
	});
}
