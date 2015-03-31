<?php 

session_start();

require_once '../db_con/connection.php';

$sort = $_POST['sort'];

if($sort == -1){

  if(isset($_SESSION['play_sort'])){

    $sort = $_SESSION['play_sort'];

  }else{

    $sort = "score";

  }

}else{

  $_SESSION['play_sort'] = $sort;

}

$year = $_POST['year'];
$month = $_POST['month'];
$day = $_POST['day'];

$date_sort = "";

if($year == -1){

}else{

  $date_sort = $date_sort."AND year = ".$year." ";

}

if($month == -1){

}else{

  $date_sort = $date_sort."AND month = ".$month." ";

}

if($day == -1){

}else{

  $date_sort = $date_sort."AND day = ".$day." ";

}

$plays_table = "plays";

$plays_query = "SELECT * FROM $plays_table WHERE !(end_date = 0) $date_sort ORDER BY $sort DESC";

$res_plays = mysql_query($plays_query);

if($res_plays){

  $num_plays = mysql_num_rows($res_plays);

}else{

  echo "error getting users";

}

echo "date sort str :> ".$date_sort." :: day :> ".$day*100;

for($i=0;$i<$num_plays;$i++){ 
  $play_row = mysql_fetch_array($res_plays);?>

<tr>

  <td><a href="#" class = "user_info" data-uid="<?=$play_row['user_id']?>"><?=$play_row['user_id']?></a></td>
  <td><?=date("d/m/y G:i",$play_row['start_date'])?></td>
  <td><?=gmdate("H:i:s", $play_row['end_date']-$play_row['start_date']);?></td>
  <td><?=$play_row['score']?></td>
  <td><?=$play_row['level']?></td>
  <td><?=$play_row['avartar']?></td>

</tr>

<?php } ?>

         