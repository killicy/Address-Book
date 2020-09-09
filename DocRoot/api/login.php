<?php

require_once("../config.php");
$inData = getRequestInfo();

$id = 0;
$firstName = "";
$lastName = "";

// $sql = "SELECT ID,firstName,lastName FROM Users where Login='" . $inData["login"] . "' and Password='" . $inData["password"] . "'";
$stmt = $msql_connection->prepare("SELECT ID,firstName,lastName FROM Users where Login=:user AND Password=:pass");
$stmt->execute([
	'user' => $inData["login"],
	'pass' => $inData["password"]
]);
$user = $stmt->fetch();

if (!empty($user)) {
	returnWithInfo($user['firstName'], $user['lastName'], $user['ID']);
}
else {
	returnWithError("No Records Found");
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

function returnWithInfo( $firstName, $lastName, $id )
{
	$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
	sendResultInfoAsJson( $retValue );
}