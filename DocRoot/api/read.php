<?php

require_once("../config.php");
$inData = getRequestInfo();

try {
	// $sql = "SELECT FirstName, LastName, Phone, Address, Email, UserID from Contacts where FirstName like '%" . $inData["search"] . "%' and UserID= '" . $inData["userId"] ."'";
	$stmt = $msql_connection->prepare("SELECT * FROM Contacts WHERE UserID=:userId");
	$stmt->execute([
		'userId' => $inData["userId"],
	]);
 	
 	$results = [];
	while ($contact = $stmt->fetch()) {
	 	$results[] = $contact;
	} 
	
	returnWithInfo(json_encode($results));

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
	$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
	sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $searchResults )
{
	$retValue = '{"contacts":' . $searchResults . ',"error":""}';
	sendResultInfoAsJson( $retValue );
}

