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

		$users_table = "user";

		$userid = $_SESSION['user_id'];

		$user_query = "SELECT * FROM $users_table WHERE id='$userid'";

		$res_user = mysql_query($user_query);

		if($res_user){

			$user_row = mysql_fetch_array($res_user);

			$update = "plays = plays+1, avartar_id='".$_SESSION['avartar_id']."'";

			if($score > $user_row['high_score']){

				$hs = $user_row['high_score'];

				$update = $update.", high_score = '".$score."'";

			}

			$update_user = "UPDATE $users_table SET $update WHERE id = '$userid'";

			$res_update = mysql_query($update_user);

			if($res_update){

				die(json_encode(array("status"=>true)));

			}else{

				die(json_encode(array("status"=>false, "error"=>"update error : @UPU")));

			}

		}else{

			die(json_encode(array("status"=>false, "error"=>"update error : @USR")));
		}

	}else{

		die(json_encode(array("status"=>false, "error"=>"update error : @upd")));

	}	

}else{

	die(json_encode(array("status"=>false, "error"=>"ses")));

}


?>