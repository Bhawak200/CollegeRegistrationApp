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
    // Die if connection was not successful
    if (!$conn){
        die("Sorry we failed to connect: ". mysqli_connect_error());
    };
     
    $id=$_GET['id'];
    $sql = "SELECT * FROM `students` WHERE `id` = '$id'" ;
    // run SQL statement
    $result = mysqli_query($conn,$sql);
    
    // die if SQL statement failed
    if (!$result) {
      http_response_code(404);
      die(mysqli_error($conn));
    }
    $out = json_encode(mysqli_fetch_object($result));
   
    echo $out;
    ?>