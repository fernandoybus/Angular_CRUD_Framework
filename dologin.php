<?php


include 'credentials.php';



$data = json_decode(file_get_contents('php://input'), true);



$user= $data["user"];
$pass= $data["password"];
$image= $data["image"];


//     $user="test";
//     $email = "asdf@asdf.com";
//     $pass="test";

// $x = "$2a$08$Cf1213eParGlBJoOM0F6a.03Adz4it.qyY.iPFdO.A2bJCIDmBdXC";



//echo $user . " - " . $pass;
// echo $x;
// echo "<br>";

$custo = '08';
$salt = 'Cf1213eParGlBJoOM0F6aJ';
// Gera um hash baseado em bcrypt
$hash = crypt($pass, '$2a$' . $custo . '$' . $salt . '$');

// echo "<br>";

//echo $hash;

// if ($x == $hash){
//     echo "eguals";
// }

//echo $user . " - ". $hash;


// $2a$08$Cf1213eParGlBJoOM0F6a.03Adz4it.qyY.iPFdO.A2bJCIDmBdXC0
// $2a$08$Cf1213eParGlBJoOM0F6a.03Adz4it.qyY.iPFdO.A2bJCIDmBdXC0


//$hash = "$2a$08$Cf1213eParGlBJoOM0F6a.03Adz4it.qyY.iPFdO.A2bJCIDmBdXC0";
//$2a$08$Cf1213eParGlBJoOM0F6a.03Adz4it.qyY.iPFdO.A2bJCIDmBdXC

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);


	$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
	mysql_select_db($database, $con);
	//SELECT * FROM `users` WHERE `username` LIKE 'fernandoybus' AND `password` LIKE 'test'
         $sql = "SELECT * FROM users where username LIKE '" .  $user . "' AND password LIKE '" . $hash . "'";
         //echo $sql;
         $result = mysql_query($sql) or die ("Query error: " . mysql_error());

         while($row = mysql_fetch_array($result)) {
              
     
            $found = "1";
            //echo $found;
 
              
            if ($found <> ""){


             	echo '1';

            }
    
         }
         if ($found == ""){
          	echo '0';
          }

mysql_close($con);




?>
