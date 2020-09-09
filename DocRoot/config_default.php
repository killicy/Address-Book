<?php
	use api\DatabaseConnection;

	spl_autoload_register(function($classname) {
		include $classname . '.php';
	});

	$msql_database = "testdb";
	$msql_host = "mariadb";
	$msql_user = "testuser";
	$msql_password = "testpassword";
	
	try {
		$msql_connection = new DatabaseConnection($msql_host, $msql_database, $msql_user, $msql_password);
	}
	catch(Exception $e) {
		print_r($e->getMessage());
	}
