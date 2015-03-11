<?php 

require_once 'includes/Mobile_Detect.php';
$detect = new Mobile_Detect;

//$testing = false;
?>


<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />

    <link href='http://fonts.googleapis.com/css?family=Raleway:100,400,800' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Roboto+Slab:700,400,100' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Warriors 3D projection</title>

    <link rel="stylesheet" href="fonts/foundation-icons.css" />
    <link rel="stylesheet" href="css/screen.css?2" />

    <script src="js/vendor/modernizr.js"></script>
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="js/html5Preloader.js"></script>

    <script src="js/jquery.fullscreen-min.js"></script>

<!--[if IE]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

  </head>

  <body id = "game">

    <?php if ( !$detect->isMobile() ) { ?>

    <div id = "container">

    <?php } ?>

    <section id = "loading" class = "current stage">

      <h2>LOADING...</h2>

    </section>

    <section id = "stage1" class = "stage">

      <div class = "init_info">

        <div id="init_logo_p" class = "show-for-portrait large-12 medium-6 small-8 large-centered medium-centered small-centered column"><img src="img/game_logo.png" alt= "Vodafone Warriors 20 years Flick Kick"/><a href="#" class = "btn enter_btn"><img src="img/play_now_btn.png" alt=""/></a></div>

        <div id="init_logo_l" class = "show-for-landscape large-12 medium-4 small-4 large-centered medium-centered small-centered column"><img src="img/game_logo.png" alt= "Vodafone Warriors 20 years Flick Kick"/><a href="#" class = "btn enter_btn"><img src="img/play_now_btn.png" alt=""/></a></div>

      </div>

    </section>

    <section id = "stage2" class = "stage">

      <div class = "init_info">

        <div class = "large-12 medium-10 small-12 large-centered medium-centered small-centered column">

          <div id = "w-logo" class = "large-6 medium-4 small-4 large-centered medium-centered small-centered column"><img src="img/warriors-logo.png" alt=""/></div>

          <div class = "large-12 medium-12 small-12 large-centered medium-centered small-centered column">

            <h3>Login or sign up to play</h3>
          <p>So we know who to send the prizes to when you win.</p>

          </div>

          <div class = "row large-8 medium-12 small-10 large-centered medium-centered small-centered column">

            <div class = "large-6 medium-6 small-8 column small-centered">
              <a href="#" id="login_btn" class = "btn"><img src="img/login_btn.png" alt=""/></a>
            </div>

            <div class = "large-6 medium-6 small-8 column small-centered">
              <a href="#" id="signup_btn" class = "btn"><img src="img/signup_btn.png" alt=""/></a>
            </div>

          </div>


        </div>

  

      </div>

    </section>

    <section id = "stage3" class = "stage">

      <section id = "bg1" class = "bg"></section>
      <section id = "bg2" class = "bg"></section>
      <section id = "bg3" class = "bg"></section>

      <section id = "sky" class = "sky"></section>

      <section id = "grass1" class = "grass"></section>
      <section id = "grass2" class = "grass"></section>
      <section id = "grass3" class = "grass"></section>

      <section id = "game_container"></section>

      <section id = "line1" class = "line"></section>
      <section id = "line2" class = "line"></section>
      <section id = "line3" class = "line"></section>

      <section id = "game_skin">

        <header class = "row">

          <div class = "columns large-4 medium-4 small-4 text-left">

            <i class="fi-target"></i> <span id= "score-fraction">0/0</span> <span id= "score-percent"><i class="fi-star"></i></span>

          </div>

          <div class = "columns large-4 medium-4 small-4 text-center">

            <span class= "avartar_container"><span class = "avartar"><img src="img/player_01.jpg" alt=""/></span></span>
            
          </div>

          <div class = "columns large-4 medium-4 small-4 text-right">

            <span class= "time score_board"><i class="fi-clock"></i> <span id= "time-secs">00</span></span>
            
          </div>

        </header>

        <footer>

          <div class = "columns large-6 medium-6 small-6 text-left">

            <i class="fi-torso"></i> <span class= "uName">User</span>
            
          </div>

          <div class = "columns large-6 medium-6 small-6 text-right">

            
            <span class = "wind_graphic"><span class = "wind-indicator wind-left"><i class="fi-arrow-left"></i></span><span class= "wind info_board"></span><span class = "wind-indicator wind-right"><i class="fi-arrow-right"></i></span></span>
            
          </div>

        </footer>

      </section>

      <section id = "result_container"></section>

      <div id="action_layer"></div>

    </section>

    <div id = "endLevel" class = "stage row">

      <div class="row">

        <div id = "level_screen" class = "large-6 medium-8 small-10 large-centered medium-centered small-centered columns"></div>

      </div>

    </div>

    <section id = "endGame" class = "stage"></section>

    <?php }else{ ?>

    <section id = "stage1" class = "current stage">

      <div class = "init_info">

        <div class = "large-8 medium-6 small-8 large-centered medium-centered small-centered column"><img src="img/game_logo.png" alt= "Vodafone Warriors 20 years Flick Kick"/>
          <p>This game is built to be played on a smartphone please load this page in your smartphones mobile browser or scan this QR code:</p>

          <img src="img/qrcode.28098220.png" alt=""/>

        </div>

        

      </div>

    </section>

    <?php } ?>

    <!--  JAVASCRIPT -->
    <script src="http://hammerjs.github.io/dist/hammer.js"></script>
    <script src="js/custom.js?2"></script>
    <script src="js/flickKick.js?1"></script>
    <!-- -->

  </body>
</html>
