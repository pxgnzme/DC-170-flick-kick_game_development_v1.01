<?php 

require_once '../db_con/connection.php';

$uid = $_POST['uid'];

$users_table = "user";

$users_query = "SELECT * FROM $users_table WHERE id = '$uid'";

$res_users = mysql_query($users_query);

if($res_users){

  $user_row = mysql_fetch_array($res_users);

}

if($user_row['fb_id'] != ""){

  echo "<a target='_blank' href='http://facebook.com/".$user_row['fb_id']."' class = 'admin_fbpic'><img src='http://graph.facebook.com/".$user_row['fb_id']."/picture?type=square' alt=''/></a>";

}

echo "<h4>".$user_row['name']."</h4>";

echo "<p>".$user_row['email']."</p>";

echo "<p>Date signed up : ".date("d/m/y",$user_row['date_signup'])."</p>";

?>
         