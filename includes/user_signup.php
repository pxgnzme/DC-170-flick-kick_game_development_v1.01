<?php 

session_start();
include('../db_con/connection.php');

$form_data = $_POST['formdata'];
parse_str($form_data);

$today = time();

$format_date = date('d/m/Y',$today);

if($nonce == $_SESSION['nonce']){

	$signup_table = "user";

	$dup_where = "WHERE email = '$email_signup'";

	if(!empty($fb_id)){

		$dup_where = "WHERE fb_id = '$fb_id'";

	}

	$dub_query = "SELECT * FROM $signup_table $dup_where";


	$dup_res = mysql_query($dub_query);

	if($dup_res){

		$number_dups = mysql_num_rows($dup_res);

		if($number_dups > 0){

			die(json_encode(array("status"=>false, "error"=>"dup")));

		}else{

			if(!empty($fb_id)){

				$signup_query = "INSERT INTO $signup_table (date_signup, name, email, password, fb_id, date_format) VALUES('$today', '$name_signup', '$email_signup', '$pword_signup', '$fb_id','$format_date')";
			}else{

				$signup_query = "INSERT INTO $signup_table (date_signup, name, email, password, date_format) VALUES('$today', '$name_signup', '$email_signup', '$pword_signup','$format_date')";

			}

			$signup_res = mysql_query($signup_query);

			if($signup_res){

				$user_id = mysql_insert_id($db);

				$_SESSION['user_id'] = $user_id;

				die(json_encode(array("status"=>true, "user_id"=>$user_id, 'user_name'=>$name_signup, 'today'=>$today,'newsletter'=>$newsletter)));

			}else{

				die(json_encode(array("status"=>false, "error"=>"insert error : @ins")));

			}

		}

	}else{

		die(json_encode(array("status"=>false, "error"=>"server error : @dup :> ".$number_dups)));

	}

}else{

	die(json_encode(array("status"=>false, "error"=>"ses")));

}


?>