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

     

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $headers = getallheaders();
        $token = $headers["Authorization"];
        $sql = "SELECT * FROM `users` WHERE `token` = '$token'";
        $res=mysqli_query($conn,$sql);
        if(mysqli_num_rows($res) > 0 ){
            
            $new_token="";
            $sql = "UPDATE `users` SET `token` = '$new_token' WHERE `token` = '$token'";
            $result=mysqli_query($conn,$sql);
            $response=array('status' => 'valid');
            echo json_encode($response);
        }else{
           $response=array('status' => 'Invalid');
           echo json_encode($response);
        }
       
    }


    ?>