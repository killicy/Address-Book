<?php

require_once("../config.php");
$inData = getRequestInfo();

try {
	// $sql = "SELECT FirstName, LastName, Phone, Address, Email, UserID from Contacts where FirstName like '%" . $inData["search"] . "%' and UserID= '" . $inData["userId"] ."'";
	// Allow using the same named parameters more than once.
	$msql_connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
	$stmt = $msql_connection->prepare("SELECT * FROM Contacts WHERE (FirstName LIKE :search OR LastName LIKE :search OR Address LIKE :search OR Email LIKE :search OR Phone LIKE :search) AND UserID=:userId");
	$stmt->execute([
		'userId' => $inData["userId"],
		'search' => "%" . $inData["search"] . "%",
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
	$retValue = '{"error":"' . $err . '"}';
	sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $searchResults )
{
	$retValue = '{"results":' . $searchResults . ',"error":""}';
	sendResultInfoAsJson( $retValue );
}

