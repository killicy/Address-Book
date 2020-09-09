var sideMenu = false;
function doLogin() {

	var url = '/api/login.php';
	userId = 0;
	firstName = "";
	lastName = "";

	var login = $("#loginName").val();
	var password = $("#loginPassword").val();
	var jsonPayload = {login: login, password: password};

	if((login.length == 0 || password.length == 0)){
		$("#SignUpResult").html("Please enter username and password");
		exit();
	}

	$.post(url, JSON.stringify(jsonPayload), function(data) {
		console.log(data.error.length);
		if (data.error) {
			$("#SignUpResult").html("Error: " + data.error);
		}
		else {
			$("#SignUpResult").html("Success");
		}
	});
}

function doRegister() {
	window.location.href = ("registration.html");
}

function doCreate() {
	var url = '/api/create.php';
	userId = 0;
	firstName = "";
	lastName = "";

	var firstname = $("#fname").val();
	var lastname = $("#lname").val();
	var login = $("#uname").val();
	var password = $("#pword").val();
	var jsonPayload = {login: login, password: password, firstname: firstname, lastname: lastname};
	if((login.length == 0 || password.length == 0) || firstname.length == 0 || lastname.length == 0){
		exit();
	}

	$.post(url, JSON.stringify(jsonPayload), function(data) {
		if (data) {
			$("#SignUpResult").html("Error: " + data.error);
		}
		else {
			$("#SignUpResult").html("Success");
			window.location.href = ("index.html");
		}
	});
}
