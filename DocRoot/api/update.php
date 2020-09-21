<?php

require_once("../config.php");
$inData = getRequestInfo();

try {
	$stmt = $msql_connection->prepare("SELECT * FROM Contacts WHERE UserID LIKE :userId AND ContactID=:contactId");
	$stmt->execute([
		'userId' => $inData["userId"],
		'contactId' => $inData["contactId"],
	]);
	
	$contact = $stmt->fetch();
	
	if (empty($contact)) {
		returnWithError("No contact found");
		exit();
	}
	else {
		$stmt = $msql_connection->prepare("UPDATE Contacts SET FirstName=:fname, LastName=:lname, Phone=:phone, Address=:address, Email=:email WHERE UserID LIKE :userId AND ContactID=:contactId");
		$stmt->execute([
			'contactId' => $inData["contactId"],
			'userId' => $inData["userId"],
			'fname' => $inData["firstName"],
			'lname' => $inData["lastName"],
			'phone' => $inData["phone"],
			'address' => $inData["address"],
			'email' => $inData["email"],
		]);

		// returnWithInfo($inData['firstName'], $inData['lastName'], $inData['userId'] );
		returnWithInfo("Contact updated");
	}
}
catch (Exeception $e) {
	returnWithError("Failed while executing query:" . $e->getMessage());
}

function getRequestInfo() {
	return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj ) {
	header('Content-type: application/json');
	echo $obj;
}

function returnWithError( $err ) {
	$retValue = '{"error":"' . $err . '"}';
	sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $msg) {
	$retValue = '{"Message":"' . $msg . '"}';
	sendResultInfoAsJson( $retValue );
}

