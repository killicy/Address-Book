<?php
	$inData = getRequestInfo();


	$conn = new mysqli("localhost", "dylan_dtilley", "lf+j3_7U%SZv", "dylan_addressbook");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "INSERT into Contacts (UserId,FirstName,LastName,Phone,Address,Email) VALUES ('". $inData["userId"] . "','" . $inData["firstName"] . "','" . $inData["lastName"] . "','" . $inData["phone"] . "','" . $inData["address"] . "','" . $inData["email"] . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$sql = "SELECT UserId, FirstName, LastName, Phone, Address, Email FROM Contacts where UserId = '". $inData["userId"] . "' and FirstName ='" . $inData["firstName"] . "'and LastName ='" . $inData["lastName"] . "'and Phone ='" . $inData["phone"] . "'and Address='" . $inData["address"] . "'and Email ='" . $inData["email"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			returnWithInfo($inData['firstName'], $inData['lastName'], $inData['userId'] );
		}

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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","Message":"Contact created"}';
		sendResultInfoAsJson( $retValue );
	}
?>
