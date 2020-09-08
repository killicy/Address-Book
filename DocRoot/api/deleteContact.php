<?php

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "dylan_dtilley", "lf+j3_7U%SZv", "dylan_addressbook");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT ID,firstName,lastName from Contacts where FirstName like '" . $inData["firstName"] . "' and LastName like '" . $inData["lastName"] . "' and UserID like '" . $inData["userId"] . "'";
		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			$sql = "DELETE from Contacts where FirstName like '" . $inData["firstName"] . "' and LastName like '" . $inData["lastName"] . "' and UserID like '" . $inData["userId"] . "'";
			$conn->query($sql);
			$sql = "SELECT from Contacts where FirstName like '" . $inData["firstName"] . "' and LastName like '" . $inData["lastName"] . "' and UserID like '" . $inData["userId"] . "'";
			$result = $conn->query($sql);
			if ($result->num_rows == 0){
							returnWithInfo("Deleted contact");
						}

		}
		else
		{
			returnWithError( "No Records Found" );
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

	function returnWithInfo( $msg)
		{
			$retValue = '{"Message":"' . $msg . '"}';
			sendResultInfoAsJson( $retValue );
		}

?>
