<?php 

session_start();
include('../db_con/connection.php');

$nonce = $_POST['nonce'];
$score = $_POST['score'];
$level = $_POST['level'];
$play_id = $_SESSION['play_id'];

$today = time();

$day = date("j");
$month = date("n");
$year = date("Y");

if($nonce == $_SESSION['nonce']){

	$score_table = "plays";

	$score_query = "UPDATE $score_table SET end_date = '$today', score = '$score', level = '$level', day = '$day', month = '$month', year = '$year' WHERE id = '$play_id'";
	
	$score_res = mysql_query($score_query);

	if($score_res){

		die(json_encode(array("status"=>true)));

	}else{

		die(json_encode(array("status"=>false, "error"=>"update error : @upd")));

	}	

}else{

	die(json_encode(array("status"=>false, "error"=>"ses")));

}


?>