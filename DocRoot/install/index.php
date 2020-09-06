<?php

require_once("../config.php");
$sql = file_get_contents('dylan_addressbook.sql');

try {
	$msql_connection->exec('DROP DATABASE testdb;');
	$msql_connection->exec('CREATE DATABASE testdb;');
	$msql_connection->exec('USE testdb');
	$msql_connection->exec($sql);
}
catch (Exception $e) {
	print_r($e->getMessage());
	exit();
}

print('Install successful.');