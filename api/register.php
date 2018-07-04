<?php 

	require 'connect.inc.php';
	require 'core.inc.php';


	if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password']) && isset($_FILES['profile_pic'])){
		$name = test_input($_POST['name']);
		$email = test_input($_POST['email']);
		$password = test_input($_POST['password']);
		$file = $_FILES['profile_pic'];

		$file_name=$file['name'];
		$file_tmp_loc=$file['tmp_name'];
		$file_error=$file['error'];

		
		if (!empty($name) && !empty($email) && !empty($password) && !empty($file)) {
				
			if ($file_error) {
				die('There is error in the file.');
			}

			$file_new_name = uniqid().".jpg";
			// $destination_path = getcwd().DIRECTORY_SEPARATOR;
			if (!move_uploaded_file($file_tmp_loc, $destination_path.$file_new_name)) {
				die('Cannot move the file.');
			}

			$query = "INSERT INTO `users`( `name`, `email`, `password`, `profile_pic`) VALUES ('". mysqli_real_escape_string($con, $name) ."','". mysqli_real_escape_string($con, $email) ."','". mysqli_real_escape_string($con, $password) ."', '". $file_new_name ."')";
			if(!mysqli_query($con, $query)){
				die('Error: ' . mysqli_error($con));
			}

			echo "Registration Successfull!";

		}				
	}

?>