

var isFocused = false;
var row = [];
var rowId = [];

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
		if (data.error) {
			$("#SignUpResult").html("Error: " + data.error);
		}
		else {
			$("#SignUpResult").html("Success");
			sessionStorage.setItem('userId', data.id);
			sessionStorage.setItem('login', "true");
			window.location.href = ("mainpage.html");
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
	var login = $("#loginName").val();
	var password = $("#loginPassword").val();

	var jsonPayload = {login: login, password: password, fname: firstname, lname: lastname};
	if((login.length == 0 || password.length == 0) || firstname.length == 0 || lastname.length == 0){
		exit();
	}

	$.post(url, JSON.stringify(jsonPayload), function(data) {
		if (data.error) {
			$("#SignUpResult").html("Error: " + data.error);
		}
		else {
			$("#SignUpResult").html("Success");
			window.location.href = ("index.html");
		}
	});
}

function addTab() {
	if(isFocused)
	{
		isFocused = false;
		$("#table").get(0).firstChild.remove();
		$("#table").load("table.html");
		doLoad();
		document.activeElement.blur();
	}
	else {
		isFocused = true;
		$("#table").load("addcontact.html");
	}
}

function doAdd() {
	var url = '/api/addContact.php';

	var firstname = $("#firstNameAdd").val();
	var lastname = $("#lastNameAdd").val()
	var email = $("#EmailAdd").val()
	var address = $("#OrgNameAdd").val()
	var phone = $("#PhoneNumAdd").val()
	var jsonPayload = {userId: parseInt(sessionStorage.getItem('userId')), firstName: firstname, lastName: lastname, phone: phone, address: address, email: email};
	$.post(url, JSON.stringify(jsonPayload), function(data) {
		if (data.error) {
			alert(data.error);
		}
		else {
			$("#table").get(0).firstChild.remove();
			$("#table").load("table.html");
			doLoad();
			isFocused = false;
		}
	});
}

function doLoad() {
	var url = '/api/read.php';
	var jsonPayload = {userId: parseInt(sessionStorage.getItem('userId'))};
	$.post(url, JSON.stringify(jsonPayload),  function(data) {
		if (data.error) {
			alert(data.error);
		}
		else {
		}
		var i = 0;
		while(i < data.contacts.length) {

			var newCell = "<tr>";
			newCell = newCell + "<td><label class=\"container\"><input class = \"check\" type=\"checkbox\"><span class=\"checkmark\"></span></label></td>"
			newCell = newCell + "<td><div>";
			newCell = newCell + data.contacts[i].FirstName;
			newCell = newCell + "</div></td>";

			newCell = newCell + "<td><div>";
			newCell = newCell + data.contacts[i].LastName;
			newCell = newCell + "</div></td>";

			newCell = newCell + "<td><div>";
			newCell = newCell + data.contacts[i].Address;
			newCell = newCell + "</div></td>";

			newCell = newCell + "<td><div>";
			newCell = newCell + data.contacts[i].Email;
			newCell = newCell + "</div></td>";

			newCell = newCell + "<td><div>";
			newCell = newCell + data.contacts[i].Phone;
			newCell = newCell + "</div></td>";

			newCell = newCell + "</tr>";
			$( "tbody" ).append( $(newCell) );
			rowId[i] = data.contacts[i].ContactID;
			i++;
		}
	});


}

function logout() {
	sessionStorage.removeItem('userId');
	sessionStorage.removeItem('login');
	sessionStorage.setItem('login', "false");
	window.location.href = ("index.html");
}


function updateSelected() {
	 var grid = document.getElementById("contactTable");

	 var checkBoxes = grid.getElementsByTagName("INPUT");

	 for (var i = 0; i < checkBoxes.length; i++) {
			 if (checkBoxes[i].checked && row[i] == undefined) {
				 	var cowC = checkBoxes[i].parentNode.parentNode.parentNode;
					if(row[i] != cowC)
					{
						row[i] = cowC.cloneNode(true);
					}
					cowC.cells[1].firstChild.setAttribute('contenteditable', 'true');
					cowC.cells[2].firstChild.setAttribute('contenteditable', 'true');
					cowC.cells[3].firstChild.setAttribute('contenteditable', 'true');
					cowC.cells[4].firstChild.setAttribute('contenteditable', 'true');
					cowC.cells[5].firstChild.setAttribute('contenteditable', 'true');
					cowC.style.outline = "thin dotted yellow";
			 }
			 else if (checkBoxes[i].checked == false && row[i] != undefined) {
					var rowD = checkBoxes[i].parentNode.parentNode.parentNode;

					if(row[i] != undefined && row[i] != null) {
						rowD.replaceChild(row[i].cells[1],rowD.cells[1]);
						rowD.replaceChild(row[i].cells[1],rowD.cells[2]);
						rowD.replaceChild(row[i].cells[1],rowD.cells[3]);
						rowD.replaceChild(row[i].cells[1],rowD.cells[4]);
						rowD.replaceChild(row[i].cells[1],rowD.cells[5]);
						delete row[i];

					}

					rowD.cells[1].firstChild.setAttribute('contenteditable', 'false');
					rowD.cells[2].firstChild.setAttribute('contenteditable', 'false');
					rowD.cells[3].firstChild.setAttribute('contenteditable', 'false');
					rowD.cells[4].firstChild.setAttribute('contenteditable', 'false');
					rowD.cells[5].firstChild.setAttribute('contenteditable', 'false');
					checkBoxes[i].parentNode.parentNode.parentNode.style.outline = "";
			 }
	 }
}

function deleteSelected() {
		 var grid = document.getElementById("contactTable");
		 document.activeElement.blur();

		 var checkBoxes = grid.getElementsByTagName("INPUT");

	 var length = checkBoxes.length

	 for (var i = length - 1;  i >= 0; i--){
    if(checkBoxes[i].checked)
    {
				checkBoxes[i].parentNode.parentNode.parentNode.remove();
				doDelete(i);
				delete rowId[i];
    }
	}
}

function doUpdate() {
	var grid = document.getElementById("contactTable");
	document.activeElement.blur();

	var checkBoxes = grid.getElementsByTagName("INPUT");

	var length = checkBoxes.length
	for (var i = 0; i < length; i++) {
			if (checkBoxes[i].checked) {
					var rowD = checkBoxes[i].parentNode.parentNode.parentNode;
				 	update(i, rowD);
					checkBoxes[i].checked = false;
			}
	}
}

function update(i, rowD) {
	var url = '/api/update.php';

	var firstname = rowD.cells[1].firstChild.innerHTML;
	var lastname = rowD.cells[2].firstChild.innerHTML;
	var email = rowD.cells[4].firstChild.innerHTML;
	var address = rowD.cells[3].firstChild.innerHTML;
	var phone = rowD.cells[5].firstChild.innerHTML;

	var jsonPayload = {userId: parseInt(sessionStorage.getItem('userId')), contactId: rowId[i], firstName: firstname, lastName: lastname, phone: phone, address: address, email: email};
	$.post(url, JSON.stringify(jsonPayload), function(data) {
		if (data.error) {
			alert(data.error);
		}
		else {
		}
		rowD.cells[1].firstChild.setAttribute('contenteditable', 'false');
		rowD.cells[2].firstChild.setAttribute('contenteditable', 'false');
		rowD.cells[3].firstChild.setAttribute('contenteditable', 'false');
		rowD.cells[4].firstChild.setAttribute('contenteditable', 'false');
		rowD.cells[5].firstChild.setAttribute('contenteditable', 'false');
		rowD.style.outline = "";
		delete row[i];
	});
}

function doDelete(i) {
	var url = '/api/deleteContact.php';
	var jsonPayload = {userId: parseInt(sessionStorage.getItem('userId')), contactId: rowId[i]};
	$.post(url, JSON.stringify(jsonPayload), function(data) {
		if (data.error) {
			alert(data.error);
		}
		else {
		}
		delete row[i];
	});
}


function doSearch() {
	var url = '/api/search.php';
	var search = $("#searched").val();
	$("#table").get(0).firstChild.remove();
	$("#table").load("table.html");
	var jsonPayload = {userId: parseInt(sessionStorage.getItem('userId')), search: search};

	$.post(url, JSON.stringify(jsonPayload),  function(data) {
		if (data.error) {
			alert(data.error);
			exit(0);
		}
		else {
		}
		var i = 0;
		while(i < data.results.length) {
			var newCell = "<tr>";
			newCell = newCell + "<td><label class=\"container\"><input class = \"check\" type=\"checkbox\"><span class=\"checkmark\"></span></label></td>"
			newCell = newCell + "<td><div>";
			newCell = newCell + data.results[i].FirstName;
			newCell = newCell + "</div></td>";

			newCell = newCell + "<td><div>";
			newCell = newCell + data.results[i].LastName;
			newCell = newCell + "</div></td>";

			newCell = newCell + "<td><div>";
			newCell = newCell + data.results[i].Address;
			newCell = newCell + "</div></td>";

			newCell = newCell + "<td><div>";
			newCell = newCell + data.results[i].Email;
			newCell = newCell + "</div></td>";

			newCell = newCell + "<td><div>";
			newCell = newCell + data.results[i].Phone;
			newCell = newCell + "</div></td>";

			newCell = newCell + "</tr>";
			$( "tbody" ).append( $(newCell) );
			rowId[i] = data.results[i].ContactID;
			i++;
		}
	});


}
