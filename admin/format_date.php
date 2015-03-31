<?php 

require_once '../db_con/connection.php';

$users_table = "user";

$users_query = "SELECT * FROM $users_table";

$res_users = mysql_query($users_query);

if($res_users){

  $num_users = mysql_num_rows($res_users);

  for($i=0;$i<$num_users;$i++){

    $user_row = mysql_fetch_array($res_users);

    $format_date = date('d/m/Y',$user_row['date_signup']);

    $userId = $user_row['id'];

    $update_query = "UPDATE $users_table SET date_format = '$format_date' WHERE id = '$userId'";

    $res_update = mysql_query($update_query);

    if($res_update){

      echo "update successfull :> ".$user_row['id'];

    }else{

      echo "!! update un-successfull :> ".$user_row['id'];

    }    

  }

}else{

  echo "error getting users";

}

?>

