<?php


include 'credentials.php';




$data = json_decode(file_get_contents('php://input'), true);



$user= $data["newusername"];
$email= $data["newemail"];
$pass= $data["newpassword"];


	// $user="test";
	// $email = "asdf@asdf.com";
	// $pass="test";




$custo = '08';
$salt = 'Cf1213eParGlBJoOM0F6aJ';
// Gera um hash baseado em bcrypt
$hash = crypt($pass, '$2a$' . $custo . '$' . $salt . '$');

// echo $hash;




$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);


	$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
	mysql_select_db($database, $con);
	
         $found = 0;
		 // check uniqueness of username
         $sql = "SELECT * FROM users where username LIKE '" .  $user . "'";
         $result = mysql_query($sql) or die ("Query error: " . mysql_error());

         while($row = mysql_fetch_array($result)) {
             
            $found = $row[0];
    
         }

  
         if ($found != 0){
          	echo '{"response":"0", "user": "' .  "user already exist" . '"}';
          	$erro =1;
         }


         // check uniqueness of email
         if ($erro != 1){
		         
		         $sql = "SELECT * FROM users where email LIKE '" .  $email . "'";
		         $result = mysql_query($sql) or die ("Query error: " . mysql_error());

		         while($row = mysql_fetch_array($result)) {
		              
		     
		            $found = $row[0];

		    
		         }
		         if ($found != 0){
		          	echo '0';
		          	$erro =1;
		         }
     	 }

		 // insert new user
		 if ($erro != 1){
	         $sql = "INSERT INTO users (username, password, email) VALUES('$user', '$hash', '$email')";
	         $result = mysql_query($sql) or die ("Query error: " . mysql_error());

	      
	         echo '1';

     	 }





mysql_close($con);




?>
