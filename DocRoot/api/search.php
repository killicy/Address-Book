<?php

	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "dylan_dtilley", "lf+j3_7U%SZv", "dylan_addressbook");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT FirstName, LastName, Phone, Address, Email, UserID from Contacts where FirstName like '%" . $inData["search"] . "%' and UserID= '" . $inData["userId"] ."'";
		#$sql = "SELECT ID,firstName,lastName FROM Users where Login='" . $inData["login"] . "' and Password='" . $inData["password"] . "'";
		$result = $conn->query($sql);


		$searchCount = $result->num_rows;
		if($searchCount > 0){
			while ($searchCount > 0)
			{

				$row = $result->fetch_assoc();

				$thisJsonObject = '{"UserID":" '. $row["UserID"] . ' " , "FirstName" : " ' . $row["FirstName"] . ' ", "LastName" : " ' . $row["LastName"] . ' ", "Phone" : " ' . $row["Phone"] . ' ", "Address" : " ' . $row["Address"] . ' ", "Email" : " ' . $row["Email"] . ' "}';
				$searchResults .= $thisJsonObject;

					if( $searchCount != 1 )
					{
						$searchResults .= ",";
					}
					$searchCount--;

			}
		}

		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}

	returnWithInfo( $searchResults );

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
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
