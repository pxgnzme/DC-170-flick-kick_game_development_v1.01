<?php 

session_start();
include('../db_con/connection.php');

$nonce = $_POST['nonce'];
$avartar = $_POST['avartar'];
$avartarId = $_POST['avartarId'];

$today = time();

if($nonce == $_SESSION['nonce']){

	$plays_table = "plays";

	$uid = $_SESSION["user_id"];

	$plays_query = "INSERT INTO $plays_table (user_id, start_date, avartar, avartar_id) VALUES('$uid', '$today', '$avartar', '$avartarId')";
	
	$plays_res = mysql_query($plays_query);

	if($plays_res){

		$play_id = mysql_insert_id($db);

		$_SESSION['play_id'] = $play_id;

		die(json_encode(array("status"=>true, "play_id"=>$play_id)));

	}else{

		die(json_encode(array("status"=>false, "error"=>"insert error : @ins")));

	}	

}else{

	die(json_encode(array("status"=>false, "error"=>"ses")));

}


?>