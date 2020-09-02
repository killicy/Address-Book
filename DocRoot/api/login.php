<?php
	$body = file_get_contents("php://input");
	$object = json_decode($body, true);

	var_dump($object);
	
