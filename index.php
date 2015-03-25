<?php 

session_start();
require_once 'db_con/connection.php';

if(!isset($_SESSION['nonce'])){

  $nonce = hash("md5",rand().time().rand());
  $_SESSION['nonce'] = $nonce;

}

require_once 'includes/Mobile_Detect.php';
$detect = new Mobile_Detect;

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

    <meta property="og:url" content="http://warriors.flickkick.co.nz">
    <meta property="og:title" content="NZ Warriors flick kick">
    <meta property="og:site_name" content="NZ Warriors flick kick">
    <meta property="og:description" content="Flick kick and win prizes with the Vodafone Warriors">
    <!--<meta property="og:image" content="http://warriors.flickkick.co.nz/img/game_logo.png">-->
    <meta property="og:image" content="http://warriors.flickkick.co.nz/img/share_icon_2.png">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="600">
    <meta property="og:image:height" content="600">

    <meta property="fb:app_id" content="837218189705277">

    <title>Warriors flick kick</title>

    <link rel="stylesheet" href="fonts/foundation-icons.css" />
    <link rel="stylesheet" href="css/warriors-font.css?2" />
    
    <link rel="stylesheet" href="css/screen.css?2" />

    <script type="text/javascript">

    <?php if ( $detect->isMobile() ) {?>

      var mobile = true;

    <?php }else{?>

      var mobile = false;

    <?php } ?>



    <?php if(isset($_SESSION['nonce'])){?>

      var nonce = "<?=$_SESSION['nonce']?>";

    <?php } ?>

    </script>

    <script src="js/vendor/modernizr.js"></script>
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
    <script src="js/foundation.min.js"></script>
    <script type="text/javascript" src="js/html5Preloader.js"></script>

    <script src="js/jquery.fullscreen-min.js"></script>

<!--[if IE]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-61001628-1', 'auto');
    ga('send', 'pageview');

  </script>

  </head>

  <body id = "game" <?php if( $detect->isMobile()) {?>class = 'mob'<?php } ?> >
  <div id="fb-root"></div>
  <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '837218189705277',
          xfbml      : true,
          version    : 'v2.1'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    </script>

    <div id = "container">

    <section id = "loading" class = "current stage">

      <h2>LOADING...</h2>

    </section>

    <section id = "stage1" class = "stage">

      <div class = "init_info">

        <div id="init_logo_p" class = "show-for-portrait large-12 medium-6 small-8 large-centered medium-centered small-centered column"><img src="img/game_logo.png" alt= "Vodafone Warriors 20 years Flick Kick"/><a href="#" class = "btn enter_btn button secondary radius">PLAY NOW</a></div>

        <div id="init_logo_l" class = "show-for-landscape large-12 medium-4 small-4 large-centered medium-centered small-centered column"><img src="img/game_logo.png" alt= "Vodafone Warriors 20 years Flick Kick"/><a href="#" class = "btn enter_btn button secondary radius">PLAY NOW</a></div>

      </div>

    </section>

    <section id = "stage2" class = "stage">

      <div class = "init_info">

        <div class = "large-12 medium-10 small-12 large-centered medium-centered small-centered column">

          <div id = "w-logo" class = "large-6 medium-4 small-4 large-centered medium-centered small-centered column"><img src="img/warriors-logo.png" alt=""/></div>

          <div class = "large-12 medium-12 small-12 large-centered medium-centered small-centered column">

            <h2>Login or sign up to play</h2>
            <p>So we know who to send the prizes to when you win.</p>

          </div>



          <div class = "row large-8 medium-12 small-10 large-centered medium-centered small-centered column">

             <ul class= 'button-group radius even-2'>

              <li><a href="#" id="login_btn" class = "btn button">Login</a></li>
              <li><a href="#" id="signup_btn" class = "btn button">Signup</a></li>

            </ul>

          </div>

          <div class = "row large-8 medium-12 small-10 large-centered medium-centered small-centered column">

            <ul class= 'button-group radius even-2 leaders_btns'>

              <li><a href='#' class = 'tiny leaders_btn secondary button leaders_daily'>Daily<br />Top Ten</a></li>
              <li><a href='#' class = 'tiny leaders_btn button secondary leaders_all'>Overall<br />Top Ten</a></li>

            </ul>
            
          </div>

        </div>

      </div>

    </section>

    <section id = "stage2a" class = "stage">

      <div class = "init_info">

        <div class = "large-8 medium-10 small-12 large-centered medium-centered small-centered column">

          <div class="row collapse">

            <div class="large-12">
              <button href="#" id="signup_back_btn" class = "back-btn button tiny"><i class="fi-x"></i> Back</button>
            </div>

          </div>

          <h2>Enter your details below</h2>

          <div class="large-12">
            <button href="#" id="signup_fb_login_btn" class = "btn expand button"><i class= "fi-social-facebook"></i> Connect with facebook</button>
          </div>

          <form data-abide="ajax" id="signup-form">

            <input type="hidden" class ="serial" name = "nonce" value="<?php echo $_SESSION['nonce']?>"/>

            <input type="hidden" class ="serial" name = "fb_id" value=""/>

            <div class="row collapse">

              

              <div class="large-12">

                <label>
                  <span class="form_label">Name</span>
                  <input type="text" placeholder="Name" class ="serial" name="name_signup" required pattern="[a-zA-Z]+">
                </label>
                <small class="error">Enter your name?</small>

              </div>

              <div class="large-12 ">

                <div class="email-field">

                  <label>
                    <span class="form_label">Email</span>
                    <input id="email" type="email" class ="serial" placeholder="Email" name="email_signup" required>
                  </label>
                  <small class="error">Valid email required</small>

                </div>

              </div>

              <div class="large-12 ">

                <div class="password-field">

                  <label>
                    <span class="form_label">Password</span>
                    <input placeholder="Password" class ="serial" type="password" id="password_signup" name="pword_signup" required >
                  </label>
                  
                  <small class="error">Enter your password</small>

                </div>

              </div>

              <div class="large-12 ">

                <label for="checkbox1">
                <input id="checkbox1" class = "tnc" type="checkbox" required>
                I have read the <a href="tnc" target="_blank">terms and conditions</a>
                </label>

                <label for="checkbox2">
                <input id="checkbox2" type="checkbox" name="newsletter" class = "serial">
                I would like to receive future information on the Warriors.
                </label>

              </div>

              <div class="large-12 ">

                <button type="submit" class="submit_btn expand button">ENTER</button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </section>

    <section id = "stage2b" class = "stage">

      <div class = "init_info">

        <div class = "large-8 medium-10 small-12 large-centered medium-centered small-centered column">

          <div class="row collapse">

            <div class="large-12">
              <button href="#" id="login_back_btn" class = "back-btn button tiny"><i class="fi-x"></i> Back</button>
            </div>

          </div>

          <h2>Enter your login details</h2>

          <div class="large-12">
            <button href="#" id="login_fb_login_btn" class = "btn expand button"><i class= "fi-social-facebook"></i> login with facebook</button>
          </div>

          <form data-abide="ajax" id="login-form">

            <input type="hidden" name = "nonce" class ="serial" value="<?php echo $_SESSION['nonce']?>"/>

            <input type="hidden" class ="serial" name = "fb_id" value=""/>

            <div class="row collapse">

              

              <div class="large-12 ">

                <div class="email-field">

                  <label>
                    <span class="form_label">Email</span>
                    <input id="email_login" type="email" class ="serial" placeholder="Email" name="email_login" required>
                  </label>
                  <small class="error">Valid email required</small>

                </div>

              </div>

              <div class="large-12 ">

                <div class="password-field">

                  <label>
                    <span class="form_label">Password</span>
                    <input placeholder="Password" class ="serial" type="password" id="password_login" name="pword_login" required >
                  </label>
                  
                  <small class="error">Enter your password</small>

                </div>

              </div>

              <div class="large-12 ">

                <button type="submit" class="submit_login_btn expand button">ENTER</button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </section>

    <section id = "stage3" class = "stage">

      <div class = "row init_info">      

        <div class = "columns large-6 medium-8 small-10 large-centered medium-centered small-centered text-center">

          <h2>CHOOSE PLAYER</h2>

          <div class = "player_select">

            <span class = "player_arrow text-right" id="select_left"><i class="fi-arrow-left"></i></span>

            <!-- <div class= "columns large-6 medium-6 small-6">-->
             
            <span class  ="avartar_container">

              <span class = "avartar"></span>

            </span>
            <!-- </div>-->

            <span class = "player_arrow text-left" id="select_right"><i class="fi-arrow-right"></i></span>

          </div>

          <div id="player_name"><p id = "pname"></p></div>          

          <div class = "row large-8 medium-12 small-10 large-centered medium-centered small-centered column">
          <a href="#" class = "btn play_now button secondary">Play now</a>

          </div>

        </div>

      </div>

    </section>

    <section id = "stage4" class = "stage">

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

    

    </div>

    <?php if ( !$detect->isMobile() ) {?>


    <div id="mobileModal" class="reveal-modal" data-reveal>

      <div class = "columns large-12 text-center">

        <h4>For the full Warriors flick kick experience load this page in your smartphones mobile browser, or scan the below QR code.</h4>

        <img src="img/qrcode.28378979.png" alt=""/>

      </div>
      
      <a class="close-reveal-modal">&#215;</a>
      
    </div>

    <?php } ?>

    <div id="shareModal" class="reveal-modal" data-reveal>

      <div class = "columns large-12 text-center">

        <button class = "btn expand" id = "share_fb"><i class= "fi-social-facebook"></i> Share on facebook</button>


      </div>
      
      <a class="close-reveal-modal">&#215;</a>
      
    </div>

    <div id="alertModal" class="reveal-modal" data-reveal>

      <div class = "columns large-12 text-center" id="alert_text"></div>
      
      <a class="close-reveal-modal">&#215;</a>
      
    </div>  

    <div id="leadersModal" class="reveal-modal" data-reveal>

      <h2 id = "leaders_header" class = "text-center"></h2>

      <div class = "columns large-12 text-center" id="leaders_text">
      </div>
      
      <a class="close-reveal-modal">&#215;</a>
      
    </div>   

    <!--  JAVASCRIPT -->
    <script src="http://hammerjs.github.io/dist/hammer.js"></script>
    <script>

      $(document).foundation();

    </script>
    <script src="js/custom.js?2"></script>
    <script src="js/flickKick.js?1"></script>

    <!-- -->

  </body>
</html>
