function doLogin() {
	var url = '/api/login.php';
	userId = 0;
	firstName = "";
	lastName = "";

	var login = $("#loginName").val();
	var password = $("#loginPassword").val();
	var jsonPayload = {loginName: login, loginPassword: password};

	$.post(url, JSON.stringify(jsonPayload), function(data) {
		console.log(data.error.length);
		if (data.error.length > 0) {
			$("#SignUpResult").html("Error: " + data.error);
		}
		else {
			$("#SignUpResult").html("Success");
		}
	});
}


function doCreate() {
	var url = '/LAMPAPI/create.php';
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("loginName").value;
	var passWord = document.getElementById("loginPassword").value;

	document.getElementById("signUpButtonText").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + passWord + '"}';
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false)
	xhr.setRequestHeader("Content-type", "application/json");
	try {
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse(xhr.responseText);

		document.getElementById("signUpButtonText").innerHTML = jsonObject.error;


	}
	catch (err) {
		document.getElementById("signUpButtonText").innerHTML = 'Success';

	}
}
