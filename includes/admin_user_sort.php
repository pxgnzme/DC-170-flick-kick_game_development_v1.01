<?php 

require_once '../db_con/connection.php';

$sort = $_POST['sort'];

$_SESSION['users_sort'] = $sort;

$users_table = "user";

$users_query = "SELECT * FROM $users_table ORDER BY $sort DESC";

$res_users = mysql_query($users_query);

if($res_users){

  $num_users = mysql_num_rows($res_users);

}else{

  echo "error getting users";

}

$rank = 1;

for($i=0;$i<$num_users;$i++){
  $user_row = mysql_fetch_array($res_users);?>
<tr>

  <td><?=$rank?></td>
  <td><?=$user_row['name']?></td>
  <td><?php 

      if($user_row['fb_id'] != ""){

        echo "<a target='_blank' href='http://facebook.com/".$user_row['fb_id']."' class = 'admin_fbpic'><img src='http://graph.facebook.com/".$user_row['fb_id']."/picture?type=square' alt=''/></a>";

      }
    ?></td>
  <td><?=$user_row['email']?></td>
  <td><?=$user_row['high_score']?></td>
  <td><?=$user_row['plays']?></td>
  <td><?=date("d/m/y",$user_row['date_signup'])?></td>

</tr>

<?php 

$rank++;

} ?>

         