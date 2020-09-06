
function doLogin() {
	var url = '/LAMPAPI/Login.php';
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("loginName").value;
	var passWord = document.getElementById("loginPassword").value;

	document.getElementById("loginButtonText").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + passWord + '"}';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false)
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse(xhr.responseText);

		userId = jsonObject.id;

		if(userId < 1)
		{
			document.getElementById("loginButtonText").innerHTML = jsonObject.error;
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

	}
	catch (err) {
		document.getElementById("loginButtonText").innerHTML = jsonObject.error;

	}
}


function doCreate() {
	var url = '/LAMPAPI/Create.php';
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
