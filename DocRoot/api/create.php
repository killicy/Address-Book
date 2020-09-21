<?php

require_once("../config.php");
$inData = getRequestInfo();

$id = 0;
$firstName = "";
$lastName = "";

// $sql = "SELECT ID,firstName,lastName FROM Users where Login='" . $inData["login"] . "' and Password='" . $inData["password"] . "'";
try {
	$stmt = $msql_connection->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=:user");
	$stmt->execute([
		'user' => $inData["login"],
	]);

	$user = $stmt->fetch();
	if (!empty($user)) {
		returnWithError("User Name Already Exists!");
		exit();
	}
	else {
		// $sql = "INSERT INTO Users (Login,Password,FirstName,LastName) VALUES ('".$inData["login"] . "','" . $inData["password"] . "','" . $inData["firstname"] . "','" . $inData["lastname"] . "')";
		$stmt = $msql_connection->prepare("INSERT INTO Users (Login, Password, FirstName, LastName) VALUES (:user, :password, :firstname, :lastname)");
		 $stmt->execute([
		 	'user' => $inData["login"],
		 	'password' => $inData["password"],
		 	'firstname' => $inData["fname"],
		 	'lastname' =>  $inData["lname"],
		 ]);

		returnWithInfo($inData["fname"], $inData["lname"], $inData['login']);
	}
}
catch(Exception $e) {
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

function returnWithInfo( $firstName, $lastName, $loginName )
{
	$retValue = '{"loginName":"' . $loginName . '","firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
	sendResultInfoAsJson( $retValue );
}