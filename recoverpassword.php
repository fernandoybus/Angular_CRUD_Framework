<?php

include 'credentials.php';



$email="";


$data = json_decode(file_get_contents('php://input'), true);

$email= $data["emailrecover"];




//echo $email;




$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);


    $con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
    mysql_select_db($database, $con);

         $found =0;


         $sql = "SELECT password FROM users where email LIKE '" .  $email . "'";
         $result = mysql_query($sql) or die ("Query error: " . mysql_error());

         while($row = mysql_fetch_array($result)) {
              
     
            $found = $row[0];


 

    
         }




          if ($found === 0){
            echo '0';
         }

         else{

                        //echo "sending email";
                    $custo = '08';
            $salt = 'Cf1213eParGlBJoOM0F6aJ';
            // Gera um hash baseado em bcrypt
            $hash = crypt($email . 'ybus', '$2a$' . $custo . '$' . $salt . '$');
                        //echo "<br>";
                        //echo $hash;

            //echo $hash;

            $sql = "UPDATE users SET retrievepassword= '" . $hash ."' WHERE email LIKE '" . $email . "'";
                        //echo $sql;

                        $result = mysql_query($sql) or die ("Query error: " . mysql_error());

                        $email = str_replace("%40","@",$email);

                    //echo $email;
                    

            
                    mail($email,"Password Recovery from Angular System by Y-bus","Click on link to create new password: http://deeplook.com.br/angular/resetpassword.php?token=" . $hash . "&email=" . $email);

                        echo '1';
          }

mysql_close($con);




?>