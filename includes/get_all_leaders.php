<?php 

session_start();
include('../db_con/connection.php');

$nonce = $_POST['nonce'];

$users = array();

$limit = 10;

$cur_rank = 1;

if($nonce == $_SESSION['nonce']){

	$plays_table = "plays";

	$plays_query = "SELECT * FROM $plays_table ORDER BY score DESC";
	
	$plays_res = mysql_query($plays_query);

	if($plays_res){

		$num_of_plays = mysql_num_rows($plays_res);

		$leaders_html = "<table class = 'leaders'>";

		for($i=0;$i<$num_of_plays;$i++){

			$play_row = mysql_fetch_array($plays_res);

			if(!in_array($play_row['user_id'],$users) && $cur_rank <= $limit){

				array_push($users,$play_row['user_id']);

				$leaders_html = $leaders_html."<tr>";

				$user_table = "user";

				$user_query = "SELECT * FROM $user_table WHERE id = '".$play_row['user_id']."'"; 

				$user_res = mysql_query($user_query);

				$user_row = mysql_fetch_array($user_res);

				//$user_name = $user_row[]

				$leaders_html = $leaders_html."<td class='leaders_rank text-center'>".$cur_rank."</td><td class = 'leaders_score text-center'>".$play_row['score']."</td><td class = 'leaders_name text-center'>".$user_row['name']."</td><td class = 'leaders_avartar text-center'><img src='img/player_0".$play_row['avartar_id'].".jpg' alt=''/></td>";

				$leaders_html = $leaders_html."</tr>";

				$cur_rank++;

			}

		}

		$leaders_html = $leaders_html."</table>";

		die(json_encode(array("status"=>true,"html"=>$leaders_html,"users"=>$users)));

	}else{

		die(json_encode(array("status"=>false, "error"=>"update error : @pla")));

	}	

}else{

	die(json_encode(array("status"=>false, "error"=>"ses")));

}


?>