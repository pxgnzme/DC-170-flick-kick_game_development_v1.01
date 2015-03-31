<?php 

  session_start();

  $form_data = $_POST['formdata'];
  parse_str($form_data);

  if($username == "warriors_admin" && $password == "fl1ckKW@rriors"){

    $_SESSION['admin'] = true;

  }

?>
         