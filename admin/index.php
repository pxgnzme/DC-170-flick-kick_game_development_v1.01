<?php 

session_start();

if(isset($_SESSION['admin'])){

  require_once '../db_con/connection.php';

  $users_table = "user";

  $users_query = "SELECT * FROM $users_table ORDER BY high_score DESC";

  $res_users = mysql_query($users_query);

  if($res_users){

    $num_users = mysql_num_rows($res_users);

  }else{

    echo "error getting users";

  }

  $rank = 1;

  $activePage = "users";

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

    <title>Warriors flick kick : reports</title>

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

        <h1>Warriors flick kick - Users</h1>

      </div>

      <div class = "columns large-4 medium-12 small-12">

        <a href = "export_csv.php" target="_blank" class = "button expand">Download newsletter signups</a>

        <div class= "panel">

          <h4><?=$num_users?> Users</h4>

        </div>

      </div>
      
      <div class = "large-8 medium-12 small-12 columns">

        <table width="100%">

          <thead class = "table_head">

            <tr>

              <td>Rank</td>
              <td><a href="#" data-sort="name">Name</a></td>
              <td><a href="#" data-sort="fb_id">Facebook</a></td>
              <td>Email</td>
              <td><a href="#" data-sort="high_score">High score</a></td>
              <td><a href="#" data-sort="plays">Plays</a></td>
              <td><a href="#" data-sort="date_signup">Date signup</a></td>

            </tr>

          </thead>

          <tbody class = "table_content">

            <?php for($i=0;$i<$num_users;$i++){
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

            <?php $rank++;?>

            <?php } ?>

          </tbody>

        </table>

      </div>



    </div>

    <?php }else{?>

    <div class = "row">

      <div class = "columns large-12">

        <h1>Please login to access</h1>

        <form data-abide="ajax" id = "login_form">

          <div class="name-field">

            <label>Username:

              <input type="text" required class = "serial" name="username">

            </label>

            <small class="error">Username is required.</small>

          </div>

          <div class="email-field">

            <label>Password:

              <input type="password" required class = "serial" name="password">

            </label>

            <small class="error">Password is required.</small>

          </div>

          <button type="submit">Submit</button>

        </form>

      </div>

    </div>

    <?php }?>
  
    <!--  JAVASCRIPT -->

    <script>$(document).foundation();</script>

    <!-- -->

  </body>
</html>
