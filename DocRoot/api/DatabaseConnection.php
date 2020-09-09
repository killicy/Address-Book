<?php
namespace api;
use PDO;

class DatabaseConnection extends PDO {	
	
	public function __construct($host, $db, $user, $pass) {
		$charset = 'utf8mb4';

		$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
		$options = [
		    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
		    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		    PDO::ATTR_EMULATE_PREPARES   => false,
		];
		parent::__construct($dsn, $user, $pass, $options);
	}
}