<?php

	$inData = getRequestInfo();

	$id = 0;
	$firstName = "";
	$lastName = "";

	$conn = new mysqli("localhost", "dylan_dtilley", "lf+j3_7U%SZv", "dylan_addressbook");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{

		$sql = "SELECT ID FROM Users where Login='" . $inData["login"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			returnWithError( "User Name Already Exists!" );
			exit();

		}

		$sql = "INSERT INTO Users (Login,Password,FirstName,LastName) VALUES ('".$inData["login"] . "','" . $inData["password"] . "','" . $inData["firstname"] . "','" . $inData["lastname"] . "')";
		$result = $conn->query($sql);
		$conn->close();
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

?>
