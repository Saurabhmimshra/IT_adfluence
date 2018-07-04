<?php
	print_r($_POST);
	require 'connect.inc.php';
	require 'core.inc.php';

	if(isset($_POST['email']) && isset($_POST['password'])){
		$email = $_POST['email'];
		$password = $_POST['password'];

		if(!empty($email) && !empty($password)){
			$sql = "select * from `users` where `email` = '". mysqli_real_escape_string($con, $email) ."' and `password` = '". mysqli_real_escape_string($con, $password) ."'";
			if($result = mysqli_query($con, $sql)){
				$exists = mysqli_num_rows($result);
				if($exists == 1){
					session_start();
     				$_SESSION['users']['email']=$email;
      				setcookie('email', $email);
      				send_response($email);
				}
				 
			}
		}
	}
?>