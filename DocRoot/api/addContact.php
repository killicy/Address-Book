<?php

require_once("../config.php");
$inData = getRequestInfo();

// $sql = "SELECT FirstName, LastName, Phone, Address, Email, UserID from Contacts where UserID like '". $inData["userId"] . "'and FirstName='" . $inData["firstName"] . "'and LastName='" . $inData["lastName"] . "'and Phone='" . $inData["phone"] . "'and Address='" . $inData["address"] . "'and Email='" . $inData["email"] . "'";
try {
	$stmt = $msql_connection->prepare("SELECT ContactID FROM Contacts WHERE UserID LIKE :userId AND FirstName=:fname AND LastName=:lname AND Phone=:phone AND Address=:address AND Email=:email");
	$stmt->execute([
		'userId' => $inData["userId"],
		'fname' => $inData["firstName"],
		'lname' => $inData["lastName"],
		'phone' => $inData["phone"],
		'address' => $inData["address"],
		'email' => $inData["email"],
	]);
	
	$contact = $stmt->fetch();

	if (!empty($contact)) {
		returnWithError("Contact for this UserID already exists!");
		exit();
	}
	else {
		// $sql = "INSERT into Contacts (UserId,FirstName,LastName,Phone,Address,Email) VALUES ('". $inData["userId"] . "','" . $inData["firstName"] . "','" . $inData["lastName"] . "','" . $inData["phone"] . "','" . $inData["address"] . "','" . $inData["email"] . "')";
		$stmt = $msql_connection->prepare("INSERT INTO Contacts (UserId, FirstName, LastName, Phone, Address, Email) VALUES (:userId, :fname, :lname, :phone, :address, :email)");
		$stmt->execute([
			'userId' => $inData["userId"],
			'fname' => $inData["firstName"],
			'lname' => $inData["lastName"],
			'phone' => $inData["phone"],
			'address' => $inData["address"],
			'email' => $inData["email"],
		]);

		returnWithInfo($inData['firstName'], $inData['lastName'], $inData['userId'] );
	}
}
catch (Exeception $e) {
	returnWithError("Failed while executing query:" . $e->getMessage());
}

function getRequestInfo()
{
	return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
	header('Content-type: application/json');
	echo $obj;
}

function returnWithError( $err )
{
	$retValue = '{"error":"' . $err . '"}';
	sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $firstName, $lastName, $id )
{
	$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","Message":"Contact created", "error":""}';
	sendResultInfoAsJson( $retValue );
}

