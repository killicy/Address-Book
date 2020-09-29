function doLogin() {

	var url = '/api/login.php';
	var userId = 0;
	var firstName = "";
	var lastName = "";

	var login = $("#loginName").val();
	var password = $("#loginPassword").val();
	var jsonPayload = {login: login, password: password};

	if((login.length == 0 || password.length == 0)){
		$("#SignUpResult").html("Please enter username and password");
	}
	$.post(url, JSON.stringify(jsonPayload), function(data) {
		if (data.error) {
			$("#SignUpResult").html("Error: " + data.error);
		}
		else {
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
	$("#SignUpResult").html("");
	var url = '/api/create.php';
	var userId = 0;
	var firstName = "";
	var lastName = "";
	var firstname = $("#fname").val();
	var lastname = $("#lname").val();
	var login = $("#loginName").val();
	var password = $("#loginPassword").val();
	var confirm = $("#confirmPassword").val();

	var jsonPayload = {login: login, password: password, fname: firstname, lname: lastname};
	if((login.length == 0 || password.length == 0) || firstname.length == 0 || lastname.length == 0 || confirm.length == 0){
		$("#SignUpResult").html("Please fill all fields");
	}
	else if (confirm !== password) {
		$("#SignUpResult").html("Passwords don't match");
		$("#confirmPassword").html("");
	}
	else {
		$.post(url, JSON.stringify(jsonPayload), function(data) {
			if (data.error) {
				$("#SignUpResult").html("Error: " + data.error);
			}
			else {
				$(".overlay").css("visibility", "visible");
				setTimeout(() => { window.location.href = ("index.html"); }, 2000);
			}
		});
	}
}

function addTab() {
	$("#contactOverlay").show().load("addcontact.html");
}

function disableOverlay(event) {
	var l = document.getElementById("contactOverlay");

	if(event.target == l) {
		$(l).hide();
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
			$("#addFail").html("Contact already exists!");
		}
		else {
			$("#blankRecords").html("");
			$("#table").get(0).firstChild.remove();
			$("#table").load("table.html");
			doLoad();
			isFocused = false;
			clearAdd();
		}
	});
}

function doLoad() {
	var url = '/api/read.php';
	var jsonPayload = {userId: parseInt(sessionStorage.getItem('userId'))};
	$.post(url, JSON.stringify(jsonPayload),  function(data) {
		if (data.error) {
			$("#blankRecords").html("Loading error");
		}
		else if (data.contacts.length >= 1) {
			var i = 0;
			$("#blankRecords").html("");
			while(i < data.contacts.length) {
				var newCell = '<tr data-id="' + data.contacts[i].ContactID + '">';			
				newCell = newCell + "<td><label><input class = \"check\" type=\"checkbox\"><span class=\"checkmark\"></span></label></td>"
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
				
				newEl = $(newCell);
				newEl.children('td').keypress(function(event) {
					if ( event.which == 13 ) {
					    event.preventDefault();
					}
				});

				$( "tbody" ).append(newEl);
				i++;
			}
			resize();
		}
		else {
			$("#blankRecords").html("Nothing here yet, add some contacts<br><br> <img src = '/media/friends.png'>");
		}
	});
}

function resize() {
	if ($("#table").height() > ($(window).height() - 140))
		$("#tabs").css("height", $("#table").height());
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
	 	var row = $(checkBoxes[i]).parents('tr');
		if (checkBoxes[i].checked) {
			$('td div', row).attr('contenteditable', true);
			row.addClass("editable");
		}
		else if (checkBoxes[i].checked == false) {
			$('td div', row).attr('contenteditable', false);
			row.removeClass("editable");
		}
	}
}

function deleteSelected() {
	var grid = document.getElementById("contactTable");
	document.activeElement.blur();
	var checkBoxes = grid.getElementsByTagName("INPUT");
	var length = checkBoxes.length
	for (var i = length - 1;  i > 0; i--){
    	if(checkBoxes[i].checked)
    	{
			var row = $(checkBoxes[i]).parents('tr');
			var contactId = row.data('id');
			row.remove();
			doDelete(contactId);
    	}
	}

	checkBoxes[0].checked = false;

	console.log(grid.getElementsByTagName("INPUT").length);
	if(grid.getElementsByTagName("INPUT").length == 1) {
		$("#blankRecords").html("Nothing here yet, add some contacts<br><br> <img src = '/media/friends.png'>");
	}
}

var isEditing = false;
function doUpdate() {
	var grid = document.getElementById("contactTable");
	document.activeElement.blur();
	var checkBoxes = grid.getElementsByTagName("INPUT");

	var flag = false;
	for (var i = 1; i < checkBoxes.length; i++) {
		if(checkBoxes[i].checked) {
			flag = true;
		}
	}
	
	if (flag) { isEditing = !isEditing;}

	if (isEditing && flag) {
		$("#editButton").show();
		updateSelected();
	}
	else {
		$("#editButton").hide();
		if (allSelected) { 
			var i = 1; 
			checkBoxes[0].checked = false;
			allSelected = false;
		} else { 
			var i = 0;
		}
		var length = checkBoxes.length
		for (var i; i < length; i++) {
				if (checkBoxes[i].checked) {
						var rowD = $(checkBoxes[i]).parents('tr');
					 	update(rowD.data('id'), rowD[0]);
						checkBoxes[i].checked = false;
				}
		}
	}
}

function update(contactId, rowD) {
	var url = '/api/update.php';

	var firstname = rowD.cells[1].firstChild.innerHTML;
	var lastname = rowD.cells[2].firstChild.innerHTML;
	var email = rowD.cells[4].firstChild.innerHTML;
	var address = rowD.cells[3].firstChild.innerHTML;
	var phone = rowD.cells[5].firstChild.innerHTML;

	var jsonPayload = {userId: parseInt(sessionStorage.getItem('userId')), contactId: contactId, firstName: firstname, lastName: lastname, phone: phone, address: address, email: email};
	$.post(url, JSON.stringify(jsonPayload), function(data) {
		if (data.error !== undefined) {
			console.log(data);
			$("#blankRecords").html("Failed to update");
		}
		rowD.checked = false;
		updateSelected();
	});
}

function doDelete(contactId) {
	var url = '/api/deleteContact.php';
	var jsonPayload = {userId: parseInt(sessionStorage.getItem('userId')), contactId: contactId};
	$.post(url, JSON.stringify(jsonPayload), function(data) {
		if (data.error !== undefined) {
			$("#blankRecords").html("Failed to delete");
		}	
	});
}

function doSearch() {
	var url = '/api/search.php';
	var search = $("#searched").val();
	var td = $("td");
	var jsonPayload = {userId: parseInt(sessionStorage.getItem('userId')), search: search};

	$.post(url, JSON.stringify(jsonPayload),  function(data) {
		$("#table td").parent('tr').remove();
		if (data.error) {
			$("#blankRecords").html("Something went wrong");
		}
		else if (data.results.length > 0) {
			var i = 0;
			$("#blankRecords").html("");
			while(i < data.results.length) {
				var newCell = "<tr>";
				newCell = newCell + "<td><label><input class = \"check\" type=\"checkbox\"><span class=\"checkmark\"></span></label></td>"
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
				newEl = $(newCell);
				newEl.children('td').keypress(function(event) {
					if ( event.which == 13 ) {
					    event.preventDefault();
					}
				});

				$( "tbody" ).append(newEl);
				i++;
			}
		}
		else {
			$("#blankRecords").html("No records found");
		}
	});

	resize();
}
var allSelected = false;
function checkAll(event) {
	var cbs = $(".check");
	allSelected = true;
  	for(var i=0; i < cbs.length; i++) {
      	cbs[i].checked = event.target.checked;
  	}
}

function clearAdd() {
	var page = document.getElementById("contactOverlay");
	$(page).hide();
}