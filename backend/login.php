<?php 
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  
  // Connect to the Database 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "tripdata";
   
  




    // Create a connection
    $conn = mysqli_connect($servername, $username, $password, $database);

    if (!$conn){
        die("Sorry we failed to connect: ". mysqli_connect_error());
    };
    $email=$password="";
    $err="";

    if($_SERVER["REQUEST_METHOD"] == "POST"){


      // If either password or email field is empty we simply return error 
        if(empty(trim($_POST['email'])) || empty(trim($_POST['password'])) ){
           http_response_code(202);
           $err=" Please enter email and password";
          $myObj = new stdClass();
          $myObj->status = "202";
          $myObj -> msg = $err;
          $myObj->token = "";
          $myJSON = json_encode($myObj);
          echo $myJSON;
           
        }else{
          $email=trim($_POST['email']);
          $password=trim($_POST['password']);
        }


    // if both fields are not empty;
      if(empty($err)){
        
        // Here we first check whether key that come with api is empty or not

      
       $sql = "SELECT * FROM `users` WHERE `email` = '$email'";
       $res=mysqli_query($conn,$sql);

       // check row exit
        if(mysqli_num_rows($res) > 0 ){

                $out =mysqli_fetch_object($res);
                $hashed_password = $out -> {"password"};
                $hashed_token = $out-> {"token"};
                $lastlogintime= $out -> {"lastlogin"};
                date_default_timezone_set('Asia/Kolkata');
                $currtime = date("Y-m-d H:i:s"); 
                
            
                // curr time > last login time
                if($currtime>$lastlogintime){
                  
                     
                      // password verification
                      if(password_verify($password,$hashed_password)){
                              $param_token = md5($currtime);
                              $sql="UPDATE `users` SET `token` = '$param_token' , `lastlogin` = '$currtime'  WHERE `email` = '$email'";
                              $result=mysqli_query($conn,$sql);
                              http_response_code(200);
                              $myObj = new stdClass();
                              $myObj->status = "200";
                              $myObj->token = $param_token;
                              $myJSON = json_encode($myObj);
                              echo $myJSON;
                              
                          }else{
                              http_response_code(202);
                              $err="Invalid Creditinals";
                              $myObj = new stdClass();
                              $myObj->status = "202";
                              $myObj -> msg = $err;
                              $myObj->token = "";
                              $myJSON = json_encode($myObj);
                              echo $myJSON;
                          }
                          //password verification
                    
                                
                }else{
                      http_response_code(202);
                      $err="Invalid Creditinals";
                      $myObj = new stdClass();
                      $myObj->status = "202";
                      $myObj -> msg = $err;
                      $myObj->token = "";
                      $myJSON = json_encode($myObj);
                      echo $myJSON;
                }
                // curr time > last login time end

            
            }else {
              $param_email = $email;
              $param_password = password_hash($password, PASSWORD_DEFAULT);
              date_default_timezone_set('Asia/Kolkata');
              $currtime = date("Y-m-d H:i:s"); 
              $param_token = md5($currtime);
              $sql="INSERT INTO `users`( `email`, `password`, `token`, `lastlogin`) VALUES ('$param_email','$param_password','$param_token',current_timestamp())";
              $result=mysqli_query($conn,$sql);
              if(!$result){
                  $err="Internal Errot";
                  http_response_code(500);
                  $out = array(['message' => "Hello", 'status' => '500']);
                  echo json_encode($out);
              }else{
                http_response_code(200);
                $myObj = new stdClass();
                $myObj->status = "200";
                $myObj->token = $param_token;

                $myJSON = json_encode($myObj);
                echo $myJSON;
              }
        }
        // check row exit end

      };
    }

    ?>










