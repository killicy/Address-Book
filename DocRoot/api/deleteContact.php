<?php

require_once("../config.php");
$inData = getRequestInfo();

// $sql = "SELECT ID,firstName,lastName from Contacts where FirstName like '" . $inData["firstName"] . "' and LastName like '" . $inData["lastName"] . "' and UserID like '" . $inData["userId"] . "'";
try {
	$stmt = $msql_connection->prepare("SELECT ContactID FROM Contacts WHERE ContactID=:contactId AND UserID=:userId");
	$stmt->execute([
		'userId' => $inData["userId"],
		'contactId' => $inData["contactId"],
	]);

	$contact = $stmt->fetch();
	
	if (empty($contact)) {
		returnWithError("No Records Found");
		exit();
	}
	else {
		// $sql = "DELETE from Contacts where FirstName like '" . $inData["firstName"] . "' and LastName like '" . $inData["lastName"] . "' and UserID like '" . $inData["userId"] . "'";
		$stmt = $msql_connection->prepare("DELETE FROM Contacts WHERE ContactID=:contactId AND UserID=:userId");
		$stmt->execute([
			'userId' => $inData["userId"],
			'contactId' => $inData["contactId"],
		]);

		returnWithInfo("Contact deleted");
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

