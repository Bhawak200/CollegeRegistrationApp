<?php 
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: *");
  
  // Connect to the Database 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "tripdata";
    $id = '';

    // Create a connection
    $conn = mysqli_connect($servername, $username, $password, $database);

    // Die if connection was not successful
    if (!$conn){
        die("Sorry we failed to connect: ". mysqli_connect_error());
    }
    // INSERT INTO `studentsdata` (`id`, `name`, `age`, `gender`, `email`, `date`) VALUES ('1', 'Bhawak', '22', 'Male', 'bhawakanand@gmail.com', current_timestamp());
     
     if($_SERVER["REQUEST_METHOD"] == "GET"){
        $headers = getallheaders();
        $token = $headers["Authorization"];
        $sql = "SELECT * FROM `users` WHERE `token` = '$token'";
        $res=mysqli_query($conn,$sql);
        if(mysqli_num_rows($res) > 0 ){
          $sql = "SELECT * FROM students"; 
          // run SQL statement
          $result = mysqli_query($conn,$sql); 
          $out = array();
         // use array
          http_response_code(200);
          /*if (!$id) echo '[';
          for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
                echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
          }
          if (!$id) echo ']';*/
          while($ress =  mysqli_fetch_object($result)){
            array_push($out,$ress);
          }
          echo json_encode($out);
         
        }else{
          http_response_code(202);
        }
     }




    


?>