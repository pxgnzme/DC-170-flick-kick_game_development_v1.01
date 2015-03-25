<?php 

session_start();
include('../db_con/connection.php');

$form_data = $_POST['formdata'];
parse_str($form_data);

if($nonce == $_SESSION['nonce']){

	$login_table = "user";

	$login_where = "WHERE email = '$email_login' AND password = '$pword_login'";

	if(!empty($fb_id)){

		$login_where = "WHERE fb_id = '$fb_id'";

	}

	$login_query = "SELECT * FROM $login_table $login_where";

	$login_res = mysql_query($login_query);

	if($login_res){

		$number_matches = mysql_num_rows($login_res);

		if($number_matches < 1){

			die(json_encode(array("status"=>false, "error"=>"mat")));

		}else{

			$user_row = mysql_fetch_array($login_res);

			$_SESSION['user_id'] = $user_row['id'];
			
			die(json_encode(array("status"=>true, "user_id"=>$user_row['id'], 'user_name'=>$user_row['name'])));
			
		}

	}else{

		die(json_encode(array("status"=>false, "error"=>"server error : @log")));

	}

}else{

	die(json_encode(array("status"=>false, "error"=>"ses")));

}


?>