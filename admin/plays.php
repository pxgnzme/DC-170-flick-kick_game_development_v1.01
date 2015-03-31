<?php 
session_start();

if(isset($_SESSION['admin'])){

  require_once '../db_con/connection.php';

  $plays_table = "plays";

  $plays_query = "SELECT * FROM $plays_table WHERE NOT (end_date = 0) ORDER BY score DESC";

  $res_plays = mysql_query($plays_query);

  if($res_plays){

    $num_plays = mysql_num_rows($res_plays);

  }

  $uncomplete_plays_query = "SELECT * FROM $plays_table WHERE end_date = 0";

  $uncomplete_res_plays = mysql_query($uncomplete_plays_query);

  if($uncomplete_res_plays){

    $num_uncomplete_plays = mysql_num_rows($uncomplete_res_plays);

  }

  //-- DATE

  $date_query = "SELECT * FROM $plays_table WHERE NOT (end_date = 0) ORDER BY end_date ASC";

  $res_date = mysql_query($date_query);

  //-- player

  $players_query = "SELECT * FROM $plays_table ORDER BY avartar ASC";

  $res_players = mysql_query($players_query);

  if($res_players){

    $num_players = mysql_num_rows($res_players);

  }

  //

  $activePage = "plays";

}else{

  header("location:index.php");

}



?>

<!doctype html>
<!--[if lt IE 7 ]> <html class="no-js ie6 ie" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7 ie" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8 ie" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <html class="no-js ie9 ie" lang="en"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
  <head>
    <meta charset="utf-8" />

    <link href='http://fonts.googleapis.com/css?family=Raleway:100,400,800' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Roboto+Slab:700,400,100' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <meta name="robots" content="noindex">

    <title>Warriors flick kick : plays report</title>

    <link rel="stylesheet" href="../fonts/foundation-icons.css" />
    <link rel="stylesheet" href="../css/warriors-font.css?2" />
    
    <link rel="stylesheet" href="../css/admin.css?2" />

    <script src="../js/vendor/modernizr.js"></script>
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
    <script src="../js/foundation.min.js"></script>
    <script type="text/javascript" src="../js/html5Preloader.js"></script>
    <script src="../js/admin.js"></script>

<!--[if IE]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

  </head>

  <body id = "admin">

    <?php if(isset($_SESSION['admin'])){?>
    
    <?php include("../includes/admin_nav.php");?>

    <div id = "container" class = "row">

      <div class = "columns large-12 medium-12 small-12">

        <h1>Warriors flick kick - Plays</h1>

      </div>

      <div class = "columns large-4 medium-12 small-12">

        <div class= "panel">

          <h4><?=$num_plays?> Total completed plays</h4>
          <h4><?=$num_uncomplete_plays?> Total uncompleted plays</h4>
          <h4><?=$num_plays+$num_uncomplete_plays?> Total plays</h4>

        </div>

        <div class = "panel">

          <table width='100%'>

            <tbody>

              <?php 

              $cur_player = "nil";
              $count_players = 0;
              $pcount = 0;

              for($i=0;$i<$num_players;$i++){

                $players_row = mysql_fetch_array($res_players);

                if($players_row['avartar'] !== $cur_player){

                  if($cur_player == "nil"){

                    echo "<tr><td>".$players_row['avartar']."</td>";

                    $cur_player = $players_row['avartar'];

                    $count_players++;
                    $pcount++;

                  }else{

                    echo "<td>".round(($count_players/$num_players)*100)."%</td></tr><tr><td>".$players_row['avartar']."</td>";
                    
                    
                    $cur_player = $players_row['avartar'];

                    $count_players = 1;

                  }

                }else{

                  $count_players++;

                  if($i == ($num_players-1)){

                    echo "<td>".round(($count_players/$num_players)*100)."%</td></tr>";

                  }

                }

              }                

              ?>

            </tbody>

          </table>

        </div>

      </div>
      
      <div class = "large-8 medium-12 small-12 columns">

        <div class = "large-12 medium-12 small-12 columns">

          <div class="large-4 columns">

            <div class="row collapse prefix-radius">

              <div class="small-3 columns">

                <span class="prefix">year</span>

              </div>

              <div class="small-9 columns">

                <select class = "date_filter" data-sort="year">

                  <option value="-1">All</option>

                  <?php 

                    $cur_year;

                    for($i=0;$i<$num_plays;$i++){

                      $date_row = mysql_fetch_array($res_date);

                      if($cur_year != $date_row['year']){?>

                        <option value="<?=$date_row['year']?>"><?=$date_row['year']?></option>

                      <?php 

                      $cur_year = $date_row['year']; 

                      }

                    }

                  ?>

                </select>

              </div>

            </div>

          </div>

          <div class="large-4 columns">

            <div class="row collapse prefix-radius">

              <div class="small-3 columns">

                <span class="prefix">month</span>

              </div>

              <div class="small-9 columns">

                <select class = "date_filter" data-sort="month">

                  <option value="-1">All</option>
                  
                  <?php 

                    $cur_month;

                    for($i=0;$i<$num_plays;$i++){

                      mysql_data_seek($res_date, $i);  

                      $date_row = mysql_fetch_array($res_date);

                      if($cur_month != $date_row['month']){?>

                        <option value="<?=$date_row['month']?>">

                        <?php 

                          $monthNum  = $date_row['month'];
                          
                          $dateObj   = DateTime::createFromFormat('!m', $monthNum);

                          $monthName = $dateObj->format('F'); // March

                          echo $monthName;                          

                          ?>

                        </option>

                      <?php 

                      $cur_month = $date_row['month']; 

                      }

                    }

                  ?>

                </select>

              </div>

            </div>
            
          </div>

          <div class="large-4 columns">

            <div class="row collapse prefix-radius">

              <div class="small-3 columns">

                <span class="prefix">day</span>

              </div>

              <div class="small-9 columns">

                <select class = "date_filter" data-sort="day">

                  <option value="-1">All</option>

                  <?php 

                    $cur_day;

                    for($i=0;$i<$num_plays;$i++){

                      mysql_data_seek($res_date, $i);  

                      $date_row = mysql_fetch_array($res_date);

                      if($cur_day != $date_row['day']){?>

                        <option value="<?=$date_row['day']?>"><?=$date_row['day']?></option>

                      <?php 

                      $cur_day = $date_row['day']; 

                      }

                    }

                  ?>


                </select>

              </div>

            </div>
            
          </div>

        </div>

        <div class = "large-12 medium-12 small-12 columns">

          <table width="100%">

            <thead class = "table_head_plays">

              <tr>

                <td><a href="#" data-sort="user_id">User</a></td>
                <td><a href="#" data-sort="end_date">Date</a></td>
                <td>Time (H:M:S)</td>
                <td><a href="#" data-sort="score">Score</a></td>
                <td><a href="#" data-sort="level">Level</a></td>
                <td><a href="#" data-sort="avartar">Player</a></td>

              </tr>

            </thead>

            <tbody class = "table_content_plays">

              <?php for($i=0;$i<$num_plays;$i++){
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

            </tbody>

          </table>

        </div>

      </div>

    </div>

    <div id="userModal" class="reveal-modal" data-reveal>

      <div class = "columns large-12 text-center" id="user_text"></div>
      
      <a class="close-reveal-modal">&#215;</a>
      
    </div> 

    <?php }else{?>

    <h1>PLEASE LOGIN</h1>

    <?php }?>
  
    <!--  JAVASCRIPT -->

    <script>$(document).foundation();</script>

    <!-- -->

  </body>
</html>
