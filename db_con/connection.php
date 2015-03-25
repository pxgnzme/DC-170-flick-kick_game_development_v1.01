<?php


$db = mysql_connect('heimdall.hosts.net.nz', 'breaking_mup', 'carbon123');

//$db = mysql_connect('localhost', 'root', 'root');

if(!$db){

	echo "error=There is an issue connecting to your db > ".mysql_error();

}

//$databaseName = "breaking_mup";

$databaseName = "breaking_flickkick";

$db_connect = mysql_select_db("$databaseName");

if(!$db_connect){

	echo "<br/>error=There was a porblem connecting the database >".mysql_error();

}

date_default_timezone_set('Pacific/Auckland');

?>