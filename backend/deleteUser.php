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
    $data = json_decode(file_get_contents("php://input"));
    $sql= "DELETE FROM `students` where `id` = '$data->id'";
    $result=mysqli_query($conn,$sql); 

    
    ?>