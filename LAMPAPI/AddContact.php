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

?>
